/* ================================================================
   MADAM WIZZY — main.js
   Each section is a self-contained module.
   Add new features at the bottom without touching existing ones.
   ================================================================ */


/* ── MODULE: Nav darkens on scroll ──────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
})();


/* ── MODULE: Star canvas ─────────────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function initStarField() {
    stars = Array.from({ length: 220 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.006 + 0.001,
      dir:   Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0.05) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,238,248,${s.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStarField(); }, { passive: true });
  resize();
  initStarField();
  draw();
})();


/* ── MODULE: Scroll reveal ───────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.hero .reveal)');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();


/* ── MODULE: Vision number counters ─────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.vision-num[data-target]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const start  = performance.now();
      const dur    = 1800;
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(start);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
})();


/* ── MODULE: Contact form ────────────────────────────────────── */
(function initContactForm() {
  const form   = document.querySelector('.contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Your message has been sent into the universe. ✦';
    status.style.opacity = '1';
    form.reset();
  });
})();


/* ================================================================
   ADD NEW MODULES BELOW THIS LINE
   Copy the pattern: (function initMyFeature() { ... })();
   ================================================================ */
