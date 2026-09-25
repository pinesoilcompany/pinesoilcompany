# Pines Energy Group LLC Website

Static corporate website for **Pines Energy Group LLC**, a Texas limited liability company at 3855 TX-31, Athens, TX 75752. Plain HTML, CSS, and a small JavaScript file. There is no build step, framework, or database, and it is hosted on GitHub Pages at **https://pinesoil.com/**.

## Company Structure on the Site

| Company | Role | Page | Color theme |
| --- | --- | --- | --- |
| Pines Energy Group LLC | Parent company | `index.html`, `pages/about.html` | Red, white, navy |
| Pines USA | Fuel: biodiesel blends made from waste cooking oil | `pages/pines-usa.html` | Red, white, navy |
| Pines Solutions | Oil recycling and cleaning: collection and the Recovery Point | `pages/pines-solutions.html` | Pine green, white, navy |
| Recovery Point (run by Pines Solutions) | 24-hour self-service oil drop-off for registered partners | `pages/recovery-point.html` | Pine green, white, navy |

## File Structure

```
pinesoilcompany/
├── index.html                  Home page for Pines Energy Group (parent company)
├── CNAME                       Custom domain for GitHub Pages (pinesoil.com)
├── robots.txt                  Tells search engines they may crawl the site
├── sitemap.xml                 List of pages for search engines
├── css/
│   └── style.css               All styles for every page
├── js/
│   └── main.js                 Mobile menu, contact form (FormBold), footer year
├── pages/
│   ├── about.html              Company story, structure, principles, leadership
│   ├── pines-usa.html          Pines USA: biodiesel blends, production, FAQ
│   ├── pines-solutions.html    Pines Solutions: collection, materials, partners
│   ├── recovery-point.html     Recovery Point: how it works, rules, location, FAQ
│   ├── contact.html            Contact details and the contact form
│   ├── privacy.html            Privacy Policy
│   └── terms.html              Terms of Service
└── images/
    ├── favicon.svg             Browser tab icon (PLACEHOLDER, replace with logo)
    ├── favicon-32.png          Browser tab icon, PNG fallback (PLACEHOLDER)
    ├── apple-touch-icon.png    iPhone/iPad home screen icon, 180x180 (PLACEHOLDER)
    ├── og-cover.jpg            Preview image shown when a link is shared (1200x630)
    ├── owner-900.jpg           Leadership photo, web size (not currently shown)
    └── owner.jpg               Original leadership photo (not served, too large)
```

## Previewing Locally

From the project folder, run:

```bash
python -m http.server 8080
```

Then open http://localhost:8080. (Opening the HTML files directly by double-clicking also works, but the contact form needs a real web address to submit.)

## Editing Content

Each page is a complete HTML file. Open it, find the text, change it, and save.

**The header and footer are repeated on every page.** If you change a navigation link, the phone number, the hours, or the footer, make the same change in all 8 HTML files. A find-and-replace across the project folder (for example, in VS Code: Ctrl+Shift+H) is the fastest way to do this.

### Contact details used across the site

| Detail | Value |
| --- | --- |
| Phone | (512) 640-9102, linked as `tel:+15126409102` |
| Email | brant@pinesoil.com |
| Address | 3855 TX-31, Athens, TX 75752 |
| Office hours | 5:00 AM to 10:00 PM Central, daily |
| Recovery Point | Open 24 hours, 7 days a week, registered partners only |

To change one of these, find and replace it across all `.html` files. The phone and address also appear in the structured data (the `<script type="application/ld+json">` block near the top of each page), and the error message in `js/main.js` includes the phone number and email.

## Colors and Fonts

All colors are set as variables at the top of `css/style.css`:

- `--navy` and related shades: header, dark sections, footer
- `--accent`: the main accent (red by default)
- `--accent-on-dark`: a lighter version of the accent, used only for small text on navy so it stays readable

Division pages switch the accent by adding a class to `<body>`:

- `<body class="theme-usa">`: red (Pines USA)
- `<body class="theme-solutions">`: pine green (Pines Solutions and Recovery Point)
- no class: red (Pines Energy Group pages)

To adjust a theme, edit its `body.theme-*` block near the top of the stylesheet.

**Fonts:** headings use Playfair Display at weight 600 (the same style as before, but less heavy than the old 900 weight). Body text uses Source Sans 3. Both load from Google Fonts at the top of `css/style.css`.

## Adding the Logo

The header uses the text wordmark "Pines Energy Group / Athens, Texas". It does not need a logo image, and none is placeholdered there.

**The favicon files are placeholders** (a white "P" on navy). When the logo is ready:

1. Replace `images/favicon.svg` with an SVG version of the logo mark (square works best).
2. Replace `images/favicon-32.png` with a 32x32 PNG.
3. Replace `images/apple-touch-icon.png` with a 180x180 PNG on a solid background (no transparency).

Keep the same file names and no HTML changes are needed. Browsers cache favicons heavily, so a hard refresh (Ctrl+F5) may be needed to see the change.

If you later want the logo in the header, put an `<img>` inside the `<a class="wordmark">` element on each page.

