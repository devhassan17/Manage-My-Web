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
      title: '3D Retail Storefronts',
      slug: '/services/3d-virtual-stores',
      badge: 'Flagship Architecture',
      desc: 'Walkable 3D storefronts with interactive product shelves, express checkout, and brand walls.',
      features: [
        'Custom 3D WebGL Storefront',
        '360° Product Shelving',
        'Express Apple Pay & Stripe Checkout',
        'Shopify & WooCommerce Sync',
      ],
    },
    {
      num: '02',
      title: 'Managed Web Operations',
      slug: '/services/web-management',
      badge: 'Full Tech Management',
      desc: 'We run your cloud hosting, DNS, domains, business email, backups, and daily site edits.',
      features: [
        'Sub-Second Global Edge Hosting',
        'Domain, DNS & SSL Management',
        'DMARC, DKIM & SPF Email Setup',
        'Same-Day Updates via WhatsApp',
      ],
    },
    {
      num: '03',
      title: 'Conversion Engineering',
      slug: '/services/ecommerce-growth',
      badge: 'Revenue Lift',
      desc: 'Turn traffic into higher-value orders with one-tap checkouts and 3D shelf bundling.',
      features: [
        'One-Tap Apple Pay & Stripe Flows',
        '3D Shelf Bundling & Upsells',
        'GA4 & Server-Side Attribution',
        'Cart Abandonment Reduction',
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Storefront & Managed Web Services | ManageMyWeb"
        description="Explore our full suite of e-commerce engineering services: bespoke 3D virtual retail storefronts, managed web operations, global edge hosting, and conversion rate optimization."
        keywords="3D ecommerce services, custom 3D store development, managed web operations agency, Shopify speed optimization service, ecommerce conversion optimization"
        canonicalUrl="https://managemyweb.co/services"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 44px auto' }}>
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
              3D design &amp; managed operations.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.45 }}>
              Everything your online store needs under one roof.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

                  <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.55, marginBottom: '18px' }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href={s.slug} className="btn-apple-dark" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
                      Explore
                    </Link>
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="btn-apple-secondary"
                      style={{ padding: '10px 18px', fontSize: '13.5px' }}
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
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
