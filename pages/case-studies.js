import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import ClientLogos from '../components/ClientLogos';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function CaseStudies() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const cases = [
    {
      title: 'Moyee Coffee (Netherlands, UK & Ireland)',
      category: 'Specialty Coffee & Direct-Trade E-Commerce',
      logo: '/images/clients/moyee-nl.png',
      url: 'https://www.moyeecoffee.com',
      highlights: [
        { label: 'Regional Storefronts', value: 'NL · UK · IE', note: 'Multi-country retail' },
        { label: 'Focus', value: 'Brand & Story', note: 'Product origin context' },
        { label: 'Architecture', value: 'E-Commerce', note: 'Direct-to-consumer flow' },
      ],
      summary:
        'Regional direct-to-consumer coffee storefronts across the Netherlands, United Kingdom, and Ireland designed to bring direct-trade sourcing context close to featured blends and subscription offerings.',
    },
    {
      title: 'DermaDistributor & Elite Hair Care USA',
      category: 'Skincare & Hair Care E-Commerce · USA',
      logo: '/images/clients/dermadistributor.png',
      url: 'https://www.dermadistributor.com',
      highlights: [
        { label: 'Market', value: 'United States', note: 'B2B & retail skincare' },
        { label: 'Focus', value: 'Speed & UX', note: 'Streamlined navigation' },
        { label: 'Operations', value: 'Managed Tech', note: 'Ongoing engineering care' },
      ],
      summary:
        'Clean skincare and hair care storefront experiences built for responsive mobile browsing, clear product grouping, and reliable day-to-day technical updates.',
    },
  ];

  return (
    <>
      <SEOHead
        title="E-Commerce Projects & Client Work | ManageMyWeb"
        description="Explore e-commerce storefronts and digital projects delivered across the Netherlands, UK, Ireland, USA, Australia, and Canada—including Moyee Coffee and DermaDistributor."
        keywords="ManageMyWeb projects, ecommerce website portfolio, Shopify client storefronts, WooCommerce development work"
        canonicalUrl="https://www.managemyweb.co/case-studies"
        showBreadcrumbs={true}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container">
          <Breadcrumbs path="/case-studies" currentLabel="E-Commerce Projects & Client Work" />

          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Client Portfolio &amp; Projects
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.4vw, 46px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              E-Commerce Projects &amp; Client Work
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.55 }}>
              Selected e-commerce stores and web platforms we have worked on across North America, Europe, and Australia. Detailed performance breakdowns are shared in private consultations where client-approved.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '56px' }}>
            {cases.map((item) => (
              <div
                key={item.title}
                className="apple-card"
                style={{
                  borderRadius: '22px',
                  padding: '32px',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      height: '64px',
                      background: '#FBFBFD',
                      border: '1px solid #E5E5EA',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 18px',
                      marginBottom: '20px',
                    }}
                  >
                    <img
                      src={item.logo}
                      alt={item.title}
                      style={{ maxHeight: '38px', maxWidth: '150px', objectFit: 'contain' }}
                    />
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textDecoration: 'none' }}
                    >
                      Visit Website ↗
                    </a>
                  </div>

                  <p className="apple-eyebrow" style={{ marginBottom: '6px' }}>
                    {item.category}
                  </p>
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px', lineHeight: 1.25 }}>
                    {item.title}
                  </h2>
                  <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.55, marginBottom: '20px' }}>
                    {item.summary}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {item.highlights.map((m) => (
                    <div key={m.label} style={{ background: '#F5F5F7', padding: '12px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#1D1D1F', fontWeight: 500 }}>{m.label}</div>
                      <div style={{ fontSize: '11px', color: '#6E6E73' }}>{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ClientLogos
          title="E-Commerce & Web Brands"
          subtitle="Stores and business websites across Netherlands, UK, Ireland, USA, Australia & Canada"
        />

        <div className="container" style={{ paddingTop: '40px', paddingBottom: '64px', textAlign: 'center' }}>
          <Link href="/3d-store-examples" className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
            Explore 3D Showroom Use Cases →
          </Link>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
