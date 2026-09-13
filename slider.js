// ════════════════════════════════════════════════
//  slider.js — BioNova main site
//  Contains: team tabs, KPI counters, see-more,
//            mobile nav, calculator, + hero particles
// ════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────
     Team / Advisors tab toggle
  ───────────────────────────────────────────── */
  const teamTitle   = document.getElementById('teamTitle');
  const tabFounders = document.getElementById('tab-founders');
  const tabTeam     = document.getElementById('tab-team');
  const tabAdvisors = document.getElementById('tab-advisors');
  const panelFounders = document.getElementById('panel-founders');
  const panelTeam     = document.getElementById('panel-team');
  const panelAdvisors = document.getElementById('panel-advisors');

  function activateTab(target) {
    const isFounders = target === 'founders';
    const isTeam     = target === 'team';
    const isAdvisors = target === 'advisors';

    tabFounders?.classList.toggle('is-active', isFounders);
    tabTeam?.classList.toggle('is-active', isTeam);
    tabAdvisors?.classList.toggle('is-active', isAdvisors);

    tabFounders?.setAttribute('aria-selected', String(isFounders));
    tabTeam?.setAttribute('aria-selected', String(isTeam));
    tabAdvisors?.setAttribute('aria-selected', String(isAdvisors));

    panelFounders?.setAttribute('hidden', '');
    panelFounders?.classList.remove('show');
    panelTeam?.setAttribute('hidden', '');
    panelTeam?.classList.remove('show');
    panelAdvisors?.setAttribute('hidden', '');
    panelAdvisors?.classList.remove('show');

    if (isFounders) {
      panelFounders?.removeAttribute('hidden');
      requestAnimationFrame(() => panelFounders?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = tabFounders?.textContent || 'Founders';
    } else if (isTeam) {
      panelTeam?.removeAttribute('hidden');
      requestAnimationFrame(() => panelTeam?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = tabTeam?.textContent || 'Core Team';
    } else if (isAdvisors) {
      panelAdvisors?.removeAttribute('hidden');
      requestAnimationFrame(() => panelAdvisors?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = tabAdvisors?.textContent || 'Advisors';
    }
  }

  tabFounders?.addEventListener('click', () => activateTab('founders'));
  tabTeam?.addEventListener('click',     () => activateTab('team'));
  tabAdvisors?.addEventListener('click', () => activateTab('advisors'));

  [tabFounders, tabTeam, tabAdvisors].forEach((btn, idx, arr) => {
    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const next = (idx + 1) % arr.length;
        arr[next]?.focus(); arr[next]?.click();
      } else if (e.key === 'ArrowLeft') {
        const prev = (idx - 1 + arr.length) % arr.length;
        arr[prev]?.focus(); arr[prev]?.click();
      }
    });
  });

  /* ─────────────────────────────────────────────
     App KPI counters
  ───────────────────────────────────────────── */
  function animateValue(el, to, decimals = 0, duration = 1200) {
    if (!el) return;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const v = to * p;
      el.textContent = decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString(undefined, { maximumFractionDigits: 0 });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // One BN-108 at full load (1.41696 t manure/day) — same model the ROI
  // calculator runs on, so these numbers and the estimator agree.
  const appSection = document.getElementById('app');
  if (appSection) {
    let kpiDone = false;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !kpiDone) {
        kpiDone = true;
        animateValue(document.getElementById('kpi-gas'),  109.9, 1);
        animateValue(document.getElementById('kpi-elec'), 218.1, 1);
        animateValue(document.getElementById('kpi-fert'), 3404);
      }
    }, { threshold: 0.35 }).observe(appSection);
  }

  /* ─────────────────────────────────────────────
     See more / show less (Achievements + Blog)
  ───────────────────────────────────────────── */
  function setupSeeMore({ gridId, itemSelector, buttonId, initialCount, moreText, lessText }) {
    const grid = document.getElementById(gridId);
    const btn  = document.getElementById(buttonId);
    if (!grid || !btn) return;

    const items = Array.from(grid.querySelectorAll(itemSelector));
    if (items.length <= initialCount) { btn.hidden = true; return; }

    let expanded = false;

    const apply = () => {
      items.forEach((item, idx) => {
        const show = expanded || idx < initialCount;
        item.hidden = !show;
        if (show && expanded && idx >= initialCount) {
          item.classList.add('reveal-fade');
          setTimeout(() => item.classList.remove('reveal-fade'), 350);
        }
      });
      btn.textContent = expanded ? lessText : moreText;
      btn.setAttribute('aria-expanded', String(expanded));
    };

    btn.addEventListener('click', () => {
      expanded = !expanded;
      apply();
      if (!expanded) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    apply();
  }

  setupSeeMore({
    gridId: 'blogGrid', itemSelector: '.blog-card', buttonId: 'blogSeeMore',
    initialCount: 3, moreText: 'See more articles', lessText: 'Show less'
  });

  /* ─────────────────────────────────────────────
     Achievements — Trophy Wall
     (category badges + filter chips + see-more +
      animated impact stats + pointer tilt)
  ───────────────────────────────────────────── */
  (function setupAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const gridCards = Array.from(grid.querySelectorAll('.ach-card'));
    const allCards  = Array.from(document.querySelectorAll('#achievements .ach-card'));
    const chips     = Array.from(document.querySelectorAll('.ach-chip'));
    const btn       = document.getElementById('achSeeMore');
    const INITIAL   = 8;
    let cat = 'all', expanded = false;

    const lang = () => localStorage.getItem('bionova-lang') || document.documentElement.lang || 'en';
    const dict = () => (window.bionovaI18n && window.bionovaI18n.T[lang()]) || {};
    const tt   = (key, fb) => dict()[key] || fb;

    const catMeta = {
      win:    { emoji: '🥇', key: 'ach.cat.win',    fb: 'Win' },
      grant:  { emoji: '💰', key: 'ach.cat.grant',  fb: 'Grant' },
      accel:  { emoji: '🚀', key: 'ach.cat.accel',  fb: 'Program' },
      global: { emoji: '🌍', key: 'ach.cat.global', fb: 'Global' },
    };

    // A card can belong to several categories, e.g. data-cat="accel grant".
    const catsOf = (card) => (card.dataset.cat || '').split(/\s+/).filter(Boolean);

    // Inject one category badge per category + a flag chip onto each card's media
    // (grid cards only — feature cards carry their own "Top Win" ribbon).
    gridCards.forEach(card => {
      const media = card.querySelector('.ach-media');
      if (!media) return;
      // Featured cards carry their own "Top Win" tag — skip the category badges.
      if (!card.classList.contains('ach-feat') && !media.querySelector('.ach-badges')) {
        const wrap = document.createElement('span');
        wrap.className = 'ach-badges';
        catsOf(card).forEach(ct => {
          const meta = catMeta[ct];
          if (!meta) return;
          const badge = document.createElement('span');
          badge.className = 'ach-badge ach-badge-' + ct;
          // Emoji kept in its own node so applyLang() only swaps the label span.
          badge.innerHTML = '<i class="ach-badge-ico">' + meta.emoji + '</i> ' +
                            '<span data-i18n="' + meta.key + '">' + tt(meta.key, meta.fb) + '</span>';
          wrap.appendChild(badge);
        });
        if (wrap.children.length) media.appendChild(wrap);
      }
      if (card.dataset.flag && !media.querySelector('.ach-flag')) {
        const flag = document.createElement('span');
        flag.className = 'ach-flag';
        flag.textContent = card.dataset.flag + (card.dataset.year ? ' ' + card.dataset.year : '');
        media.appendChild(flag);
      }
    });

    function pop(card) {
      card.classList.remove('ach-pop');
      void card.offsetWidth;          // restart animation
      card.classList.add('ach-pop');
      setTimeout(() => card.classList.remove('ach-pop'), 460);
    }

    function render() {
      gridCards.forEach((card, idx) => {
        const match = (cat === 'all') || catsOf(card).includes(cat);
        const show  = match && (cat !== 'all' || expanded || idx < INITIAL);
        const wasHidden = card.hidden;
        card.hidden = !show;
        if (show && wasHidden) pop(card);
      });
      if (btn) {
        const showBtn = (cat === 'all' && gridCards.length > INITIAL);
        btn.hidden = !showBtn;
        if (showBtn) {
          btn.textContent = expanded ? tt('ach.seeless', 'Show less') : tt('ach.seemore', 'See more awards');
          btn.setAttribute('aria-expanded', String(expanded));
        }
      }
    }

    // Show how many awards sit behind each filter chip
    chips.forEach(chip => {
      const c = chip.dataset.cat;
      const n = (c === 'all') ? gridCards.length : gridCards.filter(card => catsOf(card).includes(c)).length;
      const nEl = chip.querySelector('.ach-chip-n');
      if (nEl) nEl.textContent = n;
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');
        cat = chip.dataset.cat;
        expanded = false;
        render();
      });
    });
    btn?.addEventListener('click', () => { expanded = !expanded; render(); });
    document.addEventListener('langchange', render);   // keep see-more label in sync
    render();

    // Animated impact stats — fire once when the bar scrolls into view
    const stats = document.getElementById('achStats');
    const counters = stats ? Array.from(stats.querySelectorAll('.ach-stat-num')) : [];
    function runCounters() {
      counters.forEach(el => {
        const target = parseFloat(el.dataset.count) || 0;
        const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        const dur = 1500, t0 = performance.now();
        (function frame(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + Math.round(target * eased) + suf;
          if (p < 1) requestAnimationFrame(frame);
        })(t0);
      });
    }
    if (stats && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { runCounters(); io.disconnect(); } });
      }, { threshold: 0.35 });
      io.observe(stats);
    } else { runCounters(); }

    // Pointer tilt (skipped for reduced-motion / touch)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      allCards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--rx', (py * -5).toFixed(2) + 'deg');
          card.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
        });
        card.addEventListener('pointerleave', () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });
    }
  })();

  /* ─────────────────────────────────────────────
     Achievements dialog
  ───────────────────────────────────────────── */
  const achDialog    = document.getElementById('achDialog');
  const achDialogImg  = document.getElementById('achDialogImg');
  const achDialogTitle= document.getElementById('achDialogTitle');
  const achDialogText = document.getElementById('achDialogText');
  const achDialogOpen = document.getElementById('achDialogOpen');
  const achClose      = document.querySelector('.ach-close');

  // Hide the dialog image gracefully if the award photo isn't uploaded yet
  if (achDialogImg) achDialogImg.addEventListener('error', () => { achDialogImg.style.display = 'none'; });

  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      if (href && href !== '#') return; // let external links through
      e.preventDefault();
      if (achDialogImg)   achDialogImg.style.display = '';
      if (achDialogImg)   achDialogImg.src    = card.dataset.img   || '';
      if (achDialogImg)   achDialogImg.alt    = card.dataset.title || '';
      if (achDialogTitle) achDialogTitle.textContent = card.dataset.title || '';
      if (achDialogText)  achDialogText.textContent  = card.dataset.text  || '';
      if (achDialogOpen)  { achDialogOpen.href = card.dataset.img || '#'; }
      achDialog?.showModal();
    });
  });

  achClose?.addEventListener('click', () => achDialog?.close());
  achDialog?.addEventListener('click', (e) => { if (e.target === achDialog) achDialog.close(); });

}); // end DOMContentLoaded


