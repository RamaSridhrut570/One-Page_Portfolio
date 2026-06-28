document.addEventListener('DOMContentLoaded', () => {
  // 1. Convert style-hover to dynamic classes to simulate dc-runtime's style-hover feature
  const styleTag = document.createElement('style');
  let css = '';
  let idCounter = 0;

  document.querySelectorAll('[style-hover]').forEach(el => {
    const hoverCss = el.getAttribute('style-hover');
    if (hoverCss) {
      const cls = `hover-gen-${idCounter++}`;
      el.classList.add(cls);
      css += `.${cls}:hover { ${hoverCss} }\n`;
    }
  });
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);

  // 2. Set default accent color
  document.documentElement.style.setProperty('--accent', '#CF4B2C');

  // 3. Initialize features
  setup();
  initTheme();
  initFilter();
});

function setup() {
  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  reveals.forEach(el => {
    const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
    el.style.transition = 'opacity .7s cubic-bezier(.22,.61,.36,1) ' + delay + 'ms, transform .7s cubic-bezier(.22,.61,.36,1) ' + delay + 'ms';
    el.dataset.revealDone = '1';
  });
  const bars = Array.from(document.querySelectorAll('[data-skill]'));
  const navLinks = Array.from(document.querySelectorAll('nav [data-nav]'));
  const sections = ['hero', 'about', 'projects', 'skills', 'reviews', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach(a => {
      const on = a.getAttribute('data-target') === '#' + id;
      a.style.color = on ? 'var(--accent, #CF4B2C)' : 'var(--muted-2)';
      a.style.borderLeftColor = on ? 'var(--accent, #CF4B2C)' : 'transparent';
      a.style.background = on ? 'rgba(207,75,44,0.10)' : 'transparent';
      a.style.fontWeight = on ? '600' : '500';
    });
  };

  const ghost = document.querySelector('[data-parallax]');
  const hero = document.getElementById('hero');

  const ready = () => hero && hero.getBoundingClientRect().height > 0 && window.innerHeight > 0;

  let primed = false;
  const prime = () => {
    const vh = window.innerHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top > vh * 0.85) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(26px)';
        el.dataset.revealDone = '0';
      }
    });
    bars.forEach(b => {
      const r = b.getBoundingClientRect();
      if (r.top > vh * 0.85) { b.style.width = '0'; b.dataset.filled = '0'; }
    });
    primed = true;
  };

  const tick = () => {
    if (!ready()) return;
    if (!primed) prime();
    const vh = window.innerHeight;
    reveals.forEach(el => {
      if (el.dataset.revealDone === '1') return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.dataset.revealDone = '1';
      }
    });
    bars.forEach(b => {
      if (b.dataset.filled === '1') return;
      const r = b.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) {
        b.style.width = (b.getAttribute('data-fill') || '0') + '%';
        b.dataset.filled = '1';
      }
    });
    let active = sections[0] ? sections[0].id : 'hero';
    const line = vh * 0.42;
    sections.forEach(s => { if (s.getBoundingClientRect().top <= line) active = s.id; });
    setActive(active);
    if (ghost && hero) {
      const offset = -hero.getBoundingClientRect().top;
      ghost.style.transform = 'translateY(' + (offset * 0.18) + 'px)';
    }
  };

  let raf = null;
  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { tick(); raf = null; });
  };
  window.addEventListener('scroll', schedule, { capture: true, passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('visibilitychange', () => { if (!document.hidden) _warmup(tick); });
  window.addEventListener('load', () => _warmup(tick));
  _warmup(tick);
}

function _warmup(tick) {
  const start = performance.now();
  const step = () => {
    tick();
    const hero = document.getElementById('hero');
    const isReady = hero && hero.getBoundingClientRect().height > 0 && window.innerHeight > 0;
    if (performance.now() - start < (isReady ? 700 : 2500)) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

function initTheme() {
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  const moon = document.querySelector('[data-icon-moon]');
  const sun = document.querySelector('[data-icon-sun]');
  const apply = (mode) => {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (moon) moon.style.display = 'none';
      if (sun) sun.style.display = '';
    } else {
      root.removeAttribute('data-theme');
      if (moon) moon.style.display = '';
      if (sun) sun.style.display = 'none';
    }
  };
  let saved = null;
  try { saved = localStorage.getItem('pf-theme'); } catch (e) { }
  apply(saved === 'dark' ? 'dark' : 'light');
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('pf-theme', next); } catch (e) { }
  });
}

function initFilter() {
  const btns = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-project]'));
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.getAttribute('data-filter');
      btns.forEach(b => {
        const on = b === btn;
        b.style.background = on ? 'var(--accent, #CF4B2C)' : 'transparent';
        b.style.color = on ? '#FBF6EC' : 'var(--muted-2)';
        b.style.borderColor = on ? 'var(--accent, #CF4B2C)' : 'var(--border-3)';
      });
      cards.forEach(c => {
        const match = f === 'all' || c.getAttribute('data-engine') === f;
        c.style.display = match ? 'flex' : 'none';
      });
    });
  });
}