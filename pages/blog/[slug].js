import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';
import { BLOG_POSTS_BY_SLUG, BLOG_POSTS_LIST } from '../../data/blogPosts';

export async function getStaticPaths() {
  const paths = BLOG_POSTS_LIST.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = BLOG_POSTS_BY_SLUG[params.slug] || null;
  return { props: { article, slug: params.slug } };
}

export default function ArticlePage({ article, slug }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  if (!article) return <div>Guide not found</div>;

  const articleUrl = `https://www.managemyweb.co/blog/${slug}`;
  const relatedPosts = BLOG_POSTS_LIST.filter((p) => p.slug !== slug).slice(0, 4);

  const schemaNodes = [
    {
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.lead,
      image: `https://www.managemyweb.co${article.image}`,
      datePublished: article.isoDate,
      dateModified: article.isoDate,
      author: {
        '@type': 'Organization',
        name: article.author || 'ManageMyWeb Team',
      },
      publisher: { '@id': 'https://www.managemyweb.co/#organization' },
      mainEntityOfPage: articleUrl,
    },
  ];

  return (
    <>
      <SEOHead
        title={`${article.title} | ManageMyWeb`}
        description={article.lead}
        ogImage={article.image}
        ogType="article"
        canonicalUrl={articleUrl}
        showBreadcrumbs={true}
        schemaData={schemaNodes}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <article className="container" style={{ maxWidth: '760px' }}>
          <Breadcrumbs path={`/blog/${slug}`} currentLabel={article.title} />

          <div style={{ marginBottom: '32px' }}>
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
              fontSize: '19.5px',
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

          <section
            style={{
              marginTop: '44px',
              padding: '28px',
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              borderRadius: '18px',
            }}
          >
            <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Test a custom 3D prototype with your own store
            </h2>
            <p style={{ fontSize: '15px', color: '#424245', lineHeight: 1.6, marginBottom: '16px' }}>
              Share your Shopify, WooCommerce, or custom store link to request a working 3D preview featuring your own products before requesting an itemized quote.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '11px 20px', fontSize: '14px' }}>
                Request a Free 3D Store Demo
              </button>
              <Link href="/experience" className="btn-apple-secondary" style={{ padding: '11px 20px', fontSize: '14px', color: '#1D1D1F', textDecoration: 'none' }}>
                Watch the 30-second video
              </Link>
            </div>
          </section>

          <nav aria-label="Related guides" style={{ marginTop: '44px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>Related guides &amp; services</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                    {p.title} →
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/3d-virtual-stores" style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                  Custom 3D Virtual Store Development →
                </Link>
              </li>
              <li>
                <Link href="/shopify-3d-store" style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                  Shopify 3D Store Integration →
                </Link>
              </li>
              <li>
                <Link href="/woocommerce-3d-store" style={{ color: '#0066CC', fontSize: '16px', textDecoration: 'none' }}>
                  WooCommerce 3D Store Integration →
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
