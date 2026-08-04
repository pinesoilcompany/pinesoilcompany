# Pines Energy Group LLC Website

Static corporate website for Pines Energy Group LLC, Athens, Texas. Built for GitHub Pages hosting.

Pines Energy Group LLC is the parent company. The site presents four operating divisions:

| Division | Scope | Page |
| --- | --- | --- |
| Pines Fuel Brokerage | Commercial fuel procurement and supplier network | `pages/fuel-brokerage.html` |
| Pines USA | Oil and gas and biodiesel operations | `pages/pines-usa.html` |
| Pines Green | Used cooking oil collection, recycling, feedstock recovery | `pages/pines-green.html` |
| Pines Holdings | Strategic investments, acquisitions, ownership | `pages/holdings.html` |

## File Structure

```
pinesoilcompany/
├── index.html                   # Homepage: hero, overview, divisions, industries,
│                                #   why Pines, company updates, contact CTA
├── css/
│   └── style.css                # All styles, including division accent themes
├── js/
│   └── main.js                  # Navbar, mobile menu, contact form, scroll animations
├── pages/
│   ├── about.html               # Group profile, structure, philosophy, growth, leadership
│   ├── fuel-brokerage.html      # Pines Fuel Brokerage division
│   ├── pines-usa.html           # Pines USA division
│   ├── pines-green.html         # Pines Green division
│   ├── holdings.html            # Pines Holdings division
│   ├── contact.html             # Contact by division + contact form
│   ├── restaurants.html         # Sub-page: Pines Green restaurant collection program
│   └── farmers.html             # Sub-page: Pines USA biodiesel buyer info and FAQ
└── images/
    ├── og-cover.jpg             # Open Graph / social share card (1200x630)
    ├── owner-900.jpg            # Web-optimized leadership photo (900px, ~100 KB)
    ├── owner.jpg                # Original leadership photo (3022px, ~1.4 MB, not served)
    └── placeholder.txt
```

## Division Accent Colors

Each division page sets one class on `<body>`, which re-declares the accent
variables. Everything else (layout, type, spacing, components) is shared, so the
site reads as one company.

| Body class | Accent | Division |
| --- | --- | --- |
| *(none)* | Crimson on dark navy and steel gray | Pines Energy Group |
| `div-brokerage` | Deep blue `#1b4f8f` | Pines Fuel Brokerage |
| `div-usa` | Dark red `#8f1d1d` | Pines USA |
| `div-green` | Forest green `#1f5130` | Pines Green |
| `div-holdings` | Charcoal base with gold `#b8960c` | Pines Holdings |

To add a new division, add a `body.div-*` block next to the others in
`css/style.css` and set `--gold`, `--gold-lt`, `--border-gold`, and
`--accent-text-dark`. The last one is the lighter accent used for small
accent-colored text on the dark sections, so it needs to clear contrast against
the navy background.

## Content You Will Want to Update

**Company updates on the homepage.** The three cards under "Recent Activity" in
`index.html` are placeholders, marked with an HTML comment. Replace them with
real announcements, project write-ups, or press items as they become available.

**Leadership photo.** `pages/about.html` currently shows an SVG placeholder in
the leadership section. The markup to swap in the real photo is sitting right
above it, commented out, and `images/owner-900.jpg` is already optimized for the
web. Uncomment the `<img>` line and delete the `<svg>` block.

**Timeline.** The company development timeline in `pages/about.html` uses stage
labels rather than years. Add or edit `.timeline-item` blocks as the group grows.

## Site URL and SEO

Canonical URLs, Open Graph tags, and JSON-LD structured data are set on every
page using the base URL:

```
https://pinesoilcompany.github.io/pinesoilcompany/
```

If you move to a custom domain, find and replace that string across all `.html`
files. It appears in `<link rel="canonical">`, the `og:url` and `og:image` tags,
the `twitter:image` tag, and the JSON-LD blocks.

Structured data uses `Organization` with `subOrganization` entries on the
homepage, and `Organization` with `parentOrganization` on each division page, so
search engines can read the corporate structure.

## Deploying to GitHub Pages

1. Push to the `main` branch of the repository
2. Go to repository Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select the `main` branch and `/ (root)` folder
5. Click Save

## Adding a Custom Domain

1. In GitHub Pages settings, enter your domain under "Custom domain"
2. At your domain registrar, add these DNS records:
   - A record: 185.199.108.153
   - A record: 185.199.109.153
   - A record: 185.199.110.153
   - A record: 185.199.111.153
   - CNAME record: www -> pinesoilcompany.github.io
3. Enable "Enforce HTTPS" once the domain verifies (may take up to 24 hours)
4. Update the base URL in the HTML files as described under Site URL and SEO

## Contact Form

The form on `pages/contact.html` opens the visitor's email client with the
fields pre-filled (`mailto:`), which requires no server. The destination address
is set once, in `js/main.js`:

```js
const CONTACT_EMAIL = 'brant@pinesoil.com';
```

For true server-side form submission, consider Formspree, Netlify Forms, or
EmailJS. All three have free tiers and work with a static site.

## Contact Details

Current contact information embedded across the site:

- Phone: (512) 640-9102
- Email: brant@pinesoil.com
- Headquarters: Athens, Texas

To change these, find and replace across all `.html` files, and update
`CONTACT_EMAIL` in `js/main.js`.

## Accessibility and Responsiveness

- Every page has a skip link, a single `<main>` landmark, and labeled breadcrumb
  and menu controls
- The mobile menu reports state via `aria-expanded` and closes on Escape
- The FAQ accordion on `pages/farmers.html` uses real buttons
- Animations are disabled under `prefers-reduced-motion`
- Navigation folds into the mobile menu at 1024px, since it carries seven items
