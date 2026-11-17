import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
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
      name: 'Starter 3D Storefront',
      backendValue: '3D Storefront Launchpad',
      badge: 'Growing Brands',
      priceLabel: 'Custom Quote',
      period: 'Based on catalog size',
      description: 'A clean 3D showroom featuring your best-selling products and direct checkout.',
      features: [
        'Custom 3D shop built around your brand',
        'Up to 15 interactive products on 3D shelves',
        'One-tap Apple Pay & card checkout',
        'Brand story wall & WhatsApp help desk',
        'Connects live to Shopify or WooCommerce',
      ],
      highlighted: false,
    },
    {
      name: 'Full 3D Flagship Store',
      backendValue: 'Spatial Retail Flagship',
      badge: 'Most Popular',
      priceLabel: 'Custom Quote',
      period: 'Complete Multi-Room Store',
      description: 'Multi-room 3D showroom with custom lighting, full product sync, and free 48h demo.',
      features: [
        'All products & custom 3D displays included',
        'Custom room design tailored to your industry',
        'Day & evening lighting + interactive story walls',
        'Express Apple Pay, Shop Pay & Stripe checkout',
        'Free 48-hour working 3D preview first',
      ],
      highlighted: true,
    },
    {
      name: 'Monthly Website Care',
      backendValue: 'Managed Web Concierge',
      badge: 'Monthly Support',
      priceLabel: 'Monthly Retainer',
      period: 'Full Website & Tech Care',
      description: 'We manage your hosting, DNS, mobile speed, daily backups, and same-day WhatsApp edits.',
      features: [
        'Fast global cloud hosting (< 1.1s loads)',
        'Domain, DNS & SSL renewal management',
        'SPF, DKIM & DMARC business email setup',
        'Same-day store edits right over WhatsApp',
        'Automated daily off-site backups & monitoring',
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: 'Why is there no single fixed price box?',
      a: 'A store putting 12 best-sellers into one simple room takes a completely different amount of work than a 400-product custom flagship store. Sending a tailored quote guarantees you never overpay for features you do not need.',
    },
    {
      q: 'Is the 48-hour 3D demo really free?',
      a: 'Yes! You share your store URL and 2 or 3 products. We build a working 3D preview at zero charge so you can see and test how it feels before deciding whether to go ahead.',
    },
    {
      q: 'Do I have to pay monthly if I only want the 3D store built once?',
      a: 'No. Monthly Website Care is optional—you can hire us for a one-time build, purely for monthly website care, or bundle both together.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Online Store Pricing, Website Care Plans & Free Demo | ManageMyWeb"
        description="See how ManageMyWeb quotes custom 3D online stores and monthly website management. Try your own store in 3D free in 48 hours or ask for a clear custom quote."
        keywords="3D online store cost, 3D website pricing, Shopify 3D store quote, monthly website maintenance cost, free 3D store demo"
        canonicalUrl="https://www.managemyweb.co/pricing"
        schemaData={[
          {
            '@type': 'OfferCatalog',
            name: 'ManageMyWeb 3D Store & Monthly Website Care Plans',
            itemListElement: tiers.map((t) => ({
              '@type': 'Offer',
              name: t.name,
              description: t.description,
            })),
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

      <CountdownBanner onClaimDemo={() => openModal('demo', 'Spatial Retail Flagship')} />
      <Navbar onOpenDemoModal={() => openModal('demo', 'Spatial Retail Flagship')} />

      <main style={{ paddingTop: '52px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <div style={{ textAlign: 'center', maxWidth: '660px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Two Easy Ways to Start
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
              Start with a Free 3D Demo, or ask for a Direct Quote.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.5 }}>
              Preview your real products inside a 3D shop for free before spending a dollar—or get an honest quote in 24 hours.
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
                  Option 1 · Test First
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Free 48-Hour 3D Demo → Clear Quote
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Send your store link first. Within 48 hours you walk through a free 3D preview made with your products, then get a clear quote.
                </p>
              </div>
              <button
                onClick={() => openModal('demo', 'Spatial Retail Flagship')}
                className="btn-apple-blue"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Get My Free 3D Demo
              </button>
            </div>

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
                  Option 2 · Fast Quote
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Direct Custom Quote in 24 Hours
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Already know what your store needs? Tell us your platform and product count and we will send an itemized proposal within 24 hours.
                </p>
              </div>
              <button
                onClick={() => openModal('quotation', 'Spatial Retail Flagship')}
                className="btn-apple-dark"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Ask for a Quote
              </button>
            </div>
          </div>

          {/* Scope Tiers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '48px',
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
                    onClick={() => openModal('quotation', tier.backendValue)}
                    className={tier.highlighted ? 'btn-apple-blue' : 'btn-apple-dark'}
                    style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}
                  >
                    Ask for a Quote
                  </button>
                  <button
                    onClick={() => openModal('demo', tier.backendValue)}
                    className="btn-apple-secondary"
                    style={{ width: '100%', padding: '10px', fontSize: '13px', color: '#1D1D1F' }}
                  >
                    Try Free 3D Demo First
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/blog/what-affects-the-cost-of-a-3d-ecommerce-website" className="apple-link" style={{ fontSize: '15px' }}>
              Read our breakdown: 5 factors that affect the price of a 3D website →
            </Link>
          </div>
        </div>

        <FAQSection title="Pricing & Quote Questions" items={faqs} background="#F5F5F7" />
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
