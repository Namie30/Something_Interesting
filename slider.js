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
  function animateValue(el, to, duration = 1200) {
    if (!el) return;
    const diff = to;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      el.textContent = (diff * p).toFixed(0);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const appSection = document.getElementById('app');
  if (appSection) {
    let kpiDone = false;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !kpiDone) {
        kpiDone = true;
        animateValue(document.getElementById('kpi-gas'),  120);
        animateValue(document.getElementById('kpi-elec'), 240);
        animateValue(document.getElementById('kpi-fert'), 500);
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

  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      if (href && href !== '#') return; // let external links through
      e.preventDefault();
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
   RETURNS CALCULATOR  (revenue-sharing model)
   ─────────────────────────────────────────────────
   Three revenue streams per unit:
     ⚡ Electricity   — farmer keeps 100% of grid savings
     🌱 Bio-fertilizer — BioNova collects & sells; farmer earns a share
     🌍 Carbon credits — future bonus stream
   Digester tiers (starts at 30-ton):
     30-ton  → up to ~250 animals  — available now   ($9,000 production price)
     50-ton  → up to ~450 animals  — in development  (~$15,000 est.)
     100-ton → 450+ animals        — future roadmap  (custom quote)
══════════════════════════════════════════════════ */
(() => {
  const $ = (id) => document.getElementById(id);
  const animalBtns = document.querySelectorAll('.segmented [data-animal]');
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
    biogas:  $('biogasOut'), kwh: $('kwhOut'), save: $('saveOut'), saveCur: $('saveCur'),
    reco:    $('recoModel'), recoHint: $('recoHint'),
    capex:   $('capexOut'),  capexCur: $('capexCur'),
    elec:    $('elecOut'),   fert: $('fertOut'),   carbon: $('carbonOut'),
    elecBar: $('elecBar'),   fertBar: $('fertBar'), carbonBar: $('carbonBar'),
    total:   $('totalOut'),  totalCur: $('totalCur'),
    life:    $('lifeOut'),   lifeCur: $('lifeCur'),
    payback: $('paybackOut'),
    donut:   $('calcDonut'), donutMain: $('donutMain'),
  };

  // i18n helper — read the current dictionary so dynamic strings translate too
  const lang = () => localStorage.getItem('bionova-lang') || document.documentElement.lang || 'en';
  const t = (key, fb) => (window.bionovaI18n?.T?.[lang()]?.[key]) ?? fb;

  // Defaults use *collectable* manure (barn-captured, not total excreted) and
  // conservative mid-range biogas yields for raw livestock slurry.
  const animalDefaults = {
    cow:     { manure: 20, yield: 0.030 },
    buffalo: { manure: 25, yield: 0.032 },
    pig:     { manure: 5,  yield: 0.045 },
    mixed:   { manure: 16, yield: 0.030 },
  };

  const digesters = [
    { label: '30-ton',   price: 9000,  herdMax: 250,      comingSoon: false, future: false, hintKey: 'calc.d30.hint',  hint: 'Handles up to ~250 animals. Available now.' },
    { label: '50-ton',   price: 15000, herdMax: 450,      comingSoon: true,  future: false, hintKey: 'calc.d50.hint',  hint: 'In development — contact us to reserve.' },
    { label: '100-ton+', price: null,  herdMax: Infinity, comingSoon: true,  future: true,  hintKey: 'calc.d100.hint', hint: 'Large-scale unit on our roadmap. Custom quote.' },
  ];

  const sym   = { USD: 'USD', GEL: 'GEL', EUR: 'EUR' };
  // Approximate rates relative to USD — convert monetary inputs on currency switch
  const rates = { USD: 1, GEL: 2.75, EUR: 0.92 };
  const LIFESPAN = 15;            // years used for lifetime-value projection
  const CO2_PER_KWH = 0.5;        // kg CO₂ avoided per kWh (grid offset + manure methane capture)

  // Defaults reflect a real Georgian farm: GEL currency, ~0.28 GEL/kWh retail
  // tariff (GNERC top-tier / small-business rate, 2026), conservative outputs.
  const state = {
    animal: 'cow', herd: 100, currency: 'GEL', tariff: 0.28,
    manure: 20, yield: 0.03, kwhPerM3: 2.0,
    fertYield: 0.04,   // kg sellable concentrated fertilizer per kg manure
    fertPrice: 0.75,   // per kg, in selected currency (GEL by default; 0.5–1 GEL/kg target)
    fertShare: 30,     // % of fertilizer revenue the farmer keeps
    carbonPrice: 33,   // per tonne CO₂, in selected currency (~$12)
  };

  let hasPrice = true, comingSoon = false, future = false;

  // ── Animated (eased) display values ──────────────
  const A = { biogas:0, kwh:0, save:0, elec:0, fert:0, carbon:0, total:0, capex:0, life:0, payYrs:0 };
  let target = { ...A };
  let raf = null;

  const money = (n) => Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

  function fmtPayback(yrs) {
    if (!hasPrice || !isFinite(yrs) || yrs <= 0) return '–';
    if (yrs < 1) return '≈ ' + Math.max(1, Math.round(yrs * 12)) + ' ' + t('calc.unit.mo', 'mo');
    return (comingSoon ? '~' : '') + yrs.toFixed(1) + ' ' + t('calc.unit.yrs', 'yrs');
  }

  function paint() {
    if (out.biogas) out.biogas.textContent = A.biogas.toFixed(1);
    if (out.kwh)    out.kwh.textContent    = Math.round(A.kwh).toString();
    if (out.save)   out.save.textContent   = A.save.toFixed(2);
    if (out.elec)   out.elec.textContent   = money(A.elec);
    if (out.fert)   out.fert.textContent   = money(A.fert);
    if (out.carbon) out.carbon.textContent = money(A.carbon);
    if (out.total)  out.total.textContent  = money(A.total);
    if (out.life)   out.life.textContent   = hasPrice ? money(A.life) : '–';
    if (out.capex)  out.capex.textContent  = hasPrice ? (comingSoon ? '~' : '') + money(A.capex) : 'TBD';
    if (out.payback) out.payback.textContent = fmtPayback(A.payYrs);

    // Stream bars — scaled to the largest stream so the biggest fills the track
    const mx = Math.max(A.elec, A.fert, A.carbon, 1);
    if (out.elecBar)   out.elecBar.style.width   = (A.elec   / mx * 100) + '%';
    if (out.fertBar)   out.fertBar.style.width   = (A.fert   / mx * 100) + '%';
    if (out.carbonBar) out.carbonBar.style.width = (A.carbon / mx * 100) + '%';

    // Donut split (energy / fertilizer / carbon)
    const tot = A.elec + A.fert + A.carbon;
    const eP = tot > 0 ? A.elec / tot * 100 : 0;
    const fP = tot > 0 ? A.fert / tot * 100 : 0;
    const eDeg = eP * 3.6, fDeg = fP * 3.6;
    if (out.donut) {
      out.donut.style.background =
        `conic-gradient(var(--s-elec) 0 ${eDeg}deg,` +
        ` var(--s-fert) ${eDeg}deg ${eDeg + fDeg}deg,` +
        ` var(--s-carbon) ${eDeg + fDeg}deg 360deg)`;
    }
    if (out.donutMain) out.donutMain.textContent = Math.round(eP) + '%';
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

  function recommendDigester(herd) {
    for (const d of digesters) if (herd <= d.herdMax) return d;
    return digesters[digesters.length - 1];
  }

  function updateReco(d) {
    if (!out.reco) return;
    out.reco.textContent = d.label;
    const card = out.reco.closest('.substat');
    if (card) card.classList.toggle('reco-coming-soon', d.comingSoon);
    const oldTag = card && card.querySelector('.reco-coming-tag');
    if (oldTag) oldTag.remove();
    if (d.comingSoon) {
      const tag = document.createElement('span');
      tag.className = 'reco-coming-tag';
      tag.textContent = d.future ? t('calc.future', '🔮 Future') : t('calc.indev', '🔬 In dev');
      out.reco.insertAdjacentElement('afterend', tag);
    }
    if (out.recoHint) out.recoHint.textContent = t(d.hintKey, d.hint);
  }

  function setCurrencyLabels() {
    const c = sym[state.currency];
    root.querySelectorAll('[data-cur]').forEach(e => { e.textContent = c; });
    [out.saveCur, out.capexCur, out.totalCur, out.lifeCur].forEach(e => { if (e) e.textContent = c; });
  }

  function recalc() {
    const manureIn = state.herd * state.manure;          // kg/day
    const biogas   = manureIn * state.yield;             // m³/day
    const kwh      = biogas * state.kwhPerM3;             // kWh/day
    const saveDay  = kwh * state.tariff;                 // currency/day

    const elecYr   = saveDay * 365;
    const fertYr   = manureIn * state.fertYield * state.fertPrice * 365 * (state.fertShare / 100);
    const co2tYr   = kwh * 365 * CO2_PER_KWH / 1000;     // tonnes CO₂/yr
    const carbonYr = co2tYr * state.carbonPrice;
    const totalYr  = elecYr + fertYr + carbonYr;

    const d   = recommendDigester(state.herd);
    hasPrice  = d.price !== null;
    comingSoon = d.comingSoon;
    future    = d.future;

    const upfront = hasPrice ? d.price * rates[state.currency] : 0;
    const payYrs  = (hasPrice && totalYr > 0) ? upfront / totalYr : NaN;
    const life    = hasPrice ? totalYr * LIFESPAN - upfront : 0;

    updateReco(d);

    target = {
      biogas, kwh, save: saveDay,
      elec: elecYr, fert: fertYr, carbon: carbonYr, total: totalYr,
      capex: upfront, life, payYrs,
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
      state.manure = animalDefaults[state.animal].manure;
      state.yield  = animalDefaults[state.animal].yield;
      if ($('manure')) $('manure').value = state.manure;
      if ($('yield'))  $('yield').value  = state.yield;
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
    const conv = (v, dp) => parseFloat(((v / prev) * next).toFixed(dp));
    state.tariff      = conv(state.tariff, 4);
    state.fertPrice   = conv(state.fertPrice, 4);
    state.carbonPrice = conv(state.carbonPrice, 2);
    state.currency    = currencyEl.value;
    tariffEl.value = state.tariff;
    if ($('fertPrice'))   $('fertPrice').value   = state.fertPrice;
    if ($('carbonPrice')) $('carbonPrice').value = state.carbonPrice;
    setCurrencyLabels();
    recalc();
  });
  advForm?.addEventListener('input', () => {
    const num = (id, fb) => { const el = $(id); const v = parseFloat(el && el.value); return isFinite(v) ? v : fb; };
    state.manure      = num('manure', state.manure);
    state.yield       = num('yield', state.yield);
    state.kwhPerM3    = num('kwhPerM3', state.kwhPerM3);
    state.fertYield   = num('fertYield', state.fertYield);
    state.fertPrice   = num('fertPrice', state.fertPrice);
    state.fertShare   = num('fertShare', state.fertShare);
    state.carbonPrice = num('carbonPrice', state.carbonPrice);
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
    const d = recommendDigester(state.herd);
    const txt =
      `BioNova estimate — ${state.herd} ${state.animal}\n` +
      `⚡ Electricity (you keep 100%): ${money(target.elec)} ${c}/yr\n` +
      `🌱 Bio-fertilizer (your share): ${money(target.fert)} ${c}/yr\n` +
      `🌍 Carbon credits (future):     ${money(target.carbon)} ${c}/yr\n` +
      `─ Total yearly income: ${money(target.total)} ${c}/yr\n` +
      `Recommended unit: ${d.label}\n` +
      `Upfront (production price): ${hasPrice ? money(target.capex) + ' ' + c : 'TBD'}\n` +
      `Pays for itself in: ${fmtPayback(target.payYrs)}`;
    try { await navigator.clipboard.writeText(txt); } catch (_) { /* clipboard blocked — still flash */ }
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
  const seed = { manure: state.manure, yield: state.yield, kwhPerM3: state.kwhPerM3,
                 fertYield: state.fertYield, fertPrice: state.fertPrice,
                 fertShare: state.fertShare, carbonPrice: state.carbonPrice };
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
      'ფერმისთვის მზა ბიოდიჟესტერები — რეალურ დროში კონტროლით.',
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