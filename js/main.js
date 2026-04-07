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
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Contact form handler (static site — mailto fallback + UX)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = this.querySelector('[name="name"]').value.trim();
    const email   = this.querySelector('[name="email"]').value.trim();
    const subject = this.querySelector('[name="subject"]').value;
    const message = this.querySelector('[name="message"]').value.trim();

    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    const mailto = `mailto:info@pinesoil.com?subject=${encodeURIComponent(subject)}&body=${body}`;
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
