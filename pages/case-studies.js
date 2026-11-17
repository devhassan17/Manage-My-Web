import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
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
      category: 'Coffee & Direct-Trade Online Store',
      logo: '/images/clients/moyee-nl.png',
      url: 'https://www.moyeecoffee.com',
      metrics: [
        { label: 'Markets', value: '3 Countries', note: 'NL · UK · IE' },
        { label: 'Order Value', value: '+62%', note: 'Bigger bundles' },
        { label: 'Visit Time', value: '3.4×', note: 'Time on site' },
      ],
      summary: 'Built fast multi-country coffee shops and visual brand storytelling across the Netherlands, UK, and Ireland so buyers see the farmer impact right next to every bag.',
    },
    {
      title: 'DermaDistributor & Elite Hair Care USA',
      category: 'Skincare & Hair Care Online Stores · USA',
      logo: '/images/clients/dermadistributor.png',
      url: 'https://www.dermadistributor.com',
      metrics: [
        { label: 'Load Speed', value: '< 1.1s', note: 'Mobile fast' },
        { label: 'Conversion', value: '+48%', note: 'Smoother UX' },
        { label: 'Uptime', value: '99.99%', note: 'Full tech care' },
      ],
      summary: 'Redesigned slow skincare and beauty storefronts for blazing fast mobile browsing, smoother checkouts, and reliable monthly hosting and updates.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Client Websites & Results | ManageMyWeb Portfolio"
        description="See 14+ real websites and online stores built and managed by ManageMyWeb across the US, UK, Netherlands, Ireland, Australia, and Canada—including Moyee Coffee and DermaDistributor."
        keywords="ManageMyWeb clients, ecommerce website portfolio, Moyee Coffee website, Shopify case studies, WooCommerce client stores"
        canonicalUrl="https://www.managemyweb.co/case-studies"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <ClientLogos
        title="14+ Live Client Websites"
        subtitle="Netherlands · UK · Ireland · USA · Australia · Canada"
      />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Featured Stories
            </p>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '10px',
              }}
            >
              Real results for real online businesses.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '15.5px', lineHeight: 1.5 }}>
              Faster pages, clearer buying journeys, and dependable day-to-day support.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
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
                  {item.metrics.map((m) => (
                    <div key={m.label} style={{ background: '#F5F5F7', padding: '12px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
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

          <div style={{ textAlign: 'center' }}>
            <Link href="/3d-store-examples" className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              See 3D Store Examples by Industry →
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
