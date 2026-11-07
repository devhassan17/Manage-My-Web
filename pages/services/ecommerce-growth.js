import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function EcommerceGrowth() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="E-Commerce Conversion Rate Optimization & Checkout Engineering | ManageMyWeb"
        description="Turn existing store traffic into higher-value orders with frictionless Apple Pay & Stripe express checkouts, spatial shelf bundling, and server-side GA4 attribution."
        keywords="ecommerce conversion rate optimization, Shopify checkout optimization, increase average order value, Apple Pay express checkout integration, ecommerce CRO agency"
        canonicalUrl="https://managemyweb.co/services/ecommerce-growth"
        schemaData={{
          '@type': 'Service',
          name: 'E-Commerce Conversion & Checkout Engineering',
          serviceType: 'Conversion Rate Optimization (CRO)',
          provider: {
            '@type': 'Organization',
            name: 'ManageMyWeb',
            url: 'https://managemyweb.co',
          },
          areaServed: 'Worldwide',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Conversion Engineering
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '18px',
              }}
            >
              Designed to convert visitors into repeat buyers.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.55 }}>
              Acquiring traffic is expensive. We engineer every detail of your storefront—from shelf merchandising to one-tap express checkout—to maximize order value and retention.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                stat: '+62%',
                label: 'Average Order Value Lift',
                desc: 'Presenting products on curated 3D shelves alongside complementary pairings naturally encourages multi-item orders.',
              },
              {
                stat: '-41%',
                label: 'Reduction in Cart Abandonment',
                desc: 'Our express bar checkout removes unnecessary form fields, offering native Apple Pay, Google Pay, and Stripe checkout in seconds.',
              },
              {
                stat: '3.4×',
                label: 'Longer Session Engagement',
                desc: 'Interactive exploration replaces a 40-second bounce with an engaging three-minute walkthrough of your products and provenance.',
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="apple-card"
                style={{ padding: '38px', borderRadius: '20px', background: '#FFFFFF' }}
              >
                <div style={{ fontSize: '40px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                  {metric.stat}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                  {metric.label}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.6 }}>{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
