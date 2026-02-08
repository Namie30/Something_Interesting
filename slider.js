// slider.js
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Team/Advisors toggle (accessible + animated) ===== */
  const teamTitle = document.getElementById('teamTitle');
  const tabFounders = document.getElementById('tab-founders');
  const tabTeam = document.getElementById('tab-team');
  const tabAdvisors = document.getElementById('tab-advisors');
  const panelFounders = document.getElementById('panel-founders');
  const panelTeam = document.getElementById('panel-team');
  const panelAdvisors = document.getElementById('panel-advisors');
 
  function activateTab(target) {
    const isFounders = target === 'founders';
    const isTeam = target === 'team';
    const isAdvisors = target === 'advisors';
 
    tabFounders?.classList.toggle('is-active', isFounders);
    tabTeam?.classList.toggle('is-active', isTeam);
    tabAdvisors?.classList.toggle('is-active', isAdvisors);
 
    tabFounders?.setAttribute('aria-selected', String(isFounders));
    tabTeam?.setAttribute('aria-selected', String(isTeam));
    tabAdvisors?.setAttribute('aria-selected', String(isAdvisors));
 
    // Hide all panels first
    panelFounders?.setAttribute('hidden', '');
    panelFounders?.classList.remove('show');
    panelTeam?.setAttribute('hidden', '');
    panelTeam?.classList.remove('show');
    panelAdvisors?.setAttribute('hidden', '');
    panelAdvisors?.classList.remove('show');
    
    // Show the selected panel
    if (isFounders) {
      panelFounders?.removeAttribute('hidden');
      requestAnimationFrame(() => panelFounders?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = 'Founders';
    } else if (isTeam) {
      panelTeam?.removeAttribute('hidden');
      requestAnimationFrame(() => panelTeam?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = 'Core Team';
    } else if (isAdvisors) {
      panelAdvisors?.removeAttribute('hidden');
      requestAnimationFrame(() => panelAdvisors?.classList.add('show'));
      if (teamTitle) teamTitle.textContent = 'Advisors';
    }
  }
 
  tabFounders?.addEventListener('click', () => activateTab('founders'));
  tabTeam?.addEventListener('click', () => activateTab('team'));
  tabAdvisors?.addEventListener('click', () => activateTab('advisors'));
 
  [tabFounders, tabTeam, tabAdvisors].forEach((btn, idx, arr) => {
    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const nextIdx = (idx + 1) % arr.length;
        arr[nextIdx]?.focus();
        arr[nextIdx]?.click();
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (idx - 1 + arr.length) % arr.length;
        arr[prevIdx]?.focus();
        arr[prevIdx]?.click();
      }
    });
  });
 
  /* ============= App KPIs (demo counters) ============= */
  function animateValue(el, to, duration = 1200) {
    if (!el) return;
    const start = 0;
    const diff = to - start;
    let startTs = null;
 
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      el.textContent = (start + diff * p).toFixed(0);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
 
  animateValue(document.getElementById('kpi-gas'), 120);   // m³/day
  animateValue(document.getElementById('kpi-elec'), 240);  // kWh/day
  animateValue(document.getElementById('kpi-fert'), 500);  // liters/day
 
  /* ============= See more / show less (Achievements + Blog) ============= */
  function setupSeeMore({ gridId, itemSelector, buttonId, initialCount, moreText, lessText }) {
    const grid = document.getElementById(gridId);
    const btn = document.getElementById(buttonId);
    if (!grid || !btn) return;
 
    const items = Array.from(grid.querySelectorAll(itemSelector));
    if (items.length <= initialCount) {
      btn.hidden = true;
      return;
    }
 
    let expanded = false;
 
    const apply = () => {
      items.forEach((item, idx) => {
        const shouldShow = expanded || idx < initialCount;
        item.hidden = !shouldShow;
 
        if (shouldShow && expanded && idx >= initialCount) {
          item.classList.add('reveal-fade');
          window.setTimeout(() => item.classList.remove('reveal-fade'), 350);
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
 
  // Achievements: show 8 first, then reveal the rest
  setupSeeMore({
    gridId: 'achievementsGrid',
    itemSelector: '.ach-card',
    buttonId: 'achSeeMore',
    initialCount: 8,
    moreText: 'See more awards',
    lessText: 'Show less'
  });
 
  // Blog: show 3 first by default
  setupSeeMore({
    gridId: 'blogGrid',
    itemSelector: '.blog-card',
    buttonId: 'blogSeeMore',
    initialCount: 3,
    moreText: 'See more articles',
    lessText: 'Show less'
  });
});
 
/* =========================
   MOBILE BEHAVIOR PACK
========================= */
 
// 1) Close mobile nav after clicking a link
(() => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      if (navToggle && navToggle.checked) navToggle.checked = false;
    });
  });
})();
 
// 2) Fix mobile 100vh (address bar) for hero height
(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
})();
 
