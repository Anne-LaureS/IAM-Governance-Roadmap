window.RISK_METRICS = {
  "generatedAt": "2026-09-24 02:58",
  "scope": {
    "applications": 20,
    "roles": 61,
    "people": 92,
    "privilegedPeople": 23
  },
  "kpis": {
    "sodViolations": 14,
    "sodPeople": 13,
    "alibiRoles": 24,
    "alibiEmpty": 2,
    "alibiNearEmpty": 22,
    "riskAccounts": 7,
    "riskFindings": 8,
    "revocations": 15,
    "campaignLines": 166,
    "decidedPercent": 17.5
  },
  "campaign": {
    "approved": 14,
    "revoked": 15,
    "untreated": 137
  },
  "sod": {
    "byRule": [
      {
        "rule": "Admin Coeur bancaire + Validateur Paiements",
        "count": 2
      },
      {
        "rule": "Paiements — Initiateur + Validateur (4 yeux)",
        "count": 2
      },
      {
        "rule": "Achats — Manager + Approbateur Comptabilité",
        "count": 1
      },
      {
        "rule": "Admin cross-métier — CRM + SIRH",
        "count": 1
      },
      {
        "rule": "Approbateur Comptabilité + Initiateur Paiements",
        "count": 1
      },
      {
        "rule": "Comptabilité — Admin Comptabilite + accès ERP",
        "count": 1
      },
      {
        "rule": "Crédit — Analyste + Décisionnaire",
        "count": 1
      },
      {
        "rule": "DevOps — Admin Dev + Admin Coeur bancaire (production)",
        "count": 1
      },
      {
        "rule": "ERP — Admin ERP + accès Comptabilite",
        "count": 1
      },
      {
        "rule": "IT — Admin IT + Admin Sécurité",
        "count": 1
      },
      {
        "rule": "Opérateur Coeur bancaire + Validateur KYC",
        "count": 1
      },
      {
        "rule": "Trésorerie — Front-office + Back-office",
        "count": 1
      }
    ],
    "violations": [
      {
        "person": "Bastien Henry",
        "rule": "Admin Coeur bancaire + Validateur Paiements",
        "access1": "CoreBanking:CoreBanking-Admin",
        "access2": "Paiements-SEPA:Paiements-Validateur"
      },
      {
        "person": "Bastien Henry",
        "rule": "Paiements — Initiateur + Validateur (4 yeux)",
        "access1": "Paiements-SEPA:Paiements-Initiateur",
        "access2": "Paiements-SEPA:Paiements-Validateur"
      },
      {
        "person": "Cecile Durand",
        "rule": "Admin Coeur bancaire + Validateur Paiements",
        "access1": "CoreBanking:CoreBanking-Admin",
        "access2": "Paiements-SEPA:Paiements-Validateur"
      },
      {
        "person": "David Fabre",
        "rule": "Paiements — Initiateur + Validateur (4 yeux)",
        "access1": "Paiements-SEPA:Paiements-Initiateur",
        "access2": "Paiements-SEPA:Paiements-Validateur"
      },
      {
        "person": "Elodie Loiseau",
        "rule": "Trésorerie — Front-office + Back-office",
        "access1": "Tresorerie-Marches:Tresorerie-FrontOffice",
        "access2": "Tresorerie-Marches:Tresorerie-BackOffice"
      },
      {
        "person": "Enzo Riou",
        "rule": "DevOps — Admin Dev + Admin Coeur bancaire (production)",
        "access1": "DevOps:Dev-Admin",
        "access2": "CoreBanking:CoreBanking-Admin"
      },
      {
        "person": "hlemoine",
        "rule": "ERP — Admin ERP + accès Comptabilite",
        "access1": "ERP:ERP-Admin",
        "access2": "Comptabilite:Comptabilite-Standard"
      },
      {
        "person": "jdupont",
        "rule": "Comptabilité — Admin Comptabilite + accès ERP",
        "access1": "Comptabilite:Comptabilite-Admin",
        "access2": "ERP:ERP-Utilisateur"
      },
      {
        "person": "Jules Barre",
        "rule": "Approbateur Comptabilité + Initiateur Paiements",
        "access1": "Comptabilite:Comptabilite-Approbateur",
        "access2": "Paiements-SEPA:Paiements-Initiateur"
      },
      {
        "person": "Julie Masson",
        "rule": "Opérateur Coeur bancaire + Validateur KYC",
        "access1": "CoreBanking:CoreBanking-Operateur",
        "access2": "KYC-LCBFT:KYC-Validateur"
      },
      {
        "person": "lrousseau",
        "rule": "Admin cross-métier — CRM + SIRH",
        "access1": "CRM:CRM-Admin",
        "access2": "SIRH:SIRH-Admin"
      },
      {
        "person": "Maxime Chevalier",
        "rule": "Crédit — Analyste + Décisionnaire",
        "access1": "Credit:Credit-Analyste",
        "access2": "Credit:Credit-Decisionnaire"
      },
      {
        "person": "Nicolas Aubert",
        "rule": "IT — Admin IT + Admin Sécurité",
        "access1": "ITSM:IT-Admin",
        "access2": "SecOps:Security-Admin"
      },
      {
        "person": "Sabrina Lopes",
        "rule": "Achats — Manager + Approbateur Comptabilité",
        "access1": "Achats:Achats-Manager",
        "access2": "Comptabilite:Comptabilite-Approbateur"
      }
    ]
  },
  "alibi": [
    {
      "application": "Credit",
      "role": "Credit-Legacy-Admin",
      "members": 0,
      "signal": "Vide — aucun membre"
    },
    {
      "application": "Juridique",
      "role": "PAM-Privileged-Test",
      "members": 0,
      "signal": "Vide — aucun membre"
    },
    {
      "application": "Achats",
      "role": "Achats-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Comptabilite",
      "role": "Comptabilite-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Comptabilite",
      "role": "Comptabilite-Consultant",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Credit",
      "role": "Credit-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "CRM",
      "role": "CRM-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "CRM",
      "role": "CRM-Manager",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "ERP",
      "role": "ERP-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "ERP",
      "role": "ERP-Approbateur",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "ERP",
      "role": "ERP-Support",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Helpdesk",
      "role": "Helpdesk-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Juridique",
      "role": "Juridique-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Juridique",
      "role": "Juridique-Standard",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "KYC-LCBFT",
      "role": "KYC-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Marketing",
      "role": "Marketing-Consultant",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Marketing",
      "role": "Marketing-Owner",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Monetique",
      "role": "Monetique-Legacy-Operateur",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Paiements-SEPA",
      "role": "Paiements-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "RH",
      "role": "RH-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Risques",
      "role": "Risques-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "SIRH",
      "role": "SIRH-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Support-N3",
      "role": "Support-N3-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    },
    {
      "application": "Tresorerie-Marches",
      "role": "Tresorerie-Admin",
      "members": 1,
      "signal": "Quasi-vide — 1 membre(s), à vérifier"
    }
  ],
  "accounts": {
    "bySignal": [
      {
        "signal": "Orphelin",
        "count": 4
      },
      {
        "signal": "Leaver encore actif",
        "count": 2
      },
      {
        "signal": "Désactivé avec accès",
        "count": 1
      },
      {
        "signal": "Dormant",
        "count": 1
      }
    ],
    "bySeverity": [
      {
        "severity": "Élevée",
        "count": 1
      },
      {
        "severity": "Faible",
        "count": 1
      },
      {
        "severity": "Moyenne",
        "count": 6
      }
    ],
    "items": [
      {
        "account": "legacy-admin",
        "name": "Legacy Admin (legacy-admin)",
        "signal": "Orphelin",
        "severity": "Élevée",
        "roles": "CoreBanking:CoreBanking-Admin",
        "detail": "Absent du référentiel RH - compte activé - 1 accès"
      },
      {
        "account": "old-user01",
        "name": "Ancien Utilisateur01 (old-user01)",
        "signal": "Désactivé avec accès",
        "severity": "Moyenne",
        "roles": "Credit:Credit-Consultation",
        "detail": "Compte désactivé - 1 accès conservé(s)"
      },
      {
        "account": "former-employee",
        "name": "Ancien Collaborateur (former-employee)",
        "signal": "Leaver encore actif",
        "severity": "Moyenne",
        "roles": "Monetique:Monetique-Legacy-Operateur | Paiements-SEPA:Paiements-Validateur",
        "detail": "Parti le 2024-01-31 - compte activé - 2 accès conservé(s)"
      },
      {
        "account": "stagiaire-2023",
        "name": "Stagiaire Conformite2023 (stagiaire-2023)",
        "signal": "Leaver encore actif",
        "severity": "Moyenne",
        "roles": "KYC-LCBFT:KYC-Consultation",
        "detail": "Parti le 2023-09-30 - compte activé - 1 accès conservé(s)"
      },
      {
        "account": "old-user01",
        "name": "Ancien Utilisateur01 (old-user01)",
        "signal": "Orphelin",
        "severity": "Moyenne",
        "roles": "Credit:Credit-Consultation",
        "detail": "Absent du référentiel RH - compte désactivé - 1 accès"
      },
      {
        "account": "old-user02",
        "name": "Ancien Utilisateur02 (old-user02)",
        "signal": "Orphelin",
        "severity": "Moyenne",
        "roles": "Paiements-SEPA:Paiements-Consultation",
        "detail": "Absent du référentiel RH - compte activé - 1 accès"
      },
      {
        "account": "test-user",
        "name": "Compte Test (test-user)",
        "signal": "Orphelin",
        "severity": "Moyenne",
        "roles": "CoreBanking:CoreBanking-Consultation",
        "detail": "Absent du référentiel RH - compte activé - 1 accès"
      },
      {
        "account": "compte-perso",
        "name": "compte-perso",
        "signal": "Dormant",
        "severity": "Faible",
        "roles": "",
        "detail": "Dernière connexion le 2026-04-29 (148 jours)"
      }
    ]
  },
  "history": [
    {
      "label": "Lab initial",
      "date": "2026-09-15",
      "source": "relevé dans l'historique git d'IAM-Access-Recertification (commit 0282773)",
      "applications": 8,
      "people": 21,
      "sodViolations": 3,
      "alibiRoles": 12,
      "campaignLines": 32,
      "revocations": 3,
      "riskAccounts": null
    },
    {
      "label": "Lab enrichi",
      "date": "2026-09-24",
      "source": "calculé par Get-RiskMetrics.ps1",
      "applications": 20,
      "people": 92,
      "sodViolations": 14,
      "alibiRoles": 24,
      "campaignLines": 166,
      "revocations": 15,
      "riskAccounts": 7
    }
  ]
};
