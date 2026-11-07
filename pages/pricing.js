import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Pricing() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('demo'); // 'demo' | 'quotation'
  const [selectedPackage, setSelectedPackage] = useState('Spatial Retail Flagship');

  const openModal = (mode, pkgName) => {
    setModalMode(mode || 'demo');
    setSelectedPackage(pkgName || 'Spatial Retail Flagship');
    setDemoModalOpen(true);
  };

  const tiers = [
    {
      name: '3D Storefront Launchpad',
      badge: 'For Independent Brands',
      priceLabel: 'Custom Quotation',
      period: 'Tailored to Catalog Scope',
      description:
        'A bespoke 3D flagship showroom featuring interactive product shelving, express checkout, and brand provenance.',
      features: [
        'Bespoke 3D WebGL Storefront',
        'Up to 15 Interactive 3D Products',
        'Express Bar Checkout Counter',
        'Brand Provenance & Story Wall',
        'Concierge Dispatch Contact Desk',
        'Mobile Safari & Chrome Optimization',
        'Live Shopify or WooCommerce Sync',
      ],
      highlighted: false,
    },
    {
      name: 'Spatial Retail Flagship',
      badge: 'Most Popular',
      priceLabel: 'Custom Quotation',
      period: 'Multi-Zone Architectural Build',
      description:
        'Multi-zone architectural showroom with custom lighting, acoustic soundscapes, and spatial analytics.',
      features: [
        'Unlimited 3D Products & Shelving',
        'Custom Architectural Room Design',
        'Daylight & Evening Gallery Lighting',
        'Ambient Acoustic Soundscape',
        'Apple Pay & Stripe Express Register',
        'Spatial Customer Engagement Analytics',
        'Dedicated Lead Engineer',
        'Complimentary 3D Demo Prototype Included',
      ],
      highlighted: true,
    },
    {
      name: 'Managed Web Concierge',
      badge: 'Ongoing Operations',
      priceLabel: 'Custom Retainer',
      period: 'Monthly Technical Stewardship',
      description:
        'Complete technical stewardship so your team never has to manage hosting, DNS, speed, or code updates.',
      features: [
        'Global Edge Cloud NVMe Hosting',
        'Domain, DNS & SSL Management',
        'Business Email Authentication (DMARC/SPF)',
        'Continuous Core Web Vitals Tuning',
        'Unlimited Routine Content & Product Edits',
        'Daily Automated Off-Site Backups',
        'Direct Engineer Access via WhatsApp',
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

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 52px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Tailored Investment · Two Ways to Start
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Start with a free 3D demo, or request a direct quotation.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.55 }}>
              Every e-commerce catalog is different. Choose whether you want to experience your products inside a free 3D prototype first (Step 1 → Step 2 Quotation), or receive a direct itemized quotation today.
            </p>
          </div>

          {/* Two Visitor Journey Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '56px',
            }}
          >
            {/* Path 1: Demo First */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '22px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '980px',
                    background: '#EBF5FF',
                    color: '#0066CC',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  Option 1 · Most Popular for First-Time Visitors
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                  Step 1: Free 3D Demo → Step 2: Custom Quotation
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.55, marginBottom: '20px' }}>
                  Not sure how your products will look in 3D? Share your store URL and we will build a working 3D preview of your products in 48 hours at zero cost. Once you review the demo, we prepare your tailored quotation.
                </p>
              </div>
              <button
                onClick={() => openModal('demo', 'Spatial Retail Flagship')}
                className="btn-apple-blue"
                style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '14px' }}
              >
                Start Step 1: Request Free 3D Demo
              </button>
            </div>

            {/* Path 2: Direct Quotation */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '22px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '980px',
                    background: '#F5F5F7',
                    color: '#1D1D1F',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  Option 2 · For Ready-to-Scope Projects
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                  Direct Custom Quotation
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.55, marginBottom: '20px' }}>
                  Already know the scope you need for your 3D storefront or managed web operations? Request a direct itemized proposal with timeline and deliverables tailored to your catalog size within 24 hours.
                </p>
              </div>
              <button
                onClick={() => openModal('quotation', 'Spatial Retail Flagship')}
                className="btn-apple-dark"
                style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '14px' }}
              >
                Request Direct Quotation Now
              </button>
            </div>
          </div>

          {/* Scope Tiers (No Fixed Prices — Custom Quotation) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
            }}
          >
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  borderRadius: '22px',
                  padding: '38px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  border: tier.highlighted ? '2px solid #1D1D1F' : '1px solid #D2D2D7',
                  boxShadow: tier.highlighted
                    ? '0 16px 40px rgba(0, 0, 0, 0.08)'
                    : '0 2px 12px rgba(0, 0, 0, 0.03)',
                  position: 'relative',
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
                      marginBottom: '8px',
                    }}
                  >
                    {tier.badge}
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                    {tier.name}
                  </h3>

                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
                    {tier.description}
                  </p>

                  <div style={{ marginBottom: '26px', background: '#F5F5F7', padding: '14px 16px', borderRadius: '14px' }}>
                    <div style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                      {tier.priceLabel}
                    </div>
                    <div style={{ color: '#6E6E73', fontSize: '12.5px', marginTop: '2px' }}>{tier.period}</div>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '22px', marginBottom: '28px' }}>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#1D1D1F',
                        marginBottom: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Included Deliverables
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#424245' }}
                        >
                          <span style={{ color: '#1D1D1F', fontWeight: 600 }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => openModal('quotation', tier.name)}
                    className={tier.highlighted ? 'btn-apple-blue' : 'btn-apple-dark'}
                    style={{ width: '100%', padding: '13px', fontSize: '14px' }}
                  >
                    Request Custom Quotation
                  </button>
                  <button
                    onClick={() => openModal('demo', tier.name)}
                    className="btn-apple-secondary"
                    style={{ width: '100%', padding: '11px', fontSize: '13.5px' }}
                  >
                    Start with Free 3D Demo First
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
