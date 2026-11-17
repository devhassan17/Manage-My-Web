import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function About() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="About ManageMyWeb | 3D Commerce Engineers"
        description="Learn how ManageMyWeb builds browser-based 3D e-commerce websites for Shopify, WooCommerce, and independent retail brands while supporting day-to-day store operations."
        keywords="about ManageMyWeb, 3D commerce engineers, 3D ecommerce development team, Shopify and WooCommerce agency"
        canonicalUrl="https://www.managemyweb.co/about"
        showBreadcrumbs={true}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <Breadcrumbs path="/about" currentLabel="About ManageMyWeb" />

          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              3D Commerce Engineers
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.6vw, 50px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              About ManageMyWeb
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55 }}>
              We build browser-based 3D virtual storefronts for ambitious online brands—and help them manage the hosting, speed, and technical updates behind the scenes.
            </p>
          </div>

          <div
            style={{
              padding: 'clamp(24px, 3.5vw, 40px)',
              borderRadius: '22px',
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '36px',
              alignItems: 'center',
              marginBottom: '48px',
            }}
          >
            <div>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Our Approach
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px', lineHeight: 1.15 }}>
                Helping retail brands stand out beyond standard product templates.
              </h2>
              <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
                Most online shops rely on the same flat grid layouts. We design and engineer walkable 3D storefronts that run inside normal mobile and desktop web browsers—connected cleanly to Shopify, WooCommerce, or custom storefronts so your backend workflows stay intact.
              </p>
              <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.65, marginBottom: '22px' }}>
                Through our separate Managed Website Operations service, brands can also hand off hosting, DNS management, speed optimization, security backups, and regular storefront updates directly to our engineers.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/services/3d-virtual-stores" className="btn-apple-dark" style={{ padding: '11px 22px', fontSize: '14px' }}>
                  Custom 3D Virtual Stores
                </Link>
                <Link href="/case-studies" className="btn-apple-secondary" style={{ padding: '11px 22px', fontSize: '14px', color: '#1D1D1F' }}>
                  View Client Projects
                </Link>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
              }}
            >
              {[
                { label: 'Core Focus', title: '3D Storefronts' },
                { label: 'Platforms', title: 'Shopify & Woo' },
                { label: 'Markets Served', title: 'Global Brands' },
                { label: 'Start Safely', title: 'Prototype First' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: '#F5F5F7',
                    borderRadius: '16px',
                    padding: '22px 18px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11.5px', color: '#0066CC', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>{item.title}</div>
                </div>
              ))}
            </div>
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
                num: '01',
                title: 'Practical Integrations',
                desc: 'We connect 3D displays directly into supported catalogs without asking you to abandon existing payments or shipping.',
              },
              {
                num: '02',
                title: 'Browser-First Accessibility',
                desc: 'Every storefront includes standard HTML navigation, readable product copy, reduced-motion handling, and no required app downloads.',
              },
              {
                num: '03',
                title: 'Direct Engineering Communication',
                desc: 'Speak directly with the builders managing your 3D experience, hosting, and routine storefront changes.',
              },
            ].map((v) => (
              <div key={v.title} className="apple-card" style={{ padding: '28px', borderRadius: '18px', background: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', marginBottom: '8px' }}>{v.num}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>{v.title}</h3>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
