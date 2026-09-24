# Pines Energy Group website

A static corporate website for Pines Energy Group LLC in Athens, Texas. The company has two divisions: **Pines USA** (biodiesel and fuel) and **Pines Solutions** (oil recycling and cleaning). Pines Solutions also operates **Recovery Point**.

The site uses ordinary HTML, CSS, and a small JavaScript file. It works on GitHub Pages, including the existing `/pinesoilcompany/` project path. No framework, dependency installation, database, or server-side application is needed to host it.

## Pages

| Page | Public file | Purpose |
| --- | --- | --- |
| Home | `index.html` | Parent company, two divisions, and service entry points |
| About | `pages/about.html` | Company structure and a shortened existing founder story |
| Pines USA | `pages/pines-usa.html` | Biodiesel production, fuel inquiries, and questions |
| Pines Solutions | `pages/pines-solutions.html` | Oil collection, recycling, cleaning inquiries |
| Recovery Point | `pages/recovery-point.html` | Location, access hours, directions, and general visit information |
| Contact | `pages/contact.html` | Phone, email, address, hours, and inquiry form |
| Privacy Policy | `pages/privacy-policy.html` | Information practices, providers, retention, and privacy requests |
| Terms of Service | `pages/terms-of-service.html` | Website terms and the distinction from actual service agreements |

The removed fuel brokerage and holdings pages are no longer present. Existing `pines-green.html` and `restaurants.html` bookmarks redirect to Pines Solutions; `farmers.html` redirects to Pines USA. `404.html` directs other missing-page visitors to the company homepage. These static redirects are browser redirects, not HTTP 301 responses.

## Preview locally

With Node.js 18 or later installed:

```sh
npm start
```

Open **http://127.0.0.1:4173**. The preview also supports **http://127.0.0.1:4173/pinesoilcompany/** to check GitHub Pages project links. Stop the server with Ctrl+C. The server listens on this computer only.

If `npm` is unavailable, use `node scripts/serve.mjs`. There are no packages to install for previewing, building, or the basic checks.

## Where to make changes

The published HTML is generated and committed to the repository. Edit the source below, run the build, and include both the source and generated files in your commit. Direct edits to generated HTML will be overwritten by the next build.

| File | What to edit |
| --- | --- |
| `site.config.mjs` | Company contact information, hours, base URL, policy date, and Formbold endpoint |
| `scripts/build.mjs` | Page content, shared header/footer, navigation, SEO, and structured data |
| `scripts/legal.mjs` | Privacy Policy and Terms of Service text |
| `css/site.css` | Shared responsive layout and functional components |
| `css/original-style.css` | Restored original visual style: navy gradients, crimson accents, typography, division panels |
| `css/fonts.css` | Locally hosted Playfair Display, Source Sans 3, and Bebas Neue fonts |
| `js/main.js` | Mobile navigation and inquiry form behavior |
| `images/favicon.svg` | Temporary browser-tab icon |
| `scripts/social-cover.html` | Design source for the social sharing image |
| `images/social-cover.png` | Current 1200 × 630 social sharing image |

After editing content or settings:

```sh
npm run build
npm run check
```

Building also updates `sitemap.xml`, `robots.txt`, the legacy redirects, and the 404 page. The build uses only Node's built-in modules. It does not regenerate the social image; browser QA does that from `scripts/social-cover.html`.

The design follows the original website: deep navy gradients, crimson accents, blue-tinted light sections, uppercase navigation, prominent rectangular buttons, and the original Playfair Display, Source Sans 3, and Bebas Neue font families. Headings use lighter 600/700 weights instead of the original hero’s 900 weight. Fonts and licenses live in `images/fonts/` and are served locally without third-party font requests. Pines Solutions and Recovery Point use pine green accents. The two division panels have static accent borders; there are no floating elements, glow effects, scroll reveals, or moving tickers. The header uses the company name without a logo.

## Current operating details

- Company: **Pines Energy Group LLC**, registered with the Texas Secretary of State.
- Address: **3855 TX-31, Athens, TX 75752**.
- Phone: **(512) 640-9102**.
- Email: **brant@pinesoil.com**.
- Company hours: **5:00 AM–10:00 PM Central**.
- Recovery Point access: **4:00 AM–midnight Central**.

Days of operation and holiday exceptions have not been specified. The website therefore does not assume a seven-day schedule and asks visitors to call to confirm operating days. Update `hoursNote` in the config when those details are settled. Recovery Point access and company contact hours are deliberately listed separately.

## Connect Formbold

**The original repository did not contain a Formbold submission endpoint.** The integration is implemented, but `formboldEndpoint` is currently blank. Until it is supplied, the form prepares an email and explicitly tells visitors that nothing has been sent. Visitors then click “Open prepared email” and send it using their own email app. Phone and email links remain available.

