'use strict';

// No cookies, tracking identifiers, or browser storage are used by this script.
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav-links');
if (toggle && nav) {
  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-wrap')) setMenu(false);
  });
  const desktop = window.matchMedia('(min-width: 1101px)');
  desktop.addEventListener('change', () => setMenu(false));
}

const form = document.getElementById('contact-form');
if (form) {
  const service = form.elements.namedItem('service');
  const requested = new URLSearchParams(window.location.search).get('service');
  if ([...service.options].some(option => option.value === requested)) service.value = requested;
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  const fallback = document.getElementById('email-fallback');
  const originalLabel = submit.innerHTML;
  submit.disabled = false;
  let sending = false;
  const showStatus = message => {
    status.textContent = message;
    status.hidden = false;
  };
  const makeEmail = () => {
    const data = new FormData(form);
    const subject = service.selectedOptions[0].textContent;
    const body = ['Name: ' + String(data.get('name') || '').trim(),
      'Company: ' + String(data.get('company') || '').trim(),
      'Email: ' + String(data.get('email') || '').trim(),
      'Phone: ' + String(data.get('phone') || '').trim(),
      'Inquiry: ' + subject].join('\r\n');
    return 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    fallback.href = makeEmail();
    fallback.hidden = true;
    if (form.dataset.delivery !== 'formbold') {
      // A mailto link cannot tell us whether a message was sent. Keep all fields.
      showStatus('Your email is ready. Open the prepared email below, then send it from your email app. Nothing has been sent yet.');
      fallback.hidden = false;
      fallback.focus();
      return;
    }
    sending = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';
    showStatus('Sending your inquiry…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'omit', signal: controller.signal,
      });
      if (!response.ok || response.redirected) throw new Error('Submission rejected');
      // Formbold's official client uses a successful HTTP response as acknowledgement.
      // Also honor an explicit provider error if the response includes JSON.
      if ((response.headers.get('content-type') || '').includes('application/json')) {
        const result = await response.json();
        if (result?.success === false || result?.error || result?.status === 'error') {
          throw new Error('Submission not confirmed');
        }
      }
      showStatus('Thank you. Your inquiry was received. Our team will contact you using the details you provided.');
      form.reset();
    } catch {
      showStatus('We could not confirm delivery. Your details are still here. You can try again, open the prepared email below, or call us. If delivery was interrupted, the original inquiry may still have arrived.');
      fallback.hidden = false;
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      submit.innerHTML = originalLabel;
    }
  });
}
