import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function ServicesHub() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const services = [
    {
      num: '01',
      title: 'Custom 3D Online Stores',
      slug: '/services/3d-virtual-stores',
      badge: '3D Store Design',
      desc: 'Turn your flat Shopify, WooCommerce, or custom product grid into an interactive 3D shop customers can walk through right on their phone or laptop.',
      features: [
        'Walkable 3D shop built around your brand',
        'Spin & zoom products on 3D shelves',
        'One-tap Apple Pay, Google Pay & Shop Pay checkout',
        'Connects live to your existing Shopify or WooCommerce store',
      ],
    },
    {
      num: '02',
      title: 'Monthly Website Management & Hosting',
      slug: '/services/web-management',
      badge: 'Monthly Care',
      desc: 'Hand off all the messy technical work—fast cloud hosting, domains, DNS, business email, daily security backups, and same-day updates over WhatsApp.',
      features: [
        'Fast global cloud hosting (< 1.1s load time)',
        'Domain renewal, DNS & SSL certificates handled',
        'SPF, DKIM & DMARC business email setup',
        'Same-day banner & product edits via WhatsApp',
      ],
    },
    {
      num: '03',
      title: 'Speed Fixes & Higher Store Sales',
      slug: '/services/ecommerce-growth',
      badge: 'Speed & Conversion',
      desc: 'Stop losing visitors to slow mobile pages and clunky checkout steps. Make more money from the traffic you already have.',
      features: [
        'Mobile speed cleanup for green Google Core Web Vitals',
        'One-tap express mobile checkout setup',
        'Smart product bundling & shelf upsells',
        'Clean Google Analytics & Microsoft Clarity tracking',
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Online Store Design & Monthly Website Management | ManageMyWeb"
        description="Get a walkable 3D online store connected to Shopify or WooCommerce, plus fast cloud hosting, speed fixes, security backups, and same-day website updates."
        keywords="3D online store service, Shopify 3D store builder, monthly website management service, ecommerce speed optimization, website maintenance company"
        canonicalUrl="https://www.managemyweb.co/services"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '660px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              What We Do
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
              3D store design &amp; full website care under one roof.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.55 }}>
              Hire us to build a standout 3D online store, take over your monthly website tech, or both.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
            {services.map((s) => (
              <div
                key={s.title}
                className="apple-card"
                style={{
                  padding: 'clamp(24px, 3.5vw, 36px)',
                  borderRadius: '20px',
                  background: '#FFFFFF',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '28px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p className="apple-eyebrow" style={{ marginBottom: '6px', color: '#0066CC' }}>
                    {s.num} · {s.badge}
                  </p>

                  <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    {s.title}
                  </h2>

                  <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href={s.slug} className="btn-apple-dark" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
                      See how it works
                    </Link>
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="btn-apple-secondary"
                      style={{ padding: '10px 18px', fontSize: '13.5px', color: '#1D1D1F' }}
                    >
                      Free 3D Demo / Quote
                    </button>
                  </div>
                </div>

                <div style={{ background: '#F5F5F7', borderRadius: '16px', padding: '22px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1D1D1F', fontSize: '14px', fontWeight: 500 }}>
                        <span style={{ color: '#0066CC', fontWeight: 600 }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Platform Selector */}
          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Already running on Shopify or WooCommerce?
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '14.5px', marginBottom: '20px' }}>
              See exactly how our 3D store and speed tools connect with your platform:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shopify-3d-store" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                3D Store for Shopify →
              </Link>
              <Link href="/woocommerce-3d-store" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                3D Store for WooCommerce →
              </Link>
              <Link href="/3d-store-examples" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                See 3D Store Examples →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
