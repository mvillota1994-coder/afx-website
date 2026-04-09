// AFX Mastery — Polished JS
(function () {
  'use strict';

  // --- Navbar scroll effect ---
  var navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load in case page is already scrolled

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile nav on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // --- Scroll reveal with staggered timing ---
  var revealGroups = [
    { selector: '.benefit-card', staggerMs: 80 },
    { selector: '.testimonial-card', staggerMs: 100 },
    { selector: '.pricing-card', staggerMs: 120 },
  ];

  var soloElements = document.querySelectorAll(
    '.program-text, .program-visual, .mid-cta-inner, .section-title, .final-cta-inner'
  );

  soloElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var soloObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          soloObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  soloElements.forEach(function (el) {
    soloObserver.observe(el);
  });

  // Staggered group reveals
  revealGroups.forEach(function (group) {
    var elements = document.querySelectorAll(group.selector);
    elements.forEach(function (el) {
      el.classList.add('fade-in');
    });

    var groupObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Find all siblings in this group and reveal with stagger
            var parent = entry.target.parentElement;
            var siblings = parent.querySelectorAll(group.selector);
            siblings.forEach(function (sib, i) {
              sib.style.setProperty('--stagger', (i * group.staggerMs) + 'ms');
              sib.style.transitionDelay = (i * group.staggerMs) + 'ms';
              // Small timeout to batch the class additions after delay is set
              requestAnimationFrame(function () {
                sib.classList.add('visible');
              });
              groupObserver.unobserve(sib);
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    elements.forEach(function (el) {
      groupObserver.observe(el);
    });
  });

  // --- Animated progress bars in visual card ---
  var visualCard = document.querySelector('.visual-card');
  if (visualCard) {
    var barFills = visualCard.querySelectorAll('.vs-fill');
    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            barFills.forEach(function (fill) {
              var targetWidth = fill.style.width;
              fill.style.width = '0%';
              // Trigger reflow then animate
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  fill.style.width = targetWidth;
                  fill.classList.add('animated');
                });
              });
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    barObserver.observe(visualCard);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
})();
