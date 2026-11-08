import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

const articles = {
  'future-of-ecommerce-3d-virtual-stores': {
    title: 'Why 3D Flagship Storefronts Are Replacing Flat Product Grids',
    date: 'November 2, 2026',
    readTime: '6 min read',
    category: 'Spatial Retail',
    image: '/favicon.svg',
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
    readTime: '5 min read',
    category: 'Brand Provenance',
    image: '/favicon.svg',
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
    readTime: '7 min read',
    category: 'Conversion Engineering',
    image: '/favicon.svg',
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

  return (
    <>
      <SEOHead
        title={`${article.title} | ManageMyWeb Journal`}
        description={article.lead}
        ogImage={article.image}
        canonicalUrl={`https://managemyweb.co/blog/${slug}`}
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
        </article>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