/* ══════════════════════════════════════════════════
   MOBILE BEHAVIOUR PACK
══════════════════════════════════════════════════ */

// 1) Close mobile nav after clicking a link
(() => {
  const navToggle = document.getElementById('nav-toggle');
  document.querySelectorAll('nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (navToggle && navToggle.checked) navToggle.checked = false;
    });
  });
})();

// 2) Fix mobile 100vh (address bar)
(() => {
  const setVH = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
})();


/* ══════════════════════════════════════════════════
   RETURNS CALCULATOR — BN-108 techno-economic model
   ─────────────────────────────────────────────────
   The old version multiplied herd size by a per-kg gas yield, so output grew
   without bound and the digester never entered the math. This one starts from
   what a single BN-108 can physically digest and sizes the farm in whole units.

     working volume = 108 m³ × (1 − 18% freeboard)   = 88.56 m³
     slurry/day     = working / 25 d HRT             = 3.5424 m³/day
     TS load        = slurry × 10% target TS         = 0.35424 t/day
     CAPACITY       = TS load / 25% manure TS        = 1.41696 t manure/day

   Everything downstream runs off *processed* manure (capped at units ×
   capacity), never off what the herd produces. At 20 kg/cow/day one unit
   serves ~70 cows.

   Revenue cases:
     conservative (default) — electricity + solid fertilizer
     upside                 — adds liquid digestate + carbon credits, both of
                              which assume 100% sell-through
══════════════════════════════════════════════════ */
(() => {
  const $ = (id) => document.getElementById(id);
  const animalBtns   = document.querySelectorAll('.segmented [data-animal]');
  const scenarioBtns = document.querySelectorAll('.segmented [data-scenario]');
  const herdEl     = $('herd');
  const herdOut    = $('herdOut');
  const tariffEl   = $('tariff');
  const currencyEl = $('currency');
  const advBox     = $('advancedBox');
  const advForm    = $('advForm');
  const toggleAdv  = $('toggleAdvancedLink');
  const root       = $('calcResults2');

  if (!herdEl || !tariffEl || !root) return;

  // Output handles (guarded — calculator degrades gracefully if markup changes)
  const out = {
    biogas:  $('biogasOut'),  kwh: $('kwhOut'),
    solidKg: $('solidKgOut'), liquidL: $('liquidLOut'),
    opex:    $('opexOut'),    opexCur: $('opexCur'),
    reco:    $('recoModel'),  recoHint: $('recoHint'),
    elec:    $('elecOut'),    solid: $('solidOut'),
    liquid:  $('liquidOut'),  carbon: $('carbonOut'),
    elecBar: $('elecBar'),    solidBar: $('solidBar'),
    liquidBar: $('liquidBar'), carbonBar: $('carbonBar'),
    total:   $('totalOut'),   totalCur: $('totalCur'),
    life:    $('lifeOut'),    lifeCur: $('lifeCur'),
    payback: $('paybackOut'),
    donut:   $('calcDonut'),  donutMain: $('donutMain'),
    netSub:  $('netBreakdown'),
    derived: $('advDerived'),
  };

  // i18n helper — read the current dictionary so dynamic strings translate too
  const lang = () => localStorage.getItem('bionova-lang') || document.documentElement.lang || 'en';
  const t = (key, fb) => (window.bionovaI18n?.T?.[lang()]?.[key]) ?? fb;
  const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : '{' + k + '}'));

  // ── Fixed plant constants (from the techno-economic model) ──
  const UNIT = {
    label:     'BN-108',
    tankM3:    108,
    priceUSD:  27000,
    freeboard: 0.18,
  };
  const SLURRY_TS        = 0.10;  // target total solids of the feed slurry
  const VS_DESTRUCTION   = 0.50;  // fraction of volatile solids consumed
  const SOLID_SELLABLE   = 0.65;  // sellable fraction of the separated solids
  const CH4_KWH_PER_M3   = 10;    // energy content of methane
  const CARBON_T_PER_TPD = 80;    // tCO₂e/yr per t/day of manure treated
  const WATER_USD_M3     = 0.40;  // dilution water
  const LABOUR_USD       = 2000;  // per unit, per year
  const ADMIN_USD        = 1000;  // per farm, per year
  const MAINT_RATE       = 0.025; // of capex, per year
  const INSURANCE_RATE   = 0.008; // of capex, per year
  const LIFESPAN         = 15;    // years used for lifetime-value projection

  // Collectable (barn-captured) manure per animal, kg/day
  const animalManure = { cow: 20, buffalo: 25, pig: 5, mixed: 16 };

  const sym   = { USD: 'USD', GEL: 'GEL', EUR: 'EUR' };
  // GEL rate is the model's FX assumption; monetary inputs convert on switch.
  const rates = { USD: 1, GEL: 2.63, EUR: 0.92 };

  // Money inputs are held in the *selected* currency; the model runs in USD.
  const state = {
    animal: 'cow', herd: 100, currency: 'GEL', scenario: 'conservative',
    tariff: 0.14,        // per kWh
    manure: 20,          // kg/animal/day
    ts: 25,              // manure total solids, %
    vs: 80,              // volatile solids, % of TS
    ch4Yield: 225,       // L CH₄ per kg VS
    ch4Share: 58,        // CH₄ share of raw biogas, %
    gensetEff: 38,       // electrical efficiency, %
    parasitic: 10,       // own consumption, %
    hrt: 25,             // hydraulic retention time, days
    solidPrice: 0.89,    // per kg
    liquidPrice: 0.04,   // per L
    carbonPrice: 26.3,   // per tCO₂e (≈ $10)
    opDays: 330,
  };

  // ── Animated (eased) display values ──────────────
  const A = { biogas:0, kwh:0, solidKg:0, liquidL:0, elec:0, solid:0, liquid:0,
              carbon:0, revenue:0, opex:0, net:0, capex:0, life:0, payYrs:0 };
  let target = { ...A };
  let raf = null;

  const money = (n) => Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

  function fmtPayback(yrs) {
    if (!isFinite(yrs) || yrs <= 0) return '—';
    if (yrs < 1) return '≈ ' + Math.max(1, Math.round(yrs * 12)) + ' ' + t('calc.unit.mo', 'mo');
    return yrs.toFixed(2) + ' ' + t('calc.unit.yrs', 'yrs');
  }

  /* Physical model — one unit's ceiling plus the per-tonne conversion factors.
     With the defaults this returns capacity 1.41696 t/day, 77.5862 m³ biogas,
     153.9 net kWh, 97.5 kg solids, 2.4025 m³ liquid and 1.5 m³ water per tonne. */
  function model() {
    const ts       = state.ts / 100;
    const vs       = state.vs / 100;
    const ch4Share = state.ch4Share / 100;
    const eff      = state.gensetEff / 100;
    const keep     = 1 - state.parasitic / 100;

    const workingM3    = UNIT.tankM3 * (1 - UNIT.freeboard);
    const slurryPerDay = workingM3 / Math.max(1, state.hrt);
    const tsLoad       = slurryPerDay * SLURRY_TS;
    const capTpd       = ts > 0 ? tsLoad / ts : 0;

    const vsPerT     = 1000 * ts * vs;                                        // kg VS per t manure
    const ch4PerT    = vsPerT * state.ch4Yield / 1000;                        // m³ CH₄ per t
    const biogasPerT = ch4Share > 0 ? ch4PerT / ch4Share : 0;                 // m³ biogas per t
    const kwhPerT    = ch4PerT * CH4_KWH_PER_M3 * eff * keep;                 // net kWh per t
    const solidPerT  = (1000 * ts - vsPerT * VS_DESTRUCTION) * SOLID_SELLABLE;// kg per t
    const slurryPerT = SLURRY_TS > 0 ? ts / SLURRY_TS : 0;                    // m³ per t
    const liquidPerT = Math.max(0, slurryPerT - solidPerT / 1000);            // m³ per t
    const waterPerT  = Math.max(0, slurryPerT - 1);                           // m³ per t

    return { workingM3, slurryPerDay, capTpd, biogasPerT, kwhPerT,
             solidPerT, liquidPerT, waterPerT };
  }

  function paint() {
    const upside = state.scenario === 'upside';

    if (out.biogas)  out.biogas.textContent  = A.biogas.toFixed(1);
    if (out.kwh)     out.kwh.textContent     = A.kwh.toFixed(1);
    if (out.solidKg) out.solidKg.textContent = A.solidKg.toFixed(1);
    if (out.liquidL) out.liquidL.textContent = money(A.liquidL);
    if (out.opex)    out.opex.textContent    = money(A.opex);
    if (out.elec)    out.elec.textContent    = money(A.elec);
    if (out.solid)   out.solid.textContent   = money(A.solid);
    if (out.liquid)  out.liquid.textContent  = money(A.liquid);
    if (out.carbon)  out.carbon.textContent  = money(A.carbon);
    if (out.total)   out.total.textContent   = money(A.net);
    if (out.life)    out.life.textContent    = money(A.life);
    if (out.payback) out.payback.textContent = fmtPayback(A.payYrs);

    if (out.netSub) {
      const c = sym[state.currency];
      out.netSub.textContent = fill(
        t('calc.net.sub', '{cur} {rev} revenue − {cur} {opex} running costs'),
        { cur: c, rev: money(A.revenue), opex: money(A.opex) }
      );
    }

    // Stream bars — scaled to the largest stream so the biggest fills the track
    const mx = Math.max(A.elec, A.solid, A.liquid, A.carbon, 1);
    if (out.elecBar)   out.elecBar.style.width   = (A.elec   / mx * 100) + '%';
    if (out.solidBar)  out.solidBar.style.width  = (A.solid  / mx * 100) + '%';
    if (out.liquidBar) out.liquidBar.style.width = (A.liquid / mx * 100) + '%';
    if (out.carbonBar) out.carbonBar.style.width = (A.carbon / mx * 100) + '%';

    // Donut splits only the streams the selected case actually counts
    const parts = upside
      ? [[A.elec, '--s-elec'], [A.solid, '--s-solid'], [A.liquid, '--s-liquid'], [A.carbon, '--s-carbon']]
      : [[A.elec, '--s-elec'], [A.solid, '--s-solid']];
    const tot = parts.reduce((s, p) => s + p[0], 0);
    if (out.donut) {
      let deg = 0;
      const stops = parts.map(([v, cssVar]) => {
        const from = deg;
        deg += tot > 0 ? (v / tot) * 360 : 0;
        return `var(${cssVar}) ${from}deg ${deg}deg`;
      });
      stops.push(`var(--s-elec) ${deg}deg 360deg`);   // guard against rounding gaps
      out.donut.style.background = `conic-gradient(${stops.join(',')})`;
    }
    if (out.donutMain) out.donutMain.textContent = Math.round(tot > 0 ? A.elec / tot * 100 : 0) + '%';
  }

  function tick() {
    let moving = false;
    for (const k in target) {
      const tv = target[k];
      if (!isFinite(tv)) { A[k] = tv; continue; }
      const d = tv - A[k];
      if (Math.abs(d) > Math.abs(tv) * 0.002 + 0.01) { A[k] += d * 0.2; moving = true; }
      else A[k] = tv;
    }
    paint();
    raf = moving ? requestAnimationFrame(tick) : null;
  }
  function startAnim() { if (raf == null) raf = requestAnimationFrame(tick); }

  function updateReco(units, processed, available, util) {
    if (out.reco) out.reco.textContent = units + ' × ' + UNIT.label;
    if (out.recoHint) {
      out.recoHint.textContent = fill(
        t('calc.reco.dyn', 'Digesting {proc} of {avail} t/day · {util}% utilisation'),
        { proc: processed.toFixed(2), avail: available.toFixed(2), util: Math.round(util * 100) }
      );
    }
    const card = out.reco && out.reco.closest('.substat');
    // Flag a badly under-fed unit so a 10-cow farm doesn't read as a good fit
    if (card) card.classList.toggle('reco-underused', util < 0.6);
  }

  function updateDerived(m) {
    if (!out.derived) return;
    const rows = [
      [t('calc.dv.work',   'Working volume'),      m.workingM3.toFixed(2) + ' m³'],
      [t('calc.dv.slurry', 'Slurry fed'),          m.slurryPerDay.toFixed(4) + ' m³/day'],
      [t('calc.dv.cap',    'Capacity per unit'),   m.capTpd.toFixed(5) + ' t manure/day'],
      [t('calc.dv.water',  'Dilution water'),      (m.capTpd * m.waterPerT).toFixed(5) + ' m³/day'],
      [t('calc.dv.gas',    'Biogas per t manure'), m.biogasPerT.toFixed(4) + ' m³'],
      [t('calc.dv.kwh',    'Net power per t'),     m.kwhPerT.toFixed(2) + ' kWh'],
      [t('calc.dv.solid',  'Solid fert. per t'),   m.solidPerT.toFixed(2) + ' kg'],
      [t('calc.dv.liquid', 'Liquid per t'),        m.liquidPerT.toFixed(4) + ' m³'],
    ];
    out.derived.innerHTML =
      '<span class="adv-derived-title">' + t('calc.dv.title', 'Derived from the values above') + '</span>' +
      rows.map(([k, v]) => `<span class="adv-derived-row"><b>${k}</b><i>${v}</i></span>`).join('');
  }

  function setCurrencyLabels() {
    const c = sym[state.currency];
    root.querySelectorAll('[data-cur]').forEach(e => { e.textContent = c; });
    [out.opexCur, out.totalCur, out.lifeCur].forEach(e => { if (e) e.textContent = c; });
  }

  function recalc() {
    const m    = model();
    const rate = rates[state.currency] || 1;
    const usd  = (v) => v / rate;                 // selected-currency input → USD

    // ── Sizing: whole units, and only what they can actually swallow ──
    const available = state.herd * state.manure / 1000;              // t/day
    const units     = m.capTpd > 0 ? Math.max(1, Math.ceil(available / m.capTpd)) : 1;
    const processed = m.capTpd > 0 ? Math.min(available, units * m.capTpd) : 0;
    const util      = m.capTpd > 0 ? processed / (units * m.capTpd) : 0;
    const capexUSD  = units * UNIT.priceUSD;

    // ── Daily outputs, all linear in processed manure ──
    const biogas   = processed * m.biogasPerT;    // m³/day
    const netKWh   = processed * m.kwhPerT;       // kWh/day
    const solidKg  = processed * m.solidPerT;     // kg/day
    const liquidM3 = processed * m.liquidPerT;    // m³/day
    const waterM3  = processed * m.waterPerT;     // m³/day

    // ── Annual revenue, USD ──
    const D = state.opDays;
    const elecUSD   = netKWh   * D * usd(state.tariff);
    const solidUSD  = solidKg  * D * usd(state.solidPrice);
    const liquidUSD = liquidM3 * 1000 * D * usd(state.liquidPrice);
    const carbonUSD = processed * CARBON_T_PER_TPD * usd(state.carbonPrice);

    const upside  = state.scenario === 'upside';
    const revUSD  = elecUSD + solidUSD + (upside ? liquidUSD + carbonUSD : 0);

    // ── Annual OPEX, USD (labour scales per unit; admin is per farm) ──
    const opexUSD = capexUSD * (MAINT_RATE + INSURANCE_RATE)
                  + waterM3 * D * WATER_USD_M3
                  + LABOUR_USD * units + ADMIN_USD;

    const netUSD  = revUSD - opexUSD;
    const payYrs  = netUSD > 0 ? capexUSD / netUSD : NaN;
    const lifeUSD = netUSD * LIFESPAN - capexUSD;

    updateReco(units, processed, available, util);
    updateDerived(m);
    root.querySelectorAll('.stream.is-upside').forEach(li => li.classList.toggle('is-off', !upside));

    target = {
      biogas, kwh: netKWh, solidKg, liquidL: liquidM3 * 1000,
      elec:   elecUSD   * rate,
      solid:  solidUSD  * rate,
      liquid: liquidUSD * rate,
      carbon: carbonUSD * rate,
      revenue: revUSD  * rate,
      opex:    opexUSD * rate,
      net:     netUSD  * rate,
      capex:   capexUSD * rate,
      life:    lifeUSD  * rate,
      payYrs,
    };
    startAnim();
  }

  // ── Input wiring ─────────────────────────────────
  animalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      animalBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      state.animal = btn.dataset.animal;
      state.manure = animalManure[state.animal];
      if ($('manure')) $('manure').value = state.manure;
      recalc();
    });
  });

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      state.scenario = btn.dataset.scenario;
      recalc();
    });
  });

  herdEl.addEventListener('input', () => {
    state.herd = parseInt(herdEl.value || '0', 10);
    herdOut.textContent = state.herd.toString();
    recalc();
  });
  tariffEl.addEventListener('input', () => {
    state.tariff = parseFloat(tariffEl.value || '0');
    recalc();
  });
  currencyEl.addEventListener('change', () => {
    const prev = rates[state.currency];
    const next = rates[currencyEl.value];
    // 5 dp on the per-kWh / per-litre fields: at 4 dp a GEL→USD switch rounds
    // 0.05323 to 0.0532 and quietly shaves ~0.06% off the revenue lines.
    const conv = (v, dp) => parseFloat(((v / prev) * next).toFixed(dp));
    state.tariff      = conv(state.tariff, 5);
    state.solidPrice  = conv(state.solidPrice, 4);
    state.liquidPrice = conv(state.liquidPrice, 5);
    state.carbonPrice = conv(state.carbonPrice, 2);
    state.currency    = currencyEl.value;
    tariffEl.value = state.tariff;
    if ($('solidPrice'))  $('solidPrice').value  = state.solidPrice;
    if ($('liquidPrice')) $('liquidPrice').value = state.liquidPrice;
    if ($('carbonPrice')) $('carbonPrice').value = state.carbonPrice;
    setCurrencyLabels();
    recalc();
  });
  advForm?.addEventListener('input', () => {
    const num = (id, fb) => { const el = $(id); const v = parseFloat(el && el.value); return isFinite(v) ? v : fb; };
    state.manure      = num('manure', state.manure);
    state.ts          = num('ts', state.ts);
    state.vs          = num('vs', state.vs);
    state.ch4Yield    = num('ch4Yield', state.ch4Yield);
    state.ch4Share    = num('ch4Share', state.ch4Share);
    state.gensetEff   = num('gensetEff', state.gensetEff);
    state.parasitic   = num('parasitic', state.parasitic);
    state.hrt         = num('hrt', state.hrt);
    state.solidPrice  = num('solidPrice', state.solidPrice);
    state.liquidPrice = num('liquidPrice', state.liquidPrice);
    state.carbonPrice = num('carbonPrice', state.carbonPrice);
    state.opDays      = num('opDays', state.opDays);
    recalc();
  });
  toggleAdv?.addEventListener('click', (e) => {
    e.preventDefault();
    advBox.open = !advBox.open;
    advBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Copy-my-estimate
  const copyBtn = $('calcCopyBtn');
  const copyLbl = $('calcCopyLbl');
  copyBtn?.addEventListener('click', async () => {
    const c = sym[state.currency];
    const upside = state.scenario === 'upside';
    const units  = out.reco ? out.reco.textContent : UNIT.label;
    const lines = [
      `BioNova estimate, ${state.herd} ${state.animal}`,
      `Sizing: ${units}`,
      `⚡ Electricity:      ${money(target.elec)} ${c}/yr`,
      `🌱 Solid fertilizer: ${money(target.solid)} ${c}/yr`,
    ];
    if (upside) {
      lines.push(`💧 Liquid digestate: ${money(target.liquid)} ${c}/yr  (upside)`);
      lines.push(`🌍 Carbon credits:   ${money(target.carbon)} ${c}/yr  (upside)`);
    }
    lines.push(
      `─ Revenue:       ${money(target.revenue)} ${c}/yr`,
      `─ Running costs: ${money(target.opex)} ${c}/yr`,
      `─ Net income:    ${money(target.net)} ${c}/yr`,
      `Upfront (production price): ${money(target.capex)} ${c}`,
      `Pays for itself in: ${fmtPayback(target.payYrs)}`,
      `Case: ${upside ? 'conservative + upside' : 'conservative'}`
    );
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch (_) { /* clipboard blocked — still flash */ }
    if (copyLbl) {
      const prev = copyLbl.textContent;
      copyLbl.textContent = t('calc.copied', 'Copied!');
      copyBtn.classList.add('is-copied');
      setTimeout(() => { copyLbl.textContent = prev; copyBtn.classList.remove('is-copied'); }, 1600);
    }
  });

  // Re-render dynamic (translated) strings when language changes
  document.addEventListener('langchange', () => { setCurrencyLabels(); recalc(); });

  // ── Seed advanced fields + first paint ───────────
  const seed = {
    manure: state.manure, ts: state.ts, vs: state.vs,
    ch4Yield: state.ch4Yield, ch4Share: state.ch4Share,
    gensetEff: state.gensetEff, parasitic: state.parasitic, hrt: state.hrt,
    solidPrice: state.solidPrice, liquidPrice: state.liquidPrice,
    carbonPrice: state.carbonPrice, opDays: state.opDays,
  };
  for (const id in seed) { if ($(id)) $(id).value = seed[id]; }

  herdOut.textContent = herdEl.value;
  setCurrencyLabels();
  recalc();
})();