/* ===== Simple-first Calculator ===== */
(() => {
  // DOM
  const animalBtns = document.querySelectorAll('.segmented [data-animal]');
  const modelBtns  = document.querySelectorAll('.segmented [data-model]');
  const herdEl     = document.getElementById('herd');
  const herdOut    = document.getElementById('herdOut');
  const tariffEl   = document.getElementById('tariff');
  const currencyEl = document.getElementById('currency');
  const advBox     = document.getElementById('advancedBox');
  const advForm    = document.getElementById('advForm');
  const toggleAdv  = document.getElementById('toggleAdvancedLink');
 
  const biogasOut  = document.getElementById('biogasOut');
  const kwhOut     = document.getElementById('kwhOut');
  const saveOut    = document.getElementById('saveOut');
  const saveCur    = document.getElementById('saveCur');
  const recoModel  = document.getElementById('recoModel');
  const recoHint   = document.getElementById('recoHint');
  const capexOut   = document.getElementById('capexOut');
  const capexCur   = document.getElementById('capexCur');
  const paybackOut = document.getElementById('paybackOut');
 
  if (!herdEl || !tariffEl) return;
 
  /* Typical assumptions per animal (rough averages) */
  const animalDefaults = {
    cow:     { manure: 25,  yield: 0.04 },  // kg/day, m3/kg
    buffalo: { manure: 30,  yield: 0.045 },
    pig:     { manure: 6,   yield: 0.05 },
    mixed:   { manure: 20,  yield: 0.038 },
  };
  const defaultKwhPerM3 = 2.0;
  const defaultFertPerKg = 0.8; // liters / kg manure
 
  /* Digester catalogue (USD list) */
  const digesters = [
    { name: '15-ton', price: 7900,  herdMax: 120 },
    { name: '30-ton', price: 12500, herdMax: 250 },
    { name: '50-ton', price: 17500, herdMax: 9999 },
  ];
 
  /* State */
  let state = {
    animal: 'cow',
    model: 'buy',      // buy | partner
    herd: 100,
    currency: 'USD',
    tariff: 0.20,
    manure: animalDefaults.cow.manure,
    yield:  animalDefaults.cow.yield,
    kwhPerM3: defaultKwhPerM3,
    fertPerKg: defaultFertPerKg,
  };
 
  // Currency symbols
  const sym = { USD: 'USD', GEL: 'GEL', EUR: 'EUR' };
 
  // Hook up UI
  animalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      animalBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.animal = btn.dataset.animal;
      state.manure = animalDefaults[state.animal].manure;
      state.yield  = animalDefaults[state.animal].yield;
      // mirror to Advanced fields
      const m = document.getElementById('manure');
      const y = document.getElementById('yield');
      if (m) m.value = state.manure;
      if (y) y.value = state.yield;
      recalc();
    });
  });
 
  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.model = btn.dataset.model;
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
    state.currency = currencyEl.value;
    saveCur.textContent = ' ' + sym[state.currency];
    capexCur.textContent = ' ' + sym[state.currency];
    recalc();
  });
 
  // Advanced fields
  advForm?.addEventListener('input', () => {
    state.manure   = parseFloat(document.getElementById('manure').value || state.manure);
    state.yield    = parseFloat(document.getElementById('yield').value || state.yield);
    state.kwhPerM3 = parseFloat(document.getElementById('kwhPerM3').value || state.kwhPerM3);
    state.fertPerKg= parseFloat(document.getElementById('fertilizerPerKg').value || state.fertPerKg);
    recalc();
  });
 
  // Toggle Advanced link
  toggleAdv?.addEventListener('click', (e) => {
    e.preventDefault();
    advBox.open = !advBox.open;
    advBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
 
  // Core math
  function recommendDigester(herd) {
    for (const d of digesters) {
      if (herd <= d.herdMax) return d;
    }
    return digesters[digesters.length - 1];
  }
 
  function recalc() {
    // Inputs
    const manureIn   = state.herd * state.manure;       // kg/day
    const biogas     = manureIn * state.yield;          // m3/day
    const kwh        = biogas * state.kwhPerM3;         // kWh/day
    const savingsDay = kwh * state.tariff;              // money/day
 
    // Recommend a digester by herd
    const d = recommendDigester(state.herd);
 
    // Capex (partner = 50% upfront)
    const upfront = state.model === 'partner' ? d.price * 0.5 : d.price;
 
    // Simple payback (energy only), years
    const daysPerYear = 365;
    const annualSavings = savingsDay * daysPerYear;
    const payback = annualSavings > 0 ? (upfront / annualSavings) : Infinity;
 
    // Output
    biogasOut.textContent = biogas.toFixed(1);
    kwhOut.textContent    = Math.round(kwh).toString();
    saveOut.textContent   = savingsDay.toFixed(2);
    saveCur.textContent   = ' ' + sym[state.currency];
 
    recoModel.textContent = `${d.name} digester`;
    recoHint.textContent  = `Good for up to ~${d.herdMax} animals.`;
    capexOut.textContent  = upfront.toLocaleString(undefined, { maximumFractionDigits: 0 });
    capexCur.textContent  = ' ' + sym[state.currency];
 
    paybackOut.textContent = isFinite(payback) ? payback.toFixed(1) : '–';
  }
 
  // Init values in Advanced from defaults
  (function seedAdvanced() {
    const m = document.getElementById('manure');
    const y = document.getElementById('yield');
    const k = document.getElementById('kwhPerM3');
    const f = document.getElementById('fertilizerPerKg');
    if (m) m.value = state.manure;
    if (y) y.value = state.yield;
    if (k) k.value = state.kwhPerM3;
    if (f) f.value = state.fertPerKg;
  })();
 
  // Initial compute
  herdOut.textContent = herdEl.value;
  saveCur.textContent = ' ' + sym[state.currency];
  capexCur.textContent = ' ' + sym[state.currency];
  recalc();
})();