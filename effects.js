document.addEventListener('DOMContentLoaded', function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      '.partners-badge'
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
  var counterEls = document.querySelectorAll('.about-stat-num, .partners-stat-num');

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

});
