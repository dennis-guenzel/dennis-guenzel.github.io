# Personal website — Dennis Günzel

A professional single-page website for Dennis Günzel, LL.M., German jurist.

- **Design:** editorial / magazine layout, warm cream + deep navy palette, refined classical typography (Cormorant Garamond + Manrope).
- **Tech:** plain HTML / CSS / JavaScript. No build step. No dependencies at runtime beyond Google Fonts.
- **Hosting:** designed to be hosted on **GitHub Pages** as-is. Drop the contents of this folder into a repository, enable Pages, done.
- **Performance:** ~500 KB initial page weight (mostly photos), zero JavaScript frameworks. Loads fast on mobile networks.
- **Accessibility:** respects `prefers-reduced-motion`, semantic HTML, proper headings, focusable links, alt text on the portrait, print styles included.

---

## Folder structure

```
/
├── index.html                    ← the single page
├── styles.css                    ← all styling
├── script.js                     ← small enhancements (reveals, modal, year)
├── README.md                     ← this file
│
├── images/
│   ├── dennis-hero.jpg           ← hero portrait (Dennis 14, enhanced)
│   ├── dennis-hero-mobile.jpg    ← smaller variant for phones
│   ├── dennis-portrait.jpg       ← close portrait (Dennis 7, enhanced) — currently unused, available for future use
│   ├── dennis-banner.jpg         ← wide Bonn/Rhine banner (Dennis 11, enhanced)
│   ├── dennis-suit.jpg           ← suit alternative (Dennis 4, enhanced) — available for future use
│   └── og-image.jpg              ← social-share preview image (1200×630)
│
└── assets/
    ├── CV-Dennis-Guenzel.pdf     ← CV, linked from hero button
    ├── qrcode.png                ← QR code (navy on white)
    ├── qrcode-transparent.png    ← QR code (navy on transparent)
    └── generate_qr.py            ← script to regenerate the QR if URL changes
```

---

## Deploying to GitHub Pages

### Option A — user site (simplest, recommended)

If you create a repository called exactly `<your-github-username>.github.io`,
GitHub will serve it automatically at `https://<your-github-username>.github.io`.

1. Create a new repository on GitHub named `dennis-guenzel.github.io`
   (replace `dennis-guenzel` with your actual GitHub username).
2. Upload the contents of this folder to the root of the repository.
3. The site goes live at `https://dennis-guenzel.github.io` within a minute.
   Nothing else to configure.

### Option B — project site

If you want to host it under any other repository name (e.g. `personal-site`):

1. Create the repository and push the contents of this folder.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, branch
   `main` (or `master`), folder `/ (root)`. Save.
4. Wait ~1 minute. The URL will be
   `https://<your-username>.github.io/<repo-name>/`.

### Custom domain

If you have a domain (e.g. `dennis-guenzel.de`):

1. Add a file called `CNAME` in the repository root containing just the
   domain — e.g. `dennis-guenzel.de`.
2. Configure your domain's DNS:
   - `A` records for the apex domain pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - or a `CNAME` for `www` pointing to `<your-username>.github.io`
3. In the repo's **Settings → Pages**, set the custom domain and enable
   "Enforce HTTPS" once the certificate has been issued.

---

## The QR code

The QR code in the contact section currently encodes:

```
https://dennis-guenzel.github.io
```

This is a sensible default for a GitHub user site. **If you decide to host
under a different URL** (a custom domain, a project sub-path, etc.), you'll
want to regenerate the QR code so it points to the real address.

To regenerate:

```bash
# from the repository root
pip install qrcode pillow
# edit the URL variable inside assets/generate_qr.py
python3 assets/generate_qr.py
```

That overwrites `assets/qrcode.png` and `assets/qrcode-transparent.png` with
new codes encoding the new URL. No other changes are needed — the page
already references those files.

---

## Editing the content

All copy lives in **`index.html`** and is plain HTML — no templating, no
build, no markdown to translate. To change a passage, open the file, find
the text, and edit it directly. Comments above each section (e.g.
`<!-- ============ HERO ============ -->`) make the structure easy to scan.

A few common edits:

- **Tagline** — search for `Verlässlichkeit` near the top.
- **Hero introduction paragraph** — inside `<p class="hero__lede">`.
- **Practice cards** — each is a `<article class="practice-card">` block;
  edit the heading and `<p>` text.
- **CV timeline** — the `<ol class="timeline">` and the
  `<ul class="station-list">` sections.
- **Contact details** — inside `<dl class="contact-list">`.
- **Legal notice / Impressum** — inside `<dialog id="legal">` at the bottom
  of the file. **Note:** for a German legal presence, the Impressum block
  may need a full street address. Check current TMG / DSA requirements and
  update accordingly before publishing under a German jurisdiction.

### LinkedIn link

The LinkedIn URL is currently:

```
https://www.linkedin.com/in/dennis-günzel-483220226
```

The `ü` in the URL is correct (LinkedIn supports unicode handles), but
some clients prefer percent-encoded form:

```
https://www.linkedin.com/in/dennis-g%C3%BCnzel-483220226
```

Both work. If you ever switch to a vanity URL, just replace the `href`
in the contact section.

---

## Colours, fonts, and design tokens

Everything stylistic is centralised at the top of `styles.css` in CSS
custom properties:

```css
:root {
  --paper:        #F4F1EB;   /* warm cream — primary background */
  --paper-deep:   #ECE7DC;   /* slightly darker paper */
  --ink:          #0E1B2C;   /* deep navy — primary "ink" */
  --slate:        #3C4862;   /* mid blue-gray */
  --brass:        #A8895F;   /* small accents (years, numerals) */

  --serif: "Cormorant Garamond", Georgia, serif;
  --sans:  "Manrope", -apple-system, system-ui, sans-serif;
}
```

Change any of these in one place and the entire site updates.

---

## A German version

The site was written in English first by request, leaving room for a German
version later. The cleanest way to add one:

1. Copy `index.html` to `index.de.html` and translate the copy in place.
2. Add a small language switcher in the top bar — e.g. a `EN / DE` toggle
   linking between the two files.
3. Set the `<html lang="…">` attribute on each file accordingly.

If you'd rather have a `/de/` sub-path, create a `de/` folder and put
`index.html` in it. GitHub Pages will serve it at
`https://your-site/de/`.

---

## Browser support

Tested on current Chromium, Firefox, and WebKit (Safari). Uses
`backdrop-filter`, CSS `clamp()`, `<dialog>`, and `IntersectionObserver` —
all widely supported in browsers from 2022 onward. Graceful fallbacks are
in place for older browsers (no animations, but content remains
fully readable).

---

## Credits

- **Photography:** Dennis Günzel, lightly enhanced for web display
  (contrast and sharpness; no compositing or AI generation).
- **Fonts:** Cormorant Garamond and Manrope, served from Google Fonts.
- **Quote:** Desmond Tutu — *"Don't raise your voice. Improve your argument."*
