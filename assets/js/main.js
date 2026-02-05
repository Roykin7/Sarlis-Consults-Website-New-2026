// Theme interactions for Sarlis Consults
(function () {
  // Legacy navbar shrink only if Bootstrap navbar exists
  const nav = document.getElementById('mainNav');
  if (nav) {
    const shrink = () => {
      if (window.scrollY > 100) {
        nav.classList.add('navbar-shrink');
      } else {
        nav.classList.remove('navbar-shrink');
      }
    };
    shrink();
    document.addEventListener('scroll', shrink);
  }

  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme toggle with localStorage persistence
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
  };

  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  const toggleButtons = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleDesktop')
  ].filter(Boolean);

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    });
  });


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .stat-item, .process-step, .why-card, .detail-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // CTA form submission handler
  const ctaForm = document.querySelector('.cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you for your interest! We'll be in touch soon.");
      ctaForm.reset();
    });
  }

  // Mobile navigation interactions
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('navOverlay');
  const menuClose = document.getElementById('menuClose');

  const firstMobileLink = mobileNav ? mobileNav.querySelector('.mobile-nav-links a') : null;

  const openMenu = () => {
    if (!mobileNav || !menuToggle || !navOverlay) return;
    mobileNav.classList.add('open');
    document.body.classList.add('menu-open');
    navOverlay.hidden = false;
    navOverlay.classList.add('visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (firstMobileLink) firstMobileLink.focus();
  };

  const closeMenu = () => {
    if (!mobileNav || !menuToggle || !navOverlay) return;
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    navOverlay.classList.remove('visible');
    navOverlay.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuToggle.focus();
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
  // Close when a mobile nav link is selected
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();
