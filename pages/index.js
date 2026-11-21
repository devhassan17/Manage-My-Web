import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import ClientLogos from '../components/ClientLogos';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';

export default function Home({ serverSeo }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('demo');
  const [selectedCategory, setSelectedCategory] = useState('Fashion, Apparel & Footwear');
  const [selectedZoneTab, setSelectedZoneTab] = useState(0);

  const openModalForCategory = (cat, mode = 'demo') => {
    setSelectedCategory(cat || 'Fashion, Apparel & Footwear');
    setModalMode(mode);
    setDemoModalOpen(true);
  };

  const ecommerceVerticals = [
    {
      category: 'Fashion, Apparel & Footwear',
      title: 'Clothing & Footwear',
      desc: 'Walkable clothing racks and shoe displays where visitors inspect silhouettes, pick sizes, and add items straight to their bag.',
    },
    {
      category: 'Beauty, Cosmetics & Fragrance',
      title: 'Skincare, Beauty & Fragrance',
      desc: 'Clean counter displays organized around routines, shades, and gift sets rather than buried dropdown menus.',
    },
    {
      category: 'Consumer Electronics & Audio',
      title: 'Electronics & Audio Hardware',
      desc: 'Interactive tables where shoppers rotate products to examine ports, finishes, and key technical specifications.',
    },
    {
      category: 'Watches, Jewelry & Luxury Goods',
      title: 'Watches & Jewelry',
      desc: 'Detail-focused display cases where buyers view dials and craftsmanship up close or open a direct inquiry desk.',
    },
    {
      category: 'Home, Furniture & Decor',
      title: 'Home, Lighting & Furniture',
      desc: 'Styled rooms that show how pieces fit together at scale instead of isolated cutouts on a white background.',
    },
    {
      category: 'Food, Beverage & Specialty Goods',
      title: 'Coffee, Tea & Specialty Food',
      desc: 'Warm retail shelves pairing tasting packs alongside sourcing stories and simple multi-item gifting.',
    },
  ];

  const zones = [
    {
      title: 'Interactive 3D Product Shelves',
      subtitle: 'Area 01',
      desc: 'Visitors walk up to shelves tailored to your catalog, rotate hero products in the browser, review variants, and add items directly to their existing cart.',
      outcome: 'Guided Product Discovery',
      outcomeNote: 'Built to help shoppers browse curated collections naturally',
      badge: '01 · Product Shelves',
      specs: [
        '360-degree product inspection in Chrome and Safari',
        'Connects to supported Shopify or WooCommerce product feeds',
        'Accessible HTML fallback details for every featured item',
      ],
    },
    {
      title: 'Streamlined Checkout Routing',
      subtitle: 'Area 02',
      desc: 'When shoppers are ready to buy, items pass cleanly into your existing Shopify, WooCommerce, or supported express checkout flow without creating a second account.',
      outcome: 'Seamless Cart Handoff',
      outcomeNote: 'Preserves your existing payment methods and fulfillment',
      badge: '02 · Express Checkout',
      specs: [
        'Uses your existing payment gateways where supported',
        'Supports express mobile wallets enabled on your store',
        'Keeps tax, shipping, and order notifications in one system',
      ],
    },
    {
      title: 'In-Room Brand Story Panels',
      subtitle: 'Area 03',
      desc: 'Most shoppers leave before ever clicking an About link in the footer. Place materials, sourcing proof, and product videos directly inside the showroom.',
      outcome: 'Higher Brand Context',
      outcomeNote: 'Explains value and craftsmanship right beside the price',
      badge: '03 · Brand Story',
      specs: [
        'Readable story panels paired directly with key products',
        'Optional lightweight video walkthroughs or lookbooks',
        'Helps justify premium craftsmanship without popups',
      ],
    },
    {
      title: 'Direct Support & Wholesale Desk',
      subtitle: 'Area 04',
      desc: 'Give hesitant buyers or B2B wholesale inquiries an easy counter inside the store to message your team or jump straight into an inquiry form.',
      outcome: 'Human Buyer Support',
      outcomeNote: 'Turns sizing or bulk questions into qualified leads',
      badge: '04 · Help Desk',
      specs: [
        'Direct contact & WhatsApp handoff with clear intent',
        'Dedicated path for custom bulk or B2B orders',
        'Works cleanly even on mobile or low-power screens',
      ],
    },
  ];

  const faqs = [
    {
      q: 'What does ManageMyWeb develop?',
      a: 'We specialize in custom 3D e-commerce website development—turning standard online stores on Shopify, WooCommerce, and custom setups into walkable 3D storefronts that run directly in standard web browsers. We also offer ongoing technical website management as a separate service.',
    },
    {
      q: 'How does the Free 3D Store Demo work?',
      a: 'Share your existing website link and highlight 2 or 3 representative products. Our team builds a working browser preview with your products so you can test mobile speed and user experience before discussing scope or a custom quotation.',
    },
    {
      q: 'Do shoppers need an app or VR headset?',
      a: 'No. Everything opens directly inside Chrome, Safari, or Edge on mobile phones and desktop computers—with HTML previews and static fallbacks available if a device uses low-power or reduced-motion settings.',
    },
    {
      q: 'Do I have to abandon Shopify or WooCommerce?',
      a: 'No. Your 3D storefront connects alongside or on top of your existing Shopify or WooCommerce catalog so inventory, pricing, payment methods, and orders continue running through your main store platform where supported.',
    },
    {
      q: 'How do you make sure a 3D website is still fast and Google-indexable?',
      a: 'Every critical page heading, product description, comparison, and CTA lives in real server-rendered HTML outside the 3D scene. Assets are compressed and lazy-loaded so initial content remains clean, accessible, and fast.',
    },
    {
      q: 'Can you also manage ongoing hosting, DNS, and technical updates?',
      a: 'Yes. Through our separate Managed Website Operations service, our engineers handle edge hosting, DNS records, backups, speed maintenance, and routine storefront edits.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Website Development | ManageMyWeb"
        description="Build a custom 3D e-commerce storefront for Shopify or WooCommerce. Let customers explore interactive showrooms in their browser and request a free demo from ManageMyWeb."
        keywords="3D ecommerce website development, 3D virtual store development, custom 3D Shopify store, WooCommerce 3D store, interactive 3D storefront, virtual showroom development, ManageMyWeb"
        canonicalUrl="https://www.managemyweb.co/"
        serverSeo={serverSeo}
        schemaData={[
          {
            '@type': 'VideoObject',
            name: 'Interactive 3D E-Commerce Storefront Walkthrough — 30-Second Demo',
            description:
              'See how shoppers explore a browser-based 3D storefront, view products on shelves, and route into checkout without downloading an app.',
            thumbnailUrl: ['https://www.managemyweb.co/images/og-cover.png'],
            uploadDate: '2026-11-08T00:00:00+00:00',
            duration: 'PT30S',
            contentUrl: 'https://www.managemyweb.co/videos/3d-store-preview.mp4',
            embedUrl: 'https://www.managemyweb.co/experience',
          },
          {
            '@type': 'HowTo',
            name: 'How Custom 3D E-Commerce Website Development Works',
            description:
              'Five-stage process from store discovery and free 3D prototype to commerce platform integration, launch, and optional ongoing support.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Discovery & Catalog Review',
                text: 'Share your existing Shopify, WooCommerce, or custom store link and priority products.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Interactive 3D Prototype Demo',
                text: 'Test a working browser prototype featuring your selected products on mobile and desktop.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Commerce Integration & Launch',
                text: 'Connect catalog data and checkout routing, validate performance and accessibility, and publish.',
              },
            ],
          },
        ]}
      />

      <CountdownBanner onClaimDemo={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
      <Navbar onOpenDemoModal={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />

      <main>
        {/* HERO SECTION */}
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
              3D E-Commerce Website Development
            </p>

            <h1
              style={{
                fontSize: 'clamp(34px, 5vw, 56px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                maxWidth: '920px',
                margin: '0 auto 20px auto',
                color: '#1D1D1F',
              }}
            >
              Custom <span style={{ color: '#0066CC' }}>3D E-Commerce Websites</span> Customers Can Walk Through.
            </h1>

            <div
              style={{
                maxWidth: '760px',
                margin: '0 auto 28px auto',
                color: '#424245',
                fontSize: 'clamp(16.5px, 1.75vw, 19px)',
                lineHeight: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <p style={{ margin: 0 }}>
                We design and develop interactive 3D storefronts for e-commerce brands. Customers browse virtual shelves in their web browser, inspect products, and continue to checkout using your existing commerce platform where supported.
              </p>
            </div>

            {/* 3 Core Engineering Pillars */}
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto 28px auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              {[
                {
                  step: '1 · Shopify, WooCommerce & Custom',
                  text: 'Built to work alongside Shopify, WooCommerce, and selected custom storefronts—without throwing away your existing back office.',
                },
                {
                  step: '2 · Mobile & Browser Accessible',
                  text: 'Runs directly in iOS Safari, Android Chrome, and desktop browsers with compressed assets and reduced-motion fallbacks.',
                },
                {
                  step: '3 · Optional Ongoing Tech Support',
                  text: 'Keep development, hosting, security backups, and routine store updates handled cleanly through one engineering partner.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E5EA',
                    borderRadius: '14px',
                    padding: '16px 18px',
                  }}
                >
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0066CC', marginBottom: '5px' }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#424245', lineHeight: 1.5 }}>{item.text}</div>
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
                Request a Free 3D Store Demo
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
                <span>Open live interactive 3D store demo</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '36px' }}>
              Start by testing a custom 3D preview with your real products before requesting a full build quote.
            </p>

            {/* Interactive 3D Showcase Window */}
            <div className="container-wide" style={{ padding: 0 }}>
              <VirtualCoffeeStore3D onOpenContact={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
            </div>
          </div>
        </section>

        {/* CAPABILITY & HONEST PERFORMANCE HIGHLIGHTS */}
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '24px',
                textAlign: 'center',
              }}
            >
              {[
                { label: 'No App Required', title: 'Runs in Any Browser', detail: 'Works in mobile Safari, Chrome, and desktop without downloads' },
                { label: 'Synced Catalog', title: 'Platform Compatible', detail: 'Connects with existing Shopify, WooCommerce & custom carts' },
                { label: 'Indexable HTML', title: 'SEO & Fallback Ready', detail: 'Key headings, copy, and CTAs stay readable outside canvas' },
                { label: 'Clear Scope', title: 'Prototype First', detail: 'Review a working preview featuring your products before committing' },
              ].map((item) => (
                <div key={item.title}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.45 }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIDE-BY-SIDE: HONEST TRADEOFFS & WHEN 3D MAKES SENSE */}
        <section style={{ padding: '72px 0', background: '#FFFFFF', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Standard Grid vs. 3D Showroom
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                  marginBottom: '10px',
                }}
              >
                Who a 3D online store is built for—and how it works alongside your current site.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '15.5px', lineHeight: 1.55 }}>
                We believe in clear engineering tradeoffs: keep flat category pages where rapid SKU search matters most, and use 3D showrooms where visual story and product staging sell.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#F5F5F7', borderRadius: '20px', padding: '28px', border: '1px solid #E5E5EA' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Standard 2D Product Grids
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Great for quick SKU lookup, hard to differentiate
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#424245', fontSize: '14px' }}>
                  <li>• Rows of identical square thumbnails across most stores</li>
                  <li>• Brand story and craftsmanship sit buried in separate footer pages</li>
                  <li>• Best suited when buyers search exact spare parts by code</li>
                  <li>• Rarely creates memorable word-of-mouth visits on its own</li>
                </ul>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '28px', border: '2px solid #0071E3', boxShadow: '0 10px 30px rgba(0, 113, 227, 0.08)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', marginBottom: '8px' }}>
                  ManageMyWeb 3D E-Commerce Storefront
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Designed around visual storytelling and guided exploration
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#1D1D1F', fontSize: '14px', fontWeight: 500 }}>
                  <li>✓ Walkable showroom spaces displaying best-sellers and matching sets</li>
                  <li>✓ Brand story, origin facts, and close-up details live inside the room</li>
                  <li>✓ Syncs into your existing Shopify, WooCommerce, or supported cart</li>
                  <li>✓ Performance-aware compression with accessible HTML fallback copy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STAGE PROCESS */}
        <section style={{ padding: '72px 0', background: '#FBFBFD', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                How We Build It
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                From your current store link to a live 3D launch.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                {
                  step: '01 · Discovery',
                  title: 'Review Your Catalog',
                  desc: 'Tell us whether you use Shopify, WooCommerce, or custom tech, plus top products to highlight.',
                },
                {
                  step: '02 · Prototype',
                  title: 'Test a Free 3D Demo',
                  desc: 'Explore a working browser preview with your real items on phone and laptop before deciding.',
                },
                {
                  step: '03 · Integration',
                  title: 'Connect Products & Cart',
                  desc: 'Sync pricing, stock variants, and checkout routing while checking accessibility and speed.',
                },
                {
                  step: '04 · Launch',
                  title: 'Publish Safely',
                  desc: 'Go live cleanly alongside existing SEO pages with redirects and tracking verified.',
                },
                {
                  step: '05 · Optional Care',
                  title: 'Ongoing Support',
                  desc: 'Optionally keep our team on hand for hosting, monitoring, backups, and store updates.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="apple-card"
                  style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: '#FFFFFF',
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
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5 }}>{item.desc}</p>
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
                Industries We Build For
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Tailored to the products you sell.
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
                      Request Free 3D Demo ›
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
                Inside a 3D Storefront
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                How each area helps shoppers buy with confidence.
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
                    paddingTop: '16px',
                    borderTop: '1px solid #D2D2D7',
                    marginBottom: '22px',
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '2px' }}>
                    {zones[selectedZoneTab].outcome}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#6E6E73' }}>
                    {zones[selectedZoneTab].outcomeNote}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')}
                    className="btn-apple-dark"
                    style={{ padding: '11px 20px', fontSize: '13.5px' }}
                  >
                    Request Free 3D Demo
                  </button>
                  <button
                    onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'quotation')}
                    className="btn-apple-secondary"
                    style={{ padding: '11px 20px', fontSize: '13.5px', color: '#1D1D1F' }}
                  >
                    Get a Custom Quote
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
                    Browser Ready
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
                  Open interactive 3D showroom demo ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT PORTFOLIO */}
        <ClientLogos
          title="E-Commerce & Digital Client Work"
          subtitle="Stores and web platforms delivered across the Netherlands, UK, Ireland, USA, Australia & Canada"
        />

        {/* SERVICE HUBS & OPTIONAL WEB OPERATIONS */}
        <section style={{ padding: '64px 0', background: '#F5F5F7', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Services &amp; Platform Guides
              </p>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Explore 3D services, platform guides &amp; optional web operations.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {[
                {
                  href: '/services/3d-virtual-stores',
                  tag: 'Core Service',
                  title: 'Custom 3D Virtual Store Development',
                  desc: 'Full architecture, mobile fallbacks, checkout integration, and staging steps.',
                },
                {
                  href: '/shopify-3d-store',
                  tag: 'Shopify',
                  title: 'Shopify 3D Storefront Integration',
                  desc: 'Connect a walkable 3D shop with your Shopify catalog, variants, and checkout.',
                },
                {
                  href: '/woocommerce-3d-store',
                  tag: 'WooCommerce',
                  title: 'WooCommerce 3D Store Integration',
                  desc: 'Keep WordPress payments and plugins running while serving fast 3D browsing.',
                },
                {
                  href: '/services/web-management',
                  tag: 'Secondary Service',
                  title: 'Managed Website Operations',
                  desc: 'Separate optional retainer for hosting, DNS, security backups, and store edits.',
                },
              ].map((hub) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="apple-card apple-card-interactive"
                  style={{
                    padding: '24px',
                    borderRadius: '18px',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {hub.tag}
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                      {hub.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#6E6E73', lineHeight: 1.5, margin: 0 }}>{hub.desc}</p>
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0066CC' }}>Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ACCESSIBLE READABLE FAQ */}
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Clear answers about 3D store development, platform support, and ongoing maintenance."
          items={faqs}
          background="#FBFBFD"
        />
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

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  const { readDataAsync } = await import('../utils/dataStore');
  const settings = await readDataAsync('site-settings.json', {});
  return {
    props: {
      serverSeo: settings?.seo || null,
    },
  };
}
