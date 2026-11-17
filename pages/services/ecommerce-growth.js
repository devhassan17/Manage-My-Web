import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import FAQSection from '../../components/FAQSection';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function EcommerceGrowth() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'What causes shoppers to browse and leave before buying?',
      a: 'Across online retail, common blockers include slow-loading product pages on mobile networks, hard-to-read sizing or material details, and lengthy checkout forms requiring account creation.',
    },
    {
      q: 'How do you approach checkout and conversion improvement?',
      a: 'We audit where visitors stall using privacy-respecting analytics, strip out heavy blocking third-party scripts, clarify bundle context and trust details beside buy actions, and enable express payment options where supported by your checkout.',
    },
    {
      q: 'Do you make guarantees about exact percentage lifts before seeing our store?',
      a: 'No honest engineer guarantees identical percentages for every catalog. Instead, we focus on measurable friction removal—faster load times, cleaner mobile checkout paths, and clearer tracking so you can evaluate real results in your own analytics.',
    },
  ];

  return (
    <>
      <SEOHead
        title="E-Commerce Conversion & Checkout Optimization | ManageMyWeb"
        description="Remove slow mobile pages, clumsy forms, and missing buyer context so more store visitors complete checkout. Clear audits, speed cleanup, and express checkout support."
        keywords="ecommerce conversion optimization, Shopify checkout optimization, reduce cart abandonment, mobile store speed fixes, online store CRO"
        canonicalUrl="https://www.managemyweb.co/services/ecommerce-growth"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Service',
          name: 'E-Commerce Conversion & Checkout Optimization',
          serviceType: 'Conversion Rate & Checkout Optimization',
          provider: { '@id': 'https://www.managemyweb.co/#organization' },
          areaServed: 'Worldwide',
          description:
            'Practical mobile performance cleanup, product context clarity, and streamlined express checkout integration for e-commerce brands.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <Breadcrumbs path="/services/ecommerce-growth" currentLabel="E-Commerce Conversion & Checkout Optimization" />

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Conversion &amp; Speed Focus
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
              E-Commerce Conversion &amp; Checkout Optimization
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Paid clicks cost more every quarter. Improving mobile speed, product storytelling, and express payment options helps convert more of the visitors already coming to your store.
            </p>
            <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              Discuss Your Store Conversion Funnel
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '48px',
            }}
          >
            {[
              {
                tag: 'Speed',
                label: 'Faster Mobile Loading',
                desc: 'We audit blocking scripts, uncompressed photography, and app bloat that frustrate shoppers on cellular connections.',
              },
              {
                tag: 'Checkout',
                label: 'Fewer Form Roadblocks',
                desc: 'We configure supported one-tap payment options like Apple Pay, Google Pay, and Shop Pay so buyers do not drop out typing long addresses.',
              },
              {
                tag: 'Context',
                label: 'Smarter Shelf Merchandising',
                desc: 'Pairing related items together visually—whether in 3D showrooms or clean collection layouts—helps shoppers discover complementary products naturally.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="apple-card"
                style={{ padding: '30px', borderRadius: '18px', background: '#FFFFFF' }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {item.tag}
                </div>
                <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                  {item.label}
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 4 Practical Engineering Steps */}
          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '20px' }}>
              Practical improvements we check first on every store
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: '1. Clean Up Slow Mobile Scripts',
                  desc: 'Remove redundant leftover theme snippets, tracking pixels, and oversized uncompressed images slowing down Core Web Vitals.',
                },
                {
                  title: '2. Simplify Mobile Checkout Paths',
                  desc: 'Reduce required clicks between product view, cart drawer, and wallet checkout on narrow mobile screens.',
                },
                {
                  title: '3. Surface Key Trust Details Early',
                  desc: 'Place shipping rules, materials, and customer help options clearly next to purchase actions rather than burying them.',
                },
                {
                  title: '4. Consent-Respecting Funnel Measurement',
                  desc: 'Configure accurate GA4 lead and purchase events alongside consent controls so you can verify what truly works.',
                },
              ].map((fix) => (
                <div key={fix.title} style={{ background: '#F5F5F7', padding: '20px', borderRadius: '14px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    {fix.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#424245', lineHeight: 1.55, margin: 0 }}>{fix.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/blog/why-online-stores-load-slowly-on-mobile" className="apple-link" style={{ fontSize: '14px' }}>
                Why stores feel slow on phones →
              </Link>
              <Link href="/blog/how-to-stop-cart-abandonment" className="apple-link" style={{ fontSize: '14px' }}>
                Practical checkout friction fixes →
              </Link>
            </div>
          </div>
        </div>

        <FAQSection title="Conversion Optimization Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
