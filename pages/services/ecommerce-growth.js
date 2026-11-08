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
        canonicalUrl="https://www.managemyweb.co/services/ecommerce-growth"
        schemaData={{
          '@type': 'Service',
          name: 'E-Commerce Conversion & Checkout Engineering',
          serviceType: 'Conversion Rate Optimization (CRO)',
          provider: {
            '@type': 'Organization',
            name: 'ManageMyWeb',
            url: 'https://www.managemyweb.co',
          },
          areaServed: 'Worldwide',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Conversion Engineering
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
              Built to convert visitors into buyers.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.45 }}>
              Higher order values and faster checkouts from the traffic you already have.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                stat: '+62%',
                label: 'Average Order Value Lift',
                desc: 'Curated 3D shelves naturally encourage multi-item bundle orders.',
              },
              {
                stat: '-41%',
                label: 'Less Cart Abandonment',
                desc: 'One-tap Apple Pay, Google Pay, and Stripe checkout in seconds.',
              },
              {
                stat: '3.4×',
                label: 'Longer Session Time',
                desc: 'Interactive 3D exploration keeps shoppers engaged over 3 minutes.',
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
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  {metric.label}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5 }}>{metric.desc}</p>
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
