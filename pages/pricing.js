import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
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
      badge: 'Focused Launch',
      priceLabel: 'Custom Quotation',
      period: 'Scoped to Selected Catalog Items',
      description: 'A dedicated 3D showroom featuring your top products alongside your existing website and checkout.',
      features: [
        'Custom browser-based 3D room built around your brand',
        'Featured best-selling products staged on 3D shelves',
        'Direct cart & checkout routing where supported',
        'In-store brand story panel & inquiry counter',
        'Shopify, WooCommerce, or custom API integration',
      ],
      highlighted: false,
    },
    {
      name: 'Full 3D Flagship Store',
      backendValue: 'Spatial Retail Flagship',
      badge: 'Comprehensive Build',
      priceLabel: 'Custom Quotation',
      period: 'Custom Architecture & Catalog Sync',
      description: 'Expanded 3D showroom layout with tailored lighting, multiple zones, and deeper catalog synchronization.',
      features: [
        'Extended 3D product lineup & bespoke display fixtures',
        'Custom architectural room design & lighting mood',
        'Multiple display rooms and interactive product callouts',
        'Express wallet routing via your supported gateway',
        'Includes free prototype preview before development commit',
      ],
      highlighted: true,
    },
    {
      name: 'Managed Website Operations',
      backendValue: 'Managed Web Concierge',
      badge: 'Optional Monthly Retainer',
      priceLabel: 'Custom Monthly Plan',
      period: 'Technical Hosting & Store Support',
      description: 'Optional separate monthly support covering hosting, DNS, security backups, speed hygiene, and routine edits.',
      features: [
        'Cloud CDN hosting setup & uptime monitoring',
        'Domain, DNS & SSL renewal management',
        'SPF, DKIM & DMARC email configuration',
        'Ongoing image & Core Web Vitals speed hygiene',
        'Regular off-site backups & routine storefront updates',
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: 'Why do you provide custom quotes instead of flat fixed pricing?',
      a: 'Staging 10 products into a clean single-room layout involves very different scope than designing a multi-room showroom integrated into a bespoke inventory setup. Custom quotations ensure you only pay for the exact work your store requires.',
    },
    {
      q: 'What factors change the final cost of a 3D storefront?',
      a: 'Five main factors: how many products appear in 3D, how custom the room architecture is, your platform (Shopify, WooCommerce, or custom checkout), optional interactive story/video panels, and whether you add ongoing monthly website operations.',
    },
    {
      q: 'Can we test a 3D preview before entering a build agreement?',
      a: 'Yes. Share your store URL and priority products to request a free working 3D prototype preview before reviewing your custom itemized quote.',
    },
    {
      q: 'Is monthly website management required to build a 3D store?',
      a: 'No. Ongoing web operations is completely optional—you can book a standalone 3D storefront project, standalone technical maintenance, or combine both.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Store Development Pricing & Quotation | ManageMyWeb"
        description="Learn how ManageMyWeb scopes custom 3D virtual store development and optional website management. Request a free 3D store demo or a custom project quotation."
        keywords="3D ecommerce website cost, 3D storefront pricing, custom Shopify 3D quote, website management retainer pricing"
        canonicalUrl="https://www.managemyweb.co/pricing"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'OfferCatalog',
          name: 'ManageMyWeb 3D Storefront & Web Operations Scopes',
          itemListElement: tiers.map((t) => ({
            '@type': 'Offer',
            name: t.name,
            description: t.description,
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => openModal('demo', 'Spatial Retail Flagship')} />
      <Navbar onOpenDemoModal={() => openModal('demo', 'Spatial Retail Flagship')} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <Breadcrumbs path="/pricing" currentLabel="Pricing & Quotation" />

          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Project Scopes &amp; Process
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
              3D Store Development Pricing &amp; Quotation
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.55 }}>
              Every quote is scoped around your product count, platform setup, and design complexity—start with a free working 3D demo or request a direct itemized proposal.
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
                  Option 1 · Prototype First
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Request a Free 3D Demo → Then Review Your Quote
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Send your store link and selected products first. Test a working preview on your own device before deciding whether to request an itemized build proposal.
                </p>
              </div>
              <button
                onClick={() => openModal('demo', 'Spatial Retail Flagship')}
                className="btn-apple-blue"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Request Free 3D Store Demo
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
                  Option 2 · Direct Estimate
                </div>
                <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Request a Custom Quotation
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
                  Already know your timeline, commerce platform, and scope? Share your store requirements to receive an itemized scope breakdown and estimated delivery schedule.
                </p>
              </div>
              <button
                onClick={() => openModal('quotation', 'Spatial Retail Flagship')}
                className="btn-apple-dark"
                style={{ alignSelf: 'flex-start', padding: '11px 20px', fontSize: '13.5px' }}
              >
                Request Custom Quote
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
                    Get a Custom Quote
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
              Read our detailed guide: 5 factors that affect 3D store pricing →
            </Link>
          </div>
        </div>

        <FAQSection title="Pricing & Scope Questions" items={faqs} background="#F5F5F7" />
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
