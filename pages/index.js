import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedZoneTab, setSelectedZoneTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  const zones = [
    {
      title: 'Interactive Product Shelving',
      subtitle: 'Zone 01 · Tactile Merchandising',
      desc: 'Flat thumbnail grids make premium products feel like commodities. In our 3D storefront, customers walk right up to natural oak shelves, inspect packaging from every angle, read origin and tasting notes, and add items directly to their bag.',
      image: '/images/coffee_store_hero.jpg',
      stat: '+48%',
      statLabel: 'Increase in product discovery depth',
      badge: 'Product Shelves',
    },
    {
      title: 'Express Bar Checkout',
      subtitle: 'Zone 02 · Frictionless Point of Sale',
      desc: 'Nearly 70% of online carts are abandoned during multi-step form checkouts. We replace cold checkout forms with an intuitive barista counter featuring one-tap Apple Pay, Google Pay, and direct Shopify inventory sync.',
      image: '/images/spatial_devices_preview.jpg',
      stat: '+62%',
      statLabel: 'Lift in average order value',
      badge: 'Checkout Bar',
    },
    {
      title: 'Provenance & FairChain Exhibit',
      subtitle: 'Zone 03 · Story That Sells',
      desc: 'Less than 4% of visitors ever click a standard "About Us" link. By placing your sourcing transparency, farmer payouts, and craftsmanship at the center of the room, every visitor experiences why your brand is worth a premium.',
      image: '/images/fairchain_harvest.jpg',
      stat: '3.4×',
      statLabel: 'Increase in repeat customer retention',
      badge: 'Provenance Wall',
    },
    {
      title: 'Concierge Dispatch Booth',
      subtitle: 'Zone 04 · Direct Client Relationships',
      desc: 'Instead of an impersonal support ticket form, visitors step up to a warm architectural postal desk inside the store to request wholesale pricing, custom subscriptions, or direct guidance from your team.',
      image: '/images/coffee_post_office.jpg',
      stat: '94%',
      statLabel: 'Inquiry completion rate',
      badge: 'Dispatch Booth',
    },
  ];

  const comparisons = [
    {
      metric: 'First Impression',
      traditional: 'Identical 2D template shared by thousands of other stores',
      manageMyWeb: 'A signature 3D architectural showroom tailored to your brand',
    },
    {
      metric: 'Product Evaluation',
      traditional: 'Static square photos with basic zoom',
      manageMyWeb: 'Interactive shelves with 360° inspection and curated pairings',
    },
    {
      metric: 'Brand Story & Trust',
      traditional: 'Text paragraphs buried on a secondary About page',
      manageMyWeb: 'Central visual exhibit highlighting sourcing and quality proof',
    },
    {
      metric: 'Checkout Experience',
      traditional: 'Four-page form flow with high drop-off',
      manageMyWeb: 'One-tap express bar checkout synced with Shopify or WooCommerce',
    },
    {
      metric: 'Average Time on Site',
      traditional: '45 seconds before leaving',
      manageMyWeb: '3 minutes 40 seconds of active exploration',
    },
  ];

  const faqs = [
    {
      q: 'How does the complimentary 3D prototype work?',
      a: 'During our 60-day onboarding window, you can share your current website URL with our team and we will build a working, interactive 3D preview featuring your actual products within 48 hours. There is no cost, no credit card required, and no obligation to move forward unless you love the result.',
    },
    {
      q: 'Does a 3D store run smoothly on iPhones and everyday mobile browsers?',
      a: 'Yes. Every storefront is engineered for mobile Safari on iOS, Chrome on Android, iPad, and desktop browsers with zero app downloads or plugins required. Assets stream progressively so pages load in under a second at a smooth 60 frames per second.',
    },
    {
      q: 'Will a 3D storefront affect our Google SEO rankings?',
      a: 'Your search visibility improves. Our storefronts are built on Next.js with full server-side rendered semantic HTML, structured Schema.org product data, and clean metadata so search engines index every product, price, and article effortlessly.',
    },
    {
      q: 'Can this connect to our existing Shopify or WooCommerce catalog?',
      a: 'Yes. You do not need to migrate your backend. We sync directly with your existing Shopify, WooCommerce, or custom inventory so product stock, pricing, and order fulfillment continue running through the workflow your team already knows.',
    },
    {
      q: 'What is included in your ongoing web management service?',
      a: 'Beyond building your storefront, we act as your dedicated technical team. We manage your cloud edge hosting, domain and DNS records, business email authentication, speed optimization, security backups, and routine site updates—all accessible via direct WhatsApp or email.',
    },
  ];

  return (
    <>
      <SEOHead
        title="ManageMyWeb | Bespoke 3D Retail Storefronts & Managed Web Operations"
        description="Most e-commerce websites look identical. We design interactive 3D retail storefronts that customers can walk through—and manage your entire web infrastructure. Request a complimentary 3D prototype today."
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main>
        {/* ============================================================== */}
        {/* HERO SECTION — CLASSIC APPLE CENTERED EDITORIAL               */}
        {/* ============================================================== */}
        <section style={{ paddingTop: '72px', paddingBottom: '84px', background: '#FBFBFD' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#6E6E73',
                marginBottom: '16px',
              }}
            >
              Spatial Commerce & Managed Web Operations
            </p>

            <h1
              style={{
                fontSize: 'clamp(38px, 5.6vw, 66px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.06,
                maxWidth: '920px',
                margin: '0 auto 22px auto',
                color: '#1D1D1F',
              }}
            >
              Your online store shouldn’t look like a spreadsheet.{' '}
              <span style={{ color: '#6E6E73' }}>
                Give customers a flagship space to walk through.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(17px, 1.9vw, 21px)',
                color: '#424245',
                maxWidth: '720px',
                margin: '0 auto 32px auto',
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              We turn flat product catalogs into interactive 3D retail spaces—complete with product shelving, one-tap express checkout, and brand provenance displays—while managing all your hosting, speed, and technical operations.
            </p>

            {/* Primary Apple CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                flexWrap: 'wrap',
                marginBottom: '20px',
              }}
            >
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '14px 28px', fontSize: '16px' }}
              >
                Request Free 3D Prototype
              </button>

              <Link href="/experience" className="apple-link" style={{ fontSize: '17px' }}>
                <span>Launch fullscreen 3D walkthrough</span>
                <span aria-hidden="true">›</span>
              </Link>
            </div>

            {/* Subtle Sales Reassurance Line */}
            <p
              style={{
                fontSize: '13px',
                color: '#6E6E73',
                marginBottom: '48px',
              }}
            >
              Complimentary custom prototype delivered in 48 hours · No upfront fee or contract required
            </p>

            {/* Interactive 3D Showroom */}
            <div className="container-wide" style={{ padding: 0 }}>
              <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COMMERCIAL METRICS BAR                                         */}
        {/* ============================================================== */}
        <section
          style={{
            background: '#F5F5F7',
            borderTop: '1px solid #D2D2D7',
            borderBottom: '1px solid #D2D2D7',
            padding: '56px 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px',
                textAlign: 'center',
              }}
            >
              {[
                {
                  stat: '3.4×',
                  label: 'Longer Session Duration',
                  detail: '3m 42s average vs. 45s on flat grids',
                },
                {
                  stat: '+62%',
                  label: 'Average Order Value',
                  detail: 'Driven by visual shelf merchandising',
                },
                {
                  stat: '< 1.1s',
                  label: 'Mobile Safari Load Time',
                  detail: 'No apps or browser plugins required',
                },
                {
                  stat: '100%',
                  label: 'Managed Web Operations',
                  detail: 'Hosting, DNS, speed & updates included',
                },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: 'clamp(36px, 4vw, 48px)',
                      fontWeight: 600,
                      color: '#1D1D1F',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      marginBottom: '6px',
                    }}
                  >
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6E6E73' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* THE 4 ZONES OF AN INTERACTIVE STOREFRONT                       */}
        {/* ============================================================== */}
        <section style={{ padding: '104px 0', background: '#FFFFFF' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                Storefront Architecture
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4.2vw, 48px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                }}
              >
                Designed around how people actually love to shop.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '17px', lineHeight: 1.5 }}>
                Every 3D storefront is organized into four purposeful zones that guide visitors from discovery to checkout.
              </p>
            </div>

            {/* Classic Apple Segmented Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
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

            {/* Showcase Card */}
            <div
              style={{
                background: '#F5F5F7',
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 52px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#6E6E73',
                    marginBottom: '8px',
                  }}
                >
                  {zones[selectedZoneTab].subtitle}
                </p>

                <h3
                  style={{
                    fontSize: 'clamp(26px, 3vw, 34px)',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    letterSpacing: '-0.025em',
                    marginBottom: '16px',
                  }}
                >
                  {zones[selectedZoneTab].title}
                </h3>

                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
                  {zones[selectedZoneTab].desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    paddingTop: '20px',
                    borderTop: '1px solid #D2D2D7',
                    marginBottom: '28px',
                  }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.03em' }}>
                    {zones[selectedZoneTab].stat}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6E6E73' }}>
                    {zones[selectedZoneTab].statLabel}
                  </span>
                </div>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="btn-apple-dark"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  Preview This Zone with Your Products
                </button>
              </div>

              <div
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                  background: '#FFFFFF',
                  height: '360px',
                }}
              >
                <img
                  src={zones[selectedZoneTab].image}
                  alt={zones[selectedZoneTab].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3-STEP LOW-FRICTION ONBOARDING FLOW                            */}
        {/* ============================================================== */}
        <section
          style={{
            padding: '104px 0',
            background: '#F5F5F7',
            borderTop: '1px solid #D2D2D7',
            borderBottom: '1px solid #D2D2D7',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                How We Work
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                  marginBottom: '14px',
                }}
              >
                Experience the result before you invest.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '17px', lineHeight: 1.5 }}>
                We don’t ask for retainers on a sales call. We build a working prototype of your store first so the decision is effortless.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Share Your Current Store',
                  desc: 'Send us your website URL and tell us which flagship products or brand stories matter most to your customers.',
                },
                {
                  step: '02',
                  title: 'Explore Your 3D Prototype in 48 Hours',
                  desc: 'Our engineers construct a custom 3D walkthrough of your storefront and send you a private link you can test on your phone or laptop at zero cost.',
                },
                {
                  step: '03',
                  title: 'Launch & Hand Off Operations',
                  desc: 'Once approved, we connect your live Shopify or WooCommerce checkout and handle your hosting, speed, DNS, and updates year-round.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="apple-card"
                  style={{
                    padding: '36px',
                    borderRadius: '20px',
                    background: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0066CC',
                      marginBottom: '14px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SIDE-BY-SIDE COMPARISON TABLE                                  */}
        {/* ============================================================== */}
        <section style={{ padding: '104px 0', background: '#FFFFFF' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                The Commercial Difference
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                  marginBottom: '14px',
                }}
              >
                Why brands outgrow flat 2D templates.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '17px', lineHeight: 1.5 }}>
                When your online store looks identical to every competitor, you are forced to compete on discounts. A flagship space lets you compete on brand experience.
              </p>
            </div>

            <div
              style={{
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#FFFFFF',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 2fr',
                  padding: '18px 28px',
                  background: '#F5F5F7',
                  borderBottom: '1px solid #D2D2D7',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#6E6E73',
                }}
              >
                <div>Dimension</div>
                <div>Standard 2D Template</div>
                <div style={{ color: '#1D1D1F' }}>ManageMyWeb 3D Flagship</div>
              </div>

              {comparisons.map((item, idx) => (
                <div
                  key={item.metric}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 2fr',
                    padding: '22px 28px',
                    borderBottom: idx !== comparisons.length - 1 ? '1px solid rgba(0, 0, 0, 0.07)' : 'none',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '15px' }}>
                    {item.metric}
                  </div>
                  <div style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.5 }}>
                    {item.traditional}
                  </div>
                  <div style={{ color: '#1D1D1F', fontSize: '14.5px', fontWeight: 500, lineHeight: 1.5 }}>
                    {item.manageMyWeb}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COMPLETE WEB MANAGEMENT CONCIERGE                              */}
        {/* ============================================================== */}
        <section
          style={{
            padding: '104px 0',
            background: '#F5F5F7',
            borderTop: '1px solid #D2D2D7',
            borderBottom: '1px solid #D2D2D7',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px auto' }}>
              <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                End-to-End Web Operations
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                  marginBottom: '14px',
                }}
              >
                One studio for your entire digital presence.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '17px', lineHeight: 1.5 }}>
                Founders shouldn’t spend weekends debugging DNS records, plugin conflicts, or page speed. We manage every technical layer for you.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  num: '01',
                  title: '3D Spatial Retail Storefronts',
                  desc: 'Custom WebGL & Three.js showrooms with interactive product shelves, express checkout counters, and brand provenance exhibits.',
                  href: '/services/3d-virtual-stores',
                },
                {
                  num: '02',
                  title: 'Global Edge Hosting & Speed',
                  desc: 'Sub-second page loads, global CDN caching, 99.99% uptime monitoring, and continuous Core Web Vitals optimization.',
                  href: '/services/web-management',
                },
                {
                  num: '03',
                  title: 'Domains, DNS & Business Email',
                  desc: 'Complete management of domain renewals, SSL certificates, and DMARC/DKIM/SPF email authentication so your messages never hit spam.',
                  href: '/services/web-management',
                },
                {
                  num: '04',
                  title: 'Conversion & Checkout Engineering',
                  desc: 'Frictionless Apple Pay and Stripe checkouts, high-converting landing pages, and A/B tested product flows.',
                  href: '/services/ecommerce-growth',
                },
                {
                  num: '05',
                  title: 'Analytics & Attribution',
                  desc: 'Clean GA4, Meta Conversions API, and spatial engagement tracking showing exactly which shelves and products draw attention.',
                  href: '/services/ecommerce-growth',
                },
                {
                  num: '06',
                  title: 'Unlimited Concierge Updates',
                  desc: 'Need a seasonal campaign, pricing update, or new product launch? Send a quick note on WhatsApp and our engineers handle it the same day.',
                  href: '/pricing',
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="apple-card apple-card-interactive"
                  style={{
                    padding: '34px',
                    borderRadius: '20px',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#86868B',
                        marginBottom: '14px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {service.num}
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                      {service.title}
                    </h3>

                    <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '22px' }}>
                      {service.desc}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    style={{
                      color: '#0066CC',
                      fontSize: '14px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Learn more</span>
                    <span aria-hidden="true">›</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* MULTI-DEVICE COMPATIBILITY HIGHLIGHT                           */}
        {/* ============================================================== */}
        <section style={{ padding: '104px 0', background: '#FFFFFF' }}>
          <div className="container">
            <div
              style={{
                background: '#1D1D1F',
                color: '#F5F5F7',
                borderRadius: '24px',
                padding: 'clamp(32px, 5vw, 60px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#A1A1A6',
                    marginBottom: '12px',
                  }}
                >
                  Universal Browser Performance
                </p>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.8vw, 42px)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF',
                    lineHeight: 1.12,
                    marginBottom: '16px',
                  }}
                >
                  Engineered for iPhone, Mac, Android, and Vision Pro.
                </h2>

                <p style={{ color: '#A1A1A6', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
                  Customers never download an app or wait on heavy loading screens. Our lightweight WebGL pipeline streams crisp architectural lighting and 3D product models directly inside mobile Safari and Chrome.
                </p>

                <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>60 fps</div>
                    <div style={{ fontSize: '13px', color: '#A1A1A6' }}>Native mobile frame rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>&lt; 1.1s</div>
                    <div style={{ fontSize: '13px', color: '#A1A1A6' }}>First interactive paint</div>
                  </div>
                </div>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="btn-apple-blue"
                  style={{ padding: '13px 26px', fontSize: '15px' }}
                >
                  Request a Mobile 3D Preview
                </button>
              </div>

              <div>
                <img
                  src="/images/spatial_devices_preview.jpg"
                  alt="3D Storefront running on MacBook and iPhone"
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FREQUENTLY ASKED QUESTIONS                                     */}
        {/* ============================================================== */}
        <section
          style={{
            padding: '104px 0',
            background: '#FBFBFD',
            borderTop: '1px solid #D2D2D7',
          }}
        >
          <div className="container" style={{ maxWidth: '820px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2
                style={{
                  fontSize: 'clamp(30px, 4vw, 42px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#1D1D1F',
                }}
              >
                Questions & Answers
              </h2>
            </div>

            <div style={{ borderTop: '1px solid #D2D2D7' }}>
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.q}
                    style={{
                      borderBottom: '1px solid #D2D2D7',
                    }}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '22px 0',
                        background: 'transparent',
                        border: 'none',
                        color: '#1D1D1F',
                        fontSize: '17px',
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
                          fontSize: '22px',
                          fontWeight: 400,
                          color: '#6E6E73',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          paddingBottom: '22px',
                          color: '#424245',
                          fontSize: '15.5px',
                          lineHeight: 1.6,
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

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />

      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCategory="Specialty Coffee & Roastery"
      />
    </>
  );
}
