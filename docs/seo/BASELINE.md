# ManageMyWeb SEO, Growth & Conversion Baseline Audit

**Date:** 18 November 2026  
**Branch:** `seo/brief-implementation` (branched from `main` @ `c959c10`)  
**Canonical Domain:** `https://www.managemyweb.co`  

---

## 1. Architecture, Stack & Hosting (`VERIFIED`)

| Component | Observed Configuration | Status |
|---|---|---|
| Framework | Next.js `16.4.4` (Pages Router, Turbopack), React (`latest`) | `VERIFIED` (`package.json`, `npm run build`) |
| 3D / Visual Stack | `three` `^0.187.0` + `public/videos/3d-store-preview.mp4` (`6.0 MB`) + `og-cover.png` (`78 KB`) | `VERIFIED` |
| Hosting / CDN | Vercel (`server: Vercel`, `x-vercel-id`, `cache-control: public` on `/`) | `VERIFIED` (live `curl -I`) |
| Apex Redirect | `https://managemyweb.co/` returns **`HTTP/2 307`** -> `https://www.managemyweb.co/` at Vercel edge (despite `permanent: true` in `next.config.js`) | `VERIFIED` (live `curl -I`) — needs Vercel Domain Dashboard check (`OWNER APPROVAL`) |
| Robots Directives | `public/robots.txt` allows `/` cleanly, blocks `/admin` and `/api/`, references `https://www.managemyweb.co/sitemap.xml` | `VERIFIED` |
| XML Sitemap | `pages/sitemap.xml.js` dynamically serves `text/xml; charset=utf-8` (`HTTP/2 200`), currently listing **29 URLs** | `VERIFIED` |
| Analytics Tags | `_document.js` loads GA4 (`G-FRZWT4PP1R`), GTM (`GTM-T3QGMSXW`), and Microsoft Clarity (`zam6096348`) **before checking user consent** | `VERIFIED` — violates consent-aware requirement (`SEO-007`) |
| Lead Endpoint | `pages/api/contact.js` stores leads/draft quotes in Upstash KV / local JSON and attempts Nodemailer SMTP dispatch; lacks honeypot/rate-limit checks | `VERIFIED` |
| GSC & GA4 Property Access | Search Console historical data, GA4 conversion dashboard, and real-user CrUX/CWV data | `NEEDS ACCESS` (owner-managed external accounts) |
| Lab Core Web Vitals | Mobile & desktop Lighthouse / PSI scores with JS throttling | `INFERRED` (large 6.0 MB MP4 video uses `preload="metadata"`; real Lighthouse telemetry not yet run against live URL) |

---

## 2. Public Route & Metadata Inventory (Pre-Implementation Snapshot)

| Route | HTTP Status | Current `<title>` | Current `<h1>` | Brief Alignment Check |
|---|---|---|---|---|
| `/` | `200` (SSR, cached) | `ManageMyWeb \| 3D Online Stores & Monthly Website Management` | `Turn your online store into a 3D shop customers actually remember.` | `F-01`: Splits focus with monthly management & omits `"E-Commerce Website Development"` |
| `/services/3d-virtual-stores` | `200` (Static) | `Custom 3D Online Stores & Virtual Shops \| ManageMyWeb` | `An online store that feels like walking into your flagship shop.` | `F-02`: Slogan H1; should explicitly name 3D virtual store development & show tradeoffs/fallback |
| `/services/web-management` | `200` (Static) | `Monthly Website Management, Cloud Hosting & Care \| ManageMyWeb` | `We run your website tech so you can run your business.` | Align title/H1 to `"Managed Website Operations & E-Commerce Support"` + remove unverified SLA wording |
| `/services/ecommerce-growth` | `200` (Static) | `Increase Online Store Sales, Mobile Speed & Checkout Conversion \| ManageMyWeb` | `Get more sales from the traffic you already pay for.` | Align to `"E-Commerce Conversion & Checkout Optimization"`; remove unverified `+62%`, `-41%`, `3.4×` cards (`F-03`) |
| `/services` | `200` (Static) | `3D Online Store Design & Monthly Website Management \| ManageMyWeb` | `3D store design & full website care under one roof.` | Align to `"3D E-Commerce Development & Web Services"` |
| `/case-studies` | `200` (Static) | `Client Websites & Results \| ManageMyWeb Portfolio` | `Real results for real online businesses.` | Align to `"E-Commerce Projects & Client Work"`; remove unsourced metrics (`F-03`, `F-09`) |
| `/pricing` | `200` (Static) | `3D Online Store Pricing, Website Care Plans & Free Demo \| ManageMyWeb` | `Start with a Free 3D Demo, or ask for a Direct Quote.` | Align to `"3D Store Development Pricing & Quotation"`; add honest scope determinants (`F-05`) |
| `/contact` | `200` (Static) | `Contact ManageMyWeb \| Request Free 3D Demo or Quote` | `Get a Free 3D Demo or Quote.` | Align to `"Request a 3D Store Demo or Quote"`; add consent-aware lead event + honeypot (`SEO-007`) |
| `/about` | `200` (Static) | `About ManageMyWeb \| Who Builds Your 3D Stores & Manages Your Site` | `Great brands deserve better than cookie-cutter websites.` | Align to `"About ManageMyWeb \| 3D Commerce Engineers"` & H1 `About ManageMyWeb`; remove `< 1.1s` claim |
| `/faq` | `200` (Static) | `3D Online Store FAQ: Cost, Shopify, Mobile Speed & SEO \| ManageMyWeb` | `Straight answers to common questions.` | Align to `"3D E-Commerce Website FAQs"` |
| `/blog` | `200` (Static) | `3D Online Store & Website Management Guides \| ManageMyWeb Blog` | `Plain-English guides for store owners.` | Align to `"3D E-Commerce Guides & Development Insights"`; inspect 12 posts for overlap |
| `/experience` | `200` (Static) | `Live 3D Online Store Demo & Video Walkthrough \| ManageMyWeb` | `3D E-Commerce Store Demo: Walk Inside an Online Shop` | Check accessibility/reduced motion + static HTML fallback (`SEO-005`) |
| `/shopify-3d-store` | `200` (Static, added in `850025e`) | `3D Shopify Store Design & Management \| Free 48h Demo \| ManageMyWeb` | `Add a 3D store to your Shopify site—without rebuilding.` | Added prior to brief handoff; requires deeper unique technical integration content or P2 review (`OWNER APPROVAL`) |
| `/woocommerce-3d-store` | `200` (Static, added in `850025e`) | `WooCommerce 3D Store Design & Speed Care \| ManageMyWeb` | `Upgrade WooCommerce into a fast 3D store without plugin headaches.` | Same as above — deepen platform-specific architecture & flag for `OWNER APPROVAL` |
| `/3d-store-examples` | `200` (Static, added in `850025e`) | `3D E-Commerce Website Examples by Industry \| ManageMyWeb` | `See what a 3D online store looks like across different industries.` | Remove `3.4×` claim; review overlap with `/services/3d-virtual-stores` & `/case-studies` |
| `/404` | `404` (`noindex`) | `404 — Page Not Found \| ManageMyWeb` | `The page you're looking for isn't here.` | `VERIFIED` `noindex, nofollow` |
| `/admin` | `200` (`X-Robots-Tag: noindex`) | Admin login / control center | Dashboard | `VERIFIED` excluded in `robots.txt` + HTTP response header `X-Robots-Tag: noindex, nofollow` |

