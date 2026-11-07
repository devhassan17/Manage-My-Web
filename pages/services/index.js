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
      title: '3D Spatial Retail Storefronts',
      slug: '/services/3d-virtual-stores',
      badge: 'Flagship Architecture',
      desc: 'Move beyond generic 2D templates. We design custom 3D storefronts where customers explore product shelving, check out at the bar, and experience your brand provenance.',
      features: [
        'Bespoke 3D WebGL & Three.js Architecture',
        'Interactive Product Shelving Systems',
        'One-Tap Express Bar Checkout',
        'Brand Provenance & Sustainability Exhibit',
        'Direct Concierge Dispatch Desk',
      ],
    },
    {
      num: '02',
      title: 'Managed Web Operations & Infrastructure',
      slug: '/services/web-management',
      badge: 'Technical Stewardship',
      desc: 'We take full responsibility for your cloud hosting, DNS records, domain renewals, email authentication, security backups, and day-to-day website updates.',
      features: [
        'Sub-Second Global Edge Hosting',
        'Domain, DNS & SSL Certificate Management',
        'DMARC, DKIM & SPF Email Security',
        'Core Web Vitals & Speed Optimization',
        'Same-Day Content & Catalog Updates',
      ],
    },
    {
      num: '03',
      title: 'Conversion & Checkout Engineering',
      slug: '/services/ecommerce-growth',
      badge: 'Commercial Growth',
      desc: 'Turn existing store traffic into higher-value orders through frictionless Apple Pay checkouts, shelf bundling, and clean attribution analytics.',
      features: [
        'Conversion Rate Optimization (CRO)',
        'One-Tap Apple Pay & Stripe Flows',
        'Shelf Bundling & Upsell Architecture',
        'GA4 & Server-Side Attribution',
        'Checkout Abandonment Reduction',
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Studio Capabilities & Web Operations | ManageMyWeb"
        description="Explore our full suite of services: bespoke 3D retail storefronts, managed web operations, edge hosting, and conversion engineering."
        canonicalUrl="https://managemyweb.co/services"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Studio Capabilities
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Flagship design meets effortless operations.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.5 }}>
              Whether you want to transform your store into an interactive 3D showroom or hand off all technical website management to a dedicated engineering team, we handle everything under one roof.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {services.map((s) => (
              <div
                key={s.title}
                className="apple-card"
                style={{
                  padding: 'clamp(28px, 4vw, 44px)',
                  borderRadius: '24px',
                  background: '#FFFFFF',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '36px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p className="apple-eyebrow" style={{ marginBottom: '8px', color: '#0066CC' }}>
                    {s.num} · {s.badge}
                  </p>

                  <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px' }}>
                    {s.title}
                  </h2>

                  <p style={{ color: '#424245', fontSize: '15.5px', lineHeight: 1.65, marginBottom: '24px' }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link href={s.slug} className="btn-apple-dark" style={{ padding: '11px 22px', fontSize: '14px' }}>
                      Explore Service Details
                    </Link>
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="btn-apple-secondary"
                      style={{ padding: '11px 20px', fontSize: '14px' }}
                    >
                      Request Free Prototype
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: '#F5F5F7',
                    borderRadius: '18px',
                    padding: '28px',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6E6E73',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '16px',
                    }}
                  >
                    Included Deliverables
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {s.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1D1D1F', fontSize: '14.5px', fontWeight: 500 }}>
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
