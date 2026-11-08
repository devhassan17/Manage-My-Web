import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export const blogPosts = [
  {
    slug: 'can-you-add-a-3d-store-to-shopify',
    title: 'Can You Add a 3D Store to Shopify or WooCommerce?',
    excerpt: 'Yes—without rebuilding your store. Here is how it works, step by step.',
    date: 'Nov 8, 2026',
    readTime: '5 min read',
    category: 'Guides',
    metric: 'Keep Your Checkout',
  },
  {
    slug: '3d-virtual-store-vs-normal-ecommerce-website',
    title: '3D Virtual Store vs. Normal E-Commerce Website: What Is the Difference?',
    excerpt: 'A side-by-side, plain-English comparison for store owners.',
    date: 'Nov 7, 2026',
    readTime: '5 min read',
    category: 'Guides',
    metric: 'Side-by-Side',
  },
  {
    slug: 'what-affects-the-cost-of-a-3d-ecommerce-website',
    title: 'What Affects the Cost of a 3D E-Commerce Website?',
    excerpt: 'The 5 factors that decide your quotation—and how to see a free demo first.',
    date: 'Nov 6, 2026',
    readTime: '4 min read',
    category: 'Pricing',
    metric: '5 Cost Factors',
  },
  {
    slug: 'future-of-ecommerce-3d-virtual-stores',
    title: 'Why 3D Flagship Storefronts Are Replacing Flat Product Grids',
    excerpt: 'How interactive 3D retail spaces drive 3.4× longer customer sessions.',
    date: 'Nov 2, 2026',
    readTime: '4 min read',
    category: 'Spatial Retail',
    metric: '3.4× Session Lift',
  },
  {
    slug: 'fairchain-coffee-story-in-spatial-web',
    title: 'How Visual Provenance Walls Build Instant Buyer Trust',
    excerpt: 'Placing craftsmanship and origin data directly inside the showroom.',
    date: 'Oct 28, 2026',
    readTime: '3 min read',
    category: 'Brand Story',
    metric: '4.8× Story Views',
  },
  {
    slug: 'why-traditional-ecommerce-grids-are-dying',
    title: 'Lifting Average Order Value by 62% with Express Counters',
    excerpt: 'Why one-tap express registers and 3D shelf bundles convert higher.',
    date: 'Oct 21, 2026',
    readTime: '4 min read',
    category: 'Conversion',
    metric: '+62% Order Value',
  },
];

export default function BlogIndex() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="3D E-Commerce Guides & Retail Insights | ManageMyWeb Journal"
        description="Plain-English guides on 3D e-commerce websites: adding a 3D store to Shopify or WooCommerce, how 3D stores compare to normal online stores, and what affects the cost."
        canonicalUrl="https://www.managemyweb.co/blog"
        schemaData={{
          '@type': 'Blog',
          name: 'ManageMyWeb Journal',
          url: 'https://www.managemyweb.co/blog',
          blogPost: blogPosts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `https://www.managemyweb.co/blog/${p.slug}`,
          })),
        }}
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
                  background: '#FFFFFF',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#0066CC' }}>
                      {post.category} · {post.readTime}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: '#F5F5F7', padding: '3px 9px', borderRadius: '980px', color: '#1D1D1F' }}>
                      {post.metric}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px', lineHeight: 1.3 }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: '#1D1D1F', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
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
                  Read article ›
                </Link>
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
