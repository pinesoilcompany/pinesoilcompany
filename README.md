# Pines Oil Company Website

Static website for Pines Oil Company, Athens Texas. Built for GitHub Pages hosting.

## File Structure

```
pines-oil/
├── index.html              # Homepage
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # All JavaScript
├── pages/
│   ├── restaurants.html    # Restaurant pickup program page
│   ├── farmers.html        # Buyers / biodiesel product page
│   └── about.html          # About / owner page
└── images/                 # Add your images here (create this folder)
    └── owner.jpg           # Add your photo here for the About page
```

## Deploying to GitHub Pages

1. Create a new GitHub repository named `pinesoil` (or `pines-oil-company`, whatever you prefer)
2. Upload all files from this folder, maintaining the folder structure
3. Go to the repository Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Select the `main` branch and `/ (root)` folder
6. Click Save
7. Your site will be live at: `https://yourusername.github.io/repository-name/`

## Adding a Custom Domain (pinesoil.com)

1. In your GitHub Pages settings, enter `pinesoil.com` under "Custom domain"
2. At your domain registrar, add these DNS records:
   - A record: 185.199.108.153
   - A record: 185.199.109.153
   - A record: 185.199.110.153
   - A record: 185.199.111.153
   - CNAME record: www -> yourusername.github.io
3. Enable "Enforce HTTPS" once the domain verifies (may take up to 24 hours)

## Updating the About Page

Open `pages/about.html` and find the following placeholders:

- `[Owner Name]` - Replace with your full name (appears in two places)
- `[This section is reserved for your personal biography...]` - Replace with your actual bio text
- `[Add a short personal statement or philosophy quote here...]` - Add your quote

### Adding Your Photo

1. Create an `images/` folder in the root of the project
2. Add your photo as `images/owner.jpg` (or any format)
3. In `pages/about.html`, find the owner photo section and replace:

```html
<!-- existing SVG placeholder -->
<svg ...>...</svg>
```

With:

```html
<img src="../images/owner.jpg" alt="Your Name" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
```

And remove the background gradient from `.owner-photo` in CSS if desired.

## Contact Form

The contact form uses a `mailto:` link as a fallback (no server required for static hosting).
When a visitor submits the form, it opens their default email client pre-filled with the message.

For a true form submission without opening a mail client, consider free services like:
- **Formspree** (formspree.io) - free tier available
- **Netlify Forms** (if you move hosting to Netlify)
- **EmailJS** (emailjs.com) - free tier available

## Updating Content

All pages are plain HTML. Open any `.html` file in a text editor to update:
- Business facts, service area, pricing notes
- Timeline events on the About page
- FAQ answers on the Farmers page
- Any contact details if they change

## Phone / Email

Current contact info embedded throughout the site:
- Phone: (972) 740-7232
- Email: info@pinesoil.com

To change, find-and-replace across all HTML files.
