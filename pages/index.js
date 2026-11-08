import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import ClientLogos from '../components/ClientLogos';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('demo');
  const [selectedCategory, setSelectedCategory] = useState('Fashion, Apparel & Footwear');
  const [selectedZoneTab, setSelectedZoneTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const openModalForCategory = (cat, mode = 'demo') => {
    setSelectedCategory(cat || 'Fashion, Apparel & Footwear');
    setModalMode(mode);
    setDemoModalOpen(true);
  };

  const ecommerceVerticals = [
    {
      category: 'Fashion, Apparel & Footwear',
      title: 'Fashion & Footwear',
      desc: 'Walkable seasonal racks, 360° product inspection, and full outfit checkouts.',
    },
    {
      category: 'Beauty, Cosmetics & Fragrance',
      title: 'Beauty & Fragrance',
      desc: 'Sculpted vanity counters with shade finders and bundle builders.',
    },
    {
      category: 'Consumer Electronics & Audio',
      title: 'Electronics & Hardware',
      desc: 'Interactive 3D product tables with 360° hardware rotation and specs.',
    },
    {
      category: 'Watches, Jewelry & Luxury Goods',
      title: 'Watches & Luxury',
      desc: 'Illuminated glass display cases with macro inspection and VIP concierge.',
    },
    {
      category: 'Home, Furniture & Decor',
      title: 'Home & Furniture',
      desc: 'Real-scale architectural rooms to preview proportions and textures.',
    },
    {
      category: 'Food, Beverage & Specialty Goods',
      title: 'Food, Coffee & CPG',
      desc: 'Tactile tasting shelves, origin walls, and fast bundle checkouts.',
    },
  ];

  const zones = [
    {
      title: '3D Product Shelving',
      subtitle: 'Zone 01',
      desc: 'Walk up to custom racks and shelves, inspect items in 360°, and add directly to bag.',
      stat: '+48%',
      statLabel: 'Product discovery depth',
      badge: '01 · Product Displays',
      specs: ['360° Product Inspection', 'Live Variant & Stock Sync', 'Custom Industry Fixtures'],
    },
    {
      title: 'Express Counter Checkout',
      subtitle: 'Zone 02',
      desc: 'One-tap Apple Pay, Google Pay, and Stripe synced live with Shopify or WooCommerce.',
      stat: '+62%',
      statLabel: 'Average order value lift',
      badge: '02 · Express Checkout',
      specs: ['One-Tap Apple Pay & Google Pay', 'Direct Shopify / WooCommerce Cart', 'Zero Multi-Page Checkout Friction'],
    },
    {
      title: 'Brand Story Wall',
      subtitle: 'Zone 03',
      desc: 'Showcase craftsmanship, materials, and provenance directly inside the showroom.',
      stat: '3.4×',
      statLabel: 'Repeat customer retention',
      badge: '03 · Brand Wall',
      specs: ['In-Store Craftsmanship Exhibit', 'Origin & Material Breakdowns', 'Interactive Video & Story Panels'],
    },
    {
      title: 'VIP Concierge Desk',
      subtitle: 'Zone 04',
      desc: 'Direct in-store desk for sizing help, wholesale orders, and instant WhatsApp support.',
      stat: '94%',
      statLabel: 'Inquiry completion rate',
      badge: '04 · Concierge Desk',
      specs: ['Direct WhatsApp Concierge', 'Wholesale & VIP Order Desk', 'Instant Sizing & Product Advice'],
    },
  ];

  const faqs = [
    {
      q: 'What types of stores do you build in 3D?',
      a: 'Every e-commerce category—fashion, footwear, beauty, electronics, watches, home goods, and food & beverage.',
    },
    {
      q: 'How do the Free 3D Demo and Custom Quotation work?',
      a: 'Choose Step 1 to get a free 48-hour 3D preview of your store before receiving your Step 2 quotation, or request a direct custom quotation right away.',
    },
    {
      q: 'Does it run fast on mobile phones?',
      a: 'Yes. 60fps on iOS Safari and Android Chrome in under 1.1 seconds—no app download needed.',
    },
    {
      q: 'Does it connect to Shopify or WooCommerce?',
      a: 'Yes. Your existing catalog, inventory, variants, and checkout stay 100% synced.',
    },
    {
      q: 'What is included in Managed Web Operations?',
      a: 'Cloud hosting, domains, DNS, business email (DMARC/SPF), speed optimization, security backups, and same-day edits via WhatsApp.',
    },
  ];

  return (
    <>
      <SEOHead
        title="ManageMyWeb | 3D Virtual Storefronts & Managed Web Operations for E-Commerce"
        description="Turn your online store into an interactive 3D flagship showroom. We build custom 3D storefronts for fashion, beauty, electronics, luxury, and retail brands—and manage your entire web infrastructure. Request a free 48-hour prototype."
        keywords="3D virtual store, 3D ecommerce website, interactive 3D Shopify store, virtual retail showroom, spatial commerce agency, WebGL online store, 3D storefront builder, managed web operations, ecommerce conversion rate optimization, Shopify 3D store, ManageMyWeb"
        canonicalUrl="https://managemyweb.co"
        schemaData={{
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
      <Navbar onOpenDemoModal={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />

      <main>
        {/* HERO SECTION — SIMPLE, EASY TO UNDERSTAND AT A GLANCE */}
        <section style={{ paddingTop: '56px', paddingBottom: '56px', background: '#FBFBFD' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0066CC',
                marginBottom: '12px',
              }}
            >
              3D Online Stores &amp; Full Website Management
            </p>

            <h1
              style={{
                fontSize: 'clamp(36px, 5.2vw, 60px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                maxWidth: '820px',
                margin: '0 auto 18px auto',
                color: '#1D1D1F',
              }}
            >
              Turn your website into a{' '}
              <span style={{ color: '#0066CC' }}>3D store</span> customers can walk inside.
            </h1>

            <p
              style={{
                maxWidth: '660px',
                margin: '0 auto 26px auto',
                color: '#424245',
                fontSize: 'clamp(17px, 1.8vw, 20px)',
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              Instead of scrolling boring product photos, customers walk through your virtual 3D shop on their phone or laptop, click items on the shelves, and buy in one tap.
            </p>

            {/* 3 Short, Easy Pills */}
            <div
              style={{
                maxWidth: '840px',
                margin: '0 auto 28px auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              {[
                {
                  step: '1 · Keep Your Current Website',
                  text: 'Connects directly to your existing Shopify, WooCommerce, or custom store.',
                },
                {
                  step: '2 · Works on Any Phone or Laptop',
                  text: 'Opens fast in any browser—no app download needed.',
                },
                {
                  step: '3 · Free 3D Demo First',
                  text: 'See your own products inside a 3D store in 48 hours before you pay anything.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E5EA',
                    borderRadius: '14px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.45 }}>{item.text}</div>
                </div>
              ))}
            </div>

            {/* Primary CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '12px',
              }}
            >
              <button
                onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')}
                className="btn-apple-blue"
                style={{ padding: '14px 26px', fontSize: '15px' }}
              >
                Get Free 3D Demo
              </button>

              <button
                onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'quotation')}
                className="btn-apple-secondary"
                style={{ padding: '14px 26px', fontSize: '15px', color: '#1D1D1F' }}
              >
                Get a Custom Quote
              </button>

              <a
                href="https://crazy-3d-website-idea.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
                style={{ fontSize: '15px', marginLeft: '6px' }}
              >
                <span>Try live 3D store</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '36px' }}>
              Start with a free 48-hour 3D demo first, or ask for a direct price quote.
            </p>

            {/* Video Showcase of the 3D Storefront */}
            <div className="container-wide" style={{ padding: 0 }}>
              <VirtualCoffeeStore3D onOpenContact={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS PORTFOLIO — PROMINENTLY ON HOME PAGE */}
        <ClientLogos
          title="Trusted by 14+ Global Client Brands"
          subtitle="Websites & E-Commerce Platforms Delivered Across Netherlands, UK, Ireland, USA, Australia & Canada"
        />

        {/* METRICS BAR */}
        <section
          style={{
            background: '#F5F5F7',
            borderTop: '1px solid #D2D2D7',
            borderBottom: '1px solid #D2D2D7',
            padding: '40px 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                textAlign: 'center',
              }}
            >
              {[
                { stat: '3.4×', label: 'Longer Sessions', detail: '3m 42s vs. 45s on 2D grids' },
                { stat: '+62%', label: 'Higher Order Value', detail: '3D shelf merchandising' },
                { stat: '< 1.1s', label: 'Mobile Load Speed', detail: '60fps on iOS & Android' },
                { stat: '100%', label: 'Managed Operations', detail: 'Hosting, DNS & daily edits' },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: 'clamp(32px, 3.6vw, 42px)',
                      fontWeight: 600,
                      color: '#1D1D1F',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      marginBottom: '4px',
                    }}
                  >
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1D1D1F' }}>{item.label}</div>
                  <div style={{ fontSize: '12.5px', color: '#6E6E73' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-STEP HOW IT WORKS */}
        <section style={{ padding: '72px 0', background: '#FFFFFF', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                How It Works
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Test your 3D store before you invest.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Share Your Store URL',
                  desc: 'Send your Shopify, WooCommerce, or custom website link.',
                },
                {
                  step: '02',
                  title: 'Free 3D Demo in 48h',
                  desc: 'Explore a live 3D prototype featuring your own products at zero cost.',
                },
                {
                  step: '03',
                  title: 'Custom Quote & Launch',
                  desc: 'Receive a tailored quotation and let our team run your hosting and updates.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="apple-card"
                  style={{
                    padding: '28px',
                    borderRadius: '18px',
                    background: '#FBFBFD',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0066CC',
                      marginBottom: '8px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E-COMMERCE CATEGORIES */}
        <section style={{ padding: '72px 0', background: '#F5F5F7', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                All E-Commerce Categories
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Built for what you sell.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '18px',
              }}
            >
              {ecommerceVerticals.map((v, idx) => (
                <div
                  key={v.title}
                  className="apple-card apple-card-interactive"
                  style={{
                    padding: '26px',
                    borderRadius: '18px',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#0066CC',
                        marginBottom: '6px',
                      }}
                    >
                      0{idx + 1} · {v.category}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                      {v.title}
                    </h3>
                    <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
                      {v.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <button
                      onClick={() => openModalForCategory(v.category, 'demo')}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#0066CC',
                        fontSize: '13.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      Free 3D Demo ›
                    </button>
                    <button
                      onClick={() => openModalForCategory(v.category, 'quotation')}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#1D1D1F',
                        fontSize: '13.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      Get Quote ›
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 ZONES INTERACTIVE PREVIEW */}
        <section style={{ padding: '72px 0', background: '#FFFFFF', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 32px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Inside the Showroom
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Four zones built to convert.
              </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
              <div className="segmented-control" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {zones.map((zone, idx) => (
                  <button
                    key={zone.title}
                    onClick={() => setSelectedZoneTab(idx)}
                    className={`segment-btn ${selectedZoneTab === idx ? 'active' : ''}`}
                  >
                    {zone.badge}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#F5F5F7',
                borderRadius: '22px',
                padding: 'clamp(24px, 3.5vw, 40px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#0066CC',
                    marginBottom: '6px',
                  }}
                >
                  {zones[selectedZoneTab].subtitle}
                </p>

                <h3
                  style={{
                    fontSize: 'clamp(24px, 2.8vw, 30px)',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    letterSpacing: '-0.025em',
                    marginBottom: '10px',
                  }}
                >
                  {zones[selectedZoneTab].title}
                </h3>

                <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.55, marginBottom: '20px' }}>
                  {zones[selectedZoneTab].desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px',
                    paddingTop: '16px',
                    borderTop: '1px solid #D2D2D7',
                    marginBottom: '22px',
                  }}
                >
                  <span style={{ fontSize: '28px', fontWeight: 600, color: '#1D1D1F' }}>
                    {zones[selectedZoneTab].stat}
                  </span>
                  <span style={{ fontSize: '13.5px', color: '#6E6E73' }}>
                    {zones[selectedZoneTab].statLabel}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')}
                    className="btn-apple-dark"
                    style={{ padding: '11px 20px', fontSize: '13.5px' }}
                  >
                    Try Free 3D Demo
                  </button>
                  <button
                    onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'quotation')}
                    className="btn-apple-secondary"
                    style={{ padding: '11px 20px', fontSize: '13.5px' }}
                  >
                    Request Quotation
                  </button>
                </div>
              </div>

              <div
                style={{
                  borderRadius: '18px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E5EA',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {zones[selectedZoneTab].badge}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#1D7D3F', background: '#E8F5E9', padding: '3px 10px', borderRadius: '980px', fontWeight: 600 }}>
                    60fps WebGL Ready
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {zones[selectedZoneTab].specs.map((spec) => (
                    <div
                      key={spec}
                      style={{
                        background: '#F5F5F7',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#1D1D1F',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#0066CC', fontWeight: 700 }}>✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://crazy-3d-website-idea.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#0066CC',
                    textDecoration: 'none',
                  }}
                >
                  Test this zone inside the live 3D showroom ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT FAQ */}
        <section style={{ padding: '72px 0', background: '#FBFBFD' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.4vw, 36px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Quick Answers
              </h2>
            </div>

            <div style={{ borderTop: '1px solid #D2D2D7' }}>
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={faq.q} style={{ borderBottom: '1px solid #D2D2D7' }}>
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 0',
                        background: 'transparent',
                        border: 'none',
                        color: '#1D1D1F',
                        fontSize: '16px',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span>{faq.q}</span>
                      <span
                        style={{
                          fontSize: '20px',
                          color: '#6E6E73',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          paddingBottom: '18px',
                          color: '#424245',
                          fontSize: '14.5px',
                          lineHeight: 1.55,
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenDemoModal={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />

      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCategory={selectedCategory}
        initialMode={modalMode}
      />
    </>
  );
}