To activate direct submission:

1. In the Formbold dashboard, open the intended form's integration settings.
2. Copy its public submission endpoint, shaped like `https://formbold.com/s/YOUR_FORM_ID`.
3. Set `formboldEndpoint` in `site.config.mjs` to that URL. Do not enter an API token, password, or private key.
4. Run `npm run build` and publish the updated files.
5. Confirm the intended recipient, allowed domains, spam settings, and field requirements in Formbold. This form sends `name`, `company`, `email`, `phone`, and `service`; it does not collect a free-text message or file uploads.
6. Send an intentional test inquiry on the deployed domain and confirm its arrival in the Formbold dashboard and intended inbox. The local QA uses intercepted responses and does not verify account delivery.

With Formbold configured, the form sends a JSON POST and checks the provider’s HTTP response, following its official client’s approach. Explicit errors in a JSON response are also handled. It preserves entered details on failure, provides a prepared-email alternative, and blocks duplicate clicks while sending. With JavaScript disabled, the configured form posts directly to Formbold; the email fallback version provides direct contact links and cannot accidentally submit personal details into the page URL.

Implementation references: [Formbold setup](https://formbold.com/docs), [HTML examples](https://formbold.com/docs/examples), and [official client submission handling](https://github.com/FormBold/formbold-react/blob/main/src/useForm.ts).

## Analytics and privacy

The brief states that the website uses analytics, does not sell data, and uses no cookies. **No analytics script or provider configuration was found in the supplied repository, and no provider has yet been specified.** No new tracker has been installed. Hosting-level analytics may be separate from these files.

The Privacy Policy reflects the supplied business practices, describes technical data separately from inquiry information, identifies Formbold, and provides privacy-request contact methods. It accurately states that form submissions have no automatic deletion schedule instead of promising deletion that does not happen. Ordinary retention does not override applicable privacy rights.

Before publishing, confirm the actual analytics provider, its collected fields and retention settings, and that its configuration is cookieless. Keep the policy aligned with that setup. The current first-party code sets no cookies and uses no local storage or session storage; it does not load third-party fonts, maps, trackers, or embedded forms. Directions open an external map only when a visitor follows the link. Formbold is contacted only upon submission when enabled. External providers' own websites may use cookies.

The policies are complete website drafts based on the supplied practices, not a determination that a particular privacy law applies to the company. Have the company’s legal reviewer check them against the actual business practices and service agreements before publication. No invented product certifications, emissions savings, geographic coverage, free collection promises, or prices have been added.

Policy references reviewed: [Texas Attorney General privacy guidance](https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint/consumer-privacy-rights/texas-data-privacy-and-security-act) and [Formbold Privacy Policy](https://formbold.com/privacy-policy).

## Add the company logo later

The current `images/favicon.svg` is a temporary navy/red **P** monogram, not a finished company logo. Replace it with the approved icon when ready. Keep the filename to avoid template edits, or update the icon link in `scripts/build.mjs` and rebuild. The header does not reserve an empty logo space.

Existing owner photos and the previous `og-cover.jpg` are preserved as source assets but are not displayed. Current social metadata points to `social-cover.png`; it does not present a social image as an official organization logo.

## Publish

This work changes the local website; it does not automatically commit, push, or deploy it. Build and check first, then commit the reviewed changes and publish using the repository's existing GitHub Pages setup. Serve the repository root, since `index.html`, `pages/`, `css/`, `js/`, and `images/` contain the finished site. A deployment-time build is unnecessary when generated files are included.

The current canonical base is `https://pinesoilcompany.github.io/pinesoilcompany/`. If the production domain changes, update `siteUrl` in `site.config.mjs` (keep the trailing slash) and rebuild. This updates canonical URLs, social metadata, sitemap references, structured data, and the missing-page homepage link. A `robots.txt` inside a GitHub Pages project subdirectory is informational; crawlers normally look for robots.txt at the domain root. Submit the sitemap directly if needed.

## Validation

`npm run check` checks internal links and anchors, local assets, duplicate IDs, structured data JSON, legal-page links, and removal of the retired divisions.

`scripts/browser-check.mjs` runs optional Playwright browser checks. Install Playwright in your development environment or set `PLAYWRIGHT_MODULE` to an existing package path, start the local server, then run:

```sh
node scripts/browser-check.mjs
```

By default it uses Microsoft Edge; `BROWSER_CHANNEL` can select another installed supported channel. `PREVIEW_URL` can override the local preview URL. It checks all eight pages at 1440, 1024, 768, 390, and 320 pixels, saves desktop/mobile screenshots, checks menu and keyboard behavior, FAQs, redirects, and form states using mocked responses. It also checks no-JavaScript navigation and browser storage. All form tests are intercepted locally and never send an inquiry. Results and screenshots go to `.qa/`, which is excluded from Git.
