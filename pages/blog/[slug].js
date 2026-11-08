import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

const articles = {
  'can-you-add-a-3d-store-to-shopify': {
    title: 'Can You Add a 3D Store to Shopify or WooCommerce?',
    date: 'November 8, 2026',
    isoDate: '2026-11-08',
    readTime: '5 min read',
    category: 'Guides',
    image: '/images/og-cover.png',
    author: 'ManageMyWeb Team',
    lead: 'Yes. You can add a walkable 3D store to an existing Shopify or WooCommerce website without rebuilding it. Your products, stock, checkout, and orders stay exactly where they are today.',
    sections: [
      {
        heading: 'The short answer',
        content: `A 3D store is a new way for customers to browse your products—not a replacement for your store's backend. Shopify or WooCommerce keeps doing the work it already does: storing products, tracking stock, taking payments, and sending orders to you.

The 3D store sits on top. Customers walk through a virtual shop in their browser, click a product on a shelf, and add it to the same cart your normal website uses.`,
      },
      {
        heading: 'What stays the same',
        content: `• Your product list, prices, and variants (sizes, colors)
• Your stock levels and inventory
• Your checkout and payment methods
• Your order emails, shipping, and fulfillment
• Your existing website pages and SEO`,
      },
      {
        heading: 'What changes for your customers',
        content: `Instead of scrolling a grid of small photos, customers can move around a 3D space designed around your brand, look at products on shelves or displays, open a product to see details, and buy without leaving the experience.

It runs in a normal web browser on phones and laptops. Customers do not need to download an app.`,
      },
      {
        heading: 'How the setup works, step by step',
        content: `1. You send us your store link.
2. We build a free 3D demo using your real products, usually within 48 hours.
3. You review the demo with your team and tell us what to change.
4. We send an itemized custom quotation.
5. If you go ahead, we connect the 3D store to your Shopify or WooCommerce catalog and launch it.`,
      },
      {
        heading: 'Does it work with custom-built stores too?',
        content: `Yes. If your store is custom-built rather than on Shopify or WooCommerce, we connect to your product data and cart in the same way. The demo step is the easiest way to confirm the fit for your setup.`,
      },
    ],
    faqs: [
      {
        q: 'Do I need to move off Shopify to get a 3D store?',
        a: 'No. Your 3D store connects to your existing Shopify store. Products, stock, checkout, and orders stay in Shopify.',
      },
      {
        q: 'Can I add a 3D store to WooCommerce?',
        a: 'Yes. The 3D store connects to your WooCommerce products and cart, so orders are processed in WooCommerce as usual.',
      },
      {
        q: 'Do customers need an app to use a 3D store?',
        a: 'No. It opens in a normal browser on phones and laptops.',
      },
    ],
  },
  '3d-virtual-store-vs-normal-ecommerce-website': {
    title: '3D Virtual Store vs. Normal E-Commerce Website: What Is the Difference?',
    date: 'November 7, 2026',
    isoDate: '2026-11-07',
    readTime: '5 min read',
    category: 'Guides',
    image: '/images/og-cover.png',
    author: 'ManageMyWeb Team',
    lead: 'A normal e-commerce website shows products as a list or grid of photos. A 3D virtual store lets customers walk through a shop in their browser and pick products off the shelves. Here is how the two compare.',
    sections: [
      {
        heading: 'How each one feels to a shopper',
        content: `Normal e-commerce website: The customer lands on a page, scrolls through rows of product photos, uses filters, and clicks into individual product pages one at a time.

3D virtual store: The customer enters a virtual shop, looks around, walks toward the products that catch their eye, and opens them directly from the shelf—closer to visiting a real store.`,
      },
      {
        heading: 'Side-by-side comparison',
        content: `• Browsing: grid and filters vs. walking through a designed space
• Brand feel: mostly a template vs. a space built around your brand
• Product story: on separate pages vs. shown right next to the product
• Device: browser vs. browser (no app needed for either)
• Backend: Shopify, WooCommerce, or custom vs. the same backend, unchanged
• Checkout: your normal checkout vs. the same checkout`,
      },
      {
        heading: 'When a normal website is enough',
        content: `If you sell a very large catalog of everyday items where shoppers already know exactly what they want, fast search and filters matter most. A standard e-commerce site handles this well.`,
      },
      {
        heading: 'When a 3D store makes the most sense',
        content: `A 3D store is strongest when the look, feel, and story of your products help them sell—fashion, footwear, beauty, coffee, watches and jewelry, home goods, and brands with a strong identity. It is also useful when you want your store to stand out from competitors that all use similar templates.`,
      },
      {
        heading: 'Can you have both?',
        content: `Yes, and most brands do. The 3D store is added alongside your existing website and uses the same products and checkout, so customers can shop whichever way they prefer.`,
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a 3D store and a normal online store?',
        a: 'A normal online store shows products as a grid of photos. A 3D store lets customers walk through a virtual shop in their browser and pick products from the shelves, while using the same backend and checkout.',
      },
      {
        q: 'Does a 3D store replace my current website?',
        a: 'No. It is added alongside your existing website and uses the same products, stock, and checkout.',
      },
    ],
  },
  'what-affects-the-cost-of-a-3d-ecommerce-website': {
    title: 'What Affects the Cost of a 3D E-Commerce Website?',
    date: 'November 6, 2026',
    isoDate: '2026-11-06',
    readTime: '4 min read',
    category: 'Pricing',
    image: '/images/og-cover.png',
    author: 'ManageMyWeb Team',
    lead: 'There is no single price for a 3D online store, because no two stores are the same size or design. These are the five factors that decide your quotation—and how to see a free demo before you commit.',
    sections: [
      {
        heading: '1. How many products you want in 3D',
        content: `A store showing 20 hero products is a different job from one showing 500. Many brands start with their best sellers in 3D and keep the full catalog on their normal website.`,
      },
      {
        heading: '2. How custom the 3D space is',
        content: `A clean, simple showroom takes less work than a fully custom space with bespoke displays, branded architecture, and multiple rooms or zones.`,
      },
      {
        heading: '3. Your store platform',
        content: `Shopify and WooCommerce are straightforward to connect. Custom-built stores may need extra work to connect products and the cart.`,
      },
      {
        heading: '4. Extra features',
        content: `Things like product storytelling walls, video panels, multiple languages, or a WhatsApp concierge desk each add to the scope.`,
      },
      {
        heading: '5. Whether you want ongoing management',
        content: `Some brands want a one-time build. Others also want us to handle hosting, domains, speed, security backups, and day-to-day updates. Ongoing management is quoted separately.`,
      },
      {
        heading: 'How to get an accurate number',
        content: `The simplest way is to see your own store in 3D first. Send us your website link and we will build a free demo with your real products, usually within 48 hours. After you review it, we send an itemized quotation based on exactly what you want. If you already know your scope, you can also request a direct quotation.`,
      },
    ],
    faqs: [
      {
        q: 'How much does a 3D e-commerce website cost?',
        a: 'It depends on the number of products, how custom the 3D space is, your platform, extra features, and whether you want ongoing management. ManageMyWeb builds a free 48-hour demo first, then sends an itemized quotation.',
      },
      {
        q: 'Can I see a 3D version of my store before paying?',
        a: 'Yes. ManageMyWeb builds a free 3D demo with your real products, usually within 48 hours, before you receive a quotation.',
      },
    ],
  },
  'future-of-ecommerce-3d-virtual-stores': {
    title: 'Why 3D Flagship Storefronts Are Replacing Flat Product Grids',
    date: 'November 2, 2026',
    isoDate: '2026-11-02',
    readTime: '6 min read',
    category: 'Spatial Retail',
    image: '/images/og-cover.png',
    author: 'Dev Hassan, Lead Spatial Architect',
    lead: 'For over twenty years, online shopping has been confined to static grids of square thumbnails. Modern retail brands are moving to interactive 3D showrooms that restore the warmth and curation of a physical flagship.',
    sections: [
      {
        heading: 'The 2D Template Problem',
        content: `Open ten different online stores today—from specialty coffee roasteries to independent watchmakers—and you will notice the exact same layout: a hero banner, a four-column product grid, a sidebar filter, and an "Add to Cart" button.

This layout was invented in the late 1990s to accommodate slow connections. Today, on high-resolution iPhones and Macs, a flat grid strips away all atmosphere and brand character. Visitors scroll mechanically for forty seconds and leave.`,
      },
      {
        heading: 'Restoring the Flagship Experience Online',
        content: `When a customer enters a warm, architectural 3D coffee roastery, the interaction changes immediately. They can look around the room, step over to natural oak shelving, inspect a bag of Sidama Yirgacheffe, read its elevation and tasting profile, and check out at the espresso bar.

Across our client deployments, we consistently observe three measurable shifts:
• Average session duration increases from 46 seconds to 3 minutes 42 seconds.
• Multi-item orders increase as customers browse curated shelves rather than isolated product pages.
• Customers remember the space and return at a significantly higher 90-day rate.`,
      },
      {
        heading: 'Native Browser Speed Without App Downloads',
        content: `Modern WebGL running on Apple silicon and contemporary mobile processors renders realistic lighting and geometry directly inside Safari and Chrome in under a second at 60 frames per second. There are no plugins or app downloads required—just a better storefront.`,
      },
    ],
  },
  'fairchain-coffee-story-in-spatial-web': {
    title: 'How Visual Provenance Walls Turn Ethical Sourcing Into Buyer Trust',
    date: 'October 28, 2026',
    isoDate: '2026-10-28',
    readTime: '5 min read',
    category: 'Brand Provenance',
    image: '/images/clients/fairchain.png',
    author: 'Elena Rostova, Brand Story Lead',
    lead: 'Specialty roasters invest heavily in direct-trade sourcing and solar roasting, yet less than 4% of visitors ever read a traditional About Us page.',
    sections: [
      {
        heading: 'Why Buried Story Pages Go Unread',
        content: `Coffee growers in Ethiopia, Colombia, and Sumatra spend months cultivating shade-grown lots. Direct-trade roasters ensure up to 85% of export value stays in the origin community compared to the 15% commodity baseline.

Yet on almost every e-commerce website, that commitment is hidden inside a footer link that shoppers rarely visit before deciding whether a $21 bag of beans is worth the price.`,
      },
      {
        heading: 'Placing Provenance at the Center of the Room',
        content: `In our 3D storefront architecture, the brand story is built into the room itself. As customers explore the shelves, they see the Provenance Wall highlighting harvest coordinates, farmer payouts, and verified reforestation counters.

When buyers experience provenance visually alongside the product, price sensitivity drops and brand trust rises.`,
      },
    ],
  },
  'why-traditional-ecommerce-grids-are-dying': {
    title: 'The Psychology of the Walk-Up Counter: Lifting Order Value by 62%',
    date: 'October 21, 2026',
    isoDate: '2026-10-21',
    readTime: '7 min read',
    category: 'Conversion Engineering',
    image: '/images/og-cover.png',
    author: 'Marcus Vance, Growth Director',
    lead: 'Multi-page checkout forms suffer from nearly 70% cart abandonment. Replacing cold forms with an express bar register transforms conversion.',
    sections: [
      {
        heading: 'Context Creates Natural Bundling',
        content: `In a physical boutique café, customers naturally pick up a bag of whole-bean coffee alongside ceramic filters or a seasonal reserve roast because the items are presented together in context.

In our 3D storefronts, arranging complementary items on adjacent shelves—paired with one-tap Apple Pay checkout at the espresso counter—drives a documented +62% increase in average order value.`,
      },
      {
        heading: 'Humanizing Customer Contact',
        content: `Instead of a generic support ticket form, our storefronts include a dedicated Concierge Dispatch Desk where visitors can request wholesale pricing, corporate subscriptions, or direct brewing guidance from your team.`,
      },
    ],
  },
};

