import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Pricing() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [monthlyTraffic, setMonthlyTraffic] = useState(25000);
  const [avgOrderValue, setAvgOrderValue] = useState(35);

  const baselineRevenue = monthlyTraffic * 0.02 * avgOrderValue;
  const projectedRevenue = monthlyTraffic * 0.032 * (avgOrderValue * 1.25);
  const monthlyRevenueLift = Math.round(projectedRevenue - baselineRevenue);

  const tiers = [
    {
      name: '3D Storefront Launchpad',
      badge: 'For Independent Brands',
      price: '$1,850',
      period: 'one-time build',
      description: 'A custom 3D flagship showroom featuring interactive product shelving, express checkout, and brand provenance.',
      features: [
        'Bespoke 3D WebGL Storefront',
        'Up to 12 Interactive 3D Products',
        'Express Bar Checkout Counter',
        'Brand Provenance & Story Wall',
        'Concierge Dispatch Contact Desk',
        'Mobile Safari & Chrome Optimization',
        'Live Shopify or WooCommerce Sync',
      ],
      cta: 'Request Free Prototype First',
      highlighted: false,
    },
    {
      name: 'Spatial Retail Flagship',
      badge: 'Most Popular',
      price: '$3,400',
      period: 'one-time build',
      description: 'Multi-zone architectural showroom with custom lighting, acoustic soundscapes, and spatial analytics.',
      features: [
        'Unlimited 3D Products & Shelving',
        'Custom Architectural Room Design',
        'Daylight & Evening Gallery Lighting',
        'Ambient Acoustic Soundscape',
        'Apple Pay & Stripe Express Register',
        'Spatial Customer Engagement Analytics',
        'Dedicated Lead Engineer',
        'Complimentary Prototype Included',
      ],
      cta: 'Start with Free Prototype',
      highlighted: true,
    },
    {
      name: 'Managed Web Concierge',
      badge: 'Ongoing Operations',
      price: '$490',
      period: 'per month',
      description: 'Complete technical stewardship so your team never has to manage hosting, DNS, speed, or code updates.',
      features: [
        'Global Edge Cloud NVMe Hosting',
        'Domain, DNS & SSL Management',
        'Business Email Authentication (DMARC/SPF)',
        'Continuous Core Web Vitals Tuning',
        'Unlimited Routine Content & Product Edits',
        'Daily Automated Off-Site Backups',
        'Direct Engineer Access via WhatsApp',
      ],
      cta: 'Inquire About Retainer',
      highlighted: false,
    },
  ];

  return (
    <>
      <SEOHead
        title="Pricing & Complimentary Prototype Program | ManageMyWeb"
        description="Transparent pricing for bespoke 3D retail storefronts and managed web operations. Request a complimentary 3D store prototype before committing."
        canonicalUrl="https://managemyweb.co/pricing"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Transparent Investment
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
              Clear pricing. Zero upfront risk.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.5 }}>
              Every engagement begins with a complimentary 3D prototype of your store so you can evaluate the experience with your team before investing.
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
              marginBottom: '88px',
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
                  boxShadow: tier.highlighted ? '0 16px 40px rgba(0, 0, 0, 0.08)' : '0 2px 12px rgba(0, 0, 0, 0.03)',
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

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '28px' }}>
                    <span style={{ fontSize: '42px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.03em' }}>
                      {tier.price}
                    </span>
                    <span style={{ color: '#6E6E73', fontSize: '14px' }}>/ {tier.period}</span>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '22px', marginBottom: '30px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Included Deliverables
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tier.features.map((feat) => (
                        <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#424245' }}>
                          <span style={{ color: '#1D1D1F', fontWeight: 600 }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className={tier.highlighted ? 'btn-apple-blue' : 'btn-apple-dark'}
                  style={{ width: '100%', padding: '13px', fontSize: '14.5px' }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Interactive Revenue Estimator */}
          <div
            style={{
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 52px)',
              background: '#F5F5F7',
              border: '1px solid #D2D2D7',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 40px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Commercial Return Calculator
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                Estimate Your Monthly Revenue Lift
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '15px' }}>
                Adjust your monthly store visitors and average order value to model the impact of higher engagement and shelf bundling.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#1D1D1F', fontWeight: 500 }}>Monthly Store Visitors</span>
                    <span style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: 600 }}>{monthlyTraffic.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="200000"
                    step="1000"
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#0071E3', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#1D1D1F', fontWeight: 500 }}>Current Average Order Value</span>
                    <span style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: 600 }}>${avgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="250"
                    step="5"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#0071E3', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '18px',
                  padding: '32px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Projected Monthly Revenue Lift
                </div>
                <div style={{ fontSize: '46px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '10px' }}>
                  +${monthlyRevenueLift.toLocaleString()}
                </div>
                <p style={{ color: '#6E6E73', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                  Modeled on observed conversion and order value improvements across interactive 3D storefront deployments.
                </p>
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="btn-apple-blue"
                  style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                >
                  Request Your Free Prototype
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