## Contact Form (FormBold)

The form on `pages/contact.html` submits to FormBold:

```
https://formbold.com/s/oWrDm
```

This URL appears in two places, and both must match:

1. The `action="..."` attribute on the `<form>` in `pages/contact.html` (used if JavaScript is off)
2. `FORM_ENDPOINT` at the top of `js/main.js` (used normally, so visitors stay on the page and see a confirmation message)

Fields sent: `name`, `company`, `email`, `phone`, `topic`, `message`. Name, email, topic, and message are required.

**Topic preselection:** links such as `contact.html?topic=recovery-point` open the form with the topic already chosen. Valid values: `pines-usa`, `collection`, `recovery-point`, `general`. They match the `data-topic` attributes on the `<option>` elements.

Before launch, send one real test message and confirm it arrives in your FormBold inbox and email.

## Analytics (Not Set Up Yet)

The Privacy Policy states that the site uses **cookieless** analytics and sets no cookies. To stay consistent with that, choose a cookieless provider, for example:

- **Cloudflare Web Analytics** (free, cookieless)
- **GoatCounter** (free for small sites, cookieless)
- **Plausible** (paid, cookieless)

**Avoid Google Analytics (GA4) in its default setup.** It sets cookies, which would make the Privacy Policy inaccurate.

Every page has a marked spot in the `<head>`:

```html
<!-- ANALYTICS: paste your cookieless analytics snippet here (see README). -->
```

Paste the provider's snippet there on all 8 pages. The Privacy Policy refers to "our analytics provider" without naming one, so it does not need editing. You may add the provider's name to Section 5 if you like.

## Privacy Policy and Terms of Service

`pages/privacy.html` and `pages/terms.html` were written for this site:

- **No cookies.** The site sets none, and there are no embedded maps, videos, or social widgets that would. The Recovery Point page links out to Google and Apple Maps instead of embedding a map for this reason. If you ever add an embed, update the Cookies section of the Privacy Policy.
- **Data collected:** name, company (optional), email, phone (optional), and message content. The policy states that personal information and analytics data are never sold.
- **Retention:** the policy says information is kept as long as needed for business purposes and as required by law. It does not promise deletion or name a deletion schedule.
- **Service providers named:** FormBold (form), GitHub Pages (hosting), Google Fonts (fonts), and the analytics provider.
- **Age:** the site is not directed to anyone under 18.
- **Terms:** Texas law, with venue in Henderson County, Texas.

Both pages show an effective date of **September 25, 2026**. Update that date whenever you change either document. These documents are a solid starting point, but having a Texas attorney review them is recommended.

## Leadership Photo

The About page shows Brant Borden's bio without a photo. To add one, insert this line on `pages/about.html` inside the leadership section, just above the `<span class="eyebrow">Leadership</span>` line:

```html
<img src="../images/owner-900.jpg" alt="Brant Borden, founder of Pines Energy Group LLC" width="900" height="900" loading="lazy" style="max-width:280px;margin-bottom:32px;">
```

## Site URL and SEO

Canonical links, social sharing tags, structured data, `robots.txt`, and `sitemap.xml` all use this base URL:

```
https://pinesoil.com/
```

**If the domain ever changes** (for example, to `www.pinesoil.com`), find and replace that string across all `.html` files, `robots.txt`, and `sitemap.xml`, and update the `CNAME` file.

Structured data describes Pines Energy Group as an `Organization` with Pines USA and Pines Solutions as sub-organizations. The Recovery Point is described as a `LocalBusiness` with 24-hour hours, which helps it appear correctly in map and local search results.

When you add or remove a page, add or remove it in `sitemap.xml` too.

## Deploying to GitHub Pages

1. Push to the `main` branch.
2. In the repository, go to **Settings > Pages**.
3. Under **Source**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. Save. The site updates a minute or two after each push.

### Custom domain (pinesoil.com)

The `CNAME` file in the project root tells GitHub Pages to serve the site at `pinesoil.com`. Do not delete it. The old `pinesoilcompany.github.io/pinesoilcompany/` address redirects there automatically.

For reference, the DNS records at the domain registrar should be:

- A records for `pinesoil.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- CNAME record: `www` pointing to `pinesoilcompany.github.io`

Once the domain verifies in **Settings > Pages** (it can take up to 24 hours), turn on **Enforce HTTPS** there.

## Removed Pages

These pages were removed in this rework: `fuel-brokerage.html`, `holdings.html`, `pines-green.html`, `farmers.html`, and `restaurants.html`. Useful content from the old Pines Green, restaurant, and farmer pages was moved into the Pines Solutions and Pines USA pages. Old links to the removed pages will return a "404 not found" page.

## Accessibility

- A "skip to main content" link, one `<h1>` per page, and labeled navigation and breadcrumbs
- The mobile menu reports its open/closed state to screen readers and closes with Escape
- FAQs use native `<details>` elements, so they work with a keyboard and without JavaScript
- Tables turn into labeled rows on phones instead of scrolling sideways
- Visible focus outlines on all links, buttons, and form fields
- No motion effects, and transitions are turned off for visitors who prefer reduced motion
