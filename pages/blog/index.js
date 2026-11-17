import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';
import { BLOG_POSTS_LIST } from '../../data/blogPosts';

export const blogPosts = BLOG_POSTS_LIST;

export default function BlogIndex() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS_LIST.map((p) => p.category)))];
  const visiblePosts =
    selectedCategory === 'All'
      ? BLOG_POSTS_LIST
      : BLOG_POSTS_LIST.filter((p) => p.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="3D E-Commerce Guides & Development Insights | ManageMyWeb"
        description="Practical implementation guides for e-commerce teams: Shopify and WooCommerce 3D store architecture, 2D vs 3D tradeoffs, cost determinants, mobile speed, and SEO."
        keywords="Shopify 3D guide, 3D ecommerce cost factors, 3D store vs normal website, website maintenance checklist, 3D SEO"
        canonicalUrl="https://www.managemyweb.co/blog"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Blog',
          name: 'ManageMyWeb Guides & Development Insights',
          url: 'https://www.managemyweb.co/blog',
          blogPost: BLOG_POSTS_LIST.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.isoDate,
            url: `https://www.managemyweb.co/blog/${p.slug}`,
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <Breadcrumbs path="/blog" currentLabel="Guides & Insights" />

          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Editorial &amp; Implementation Guides
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              3D E-Commerce Guides &amp; Development Insights
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.55 }}>
              Honest engineering breakdowns on Shopify and WooCommerce integrations, 2D vs. 3D tradeoffs, pricing factors, mobile speed, and SEO hygiene.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '36px',
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '980px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    border: active ? '1px solid #0071E3' : '1px solid #D2D2D7',
                    background: active ? '#0071E3' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#1D1D1F',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '22px',
            }}
          >
            {visiblePosts.map((post) => (
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
                  Read guide ›
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
