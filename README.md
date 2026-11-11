# Seerat-un-Noor

A responsive, multilingual static website starter for introductory learning about the Sahaba (Companions) of Prophet Muhammad ﷺ.

## Included
- `index.html` — language selection landing page
- `en/`, `ur/`, `ar/` — English, Urdu and Arabic pages
- `assets/style.css` — responsive design, animations, dark mode styling
- `assets/app.js` — language rendering, search, category filters and biography view
- `assets/data.js` — editable multilingual content

## Preview locally
Open `index.html` in a browser. For best results, use a simple local server (for example VS Code Live Server).

## Free publishing
Upload the contents of this folder to GitHub Pages, Cloudflare Pages, or Netlify. No paid domain is required; each offers a free subdomain.

## Important content note
This is an introductory starter, not a scholarly reference work. Verify all expanded biographies, quotations, dates and narrations against reliable primary sources and qualified scholarship before publication. Do not add unverified narrations or attribute sayings without a source.

## Editing content
Edit `assets/data.js`. Each language contains the same `cards` order:
`[id, name, shortBiography, knownFor, category]`.