/* ══════════════════════════════════════════════════
   HERO PARTICLE SYSTEM
   Cinematic fireflies, spores, motes + ring pulses
   Scoped to #heroParticles canvas inside #hero
   Auto-pauses via IntersectionObserver when off-screen
══════════════════════════════════════════════════ */
(function heroParticles() {
  const canvas = document.getElementById('heroParticles');
  const heroEl = document.getElementById('hero');
  if (!canvas || !heroEl) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, rings, frame = 0, lastRing = 0, active = true;

  // ── Weighted color palette ──────────────────────
  const PAL = [
    { r:62,  g:207, b:106, w:38 }, // spring green  — most common
    { r:100, g:220, b:145, w:22 }, // teal green
    { r:168, g:230, b:191, w:18 }, // misty sage
    { r:45,  g:138, b:82,  w:12 }, // deep sage
    { r:201, g:168, b:76,  w:6  }, // warm gold      — rare
    { r:240, g:245, b:255, w:4  }, // star white     — rare
  ];
  const PAL_W = PAL.reduce((s, c) => s + c.w, 0);
  const col = () => {
    let r = Math.random() * PAL_W;
    for (const c of PAL) { r -= c.w; if (r <= 0) return c; }
    return PAL[0];
  };
  const rnd = (a, b) => a + Math.random() * (b - a);

  // ── Canvas matches hero element size ───────────
  const resize = () => {
    W = canvas.width  = heroEl.offsetWidth  || window.innerWidth;
    H = canvas.height = heroEl.offsetHeight || window.innerHeight;
  };

  // ── Particle factories ──────────────────────────

  // Fireflies: large glowing orbs, drift upward slowly
  const makeFF = () => {
    const c = col(), big = Math.random() < 0.06;
    const r = big ? rnd(3, 5.5) : rnd(0.9, 2.8);
    return {
      k:'ff', x:rnd(0,W), y:rnd(H*.2,H*1.05),
      r, vx:rnd(-.16,.16), vy:rnd(-.28,-.75),
      a:0, aT:rnd(.22, big?.5:.78), aS:rnd(.003,.010), fading:false,
      c, life:0, max:rnd(220,500), glow:big?rnd(16,34):rnd(5,16),
      sP:rnd(0,Math.PI*2), sF:rnd(.016,.042), sA:rnd(.004,.015),
    };
  };

  // Spores: fast-rising tiny sparks
  const makeSP = () => {
    const c = col();
    return {
      k:'sp', x:rnd(0,W), y:rnd(H*.55,H*1.08),
      r:rnd(.5,1.7), vx:rnd(-.07,.07), vy:rnd(-.55,-1.3),
      a:0, aT:rnd(.15,.52), aS:rnd(.005,.016), fading:false,
      c, life:0, max:rnd(110,250), glow:rnd(3,10),
      sP:rnd(0,Math.PI*2), sF:rnd(.04,.09), sA:rnd(.003,.012),
    };
  };

  // Motes: slow ambient drift
  const makeMO = () => ({
    k:'mo', x:rnd(-20,W+20), y:rnd(H*.08,H*.82),
    r:rnd(.3,1.1), vx:rnd(-.22,.22), vy:rnd(-.1,.1),
    a:0, aT:rnd(.06,.24), aS:rnd(.002,.006), fading:false,
    c:{r:62,g:207,b:106}, life:0, max:rnd(450,950), glow:rnd(8,22),
    sP:rnd(0,Math.PI*2), sF:rnd(.005,.014), sA:rnd(.01,.03),
  });

  // Ring pulses
  const makeRing = () => ({
    x:rnd(W*.15,W*.85), y:rnd(H*.35,H*.8),
    r:rnd(18,55), maxR:rnd(110,280),
    a:rnd(.04,.11), spd:rnd(.38,1.1),
    c: Math.random() < .18 ? {r:201,g:168,b:76} : {r:62,g:207,b:106},
  });

  // ── Spawn full initial pool ─────────────────────
  const spawnAll = (n = 90) => {
    particles = [];
    for (let i=0; i<n*.50|0; i++) { const p=makeFF(); p.life=Math.random()*p.max*.8; particles.push(p); }
    for (let i=0; i<n*.30|0; i++) { const p=makeSP(); p.life=Math.random()*p.max*.5; particles.push(p); }
    for (let i=0; i<n*.20|0; i++) { const p=makeMO(); p.life=Math.random()*p.max*.6; particles.push(p); }
    rings = [];
    for (let i=0; i<3; i++) { const rg=makeRing(); rg.r+=rg.maxR*Math.random()*.4; rings.push(rg); }
  };

  const reborn = k => {
    const p = k==='ff' ? makeFF() : k==='sp' ? makeSP() : makeMO();
    p.y = rnd(H*.85, H*1.05); // respawn from bottom edge
    return p;
  };

  // ── Draw particle (3-layer radial bloom) ────────
  const drawP = p => {
    if (p.a < .005) return;
    const {r, g, b} = p.c;
    ctx.save();
    ctx.globalAlpha = p.a;

    // Outer bloom
    const bloom = ctx.createRadialGradient(p.x,p.y,0, p.x,p.y, p.r+p.glow*1.9);
    bloom.addColorStop(0,    `rgba(${r},${g},${b},0.55)`);
    bloom.addColorStop(0.35, `rgba(${r},${g},${b},0.16)`);
    bloom.addColorStop(0.75, `rgba(${r},${g},${b},0.04)`);
    bloom.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    ctx.beginPath(); ctx.arc(p.x,p.y, p.r+p.glow*1.9, 0, Math.PI*2);
    ctx.fillStyle = bloom; ctx.fill();

    // Inner halo
    const halo = ctx.createRadialGradient(p.x,p.y,0, p.x,p.y, p.r+p.glow);
    halo.addColorStop(0,   `rgba(${r},${g},${b},0.90)`);
    halo.addColorStop(0.5, `rgba(${r},${g},${b},0.32)`);
    halo.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.beginPath(); ctx.arc(p.x,p.y, p.r+p.glow, 0, Math.PI*2);
    ctx.fillStyle = halo; ctx.fill();

    // Solid core
    ctx.beginPath(); ctx.arc(p.x,p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle  = `rgba(${r},${g},${b},1)`;
    ctx.shadowBlur = p.r * 4;
    ctx.shadowColor= `rgba(${r},${g},${b},0.85)`;
    ctx.fill();
    ctx.restore();
  };

  // ── Draw expanding ring ─────────────────────────
  const drawRing = rg => {
    const prog = rg.r / rg.maxR;
    const a    = rg.a * (1-prog) * (1-prog);
    if (a < .003) return;
    const {r,g,b} = rg.c;
    ctx.save();
    ctx.globalAlpha  = a;
    ctx.beginPath(); ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI*2);
    ctx.strokeStyle  = `rgba(${r},${g},${b},1)`;
    ctx.lineWidth    = Math.max(0.3, 1.6 * (1-prog));
    ctx.shadowBlur   = 14;
    ctx.shadowColor  = `rgba(${r},${g},${b},0.6)`;
    ctx.stroke();
    ctx.restore();
  };

  // ── Main animation loop ─────────────────────────
  const loop = () => {
    requestAnimationFrame(loop);
    if (!active) return;

    ctx.clearRect(0, 0, W, H);
    frame++;

    // Update rings
    rings.forEach((rg, i) => {
      rg.r += rg.spd;
      if (rg.r > rg.maxR) { rings[i] = makeRing(); return; }
      drawRing(rg);
    });
    // Occasionally spawn a new ring
    if (frame - lastRing > (180 + Math.random() * 200 | 0)) {
      if (rings.length < 8) rings.push(makeRing());
      lastRing = frame;
    }

    // Update particles
    particles.forEach((p, i) => {
      // Alpha lifecycle
      p.a = p.fading
        ? Math.max(p.a - p.aS * 0.65, 0)
        : Math.min(p.a + p.aS, p.aT);

      p.life++;
      if (p.life > p.max * 0.74) p.fading = true;
      if (p.life > p.max || (p.fading && p.a <= 0.005)) {
        particles[i] = reborn(p.k);
        return;
      }

      // Organic movement with sinusoidal sway
      p.vx += Math.sin(p.life * p.sF + p.sP) * p.sA;
      p.vx *= 0.994; // gentle drag
      p.x  += p.vx;
      p.y  += p.vy;

      // Motes: extra gentle bob
      if (p.k === 'mo') {
        p.vy += Math.cos(p.life * 0.018) * 0.0018;
        p.vy *= 0.998;
      }

      drawP(p);
    });
  };

  // ── IntersectionObserver: pause when off-screen ─
  new IntersectionObserver(
    entries => { active = entries[0].isIntersecting; },
    { threshold: 0.05 }
  ).observe(heroEl);

  // ── Mouse: scatter fireflies near cursor ────────
  heroEl.addEventListener('mousemove', e => {
    if (particles.length >= 130 || Math.random() > 0.045) return;
    const rect = heroEl.getBoundingClientRect();
    const p = makeFF();
    p.x  = e.clientX - rect.left + rnd(-25, 25);
    p.y  = e.clientY - rect.top  + rnd(-25, 25);
    p.vy = rnd(-0.5, -1.1);
    p.aT = rnd(0.35, 0.70);
    particles.push(p);
  });

  // ── Touch: spore trail on drag ───────────────────
  heroEl.addEventListener('touchmove', e => {
    const rect = heroEl.getBoundingClientRect();
    const t = e.touches[0];
    for (let i = 0; i < 4; i++) {
      if (particles.length >= 145) break;
      const s = makeSP();
      s.x  = t.clientX - rect.left + rnd(-18, 18);
      s.y  = t.clientY - rect.top  + rnd(-10, 10);
      s.vy = rnd(-0.7, -1.6);
      s.aT = rnd(0.4, 0.8);
      particles.push(s);
    }
  }, { passive: true });

  // ── Init ────────────────────────────────────────
  resize();
  spawnAll(90);
  loop();

  window.addEventListener('resize', () => { resize(); spawnAll(90); });

})(); // end heroParticles