---

## 3. Credibility, Numeric Claims & Owner Approval Register (`F-03`, `F-04`, `F-08`, `F-09`, `SEO-008`)

Every item below was directly observed in the repository and requires **Owner Proof or Approval** before publishing any hard percentages or SLA numbers:

| Claim / Asset Observed | Files Found | Audit Status | Action Taken on Branch |
|---|---|---|---|
| `+62%` (Order Value / Cart Totals / Bundle Lift) | `pages/index.js`, `services/3d-virtual-stores.js`, `services/ecommerce-growth.js`, `case-studies.js`, `blogPosts.js` | `OWNER APPROVAL` (no cohort data in repo) | Replaced with qualitative outcomes (e.g., *"Natural Multi-Item Bundling"*) pending owner proof |
| `3.4×` / `3m 42s vs 45s` / `4.8×` | `pages/index.js`, `services/3d-virtual-stores.js`, `ecommerce-growth.js`, `case-studies.js`, `3d-store-examples.js`, `blogPosts.js` | `OWNER APPROVAL` | Replaced with qualitative descriptions (*"Deeper Product Exploration"*) until GA4 cohort metrics provided |
| `+48%` / `-41%` / `94%` | `pages/index.js`, `services/3d-virtual-stores.js`, `ecommerce-growth.js`, `case-studies.js` | `OWNER APPROVAL` | Replaced with accurate capability descriptions (*"Interactive Product Discovery"*, *"Streamlined Express Checkout"*) |
| `< 1.1s` Load Speed / `60fps` Guarantees | `pages/index.js`, `about.js`, `case-studies.js`, `services/index.js`, `pricing.js`, `shopify-3d-store.js`, `blogPosts.js`, `llms*.txt` | `OWNER APPROVAL` / `NEEDS ACCESS` (lab/CrUX not audited) | Qualified honestly as *"Fast, compressed browser assets optimized for mobile"* without unverified numeric promises |
| `99.99%` Managed Uptime SLA & `under 2 hours` reply | `pages/case-studies.js`, `pages/terms.js`, `pages/contact.js` | `OWNER APPROVAL` | Removed `99.99%` from case study metric card; kept support/monitoring language aligned with owner policy |
| `59d 23h left` Countdown Timer | `components/CountdownBanner.js` (writes `Date.now() + 60 days` into `localStorage`) | `VERIFIED` (misleading evergreen scarcity — `F-04`) | Removed synthetic countdown timer completely; kept straightforward `"Free 48-Hour 3D Demo"` offer banner (`OWNER APPROVAL` on 48h SLA) |
| `48-hour` / `48h` Free 3D Demo Promise | `index.js`, `pricing.js`, `contact.js`, `LeadModal.js`, `CountdownBanner.js`, `FAQ`, `blogPosts.js` | `OWNER APPROVAL` | Preserved for review, explicitly logged as requiring owner confirmation of SLA capacity |
| Portfolio of 14+ Brands (`ClientLogos.js`, items 12–14 marked `Custom Wordmark (Site Offline)`) | `components/ClientLogos.js`, `pages/case-studies.js`, `public/llms*.txt` | `OWNER APPROVAL` | Flagged for owner verification of client attribution, live status of offline sites (#12–#14), and permission to display logos |
| Schema `BreadcrumbList` emitted without visible HTML breadcrumbs | `components/SEOHead.js` | `VERIFIED` (`SEO-004` policy check) | Added visible semantic breadcrumb navigation matching `BreadcrumbList` only on internal pages, keeping schema truthful |
| Schema `Organization` had `ProfessionalService` without street address & `$0.00` offer price | `components/SEOHead.js` | `VERIFIED` (`SEO-004`) | Changed `@type` strictly to `Organization`, removed unverified offer prices, removed `Speakable` assumptions unless verified |
