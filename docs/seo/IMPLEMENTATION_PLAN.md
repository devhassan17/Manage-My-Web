# ManageMyWeb SEO, Growth & Conversion Implementation Plan

**Brief Reference:** SEO, Organic Growth & Conversion Implementation Brief (18 November 2026)  
**Working Branch:** `seo/brief-implementation`  

---

## Phased Rollout Schedule

### Phase A: Diagnostic, Credibility & Safe P0 Foundations
1. **`SEO-001` — Baseline Audit**: Document observed stack, routes, redirects, metadata, schema, tracking state, and unknowns in `/docs/seo/BASELINE.md`.
2. **`SEO-008` — Claim & Urgency Cleanup (Owner Gate Ready)**:
   - Remove the evergreen fake countdown timer (`59d 23h left` in `localStorage`) from `components/CountdownBanner.js`.
   - Replace unaudited numeric claims (`+62%`, `3.4×`, `+48%`, `-41%`, `94%`, `< 1.1s`, `60fps` guarantees, `99.99%`, `4.8×`, `70%`) with truthful, specific qualitative explanations until the owner provides verified GA4/CrUX data.
   - Flag offline client domains (`thehiddenepidemic.com`, `lawncandycards.ca`, `empiresproperty.com`) and portfolio permissions for Owner Sign-off.
3. **`SEO-002` — Technical Crawl, Redirects & Indexing**:
   - Ensure all public routes return HTTP `200`, clean self-referential canonicals (`https://www.managemyweb.co/...`), proper `404` on unknown routes, and `noindex` on `/404` and `/admin`.
   - Maintain a clean `sitemap.xml` listing strictly indexable canonical URLs referenced by `robots.txt`.
   - Log Vercel's edge `307` redirect (`managemyweb.co` -> `www.managemyweb.co`) for manual Vercel Dashboard update (`308 Permanent Redirect`).
4. **`SEO-003` & `SEO-101` — Homepage Positioning & Page-by-Page Metadata / H1 Matrix**:
   - Align `/` strictly around **3D e-commerce website development** (`3D E-Commerce Website Development | ManageMyWeb` + explicit service H1), positioning Managed Web Operations clearly as a secondary service.
   - Align every priority route (`/services/3d-virtual-stores`, `/services/web-management`, `/services/ecommerce-growth`, `/services`, `/case-studies`, `/pricing`, `/contact`, `/about`, `/faq`, `/blog`) with Section 5 metadata & single-H1 hierarchy.

### Phase B: Engineering Quality, Structured Data, Accessibility & Measurement
5. **`SEO-005` — 3D Accessibility, Reduced Motion & Mobile Performance**:
   - Ensure all service copy, workflow, platform compatibility, and demo/quote CTAs live in normal semantic HTML outside video/canvas elements.
   - Respect `prefers-reduced-motion` and add an interactive low-power / static overview mode in `VirtualCoffeeStore3D.js`, plus keyboard `:focus-visible` styling and crisp button/link semantics.
6. **`SEO-004` — Truthful, Policy-Compliant JSON-LD**:
   - Simplify `SEOHead.js` to strict `Organization` + `WebSite` + `WebPage`, remove `ProfessionalService` without address, remove hardcoded `0.00` prices, remove unapproved mass `FAQPage` rich-snippet stuffing on service/promo pages (retaining valid `FAQPage` strictly on `/faq` where FAQ is the primary visible content), and render matching visible HTML breadcrumbs wherever `BreadcrumbList` is emitted.
7. **`SEO-006` — Clean Internal Link Graph**:
   - Connect Homepage -> Core 3D Service -> Platform Integration Guides -> Blog Articles -> Case Studies -> Contact/Demo with descriptive anchor text and zero orphan pages (`<= 3` clicks from `/`).
8. **`SEO-007` & `SEO-301` — Consent-Aware Analytics & Lead Funnel Verification**:
   - Update `_document.js` and `CookieConsent.js` with Google Consent Mode v2 (`analytics_storage: 'denied'` by default until explicit user consent, syncing `gtag('consent', 'update', ...)` and `window.clarity('consent')`).
   - Fire conversion events (`generate_lead` with `lead_type: 'demo' | 'quotation'` and `whatsapp_click`) strictly on verified API success (`res.ok && data.success`) with **zero PII** and capture non-PII UTM attribution (`utm_source`, `utm_medium`, `utm_campaign`).
   - Add honeypot spam check and strict server-side email syntax validation to `/api/contact`.

### Phase C: Editorial Refresh (`SEO-102`, `P1/P2`)
9. **`SEO-102` — Refresh Existing 6 Journal Articles Before Overlapping Content**:
   - Deepen `/blog/can-you-add-a-3d-store-to-shopify` with real architecture flow, catalog sync details, honest platform caveats, and performance tradeoffs.
   - Deepen `/blog/3d-virtual-store-vs-normal-ecommerce-website` with an unbiased comparison table explaining clearly when a standard 2D website is better.
   - Expand `/blog/what-affects-the-cost-of-a-3d-ecommerce-website` with realistic scope drivers, discovery checklist, and deliverables without inventing dollar price tags.
   - Update `/blog/future-of-ecommerce-3d-virtual-stores`, `/blog/fairchain-coffee-story-in-spatial-web`, and `/blog/why-traditional-ecommerce-grids-are-dying` to separate general UX reasoning from unverified client metrics and tighten editorial accuracy across all 12 articles in `data/blogPosts.js`.
   - Audit `/shopify-3d-store`, `/woocommerce-3d-store`, and `/3d-store-examples` (added in `850025e`) so each delivers genuinely distinct platform/use-case technical detail with zero template duplication, flagged for Gate 3 owner review.

### Pending Owner Decisions (Outside Repo)
- Supply proof or confirm final wording for numeric claims and the 48-hour demo turnaround SLA.
- Confirm permissions for all 14 client logos/names (especially #12–#14 marked site offline).
- Switch `managemyweb.co` -> `www.managemyweb.co` redirect from HTTP `307` to `308 Permanent` in Vercel Dashboard -> Domains.
- Submit updated `sitemap.xml` inside Google Search Console and verify GA4 conversion reports once deployed.
