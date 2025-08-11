/*
  script.js – Basic interactivity: mobile nav toggle, smooth anchor handling, reveal-on-scroll animations, and dynamic year.
  Structure: helpers, nav toggle, smooth scroll, intersection observer for .reveal, misc (footer year).
*/

(function () {
  'use strict';

  // Helpers
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Mobile Nav Toggle
  const navToggle = qs('.nav__toggle');
  const nav = qs('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when clicking a link (mobile)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.matches('a')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth anchor handling with native scroll-behavior CSS, but prevent jump and close mobile nav
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = qs(`#${CSS.escape(id)}`);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal-on-scroll
  const revealEls = qsa('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: reveal immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Dynamic year in footer
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
