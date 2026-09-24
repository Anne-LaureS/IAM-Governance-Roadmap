<#
.SYNOPSIS
    Calcule les indicateurs du dashboard « Access Risk » à partir des sorties réelles d'IAM-Access-
    Recertification, et les écrit en JSON pour la page du dashboard.

.DESCRIPTION
    Aucune saisie manuelle : tous les chiffres viennent des CSV produits par les outils du portfolio.

      SoD_Violations.csv          violations de séparation des tâches
      Alibi_Roles_Candidates.csv  rôles vides ou quasi-vides
      Dormant_Accounts.csv        comptes dormants, orphelins, leavers actifs, désactivés avec accès
      CertificationCampaign.csv   campagne de recertification (colonne Decision)
      Remediation_Actions.csv     accès à révoquer
      sample-data\LDAP_Applications_Roles_Audit.csv   audit des rôles (périmètre : applications,
                                                     personnes, comptes à privilège)

    Produit docs\data\risk-metrics.js (chargé par la page) et docs\data\risk-metrics.json (même
    contenu, pour d'autres consommateurs), et met à jour docs\data\history.json : une entrée par
    -SnapshotLabel, ce qui permet de comparer des périmètres ou des dates. Relancer avec le même
    libellé remplace l'entrée ; un nouveau libellé en ajoute une.

.PARAMETER SourcePath
    Dossier d'IAM-Access-Recertification. ..\IAM-Access-Recertification par défaut.

.PARAMETER SnapshotLabel
    Libellé de l'instantané enregistré dans l'historique (« Lab enrichi » par défaut).

.PARAMETER SnapshotDate
    Date de l'instantané (aujourd'hui par défaut).

.PARAMETER OutputFolder
    Dossier de données du site. docs\data par défaut.

.EXAMPLE
    .\scripts\Get-RiskMetrics.ps1
#>

[CmdletBinding()]
param(
    [string]$SourcePath = (Join-Path $PSScriptRoot "..\..\IAM-Access-Recertification"),
    [string]$SnapshotLabel = "Lab enrichi",
    [string]$SnapshotDate = (Get-Date -Format "yyyy-MM-dd"),
    [string]$OutputFolder = (Join-Path $PSScriptRoot "..\docs\data")
)

$SourcePath = (Resolve-Path $SourcePath).Path
$files = @{
    Sod        = "SoD_Violations.csv"
    Alibi      = "Alibi_Roles_Candidates.csv"
    Dormant    = "Dormant_Accounts.csv"
    Campaign   = "CertificationCampaign.csv"
    Remediation = "Remediation_Actions.csv"
    Audit      = "sample-data\LDAP_Applications_Roles_Audit.csv"
}
foreach ($k in $files.Keys) {
    $path = Join-Path $SourcePath $files[$k]
    if (-not (Test-Path $path)) {
        Write-Host "Fichier introuvable : $path" -ForegroundColor Red
        exit 1
    }
}

function Read-Source { param([string]$Key) @(Import-Csv (Join-Path $SourcePath $files[$Key])) }

$sod = Read-Source Sod
$alibi = Read-Source Alibi
$dormant = Read-Source Dormant
$campaign = Read-Source Campaign
$remediation = Read-Source Remediation
$audit = Read-Source Audit

# --- Périmètre (audit des rôles) ---
$applications = @($audit | Select-Object -ExpandProperty Application -Unique)
$roleRows = @($audit | Where-Object { $_.Role })
$people = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$privPeople = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
foreach ($row in $roleRows) {
    foreach ($m in ($row.Members -split ';' | ForEach-Object { $_.Trim() } | Where-Object { $_ })) {
        [void]$people.Add($m)
        if ($row.Role -match '(?i)admin') { [void]$privPeople.Add($m) }
    }
}

# --- SoD ---
$sodByRule = @($sod | Group-Object RuleName | Sort-Object Count -Descending | ForEach-Object { [PSCustomObject]@{ rule = $_.Name; count = $_.Count } })

# --- Alibi ---
$alibiEmpty = @($alibi | Where-Object { $_.Signal -match '^Vide' }).Count
$alibiNear = $alibi.Count - $alibiEmpty

