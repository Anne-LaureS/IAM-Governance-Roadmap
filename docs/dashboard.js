(function () {
  "use strict";

  var M = window.RISK_METRICS;
  if (!M) {
    document.getElementById("scope-line").textContent = "Indicateurs introuvables (data/risk-metrics.js).";
    return;
  }

  var nf = new Intl.NumberFormat("fr-FR");
  function n(v) { return nf.format(v); }
  function pct(v) { return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(v) + " %"; }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function svg(tag, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  var k = M.kpis, s = M.scope;

  /* ---------- en-tête ---------- */
  document.getElementById("scope-line").textContent =
    "Périmètre : " + n(s.applications) + " applications, " + n(s.roles) + " rôles, " + n(s.people) +
    " personnes (dont " + n(s.privilegedPeople) + " avec un rôle Admin).";

  /* ---------- KPI ---------- */
  var kpiDefs = [
    { label: "Violations SoD", value: n(k.sodViolations), sub: n(k.sodPeople) + " personnes concernées" },
    { label: "Comptes à risque", value: n(k.riskAccounts), sub: n(k.riskFindings) + " constats (dormants, orphelins, leavers actifs)" },
    { label: "Rôles alibi", value: n(k.alibiRoles), sub: n(k.alibiEmpty) + " vides, " + n(k.alibiNearEmpty) + " quasi-vides" },
    { label: "Accès à révoquer", value: n(k.revocations), sub: "issus de la campagne de recertification" },
    { label: "Campagne décidée", value: pct(k.decidedPercent), sub: n(M.campaign.approved + M.campaign.revoked) + " lignes sur " + n(k.campaignLines) }
  ];
  var kpis = document.getElementById("kpis");
  kpiDefs.forEach(function (d) {
    kpis.appendChild(el("div", { class: "kpi" }, [
      el("div", { class: "label", text: d.label }),
      el("div", { class: "value", text: d.value }),
      el("div", { class: "sub", text: d.sub })
    ]));
  });

  /* ---------- comparaison des instantanés ---------- */
  var cmp = document.getElementById("compare");
  var hist = M.history || [];
  var rows = [
    ["Applications auditées", "applications"],
    ["Personnes distinctes", "people"],
    ["Violations SoD", "sodViolations"],
    ["Candidats rôles alibi", "alibiRoles"],
    ["Lignes de la campagne", "campaignLines"],
    ["Révocations produites", "revocations"],
    ["Comptes à risque", "riskAccounts"]
  ];
  var thead = el("tr", null, [el("th", { text: "Indicateur" })]);
  hist.forEach(function (h) {
    thead.appendChild(el("th", { class: "num", text: h.label + " (" + h.date + ")" }));
  });
  cmp.appendChild(el("thead", null, [thead]));
  var tbody = el("tbody");
  rows.forEach(function (r) {
    var tr = el("tr", null, [el("td", { text: r[0] })]);
    hist.forEach(function (h) {
      var v = h[r[1]];
      tr.appendChild(el("td", { class: "num" + (v == null ? " muted" : ""), text: v == null ? "non mesuré" : n(v) }));
    });
    tbody.appendChild(tr);
  });
  cmp.appendChild(tbody);

  /* ---------- donut de la campagne ---------- */
  var c = M.campaign;
  var total = c.approved + c.revoked + c.untreated;
  var segs = [
    { label: "Approuvé", icon: "✓", n: c.approved, color: "var(--good)" },
    { label: "Révoqué", icon: "✕", n: c.revoked, color: "var(--bad)" },
    { label: "Non traité", icon: "…", n: c.untreated, color: "var(--neutral)" }
  ];
  var R = 62, CIRC = 2 * Math.PI * R;
  var chart = svg("svg", { viewBox: "0 0 180 180", role: "img",
    "aria-label": "Campagne : " + segs.map(function (x) { return x.n + " " + x.label.toLowerCase(); }).join(", ") });
  chart.appendChild(svg("circle", { cx: 90, cy: 90, r: R, fill: "none", stroke: "var(--line)", "stroke-width": 22 }));
  var offset = 0;
  segs.forEach(function (sg) {
    if (!sg.n) return;
    var len = CIRC * sg.n / total;
    chart.appendChild(svg("circle", {
      cx: 90, cy: 90, r: R, fill: "none", stroke: sg.color, "stroke-width": 22,
      "stroke-dasharray": Math.max(len - 2, 0) + " " + (CIRC - Math.max(len - 2, 0)),
      "stroke-dashoffset": -offset, transform: "rotate(-90 90 90)"
    }));
    offset += len;
  });
  var t1 = svg("text", { x: 90, y: 92, "text-anchor": "middle", class: "donut-total" }); t1.textContent = n(total);
  var t2 = svg("text", { x: 90, y: 110, "text-anchor": "middle", class: "donut-sub" }); t2.textContent = "lignes";
  chart.appendChild(t1); chart.appendChild(t2);
  document.getElementById("donut").appendChild(chart);

  var legend = document.getElementById("campaign-legend");
  segs.forEach(function (sg) {
    var sw = el("span", { class: "swatch" }); sw.style.background = sg.color;
    legend.appendChild(el("li", null, [
      sw,
      el("span", { text: sg.icon + " " + sg.label }),
      el("span", { class: "n", text: n(sg.n) + " (" + pct(100 * sg.n / total) + ")" })
    ]));
  });
  document.getElementById("campaign-hint").textContent =
    "Seules les lignes liées aux violations SoD et à un mover mal traité ont été décidées, à titre d'exemple : le reste attend la revue des propriétaires d'accès.";

  /* ---------- barres ---------- */
  function bars(container, items, labelKey) {
    var max = Math.max.apply(null, items.map(function (i) { return i.count; }).concat([1]));
    items.forEach(function (it) {
      var fill = el("div", { class: "bar-fill" });
      fill.style.width = (100 * it.count / max) + "%";
      container.appendChild(el("div", { class: "bar" }, [
        el("span", { class: "bar-label", text: it[labelKey] }),
        el("div", { class: "bar-track" }, [fill]),
        el("span", { class: "bar-value", text: n(it.count) })
      ]));
    });
  }
  bars(document.getElementById("account-bars"), M.accounts.bySignal, "signal");
  bars(document.getElementById("sod-bars"), M.sod.byRule, "rule");

  var sevClass = { "Élevée": "sev-high", "Moyenne": "sev-mid", "Faible": "sev-low" };
  var sevIcon = { "Élevée": "▲", "Moyenne": "◆", "Faible": "●" };
  var chips = document.getElementById("severity-chips");
  ["Élevée", "Moyenne", "Faible"].forEach(function (sv) {
    var found = M.accounts.bySeverity.filter(function (x) { return x.severity === sv; })[0];
    chips.appendChild(el("span", { class: "chip " + sevClass[sv], text: sevIcon[sv] + " " + sv + " : " + n(found ? found.count : 0) }));
  });

  /* ---------- tables filtrables ---------- */
  function table(id, headers, data, cells, filterId) {
    var tbl = document.getElementById(id);
    tbl.appendChild(el("thead", null, [el("tr", null, headers.map(function (h) { return el("th", { text: h }); }))]));
    var body = el("tbody");
    tbl.appendChild(body);
    function render(q) {
      body.textContent = "";
      var needle = (q || "").trim().toLowerCase();
      data.forEach(function (row) {
        var cs = cells(row);
        if (needle && cs.join(" ").toLowerCase().indexOf(needle) === -1) return;
        body.appendChild(el("tr", null, cs.map(function (c) {
          return el("td", { text: c });
        })));
      });
    }
    render("");
    if (filterId) document.getElementById(filterId).addEventListener("input", function (e) { render(e.target.value); });
  }

  document.getElementById("sod-count").textContent = n(M.sod.violations.length);
  table("sod-table", ["Personne", "Règle", "Accès 1", "Accès 2"], M.sod.violations,
    function (v) { return [v.person, v.rule, v.access1, v.access2]; }, "sod-filter");

  table("risk-table", ["Compte", "Signal", "Gravité", "Accès détenus", "Détail"], M.accounts.items,
    function (a) { return [a.account, a.signal, (sevIcon[a.severity] || "") + " " + a.severity, a.roles || "—", a.detail]; }, "risk-filter");

  document.getElementById("alibi-count").textContent = n(M.alibi.length);
  table("alibi-table", ["Application", "Rôle", "Membres", "Signal"], M.alibi,
    function (a) { return [a.application, a.role, String(a.members), a.signal]; });

  document.getElementById("generated").textContent = "Indicateurs calculés le " + M.generatedAt + ".";
  document.getElementById("app").hidden = false;
})();
