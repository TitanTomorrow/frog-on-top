# Frog On Top

Marketing site for **Frog On Top**, a CNC fabrication shop (laser cutting, bending and welding) for metal prototypes and small runs of up to five parts.

Built with **Vite + React + TypeScript + Tailwind CSS v4**. All illustrations (chibi frogs, forest, sheet-metal bracket, icons) are hand-built inline SVG components — no image assets.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Business details, copy, services, materials, stats | `src/config/site.ts` (values marked **PLACEHOLDER** need real info) |
| Colors & fonts (Tailwind theme tokens) | `src/index.css` (`@theme`) |
| Page sections | `src/components/sections/` |
| Frog mascot + accessories | `src/graphics/Frog.tsx` |
| Forest scenery / treeline dividers | `src/graphics/ForestBackground.tsx` |
| Quote-form submission | `src/lib/inquiries.ts` |

## Deploy to GitHub Pages

Live at **https://titantomorrow.github.io/frog-on-top/**.

Deployment is automatic on every push to `main` via `.github/workflows/deploy.yml`
(repo **Settings → Pages → Source** is set to **GitHub Actions**).

Because the site lives under the `/frog-on-top/` path, `vite.config.ts` sets `base: '/frog-on-top/'`.
Local `npm run dev` / `npm run preview` serve it at `http://localhost:5173/frog-on-top/` likewise.

### Switching to the frogon.top domain later

1. In `vite.config.ts`, change `base` to `'/'`; create `public/CNAME` containing `frogon.top`; update the canonical/og URLs in `index.html` and `site.url` in `src/config/site.ts`.
2. In **Settings → Pages → Custom domain**, enter `frogon.top`.
3. At your registrar, point DNS at GitHub Pages:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www` → `titantomorrow.github.io`
4. Once the certificate is issued, tick **Enforce HTTPS**.

## Adding Firebase (contact form → Firestore)

The quote form calls `submitInquiry()` in `src/lib/inquiries.ts`. Today it opens the visitor's email app with the request pre-filled. To store requests in Firestore instead:

1. `npm install firebase`
2. Create `src/lib/firebase.ts` that calls `initializeApp({...})` using `import.meta.env.VITE_FIREBASE_*` (see `.env.example`) and exports `db = getFirestore(app)`.
3. Replace the body of `submitInquiry()` with an `addDoc(collection(db, 'inquiries'), {...})` call and return `'firestore'` (sketch in the file's comment).
4. Add Firestore rules that only allow **creating** documents in `inquiries` (no public reads), and consider enabling App Check to limit spam.
5. Add the `VITE_FIREBASE_*` values as GitHub Actions secrets and pass them to the build step in `deploy.yml`.

The form UI already handles the `'firestore'` success state, so it doesn't need to change.