/* ══════════════════════════════════════════════════
   BACK-TO-TOP BUTTON
══════════════════════════════════════════════════ */
(() => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 420);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ══════════════════════════════════════════════════
   SCROLL SPY — highlight active nav link
══════════════════════════════════════════════════ */
(() => {
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('nav-active'));
        const link = navLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
        if (link) link.classList.add('nav-active');
      }
    });
  }, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));
})();


/* ══════════════════════════════════════════════════
   TYPING ANIMATION — hero slogan cycles 4 phrases
══════════════════════════════════════════════════ */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero-sdgs .slogan');
  if (!el) return;

  const PHRASE_SETS = window.BIONOVA_PHRASES || {
    en: [
      'Farm-ready biodigesters with real-time control.',
      'Turn waste into clean energy and revenue.',
      'Up to 3× cheaper than alternatives.',
      'IoT monitoring from anywhere, anytime.',
    ],
    ka: [
      'ფერმისთვის მზა ბიოდიჟესტერები, რეალურ დროში კონტროლით.',
      'ნარჩენებიდან სუფთა ენერგია და შემოსავალი.',
      'კონკურენტებზე 3-ჯერ უფრო ხელმისაწვდომი.',
      'IoT მონიტორინგი ნებისმიერი ადგილიდან.',
    ],
  };

  const TYPE_SPEED   = 48;
  const DEL_SPEED    = 24;
  const PAUSE_AFTER  = 2400;
  const PAUSE_BEFORE = 360;

  let currentLang = localStorage.getItem('bionova-lang') || 'en';
  let phrases  = PHRASE_SETS[currentLang] || PHRASE_SETS.en;
  let phraseIdx = 0;
  let charIdx   = phrases[0].length;
  let deleting  = false;
  let gen       = 0; // incremented on every reset; stale timers self-discard

  el.textContent = phrases[0];

  function schedule(g) {
    setTimeout(() => tick(g), deleting ? DEL_SPEED : TYPE_SPEED);
  }

  function pause(g) {
    setTimeout(() => {
      if (g !== gen) return;
      deleting = true;
      schedule(g);
    }, PAUSE_AFTER);
  }

  function tick(g) {
    if (g !== gen) return; // stale — a reset happened, discard
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) { pause(g); return; }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        deleting  = false;
        setTimeout(() => { if (g === gen) schedule(g); }, PAUSE_BEFORE);
        return;
      }
    }
    schedule(g);
  }

  // On language switch: bump gen so every queued timer self-discards, then restart cleanly
  document.addEventListener('langchange', e => {
    currentLang = e.detail.lang;
    phrases   = PHRASE_SETS[currentLang] || PHRASE_SETS.en;
    phraseIdx = 0;
    charIdx   = 0;
    deleting  = false;
    el.textContent = '';
    gen++;
    schedule(gen);
  });

  // Kick off first cycle
  pause(gen);
})();


