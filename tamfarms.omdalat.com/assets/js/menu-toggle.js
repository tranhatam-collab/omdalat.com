// Tam Farms — Mobile Menu Toggle (Hamburger)
(function() {
  'use strict';

  function setupMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('#main-nav');
    if (!toggle || !nav) return;

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 820 && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMenu);
  } else {
    setupMenu();
  }
})();
