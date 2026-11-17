import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function ServicesHub() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const services = [
    {
      num: '01',
      title: 'Custom 3D Virtual Store Development',
      slug: '/services/3d-virtual-stores',
      badge: 'Core Service',
      desc: 'Turn your Shopify, WooCommerce, or custom product grid into an interactive 3D showroom shoppers can explore right in their browser.',
      features: [
        'Walkable 3D shop built around your brand aesthetic',
        '360-degree product inspection on custom shelves',
        'Checkout routing through your existing cart where supported',
        'Responsive design with reduced-motion and HTML fallbacks',
      ],
    },
    {
      num: '02',
      title: 'Managed Website Operations & Support',
      slug: '/services/web-management',
      badge: 'Ongoing Operations',
      desc: 'Hand off technical maintenance—cloud hosting, DNS, email configuration, off-site backups, and routine store updates.',
      features: [
        'Cloud edge hosting setup and uptime monitoring',
        'Domain, DNS & HTTPS SSL renewal tracking',
        'SPF, DKIM & DMARC business email authentication',
        'Direct engineering team support for routine edits',
      ],
    },
    {
      num: '03',
      title: 'E-Commerce Conversion & Checkout Optimization',
      slug: '/services/ecommerce-growth',
      badge: 'Performance & UX',
      desc: 'Remove mobile speed bottlenecks and checkout friction so more existing visitors turn into completed orders.',
      features: [
        'Mobile script cleanup & image size optimization',
        'Express wallet configuration where supported',
        'Clearer bundle context & product storytelling',
        'Consent-aware GA4 & Clarity event tracking',
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Development & Web Services | ManageMyWeb"
        description="Explore ManageMyWeb services: custom 3D virtual store development for Shopify and WooCommerce, managed website operations, hosting, and checkout optimization."
        keywords="3D ecommerce development services, custom 3D store development, managed website operations, Shopify optimization service"
        canonicalUrl="https://www.managemyweb.co/services"
        showBreadcrumbs={true}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <Breadcrumbs path="/services" currentLabel="Services" />

          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Services
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
              3D E-Commerce Development &amp; Web Services
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.55 }}>
              Our primary focus is building interactive 3D virtual storefronts—backed by reliable ongoing web operations and conversion optimization when your team wants a technical partner.
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
                      Explore Service Details
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

          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Explore by Commerce Platform
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '14.5px', marginBottom: '20px' }}>
              Review platform-specific integration details and industry examples:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shopify-3d-store" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                Shopify 3D Integration →
              </Link>
              <Link href="/woocommerce-3d-store" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                WooCommerce 3D Integration →
              </Link>
              <Link href="/3d-store-examples" className="btn-apple-secondary" style={{ color: '#1D1D1F' }}>
                3D Showroom Examples →
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
