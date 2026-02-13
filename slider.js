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

  animateValue(document.getElementById('kpi-gas'),  120);
  animateValue(document.getElementById('kpi-elec'), 240);
  animateValue(document.getElementById('kpi-fert'), 500);

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
    gridId: 'achievementsGrid', itemSelector: '.ach-card', buttonId: 'achSeeMore',
    initialCount: 8, moreText: 'See more awards', lessText: 'Show less'
  });
  setupSeeMore({
    gridId: 'blogGrid', itemSelector: '.blog-card', buttonId: 'blogSeeMore',
    initialCount: 3, moreText: 'See more articles', lessText: 'Show less'
  });

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
   SAVINGS CALCULATOR
══════════════════════════════════════════════════ */
(() => {
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

  const animalDefaults = {
    cow:     { manure: 25,  yield: 0.04 },
    buffalo: { manure: 30,  yield: 0.045 },
    pig:     { manure: 6,   yield: 0.05 },
    mixed:   { manure: 20,  yield: 0.038 },
  };
  const digesters = [
    { name: '15-ton', price: 7900,  herdMax: 120 },
    { name: '30-ton', price: 12500, herdMax: 250 },
    { name: '50-ton', price: 17500, herdMax: 9999 },
  ];
  const sym = { USD: 'USD', GEL: 'GEL', EUR: 'EUR' };

  let state = {
    animal: 'cow', model: 'buy', herd: 100,
    currency: 'USD', tariff: 0.20,
    manure: 25, yield: 0.04, kwhPerM3: 2.0, fertPerKg: 0.8,
  };

  animalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      animalBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.animal = btn.dataset.animal;
      state.manure = animalDefaults[state.animal].manure;
      state.yield  = animalDefaults[state.animal].yield;
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
  advForm?.addEventListener('input', () => {
    state.manure   = parseFloat(document.getElementById('manure').value    || state.manure);
    state.yield    = parseFloat(document.getElementById('yield').value     || state.yield);
    state.kwhPerM3 = parseFloat(document.getElementById('kwhPerM3').value  || state.kwhPerM3);
    state.fertPerKg= parseFloat(document.getElementById('fertilizerPerKg').value || state.fertPerKg);
    recalc();
  });
  toggleAdv?.addEventListener('click', (e) => {
    e.preventDefault();
    advBox.open = !advBox.open;
    advBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function recommendDigester(herd) {
    for (const d of digesters) { if (herd <= d.herdMax) return d; }
    return digesters[digesters.length - 1];
  }

  function recalc() {
    const manureIn   = state.herd * state.manure;
    const biogas     = manureIn * state.yield;
    const kwh        = biogas * state.kwhPerM3;
    const savingsDay = kwh * state.tariff;
    const d          = recommendDigester(state.herd);
    const upfront    = state.model === 'partner' ? d.price * 0.5 : d.price;
    const annual     = savingsDay * 365;
    const payback    = annual > 0 ? upfront / annual : Infinity;

    biogasOut.textContent   = biogas.toFixed(1);
    kwhOut.textContent      = Math.round(kwh).toString();
    saveOut.textContent     = savingsDay.toFixed(2);
    saveCur.textContent     = ' ' + sym[state.currency];
    recoModel.textContent   = `${d.name} digester`;
    recoHint.textContent    = `Good for up to ~${d.herdMax} animals.`;
    capexOut.textContent    = upfront.toLocaleString(undefined, { maximumFractionDigits: 0 });
    capexCur.textContent    = ' ' + sym[state.currency];
    paybackOut.textContent  = isFinite(payback) ? payback.toFixed(1) : '–';
  }

  // Seed advanced fields
  const m = document.getElementById('manure');
  const y = document.getElementById('yield');
  const k = document.getElementById('kwhPerM3');
  const f = document.getElementById('fertilizerPerKg');
  if (m) m.value = state.manure;
  if (y) y.value = state.yield;
  if (k) k.value = state.kwhPerM3;
  if (f) f.value = state.fertPerKg;

  herdOut.textContent  = herdEl.value;
  saveCur.textContent  = ' ' + sym[state.currency];
  capexCur.textContent = ' ' + sym[state.currency];
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