/* ==========================================================================
   MAIN.JS — Core functionality
   ========================================================================== */

(function () {
  'use strict';

  // ===== UTILITIES =====
  function throttle(fn, limit) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= limit) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // ===== REFS =====
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('navToggle');
  const navMenu    = document.getElementById('navMenu');
  const navLinks   = document.querySelectorAll('.nav-link');

  // Profile zoom
  const navAvatar  = document.getElementById('navAvatar');
  const zoomOverlay = document.getElementById('zoomOverlay');
  const zoomedImg  = document.getElementById('zoomedImg');
  const zoomClose  = document.getElementById('zoomClose');

  // Certificate modal
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImg     = document.getElementById('modalImg');
  const modalClose   = document.getElementById('modalClose');

  // ===== MOBILE NAV TOGGLE =====
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== NAVBAR — SCROLL HIDE =====
  let lastY = 0;
  if (navbar) {
    window.addEventListener('scroll', throttle(() => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled-down', y > lastY && y > 80);
      lastY = y;
    }, 120));
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id], div[id].section');
  window.addEventListener('scroll', throttle(() => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, 100));

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== PROFILE IMAGE ZOOM =====
  if (navAvatar && zoomOverlay && zoomedImg) {
    navAvatar.addEventListener('click', () => {
      zoomedImg.src = navAvatar.src;
      zoomedImg.alt = navAvatar.alt;
      zoomOverlay.classList.add('active');
      zoomOverlay.focus();
    });
    function closeZoom() { zoomOverlay.classList.remove('active'); }
    zoomClose?.addEventListener('click', closeZoom);
    zoomOverlay.addEventListener('click', (e) => {
      if (e.target === zoomOverlay) closeZoom();
    });
  }

  // ===== CERTIFICATE MODAL =====
  function openModal(src, alt) {
    if (!modalOverlay || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || '';
    modalOverlay.classList.add('active');
  }
  function closeModal() {
    modalOverlay?.classList.remove('active');
  }

  // Attach to cert thumbnails
  document.querySelectorAll('.cert-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('img');
      if (img) openModal(img.src, img.alt);
    });
  });
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Expose for inline calls
  window.openModal = openModal;

  // ===== KEYBOARD ESCAPE =====
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeModal();
    document.getElementById('zoomOverlay')?.classList.remove('active');
    // Close badge modal
    const bm = document.getElementById('fullImgBox');
    if (bm) bm.classList.remove('active');
  });

  // ===== DROPDOWN NAV MENU (desktop fallback) =====
  // All navigation now handled by hamburger + nav-menu

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-h')) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== IOS INPUT ZOOM FIX =====
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('focus', () => { el.style.fontSize = '16px'; });
    });
  }

  // ===== KEYBOARD SHORTCUT — Ctrl+/ toggles chat =====
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      window.toggleChat?.();
    }
  });

})();
