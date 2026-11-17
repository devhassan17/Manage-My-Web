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
      title: 'Clothing & Shoes',
      desc: 'Walkable racks and sneaker walls where shoppers spin every item 360° and pick their size right in the room.',
    },
    {
      category: 'Beauty, Cosmetics & Fragrance',
      title: 'Skincare, Makeup & Perfume',
      desc: 'Clean display counters where buyers compare shades, read ingredients, and add gift bundles in one tap.',
    },
    {
      category: 'Consumer Electronics & Audio',
      title: 'Tech, Gadgets & Audio',
      desc: 'Interactive product tables where visitors rotate headphones or gear, compare specs, and check out fast.',
    },
    {
      category: 'Watches, Jewelry & Luxury Goods',
      title: 'Watches & Jewelry',
      desc: 'Bright display cases that let shoppers zoom in on close-up details and book VIP help or wholesale orders.',
    },
    {
      category: 'Home, Furniture & Decor',
      title: 'Home & Furniture',
      desc: 'Real-scale rooms where customers can see how furniture, lighting, and decor look together before buying.',
    },
    {
      category: 'Food, Beverage & Specialty Goods',
      title: 'Coffee, Food & Drinks',
      desc: 'Inviting shelves that tell your sourcing story alongside bundle boxes—just like walking into your cafe or shop.',
    },
  ];

  const zones = [
    {
      title: 'Walk-Up Product Shelves',
      subtitle: 'Room 01',
      desc: 'Instead of scrolling flat squares, visitors walk up to custom racks, spin products 360°, pick sizes or colors, and drop them straight into their cart.',
      stat: '+48%',
      statLabel: 'More products viewed per visit',
      badge: '01 · 3D Shelves',
      specs: ['Spin and inspect any product in 360°', 'Live stock and variants from your store', 'Custom-built displays for what you sell'],
    },
    {
      title: 'One-Tap Checkout Counter',
      subtitle: 'Room 02',
      desc: 'No clunky 5-step checkout forms. Customers walk to the counter and pay with Apple Pay, Google Pay, Shop Pay, or card in seconds.',
      stat: '+62%',
      statLabel: 'Higher average order size',
      badge: '02 · Fast Checkout',
      specs: ['One-tap Apple Pay & Google Pay', 'Connects directly to Shopify or WooCommerce', 'Fewer abandoned carts on mobile'],
    },
    {
      title: 'Your Brand Story Wall',
      subtitle: 'Room 03',
      desc: 'Almost nobody clicks hidden About pages. Put what makes your products special—materials, craftsmanship, or videos—right beside your shelves.',
      stat: '3.4×',
      statLabel: 'More repeat customers',
      badge: '03 · Brand Story',
      specs: ['Photos, videos, and story panels inside the shop', 'Show how your products are made', 'Build instant trust with first-time buyers'],
    },
    {
      title: 'Customer Help & Wholesale Desk',
      subtitle: 'Room 04',
      desc: 'Give shoppers or wholesale buyers a real place inside the store to ask sizing questions, request bulk pricing, or open WhatsApp in one click.',
      stat: '94%',
      statLabel: 'Customers find what they need',
      badge: '04 · Live Help Desk',
      specs: ['Instant WhatsApp or live chat handoff', 'Bulk & wholesale order requests', 'Direct help with sizes and bundles'],
    },
  ];

  const faqs = [
    {
      q: 'What does ManageMyWeb actually do?',
      a: 'We do two things for online store owners: (1) we turn your Shopify, WooCommerce, or custom shop into a fast 3D online store shoppers can walk through on any phone or computer, and (2) we handle your monthly hosting, speed, security, email, and daily website edits so you do not have to stress over tech.',
    },
    {
      q: 'How does the Free 48-Hour 3D Demo work?',
      a: 'You share your store link and pick 2 or 3 best-selling products. Within 48 hours, our team builds a working 3D preview of your own shop for free. Once you test it, we send a clear custom quote based on what you want—zero pressure to buy.',
    },
    {
      q: 'Do customers need to download an app or have a powerful computer?',
      a: 'No app is required. Your 3D store opens directly in Safari or Chrome on iPhones, Android phones, and laptops, loading in around 1 second at a smooth 60 frames per second.',
    },
    {
      q: 'Do I have to leave Shopify or WooCommerce to use this?',
      a: 'No. Your existing Shopify, WooCommerce, or custom checkout, prices, stock levels, and order emails stay exactly where they are. We connect the 3D store right onto your current setup.',
    },
    {
      q: 'Can you just manage and speed up my current website without 3D?',
      a: 'Yes! Many clients hire us purely for monthly website care—fast cloud hosting, fixing slow pages on mobile, setting up business emails so they never land in spam, daily backups, and same-day edits on WhatsApp.',
    },
    {
      q: 'Will a 3D online store still rank well on Google?',
      a: 'Yes. Every 3D store we build includes full readable HTML text, fast page loads, mobile-friendly markup, XML sitemaps, and Schema.org data so Google indexes every page and product properly.',
    },
  ];

  return (
    <>
      <SEOHead
        title="ManageMyWeb | 3D Online Stores & Monthly Website Management"
        description="Turn your Shopify, WooCommerce, or custom website into a 3D online store shoppers can walk through. Plus full hosting, speed fixes, and daily updates. Get a free 3D demo in 48 hours."
        keywords="3D online store, 3D Shopify store, WooCommerce 3D store, interactive 3D website, virtual store builder, website management service, monthly website maintenance, free 3D store demo, ManageMyWeb"
        canonicalUrl="https://www.managemyweb.co"
        serverSeo={serverSeo}
        schemaData={[
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          },
          {
            '@type': 'VideoObject',
            name: 'How a 3D Online Store Works — 30-Second Walkthrough',
            description:
              'Watch how ManageMyWeb turns a standard Shopify, WooCommerce, or custom store into a fast 3D online shop shoppers can walk through on any phone or computer.',
            thumbnailUrl: ['https://www.managemyweb.co/images/og-cover.png'],
            uploadDate: '2026-11-08T00:00:00+00:00',
            duration: 'PT30S',
            contentUrl: 'https://www.managemyweb.co/videos/3d-store-preview.mp4',
            embedUrl: 'https://www.managemyweb.co/experience',
          },
          {
            '@type': 'HowTo',
            name: 'How to Turn Your Online Store Into a 3D Store',
            description:
              'See your own store in 3D for free in 48 hours, review a custom quote, and launch synced with your current checkout.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Send Your Store Website Link',
                text: 'Share your Shopify, WooCommerce, or custom store link to request a free 3D demo.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Test Your Free 48-Hour 3D Demo',
                text: 'Walk through a working 3D store built around your actual products in 48 hours at zero cost.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Get a Clear Quote & Go Live',
                text: 'Pick what you want, get a straightforward quote, and let our team manage hosting and updates.',
              },
            ],
          },
        ]}
      />

      <CountdownBanner onClaimDemo={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
      <Navbar onOpenDemoModal={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />

      <main>
        {/* HERO SECTION — PLAIN HUMAN ENGLISH */}
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
              3D Online Stores &amp; Full Website Care
            </p>

            <h1
              style={{
                fontSize: 'clamp(34px, 5vw, 58px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                maxWidth: '900px',
                margin: '0 auto 20px auto',
                color: '#1D1D1F',
              }}
            >
              Turn your online store into a <span style={{ color: '#0066CC' }}>3D shop</span> customers actually remember.
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
                Most online stores look like the exact same grid of flat boxes. Shoppers scroll for 30 seconds, get bored, and close the tab.
              </p>
              <p style={{ margin: 0 }}>
                We build a fast, <strong style={{ color: '#1D1D1F', fontWeight: 600 }}>walkable 3D online store</strong> right in the browser for Shopify, WooCommerce, or custom websites—and handle your hosting, speed fixes, security backups, and daily updates so you can focus on selling.
              </p>
            </div>

            {/* 3 Clear Pillars */}
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
                  step: '1 · Works on Any Phone, No App Needed',
                  text: 'Customers walk through your store, spin items in 360°, add to cart, and pay right inside Safari or Chrome.',
                },
                {
                  step: '2 · Connects to Shopify & WooCommerce',
                  text: 'Keep your existing products, stock, and checkout—plus we manage your hosting, speed, DNS, and daily edits.',
                },
                {
                  step: '3 · See Your Free 3D Demo in 48 Hours',
                  text: 'Send us your store link and we will build a free 3D preview with your real products before you pay a cent.',
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
                Get My Free 3D Demo
              </button>

              <button
                onClick={() => openModalForCategory('Fashion, Apparel & Footwear', 'quotation')}
                className="btn-apple-secondary"
                style={{ padding: '14px 26px', fontSize: '15px', color: '#1D1D1F' }}
              >
                Ask for a Quote
              </button>

              <a
                href="https://crazy-3d-website-idea.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
                style={{ fontSize: '15px', marginLeft: '6px' }}
              >
                <span>Try a live 3D store demo</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '36px' }}>
              Step 1: Free 48-hour 3D preview of your products → Step 2: Custom quote tailored to your store
            </p>

            {/* Video Showcase of the 3D Storefront */}
            <div className="container-wide" style={{ padding: 0 }}>
              <VirtualCoffeeStore3D onOpenContact={() => openModalForCategory('Fashion, Apparel & Footwear', 'demo')} />
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS PORTFOLIO */}
        <ClientLogos
          title="Trusted by 14+ Brands Worldwide"
          subtitle="Real online stores and business websites we built and manage across the US, UK, Netherlands, Ireland, Australia & Canada"
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
                { stat: '3.4×', label: 'Longer Store Visits', detail: 'Over 3 minutes exploring vs. 45s on flat grids' },
                { stat: '+62%', label: 'Bigger Cart Totals', detail: 'Shoppers naturally bundle items from shelves' },
                { stat: '< 1.1s', label: 'Fast Mobile Loading', detail: 'Smooth 60fps in iPhone Safari & Android Chrome' },
                { stat: '24/7', label: 'Full Website Care', detail: 'Hosting, backups, speed & same-day edits' },
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

        {/* SIDE-BY-SIDE COMPARISON: WHY A 3D STORE BEATS FLAT TEMPLATES */}
        <section style={{ padding: '72px 0', background: '#FFFFFF', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Flat Store vs. 3D Store
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
                Why store owners switch away from plain templates.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '15.5px', lineHeight: 1.55 }}>
                You spend hard-earned money on ads and SEO to bring people to your website. Do not lose them on a forgettable page.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#F5F5F7', borderRadius: '20px', padding: '28px', border: '1px solid #E5E5EA' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Standard Template Website
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Looks just like every competitor
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#424245', fontSize: '14px' }}>
                  <li>• Boring rows of small square product photos</li>
                  <li>• Shoppers bounce in under 45 seconds</li>
                  <li>• Brand story buried in a footer link nobody clicks</li>
                  <li>• Slow mobile pages weighed down by heavy plugins</li>
                  <li>• You have to fix hosting, DNS, and broken layouts yourself</li>
                </ul>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '28px', border: '2px solid #0071E3', boxShadow: '0 10px 30px rgba(0, 113, 227, 0.08)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', marginBottom: '8px' }}>
                  ManageMyWeb 3D Store + Monthly Care
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Feels like walking into your flagship shop
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#1D1D1F', fontSize: '14px', fontWeight: 500 }}>
                  <li>✓ Walkable 3D shelves shoppers remember &amp; share</li>
                  <li>✓ 3.4× longer browsing time and +62% larger orders</li>
                  <li>✓ Keeps your existing Shopify or WooCommerce checkout</li>
                  <li>✓ Loads in under 1.1s on phones with zero app download</li>
                  <li>✓ Full hosting, email, speed &amp; WhatsApp updates handled for you</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3-STEP HOW IT WORKS */}
        <section style={{ padding: '72px 0', background: '#FBFBFD', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Simple 3-Step Process
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Try your 3D store before you pay anything.
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
                  title: 'Send Your Website Link',
                  desc: 'Tell us your Shopify, WooCommerce, or custom store address and a few top products.',
                },
                {
                  step: '02',
                  title: 'Free 3D Demo in 48 Hours',
                  desc: 'We build a working 3D preview with your real items so you can test it on your own phone.',
                },
                {
                  step: '03',
                  title: 'Clear Quote & Easy Launch',
                  desc: 'Get an honest, itemized quote—then let our team connect your store and manage everything.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="apple-card"
                  style={{
                    padding: '28px',
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
                Made For Your Products
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Custom-designed around what you sell.
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
                Inside Your 3D Store
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Four areas built to turn visitors into buyers.
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
                    Ask for a Quote
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
                    Runs at 60fps in Browser
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
                  Walk inside the live 3D store demo ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM GUIDES & TOPIC HUBS (HELPS GOOGLE INDEX ALL KEY PAGES) */}
        <section style={{ padding: '64px 0', background: '#F5F5F7', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 32px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Explore By Platform &amp; Topic
              </p>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Everything you need to launch and run a faster store.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {[
                {
                  href: '/shopify-3d-store',
                  tag: 'Shopify',
                  title: '3D Store for Shopify',
                  desc: 'Add a 3D shopping experience onto your existing Shopify catalog, variants, and Shop Pay checkout.',
                },
                {
                  href: '/woocommerce-3d-store',
                  tag: 'WooCommerce',
                  title: '3D Store for WooCommerce',
                  desc: 'Turn slow WordPress product pages into a fast 3D shop while keeping all your WooCommerce orders.',
                },
                {
                  href: '/3d-store-examples',
                  tag: 'Showcase',
                  title: '3D Website Examples',
                  desc: 'See how fashion, skincare, coffee, watch, electronics, and furniture brands use 3D stores.',
                },
                {
                  href: '/blog',
                  tag: 'Guides',
                  title: 'Plain-English Guides',
                  desc: 'Learn what 3D stores cost, how website maintenance works, and how to speed up mobile pages.',
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
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0066CC' }}>Read more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMPACT FAQ */}
        <FAQSection
          title="Quick Answers"
          subtitle="Plain-English answers before you request a demo or quote."
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
