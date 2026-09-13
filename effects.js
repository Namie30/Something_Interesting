document.addEventListener('DOMContentLoaded', function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Flag for CSS that motion choreography is active (no-JS visitors see static content)
  if (!reducedMotion) document.body.classList.add('fx');

  /* ══════════════════════════════════════
     1. SCROLL PROGRESS BAR
  ══════════════════════════════════════ */
  var bar = document.getElementById('scrollProgress');
  if (bar) {
    function updateBar() {
      var s = document.documentElement.scrollTop || document.body.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(s / h * 100, 100) : 0) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* ══════════════════════════════════════
     1b. STICKY HEADER — compact scrolled state
  ══════════════════════════════════════ */
  var siteHeader = document.querySelector('header');
  if (siteHeader) {
    function updateHeader() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      siteHeader.classList.toggle('is-scrolled', y > 24);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ══════════════════════════════════════
     2. EXTEND SCROLL-REVEAL
  ══════════════════════════════════════ */
  if (!reducedMotion && typeof IntersectionObserver !== 'undefined') {
    var extra = [
      'section:not(#hero) h2',
      '.blog-card',
      '.about-stat',
      '.kpi',
      '.about-tagline',
      '.chip',
      '.calc-hero-card',
      '.substat',
      '.partners-stat',
      '.partners-badge',
      '.ach-spotlight',
      '.step',
      '.value-card',
      '.plan',
      '.pricing-banner',
      '.founder',
      '.carbon-card',
      '.simple-card',
      '.contact-item'
    ].join(',');

    var extraEls = document.querySelectorAll(extra);
    var byParent = new Map();

    extraEls.forEach(function (el) {
      var p = el.parentElement;
      if (!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(el);
    });

    byParent.forEach(function (group) {
      group.forEach(function (el, i) {
        el.classList.add('reveal');
        if (i > 0) el.style.transitionDelay = (i * 0.1) + 's';
      });
    });

    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.reveal:not(.in-view)').forEach(function (el) {
      revObs.observe(el);
    });
  }

  /* ══════════════════════════════════════
     3. ANIMATED COUNTERS
  ══════════════════════════════════════ */
  var counterEls = document.querySelectorAll('.about-stat-num, .partners-stat-num, .spot-num');

  if (counterEls.length && typeof IntersectionObserver !== 'undefined') {
    var cntObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el  = e.target;
        var raw = el.textContent.trim();
        var m   = raw.match(/^(\D*?)([\d]+(?:\.\d+)?)(.*)$/);
        if (!m) return;
        var pre = m[1], num = parseFloat(m[2]), suf = m[3];
        var isInt = m[2].indexOf('.') === -1;
        var dur = 1500, t0 = null;

        function tick(ts) {
          if (!t0) t0 = ts;
          var p    = Math.min((ts - t0) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + (isInt ? Math.round(num * ease) : (num * ease).toFixed(1)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        cntObs.unobserve(el);
      });
    }, { threshold: 0.6 });

    counterEls.forEach(function (el) { cntObs.observe(el); });
  }

  /* ══════════════════════════════════════
     4. FLOATING GET-A-QUOTE CTA
  ══════════════════════════════════════ */
  var fcta    = document.getElementById('floatingCta');
  var hero    = document.getElementById('hero');
  var contact = document.getElementById('contact');

  if (fcta && hero) {
    function updateCta() {
      var heroGone    = hero.getBoundingClientRect().bottom < 0;
      var nearContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.65;
      fcta.classList.toggle('fct-visible', heroGone && !nearContact);
    }
    window.addEventListener('scroll', updateCta, { passive: true });
    updateCta();
  }

  /* ══════════════════════════════════════
     5. HERO PARALLAX
     (layers drift at different speeds; the image sits
      inside an overflow:hidden wrapper so no gaps show)
  ══════════════════════════════════════ */
  if (!reducedMotion && finePointer && hero) {
    var pxImg     = document.querySelector('.hero-top-image');
    var pxContent = document.querySelector('#hero .hero-content');
    var pxOrbit   = document.querySelector('.sdg-orbit');
    var pxTicking = false;

    function parallax() {
      pxTicking = false;
      var y = window.scrollY || 0;
      var h = hero.offsetHeight || 1;
      if (y > h) return;                       // hero is off-screen — skip work
      var p = Math.min(y / h, 1);
      if (pxImg)     { pxImg.style.scale = 1 + p * 0.09; pxImg.style.translate = '0 ' + (y * 0.16).toFixed(1) + 'px'; }
      if (pxOrbit)   { pxOrbit.style.translate = '0 ' + (y * 0.12).toFixed(1) + 'px'; }
      if (pxContent) {
        pxContent.style.translate = '0 ' + (y * 0.3).toFixed(1) + 'px';
        pxContent.style.opacity = Math.max(0, 1 - p * 1.2).toFixed(3);
      }
    }
    window.addEventListener('scroll', function () {
      if (!pxTicking) { pxTicking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* ══════════════════════════════════════
     6. HOW-IT-WORKS CHOREOGRAPHY
     (adds .hiw-live once — CSS handles the sequence)
  ══════════════════════════════════════ */
  var hiwFlow = document.querySelector('.hiw-flow');
  if (hiwFlow && !reducedMotion && typeof IntersectionObserver !== 'undefined') {
    var hiwObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { hiwFlow.classList.add('hiw-live'); hiwObs.disconnect(); }
      });
    }, { threshold: 0.22 });
    hiwObs.observe(hiwFlow);
  }

  /* ══════════════════════════════════════
     7. SPOTLIGHT GLINT
     (one bright gold sweep when the $100K banner appears)
  ══════════════════════════════════════ */
  var spot = document.getElementById('achSpotlight');
  if (spot && !reducedMotion && typeof IntersectionObserver !== 'undefined') {
    var spotObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { spot.classList.add('spot-glint'); spotObs.disconnect(); }
      });
    }, { threshold: 0.45 });
    spotObs.observe(spot);
  }

  /* ══════════════════════════════════════
     8. MAGNETIC BUTTONS
     (subtle pull toward the cursor — desktop only)
  ══════════════════════════════════════ */
  if (!reducedMotion && finePointer) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r  = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        btn.style.translate = (dx * 7).toFixed(1) + 'px ' + (dy * 5).toFixed(1) + 'px';
      });
      btn.addEventListener('mouseleave', function () { btn.style.translate = ''; });
    });
  }

  /* ══════════════════════════════════════
     9. LIVE NUMBER TICKS
     (calculator outputs pop whenever their value changes)
  ══════════════════════════════════════ */
  if (!reducedMotion && typeof MutationObserver !== 'undefined') {
    ['totalOut', 'elecOut', 'fertOut', 'carbonOut', 'biogasOut', 'kwhOut',
     'saveOut', 'paybackOut', 'lifeOut', 'donutMain'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var mo = new MutationObserver(function () {
        el.classList.remove('num-tick');
        void el.offsetWidth;                   // restart the animation
        el.classList.add('num-tick');
      });
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

});
