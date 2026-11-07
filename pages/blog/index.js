import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export const blogPosts = [
  {
    slug: 'future-of-ecommerce-3d-virtual-stores',
    title: 'Why 3D Flagship Storefronts Are Replacing Flat Product Grids',
    excerpt:
      'Most online stores look the same today as they did two decades ago. How interactive 3D retail spaces and tactile shelving drive 3.4× longer customer engagement.',
    date: 'November 2, 2026',
    readTime: '6 min read',
    category: 'Spatial Retail',
    image: '/images/coffee_store_hero.jpg',
  },
  {
    slug: 'fairchain-coffee-story-in-spatial-web',
    title: 'How Visual Provenance Walls Turn Ethical Sourcing Into Buyer Trust',
    excerpt:
      'Less than 4% of visitors click a standard About Us page. Placing direct-trade data and harvest provenance inside the showroom transforms brand retention.',
    date: 'October 28, 2026',
    readTime: '5 min read',
    category: 'Brand Provenance',
    image: '/images/fairchain_harvest.jpg',
  },
  {
    slug: 'why-traditional-ecommerce-grids-are-dying',
    title: 'The Psychology of the Walk-Up Counter: Lifting Order Value by 62%',
    excerpt:
      'Multi-step checkout forms suffer from 70% abandonment. A closer look at why express bar registers and contextual shelf merchandising convert better.',
    date: 'October 21, 2026',
    readTime: '7 min read',
    category: 'Conversion Engineering',
    image: '/images/spatial_devices_preview.jpg',
  },
];

export default function BlogIndex() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="Editorial Journal & Retail Insights | ManageMyWeb"
        description="Essays and benchmarks on 3D retail architecture, conversion psychology, FairChain provenance, and modern web operations."
        canonicalUrl="https://managemyweb.co/blog"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Editorial Journal
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Notes on spatial retail & conversion.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.5 }}>
              Architectural benchmarks, conversion research, and case notes from our engineering team.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="apple-card apple-card-interactive"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '220px', position: 'relative' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0066CC', marginBottom: '6px' }}>
                      {post.category}
                    </div>
                    <div style={{ fontSize: '12px', color: '#86868B', marginBottom: '10px' }}>
                      {post.date} · {post.readTime}
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px', lineHeight: 1.3 }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: '#1D1D1F', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </h2>

                    <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      color: '#0066CC',
                      fontSize: '14px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Read article</span>
                    <span aria-hidden="true">›</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