/* ══════════════════════════════════════════════════
   CARBON CREDITS — "Buy now" scrolls to contact
══════════════════════════════════════════════════ */
(() => {
  const contact = document.getElementById('contact');
  document.querySelectorAll('.carbon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      contact?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


/* ══════════════════════════════════════════════════
   SCROLL REVEAL — fade-up cards and sections
══════════════════════════════════════════════════ */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    '#about .about-text',
    '#about .about-image',
    '#why .value-card',
    '#app .app-text',
    '#app .app-image',
    '#setup .step',
    '#how-it-works .hiw-step',
    '#pricing .pricing-column',
    '#carbon-credits .carbon-card',
    '#founders .founder',
    '#contact .contact-item',
  ];

  // Group elements by parent so siblings stagger
  const byParent = new Map();
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      const p = el.parentElement;
      if (!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(el);
    });
  });

  byParent.forEach(group => {
    group.forEach((el, idx) => {
      el.classList.add('reveal');
      if (idx > 0) el.style.transitionDelay = `${idx * 0.11}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* Digester 3D viewer is handled by digester-viewer.js (ES module) */

/* ══════════════════════════════════════════════════
   SDG TOOLTIP — screen-space so orbit rotation can't affect it
══════════════════════════════════════════════════ */
(() => {
  const tip = document.createElement('div');
  tip.className = 'sdg-screen-tip';
  document.body.appendChild(tip);

  function place(node) {
    const r = node.getBoundingClientRect();
    tip.style.left = (r.left + r.width  / 2) + 'px';
    tip.style.top  = (r.bottom + 10) + 'px';
  }

  document.querySelectorAll('.sdg-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
      const label = node.dataset.sdg;
      if (!label) return;
      tip.textContent = label;
      place(node);
      tip.classList.add('visible');
    });
    node.addEventListener('mousemove', () => place(node));
    node.addEventListener('mouseleave', () => tip.classList.remove('visible'));
  });
})();