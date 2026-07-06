/* ================================================================
   Dennis Günzel — Small enhancements
   - Current year in footer
   - Legal-notice (Impressum) modal open/close
   - Subtle on-scroll reveal for major elements
   ================================================================ */

(function () {
  'use strict';

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Legal notice dialog ----
  const dialog = document.getElementById('legal');
  const openBtn = document.getElementById('legal-link');
  const closeBtn = document.getElementById('legal-close');

  if (dialog && openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        // older browsers — fall back to a simple visible state
        dialog.setAttribute('open', '');
      }
    });
  }
  if (dialog && closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }
  // click on backdrop closes the dialog
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.querySelector('.legal-dialog__inner').getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right
                  && e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  // ---- Scroll reveal (subtle) ----
  // Adds .is-in to elements with .reveal as they enter viewport.
  // Hero section content is excluded — it should appear immediately.
  const revealTargets = document.querySelectorAll(
    '.section__head, .practice-card, .tl, .station-list li, .contact-card, .quote-banner figure, .intl__copy, .intl__photo, .prose'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // small stagger for items in the same parent
    el.style.transitionDelay = ((i % 6) * 60) + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      // Generous bottom margin: trigger reveal when element is within
      // one viewport-height of entering. This way the animation feels
      // natural and elements are revealed well before they're scrolled to.
      rootMargin: '0px 0px 25% 0px'
    });

    revealTargets.forEach((el) => io.observe(el));
  } else {
    // No IntersectionObserver — just show everything.
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  // Failsafe: if any element is still hidden after 2.5s (slow network,
  // JS disabled mid-load, screenshot tools, etc.), reveal it.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
      el.classList.add('is-in');
    });
  }, 2500);

  // ---- Smooth-scroll: account for sticky header offset ----
  // (CSS scroll-behavior: smooth handles the animation; we just nudge
  // a touch so the target heading doesn't sit under the topbar.)
  const topbarH = () => {
    const el = document.querySelector('.topbar');
    return el ? el.getBoundingClientRect().height : 0;
  };
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - topbarH() - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
