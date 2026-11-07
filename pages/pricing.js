import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Pricing() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('demo');
  const [selectedPackage, setSelectedPackage] = useState('Spatial Retail Flagship');

  const openModal = (mode, pkgName) => {
    setModalMode(mode || 'demo');
    setSelectedPackage(pkgName || 'Spatial Retail Flagship');
    setDemoModalOpen(true);
  };

  const tiers = [
    {
      name: '3D Storefront Launchpad',
      badge: 'Independent Brands',
      priceLabel: 'Custom Quotation',
      period: 'Scoped to Catalog Size',
      description: 'Bespoke 3D showroom with interactive shelving and express checkout.',
      features: [
        'Custom 3D WebGL Storefront',
        'Up to 15 Interactive 3D Products',
        'Express Checkout Counter',
        'Brand Story Wall & Concierge Desk',
        'Live Shopify / WooCommerce Sync',
      ],
      highlighted: false,
    },
    {
      name: 'Spatial Retail Flagship',
      badge: 'Most Popular',
      priceLabel: 'Custom Quotation',
      period: 'Full Multi-Zone Flagship',
      description: 'Multi-zone 3D showroom with custom lighting, audio, and full catalog sync.',
      features: [
        'Unlimited 3D Products & Shelving',
        'Custom Architectural Room Design',
        'Day & Evening Gallery Lighting',
        'Apple Pay & Stripe Express Register',
        'Free 48h 3D Demo Included',
      ],
      highlighted: true,
    },
    {
      name: 'Managed Web Concierge',
      badge: 'Monthly Operations',
      priceLabel: 'Custom Retainer',
      period: 'Full Technical Management',
      description: 'We run your hosting, DNS, speed, security, and daily updates.',
      features: [
        'Global Edge NVMe Cloud Hosting',
        'Domain, DNS & SSL Management',
        'Business Email Setup (DMARC/SPF)',
        'Same-Day Edits via WhatsApp',
        'Daily Off-Site Security Backups',
      ],
      highlighted: false,
    },
  ];

  return (
    <>
      <SEOHead
        title="Custom Quotation & 3D Storefront Engagement Plans | ManageMyWeb"
        description="Request a tailored quotation for your custom 3D virtual storefront and managed web operations—or start with Step 1: a complimentary 48-hour 3D demo prototype."
        keywords="3D virtual store quotation, custom 3D website quote, 3D Shopify store proposal, managed web hosting retainer quote, free 3D store prototype"
        canonicalUrl="https://managemyweb.co/pricing"
        schemaData={{
          '@type': 'OfferCatalog',
          name: 'ManageMyWeb Custom 3D Storefront & Managed Operations Scopes',
          itemListElement: tiers.map((t) => ({
            '@type': 'Offer',
            name: t.name,
            description: t.description,
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => openModal('demo', 'Spatial Retail Flagship')} />
      <Navbar onOpenDemoModal={() => openModal('demo', 'Spatial Retail Flagship')} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Two Ways to Start
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
              Free 3D Demo first, or Direct Quotation.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.5 }}>
              Test your products inside a free 3D preview first, or request an itemized quotation right away.
            </p>
          </div>

          {/* Two Visitor Journey Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '18px',
              marginBottom: '44px',
            }}
          >
            {/* Path 1: Demo First */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '980px',
                    background: '#EBF5FF',
                    color: '#0066CC',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  Option 1 · Demo First
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Step 1: Free 3D Demo → Step 2: Quotation
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Get a free 48-hour 3D preview of your products first, then receive your tailored quotation.
                </p>
              </div>
              <button
                onClick={() => openModal('demo', 'Spatial Retail Flagship')}
                className="btn-apple-blue"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Start Step 1: Free 3D Demo
              </button>
            </div>

            {/* Path 2: Direct Quotation */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '980px',
                    background: '#F5F5F7',
                    color: '#1D1D1F',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  Option 2 · Direct Quote
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Direct Custom Quotation
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Know what you need? Receive an itemized proposal and timeline within 24 hours.
                </p>
              </div>
              <button
                onClick={() => openModal('quotation', 'Spatial Retail Flagship')}
                className="btn-apple-dark"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Request Direct Quotation
              </button>
            </div>
          </div>

          {/* Scope Tiers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  borderRadius: '20px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  border: tier.highlighted ? '2px solid #1D1D1F' : '1px solid #D2D2D7',
                  boxShadow: tier.highlighted
                    ? '0 14px 36px rgba(0, 0, 0, 0.07)'
                    : '0 2px 10px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: tier.highlighted ? '#0066CC' : '#6E6E73',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '6px',
                    }}
                  >
                    {tier.badge}
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    {tier.name}
                  </h3>

                  <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.45, marginBottom: '18px' }}>
                    {tier.description}
                  </p>

                  <div style={{ marginBottom: '20px', background: '#F5F5F7', padding: '12px 14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                      {tier.priceLabel}
                    </div>
                    <div style={{ color: '#6E6E73', fontSize: '12px', marginTop: '2px' }}>{tier.period}</div>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '18px', marginBottom: '22px' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#424245' }}
                        >
                          <span style={{ color: '#1D1D1F', fontWeight: 600 }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => openModal('quotation', tier.name)}
                    className={tier.highlighted ? 'btn-apple-blue' : 'btn-apple-dark'}
                    style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}
                  >
                    Request Quotation
                  </button>
                  <button
                    onClick={() => openModal('demo', tier.name)}
                    className="btn-apple-secondary"
                    style={{ width: '100%', padding: '10px', fontSize: '13px' }}
                  >
                    Free 3D Demo First
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => openModal('demo', 'Spatial Retail Flagship')} />
      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialMode={modalMode}
        initialPackage={selectedPackage}
      />
    </>
  );
}
