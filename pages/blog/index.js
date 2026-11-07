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
    excerpt: 'How interactive 3D retail spaces drive 3.4× longer customer sessions.',
    date: 'Nov 2, 2026',
    readTime: '4 min read',
    category: 'Spatial Retail',
    image: '/images/coffee_store_hero.jpg',
  },
  {
    slug: 'fairchain-coffee-story-in-spatial-web',
    title: 'How Visual Provenance Walls Build Instant Buyer Trust',
    excerpt: 'Placing craftsmanship and origin data directly inside the showroom.',
    date: 'Oct 28, 2026',
    readTime: '3 min read',
    category: 'Brand Story',
    image: '/images/fairchain_harvest.jpg',
  },
  {
    slug: 'why-traditional-ecommerce-grids-are-dying',
    title: 'Lifting Average Order Value by 62% with Express Counters',
    excerpt: 'Why one-tap express registers and 3D shelf bundles convert higher.',
    date: 'Oct 21, 2026',
    readTime: '4 min read',
    category: 'Conversion',
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

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Journal
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '10px',
              }}
            >
              Notes on 3D retail.
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '22px',
            }}
          >
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="apple-card apple-card-interactive"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '195px' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#0066CC', marginBottom: '4px' }}>
                      {post.category} · {post.readTime}
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px', lineHeight: 1.3 }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: '#1D1D1F', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </h2>
                    <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '16px' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      color: '#0066CC',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Read ›
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
