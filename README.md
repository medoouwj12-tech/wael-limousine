# Wael Limousine — وائل ليموزين

Premium chauffeur service website for Giza & Cairo. Bilingual (AR/EN), PWA-ready, SEO-optimized.

## Tech Stack

- **HTML5** (semantic, ARIA-labeled, RTL/LTR aware)
- **Tailwind CSS 3** (compiled via PostCSS — no CDN)
- **Vanilla JavaScript** (no frameworks, ES5-compatible)
- **PWA**: service worker + web manifest (installable on Android/iOS)
- **SEO**: LocalBusiness JSON-LD, Open Graph, Twitter Card, sitemap, robots.txt

## Project Structure

```
.
├── index.html              ← Main page
├── manifest.webmanifest    ← PWA manifest
├── sw.js                   ← Service worker
├── robots.txt              ← SEO
├── sitemap.xml             ← SEO
├── package.json            ← Build scripts
├── tailwind.config.js      ← Tailwind config (colors, fonts, animations)
│
├── css/
│   ├── input.css           ← Tailwind entry (imports components)
│   ├── components.css      ← Custom theme tokens + components
│   └── styles.css          ← Compiled output (committed)
│
├── js/
│   └── script.js           ← i18n, theme, form, animations, SW reg
│
├── images/
│   ├── cars/               ← 9 fleet photos
│   ├── og-image.png        ← 1200×630 social preview
│   ├── favicon-16x16.png   ← Browser tab icon
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   └── apple-touch-icon.png
│
└── icons/
    ├── icon-192.png        ← PWA icon
    ├── icon-512.png
    └── icon-maskable-512.png  ← Android adaptive icon
```

## Build

The project ships a pre-compiled `css/styles.css`. To rebuild after editing:

```bash
npm install        # one-time
npm run build      # production minified output
npm run dev        # watch mode for local development
```

`npm run dev` is useful while editing `index.html`, `js/script.js`, or `tailwind.config.js` — Tailwind will recompile on save.

## Deploy

This is a static site. Drop the whole folder (except `node_modules/`) onto any static host:

- **Netlify** — drag & drop the folder, zero config
- **Vercel** — `vercel.json` is included; just push to a repo and import
- **GitHub Pages** — push to a repo, enable Pages
- **Hostinger / cPanel** — upload via FTP to `public_html/`
- **Nginx / Apache** — point a vhost at the folder

### Vercel deploy

A `vercel.json` is preconfigured:
- `buildCommand`: `npm run build` (compiles Tailwind)
- `outputDirectory`: `.` (serves the project root as static files — no `public/` folder needed)
- `framework`: `null` (treated as a static site, not auto-detected as Node)

`.vercelignore` is also included to skip dev scripts, screenshots, and `node_modules/`.

If Vercel still fails with `No Output Directory named "public"`, delete `.vercelignore` and `vercel.json`, then drag-drop the project folder onto vercel.com/new (it'll auto-detect as a static site).

### Important before going live

1. **Update domain** in:
   - `index.html` → `<meta property="og:url">`
   - `sitemap.xml` → `<loc>` and `image:loc` URLs
   - `robots.txt` → Sitemap URL
   - `index.html` → JSON-LD `@id`, `url`, `telephone`, `image`
2. **Set the real domain** (replace `https://waellimousine.com/` everywhere).
3. **HTTPS is required** for the service worker to register. PWA install only works over HTTPS (except `localhost`).
4. **Test PWA install** on a real Android phone (Chrome → ⋮ → Install app).

## Features

### Bilingual (AR/EN)
- Full translation dictionary in `js/script.js` (I18N object)
- AR is default (RTL); EN flips to LTR
- Persisted in `localStorage` (`wl_lang`)

### Theme (Dark/Light)
- CSS variables in `components.css` for both themes
- Smooth 500ms transition
- Persisted in `localStorage` (`wl_theme`)

### Booking → WhatsApp
- Form validates: required fields, Egyptian phone format (`01X XXXXXXXX`), future date
- On submit: opens WhatsApp with a formatted pre-filled message
- Toast notification on success
- Form fields: name, phone, date, time, car, pickup, dropoff

### PWA
- Installable on Android & iOS (add to home screen)
- Offline-friendly (service worker caches the shell)
- Custom branded icons (192, 512, maskable 512)
- Apple touch icon configured

### SEO
- LocalBusiness JSON-LD with full address, geo, hours, services, rating
- Open Graph + Twitter Card meta (rich previews on WhatsApp, Facebook, Twitter)
- `sitemap.xml` with bilingual alternates
- `robots.txt` allowing all crawlers
- `geo.*` meta tags for local search

### Accessibility
- Skip-link to main content
- `:focus-visible` outline (gold, brand-aware)
- `aria-label` on icon-only buttons
- `aria-live` on toast notifications
- `prefers-reduced-motion` support
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- Form labels properly linked with `for`/`id`

### Performance
- Compiled CSS (33KB minified) — no runtime Tailwind
- Lazy-loaded images (`loading="lazy"`)
- Deferred script (`<script defer>`)
- `preconnect` to Google Fonts
- `decoding="async"` on images
- Service worker caches static assets

## Fleet

9 vehicles, all in `images/cars/`:

1. Mercedes S-Class Maybach
2. Mercedes G63 AMG
3. Mercedes E-Class
4. Mercedes GLC 300
5. Kia Carnival (7-seater family van)
6. MG RX5 Plus
7. Hyundai Elantra 2024
8. Toyota Corolla
9. Foton View (family van)

To swap any photo, replace the file with the same name (keep `.jpg`).

## Customization

- **Phone / Email / Address**: search `+201140999215`, `waelalshouga@gmail.com`, and `المنشي` in `index.html` and `js/script.js`
- **Translations**: edit the `I18N` object in `js/script.js`
- **Colors**: edit `tailwind.config.js` (theme.extend.colors) and `components.css` (CSS vars in `:root` / `[data-theme="light"]`)
- **Testimonials**: edit the `TESTIMONIALS` array in `js/script.js`
- **Fleet cars**: edit the `FLEET` array in `js/script.js` and add the matching image in `images/cars/`

## Contact

- 📞 +20 114 099 9215
- 📧 waelalshouga@gmail.com
- 📍 El-Monshi, Nile Corniche, Giza
