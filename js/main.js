// Navbar scroll behavior
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  setMenu(false);

  hamburger.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('open'));
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  // Close on Escape so keyboard users are not trapped in the panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      hamburger.focus();
    }
  });
}

// Contact form handler (static site, mailto fallback + UX)
const CONTACT_EMAIL = 'brant@pinesoil.com';
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = (sel) => {
      const el = this.querySelector(sel);
      return el ? el.value.trim() : '';
    };
    const name    = value('[name="name"]');
    const email   = value('[name="email"]');
    const company = value('[name="company"]');
    const phone   = value('[name="phone"]');
    const subject = value('[name="subject"]');
    const message = value('[name="message"]');

    const lines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Division: ${subject}`,
      '',
      message
    ];
    const mailto = 'mailto:' + CONTACT_EMAIL
      + '?subject=' + encodeURIComponent(subject || 'Website inquiry')
      + '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = mailto;

    const success = document.getElementById('form-success');
    if (success) {
      success.style.display = 'block';
    }
    this.reset();
    setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 82;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Animate elements on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
