// Pines Energy Group LLC — shared site script
// 1. Mobile navigation toggle
// 2. Contact form: preselect topic from ?topic= and submit to FormBold
// 3. Footer year

// FormBold endpoint for the contact form. The same URL is also set as the
// form's action attribute in pages/contact.html so the form still works
// if JavaScript is disabled. Change both if the form is ever replaced.
const FORM_ENDPOINT = 'https://formbold.com/s/oWrDm';

// ---- 1. Mobile navigation ----
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  const setOpen = (open) => {
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  navToggle.addEventListener('click', () => {
    setOpen(!siteNav.classList.contains('is-open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      setOpen(false);
      navToggle.focus();
    }
  });

  // Reset when resizing back up to the desktop layout.
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

// ---- 2. Contact form ----
const form = document.getElementById('contact-form');

if (form) {
  // Links such as contact.html?topic=recovery-point preselect the topic.
  const topic = new URLSearchParams(window.location.search).get('topic');
  const topicSelect = form.querySelector('[name="topic"]');
  if (topic && topicSelect) {
    const match = topicSelect.querySelector(`option[data-topic="${CSS.escape(topic)}"]`);
    if (match) match.selected = true;
  }

  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');

  const showStatus = (message, isError) => {
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
    status.hidden = false;
    status.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`FormBold responded ${response.status}`);

      form.reset();
      showStatus('Thank you. Your message has been sent and we will respond during business hours, 5:00 AM to 10:00 PM Central.');
    } catch (err) {
      showStatus('Your message could not be sent. Please try again, or call (512) 640-9102 or email brant@pinesoil.com.', true);
    } finally {
      button.disabled = false;
      button.textContent = 'Send Message';
    }
  });
}

// ---- 3. Footer year ----
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
