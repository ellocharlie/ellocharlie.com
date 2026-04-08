/* ═══════════════════════════════════════════════════
   ellocharlie — Application JavaScript
   SPA Router · GSAP Animations · Interactive UI
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Theme Toggle ──────────────────────────────
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeToggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
    });
  }

  // ── SPA Router ────────────────────────────────
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');
  let currentPage = 'home';

  function navigate(pageName, pushState = true) {
    if (pageName === currentPage) return;

    const oldPage = document.getElementById('page-' + currentPage);
    const newPage = document.getElementById('page-' + pageName);
    if (!newPage) return;

    // Fade out old
    if (oldPage) {
      oldPage.classList.remove('visible');
      setTimeout(() => {
        oldPage.classList.remove('active');
      }, 250);
    }

    // Fade in new
    setTimeout(() => {
      pages.forEach(p => { p.classList.remove('active', 'visible'); });
      newPage.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newPage.classList.add('visible');
        });
      });

      // Update nav state
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === pageName);
      });

      currentPage = pageName;

      // Re-init page animations
      setTimeout(() => {
        initPageAnimations();
        initStaggerObserver();
        initFloatingBars();
      }, 100);

      // Close mobile menu
      closeMobileMenu();

      // Show/hide footer
      document.getElementById('siteFooter').style.display = 'block';
    }, oldPage ? 250 : 0);

    if (pushState) {
      history.pushState({ page: pageName }, '', '#' + pageName);
    }
  }

  // Handle initial route
  function initRoute() {
    const hash = location.hash.slice(1) || 'home';
    const validPages = ['home', 'features', 'integrations', 'about', 'pricing'];
    const page = validPages.includes(hash) ? hash : 'home';

    // Set initial page without animation
    pages.forEach(p => p.classList.remove('active', 'visible'));
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.add('active');
      requestAnimationFrame(() => {
        target.classList.add('visible');
      });
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-page') === page);
    });
    currentPage = page;
  }

  // Click handler for nav links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      navigate(link.getAttribute('data-page'));
    }
  });

  // Popstate
  window.addEventListener('popstate', (e) => {
    const page = e.state?.page || location.hash.slice(1) || 'home';
    navigate(page, false);
  });

  // ── Mobile Menu ───────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let mobileMenuOpen = false;

  function closeMobileMenu() {
    if (!mobileMenuOpen) return;
    mobileMenuOpen = false;
    mobileMenu.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenuOpen = !mobileMenuOpen;
      if (mobileMenuOpen) {
        mobileMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        document.body.style.overflow = 'hidden';
      } else {
        closeMobileMenu();
      }
    });
  }

  // ── Sticky Nav ────────────────────────────────
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;
  let navHidden = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Show/hide on scroll
    if (scrollY > 100 && scrollY > lastScroll && !navHidden) {
      nav.classList.add('nav--hidden');
      navHidden = true;
    } else if (scrollY < lastScroll && navHidden) {
      nav.classList.remove('nav--hidden');
      navHidden = false;
    }

    // Shadow on scroll
    nav.classList.toggle('nav--scrolled', scrollY > 10);

    lastScroll = scrollY;
  }, { passive: true });

  // ── Cursor Glow ───────────────────────────────
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && matchMedia('(hover: hover)').matches) {
    let glowX = 0, glowY = 0, targetX = 0, targetY = 0;
    let glowVisible = false;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!glowVisible) {
        glowVisible = true;
        cursorGlow.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      glowVisible = false;
      cursorGlow.classList.remove('visible');
    });

    function animateGlow() {
      glowX += (targetX - glowX) * 0.1;
      glowY += (targetY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ── Stagger Animation Observer ────────────────
  function initStaggerObserver() {
    const staggerEls = document.querySelectorAll('[data-stagger]:not(.in-view)');
    if (!staggerEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    staggerEls.forEach(el => observer.observe(el));
  }

  // ── Floating Bar Animations ───────────────────
  function initFloatingBars() {
    const bars = document.querySelectorAll('.hero__float-bar-fill[data-width]');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 500);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => barObserver.observe(bar));
  }

  // ── Feature Tabs ──────────────────────────────
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.feature-tab');
    if (!tab) return;

    const tabName = tab.getAttribute('data-tab');
    const parent = tab.closest('.section--tight, section');

    // Update tab buttons
    parent.querySelectorAll('.feature-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels with transition
    parent.querySelectorAll('.feature-tab-panel').forEach(panel => {
      if (panel.id === 'tab-' + tabName) {
        panel.classList.add('active');
        panel.style.opacity = '0';
        requestAnimationFrame(() => {
          panel.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          panel.style.opacity = '1';
        });
      } else {
        panel.classList.remove('active');
      }
    });
  });

  // ── Pricing Toggle ────────────────────────────
  const billingToggle = document.getElementById('billingToggle');
  let isAnnual = false;

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      billingToggle.classList.toggle('annual', isAnnual);

      // Update labels
      document.querySelectorAll('.pricing-toggle__label').forEach(label => {
        const billing = label.getAttribute('data-billing');
        label.classList.toggle('active', (billing === 'annual') === isAnnual);
      });

      // Animate price change
      document.querySelectorAll('.pricing-card__amount[data-monthly]').forEach(el => {
        const amount = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        animateNumber(el, parseInt(amount));
      });
    });
  }

  function animateNumber(el, target) {
    const current = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(current + (target - current) * eased);
      el.textContent = '$' + value;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── FAQ Accordion ─────────────────────────────
  document.addEventListener('click', (e) => {
    const question = e.target.closest('.faq__question');
    if (!question) return;

    const item = question.closest('.faq__item');
    const wasOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq__item.open').forEach(i => {
      i.classList.remove('open');
    });

    // Toggle clicked
    if (!wasOpen) {
      item.classList.add('open');
    }
  });

  // ── GSAP Animations ──────────────────────────
  function initPageAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Kill existing triggers for this page
    ScrollTrigger.getAll().forEach(t => t.kill());

    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    // Hero entrance
    const heroTitle = activePage.querySelector('.hero__title, .section__title');
    const heroSubtitle = activePage.querySelector('.hero__subtitle, .section__desc');
    const heroBadge = activePage.querySelector('.hero__badge, .section__eyebrow');
    const heroActions = activePage.querySelector('.hero__actions');

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    if (heroBadge) {
      heroTimeline.fromTo(heroBadge,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0
      );
    }
    if (heroTitle) {
      heroTimeline.fromTo(heroTitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        0.1
      );
    }
    if (heroSubtitle) {
      heroTimeline.fromTo(heroSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.25
      );
    }
    if (heroActions) {
      heroTimeline.fromTo(heroActions,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.4
      );
    }

    // Scroll-triggered sections
    activePage.querySelectorAll('.section, .section--tight').forEach(section => {
      const title = section.querySelector('.section__title');
      const desc = section.querySelector('.section__desc');

      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    // Product frame entrance
    const productFrame = activePage.querySelector('.hero__product-frame');
    if (productFrame) {
      gsap.fromTo(productFrame,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productFrame,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Bento cards
    activePage.querySelectorAll('.bento__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Integration cards
    activePage.querySelectorAll('.integration-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Feature showcase
    activePage.querySelectorAll('.feature-showcase').forEach(showcase => {
      const content = showcase.querySelector('.feature-showcase__content');
      const visual = showcase.querySelector('.feature-showcase__visual');

      if (content) {
        gsap.fromTo(content,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: showcase,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
      if (visual) {
        gsap.fromTo(visual,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: showcase,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    // Pricing cards
    activePage.querySelectorAll('.pricing-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Timeline items
    activePage.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // CTA sections
    activePage.querySelectorAll('.cta-section').forEach(cta => {
      gsap.fromTo(cta,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // About values
    activePage.querySelectorAll('.about-value').forEach((val, i) => {
      gsap.fromTo(val,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: val,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Workflow steps
    activePage.querySelectorAll('.workflow-step').forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }

  // ── Floating Animation Keyframe ───────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
  `;
  document.head.appendChild(style);

  // ── Page Transition Style ─────────────────────
  const transitionStyle = document.createElement('style');
  transitionStyle.textContent = `
    .page {
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `;
  document.head.appendChild(transitionStyle);

  // ── Initialize ────────────────────────────────
  function init() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    initRoute();
    initStaggerObserver();
    initFloatingBars();

    // Wait for GSAP to load then init animations
    function waitForGSAP() {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initPageAnimations();
      } else {
        setTimeout(waitForGSAP, 100);
      }
    }
    waitForGSAP();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