# --- Comptes à risque ---
$dormantBySignal = @($dormant | Group-Object Signal | Sort-Object Count -Descending | ForEach-Object { [PSCustomObject]@{ signal = $_.Name; count = $_.Count } })
$dormantBySeverity = @($dormant | Group-Object Severity | ForEach-Object { [PSCustomObject]@{ severity = $_.Name; count = $_.Count } })
$riskAccounts = @($dormant | Select-Object -ExpandProperty SamAccountName -Unique).Count

# --- Campagne ---
$approve = @($campaign | Where-Object { $_.Decision.Trim().ToLower() -eq 'approve' }).Count
$revoke = @($campaign | Where-Object { $_.Decision.Trim().ToLower() -eq 'revoke' }).Count
$untreated = $campaign.Count - $approve - $revoke
$decidedPct = if ($campaign.Count -gt 0) { [math]::Round(100 * ($approve + $revoke) / $campaign.Count, 1) } else { 0 }

$metrics = [ordered]@{
    generatedAt = (Get-Date -Format "yyyy-MM-dd HH:mm")
    scope       = [ordered]@{ applications = $applications.Count; roles = $roleRows.Count; people = $people.Count; privilegedPeople = $privPeople.Count }
    kpis        = [ordered]@{
        sodViolations = $sod.Count
        sodPeople     = @($sod | Select-Object -ExpandProperty Person -Unique).Count
        alibiRoles    = $alibi.Count
        alibiEmpty    = $alibiEmpty
        alibiNearEmpty = $alibiNear
        riskAccounts  = $riskAccounts
        riskFindings  = $dormant.Count
        revocations   = $remediation.Count
        campaignLines = $campaign.Count
        decidedPercent = $decidedPct
    }
    campaign    = [ordered]@{ approved = $approve; revoked = $revoke; untreated = $untreated }
    sod         = [ordered]@{
        byRule     = $sodByRule
        violations = @($sod | ForEach-Object { [PSCustomObject]@{ person = $_.Person; rule = $_.RuleName; access1 = $_.Access1; access2 = $_.Access2 } })
    }
    alibi       = @($alibi | ForEach-Object { [PSCustomObject]@{ application = $_.Application; role = $_.Role; members = [int]$_.MemberCount; signal = $_.Signal } })
    accounts    = [ordered]@{
        bySignal   = $dormantBySignal
        bySeverity = $dormantBySeverity
        items      = @($dormant | ForEach-Object { [PSCustomObject]@{ account = $_.SamAccountName; name = $_.Name; signal = $_.Signal; severity = $_.Severity; roles = $_.Roles; detail = $_.Detail } })
    }
}

# --- Historique : une entrée par libellé ---
New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null
$historyPath = Join-Path $OutputFolder "history.json"
$history = @()
if (Test-Path $historyPath) { $history = @(Get-Content $historyPath -Raw -Encoding UTF8 | ConvertFrom-Json) }
$entry = [PSCustomObject]@{
    label         = $SnapshotLabel
    date          = $SnapshotDate
    source        = "calculé par Get-RiskMetrics.ps1"
    applications  = $applications.Count
    people        = $people.Count
    sodViolations = $sod.Count
    alibiRoles    = $alibi.Count
    campaignLines = $campaign.Count
    revocations   = $remediation.Count
    riskAccounts  = $riskAccounts
}
$history = @($history | Where-Object { $_.label -ne $SnapshotLabel }) + $entry
$history = @($history | Sort-Object date)
$metrics["history"] = $history

$utf8 = New-Object System.Text.UTF8Encoding($false)
$json = $metrics | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText((Join-Path $OutputFolder "risk-metrics.json"), $json, $utf8)
[System.IO.File]::WriteAllText((Join-Path $OutputFolder "risk-metrics.js"), "window.RISK_METRICS = $json;`n", $utf8)
[System.IO.File]::WriteAllText($historyPath, ($history | ConvertTo-Json -Depth 4), $utf8)

Write-Host "=== Indicateurs calculés -> $OutputFolder ===" -ForegroundColor Green
Write-Host ("  périmètre : {0} applications, {1} rôles, {2} personnes ({3} avec un rôle Admin)" -f $applications.Count, $roleRows.Count, $people.Count, $privPeople.Count)
Write-Host ("  SoD : {0} ; alibi : {1} ; comptes à risque : {2} ; campagne : {3} lignes ({4} approuvées, {5} révoquées, {6} non traitées)" -f $sod.Count, $alibi.Count, $riskAccounts, $campaign.Count, $approve, $revoke, $untreated)