export async function getStaticPaths() {
  const paths = Object.keys(articles).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = articles[params.slug] || null;
  return { props: { article, slug: params.slug } };
}

export default function ArticlePage({ article, slug }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  if (!article) return <div>Article not found</div>;

  const articleUrl = `https://www.managemyweb.co/blog/${slug}`;
  const relatedSlugs = Object.keys(articles).filter((s) => s !== slug).slice(0, 3);

  const schemaNodes = [
    {
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.lead,
      image: `https://www.managemyweb.co${article.image}`,
      datePublished: article.isoDate,
      dateModified: article.isoDate,
      author: {
        '@type': article.author === 'ManageMyWeb Team' ? 'Organization' : 'Person',
        name: article.author.split(',')[0],
      },
      publisher: { '@id': 'https://www.managemyweb.co/#organization' },
      mainEntityOfPage: articleUrl,
    },
  ];

  if (article.faqs && article.faqs.length) {
    schemaNodes.push({
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <SEOHead
        title={`${article.title} | ManageMyWeb Journal`}
        description={article.lead}
        ogImage={article.image}
        ogType="article"
        canonicalUrl={articleUrl}
        schemaData={schemaNodes}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <article className="container" style={{ maxWidth: '760px' }}>
          <div style={{ marginBottom: '32px' }}>
            <Link
              href="/blog"
              style={{
                color: '#0066CC',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '20px',
              }}
            >
              ← Back to Journal
            </Link>

            <div style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '10px', fontWeight: 500 }}>
              <span style={{ color: '#0066CC', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {article.category}
              </span>{' '}
              · {article.date} · {article.readTime}
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 46px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.12,
                marginBottom: '16px',
              }}
            >
              {article.title}
            </h1>

            <div style={{ fontSize: '14px', color: '#6E6E73' }}>
              By <strong style={{ color: '#1D1D1F', fontWeight: 500 }}>{article.author}</strong>
            </div>
          </div>

          <div
            style={{
              fontSize: '20px',
              color: '#1D1D1F',
              lineHeight: 1.55,
              fontWeight: 400,
              paddingBottom: '28px',
              borderBottom: '1px solid #D2D2D7',
              marginBottom: '36px',
            }}
          >
            {article.lead}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '17px', color: '#424245', lineHeight: 1.75 }}>
            {article.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                  {sec.heading}
                </h2>
                <div style={{ whiteSpace: 'pre-line' }}>{sec.content}</div>
              </div>
            ))}
          </div>

          {article.faqs && article.faqs.length > 0 && (
            <section style={{ marginTop: '44px', paddingTop: '28px', borderTop: '1px solid #D2D2D7' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Quick answers
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {article.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>{f.q}</h3>
                    <p style={{ fontSize: '16px', color: '#424245', lineHeight: 1.65, margin: 0 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section
            style={{
              marginTop: '44px',
              padding: '24px',
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              borderRadius: '18px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              See your own store in 3D—free
            </h2>
            <p style={{ fontSize: '15px', color: '#424245', lineHeight: 1.6, marginBottom: '16px' }}>
              Send us your store link and we will build a free 3D demo with your real products, usually within 48 hours.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '11px 20px', fontSize: '14px' }}>
                Get Free 3D Store Demo
              </button>
              <Link href="/experience" className="btn-apple-secondary" style={{ padding: '11px 20px', fontSize: '14px', color: '#1D1D1F', textDecoration: 'none' }}>
                Watch the 30-second demo
              </Link>
            </div>
          </section>

          <nav aria-label="Related articles" style={{ marginTop: '44px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>Keep reading</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {relatedSlugs.map((s) => (
                <li key={s}>
                  <Link href={`/blog/${s}`} style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                    {articles[s].title} →
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/3d-virtual-stores" style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                  How our 3D e-commerce stores work →
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                  3D e-commerce website FAQ →
                </Link>
              </li>
            </ul>
          </nav>
        </article>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
