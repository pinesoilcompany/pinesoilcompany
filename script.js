/**
 * Pines Oil Company — script.js
 * Handles: navbar scroll, mobile menu, scroll reveal, form validation
 * Zero dependencies. Vanilla JS only.
 */

/* ─────────────────────────────────────────
   1. NAVBAR — scroll state + mobile toggle
───────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (!navbar) return;

  // Scroll: add .scrolled class after 40px
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on page load in case of scroll position

  // Mobile toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
})();


/* ─────────────────────────────────────────
   2. SCROLL REVEAL
   Observes .reveal elements, adds .visible
   on intersection. Supports data-delay attr.
───────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // If IntersectionObserver isn't supported, show everything immediately
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

        setTimeout(function () {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ─────────────────────────────────────────
   3. BUTTON HOVER BACKGROUND EFFECT
   Smooth gradient shift on card/button hover.
   Uses CSS transitions; JS only primes them.
───────────────────────────────────────── */
(function initHoverEffects() {
  // Cards: track mouse position for gradient follow
  const cards = document.querySelectorAll('.service-card, .adv-card, .stat-card, .step, .flow-node');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });

    card.addEventListener('mouseleave', function () {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
})();


/* ─────────────────────────────────────────
   4. CONTACT FORM — client-side validation
   Prevents submission, shows inline errors.
   Replace with your backend/formspree on deploy.
───────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn   = document.getElementById('submitBtn');
  const successBox  = document.getElementById('formSuccess');

  // Field → error element mapping
  const fields = [
    { id: 'name',    errorId: 'nameError',    validate: function (v) { return v.trim().length >= 2; } },
    { id: 'phone',   errorId: 'phoneError',   validate: function (v) { return /^[\d\s\(\)\-\+\.]{7,}$/.test(v.trim()); } },
    { id: 'message', errorId: 'messageError', validate: function (v) { return v.trim().length >= 10; } },
  ];

  // Real-time inline validation on blur
  fields.forEach(function (f) {
    const input = document.getElementById(f.id);
    if (!input) return;
    input.addEventListener('blur', function () {
      validateField(f);
    });
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) validateField(f);
    });
  });

  function validateField(f) {
    const input = document.getElementById(f.id);
    const error = document.getElementById(f.errorId);
    if (!input || !error) return true;

    const valid = f.validate(input.value);
    input.classList.toggle('error', !valid);
    error.classList.toggle('visible', !valid);
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all required fields
    let allValid = true;
    fields.forEach(function (f) {
      if (!validateField(f)) allValid = false;
    });

    if (!allValid) return;

    // Simulate submission (replace with fetch() to your endpoint)
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(function () {
      // ── To connect a real backend, replace this block with a fetch() call ──
      // Example using Formspree (free tier, no backend needed):
      //
      // fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Accept': 'application/json' },
      //   body: new FormData(form)
      // }).then(r => r.ok ? showSuccess() : showError()).catch(showError);
      //
      // ── End Formspree example ──

      showSuccess();
    }, 1000);
  });

  function showSuccess() {
    form.reset();
    if (successBox) {
      successBox.removeAttribute('hidden');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (submitBtn) {
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = 'var(--green-light)';
    }
  }
})();


/* ─────────────────────────────────────────
   5. LAZY LOAD IMAGES (native + fallback)
   Adds loading="lazy" to any img without it.
───────────────────────────────────────── */
(function initLazyImages() {
  document.querySelectorAll('img:not([loading])').forEach(function (img) {
    img.setAttribute('loading', 'lazy');
  });
})();


/* ─────────────────────────────────────────
   6. FAQ ACCORDION (how-it-works.html)
   Toggle expand/collapse on click.
───────────────────────────────────────── */
(function initFaqAccordion() {
  const faqs = document.querySelectorAll('.faq-item');
  if (!faqs.length) return;

  faqs.forEach(function (item) {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    // Make keyboard accessible
    q.setAttribute('tabindex', '0');
    q.setAttribute('role', 'button');
    q.style.cursor = 'pointer';

    // Start collapsed on mobile only
    function toggleFaq() {
      const expanded = item.classList.toggle('faq-open');
      a.style.maxHeight = expanded ? a.scrollHeight + 'px' : '0';
    }

    // Initial state: open on desktop, all visible (no collapse needed)
    // On mobile-ish, it's small enough to leave static — keep simple
    q.addEventListener('click', toggleFaq);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(); }
    });
  });
})();


/* ─────────────────────────────────────────
   7. ACTIVE NAV LINK HIGHLIGHTING
   Marks current page link as active.
───────────────────────────────────────── */
(function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.btn)').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
