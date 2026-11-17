import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import FAQSection from '../../components/FAQSection';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function EcommerceGrowth() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'Why do visitors look at my store and leave without buying?',
      a: 'Nine times out of ten, it comes down to three things: slow mobile pages (taking over 3 seconds to open), plain layouts that look like every competitor, or too many steps during mobile checkout.',
    },
    {
      q: 'How can you raise my conversion rate without me paying for more ads?',
      a: 'We optimize your mobile load speed under 1.1s, add one-tap Apple Pay / Google Pay / Shop Pay express checkouts, and showcase your top bundles visually so more visitors finish buying and add more items to each order.',
    },
    {
      q: 'Do you set up Google Analytics and Microsoft Clarity heatmaps too?',
      a: 'Yes! We wire up GA4 purchase tracking and Microsoft Clarity session recordings so you can actually watch where visitors tap, scroll, or drop off.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Increase Online Store Sales, Mobile Speed & Checkout Conversion | ManageMyWeb"
        description="Get more sales from the visitors already coming to your store. Faster mobile speed, one-tap Apple Pay checkout, smarter product bundles, and Microsoft Clarity tracking."
        keywords="increase online store sales, ecommerce conversion rate optimization, fix slow mobile store, reduce cart abandonment, Shopify checkout speed"
        canonicalUrl="https://www.managemyweb.co/services/ecommerce-growth"
        schemaData={[
          {
            '@type': 'Service',
            name: 'Online Store Speed & Conversion Growth',
            serviceType: 'E-Commerce Conversion & Speed Optimization',
            provider: { '@id': 'https://www.managemyweb.co/#organization' },
            areaServed: 'Worldwide',
            description:
              'Turn existing website traffic into bigger orders with sub-second mobile loading, one-tap express checkouts, and visual merchandising.',
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Speed &amp; Conversion Growth
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
              Get more sales from the traffic you already pay for.
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Ads get more expensive every month. The fastest way to lift profit is making your store load quicker on phones, easier to browse, and faster to pay.
            </p>
            <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              Request Store Audit or Demo
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
                stat: '+62%',
                label: 'Bigger Cart Totals',
                desc: 'Grouping matching products visually on shelves encourages buyers to grab bundles instead of single items.',
              },
              {
                stat: '-41%',
                label: 'Fewer Abandoned Carts',
                desc: 'One-tap Apple Pay, Google Pay, and Shop Pay let shoppers finish paying in seconds with Face ID.',
              },
              {
                stat: '3.4×',
                label: 'More Time In Your Store',
                desc: 'Instead of bouncing after 40 seconds on a flat page, visitors stay over 3 minutes exploring your brand.',
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="apple-card"
                style={{ padding: '30px', borderRadius: '18px', background: '#FFFFFF' }}
              >
                <div style={{ fontSize: '36px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '6px' }}>
                  {metric.stat}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  {metric.label}
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5 }}>{metric.desc}</p>
              </div>
            ))}
          </div>

          {/* 4 Actionable Growth Fixes */}
          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '20px' }}>
              Four simple fixes we make to raise conversion rates
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: '1. Clean Up Slow Mobile Scripts',
                  desc: 'We strip unused Shopify app code and oversized uncompressed images so mobile pages load around 1 second.',
                },
                {
                  title: '2. Cut Checkout Steps in Half',
                  desc: 'We enable instant Apple Pay, Google Pay, and Shop Pay so buyers do not quit typing addresses on small keyboards.',
                },
                {
                  title: '3. Showcase Story Next to the Price',
                  desc: 'We put why your product is worth the price right beside the buy button instead of hiding it on an About page.',
                },
                {
                  title: '4. Real Visitor Tracking',
                  desc: 'We install Microsoft Clarity heatmaps and GA4 conversion events so you see exactly what shoppers click and where they leave.',
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
                How to stop cart abandonment →
              </Link>
            </div>
          </div>
        </div>

        <FAQSection title="Speed & Sales Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
