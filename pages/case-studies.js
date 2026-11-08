import { useState } from 'react';
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
      category: 'Specialty Coffee · Direct Trade E-Commerce',
      logo: '/images/clients/moyee-nl.png',
      url: 'https://www.moyeecoffee.com',
      metrics: [
        { label: 'Markets', value: '3 Countries', note: 'NL · UK · IE' },
        { label: 'Order Value', value: '+62%', note: 'Bundle lift' },
        { label: 'Engagement', value: '3.4×', note: 'Session time' },
      ],
      summary: 'Multi-region direct-to-consumer coffee storefronts and FairChain provenance architecture across the Netherlands, United Kingdom, and Ireland.',
    },
    {
      title: 'DermaDistributor & Elite Hair Care USA',
      category: 'Health, Skincare & Beauty E-Commerce · USA',
      logo: '/images/clients/dermadistributor.png',
      url: 'https://www.dermadistributor.com',
      metrics: [
        { label: 'Load Speed', value: '< 1.1s', note: 'Global Edge' },
        { label: 'Conversion', value: '+48%', note: 'Streamlined UX' },
        { label: 'Uptime', value: '99.99%', note: 'Managed Ops' },
      ],
      summary: 'High-conversion clinical skincare and hair care e-commerce infrastructure with fast checkout flows and full technical management.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Client Portfolio & Case Studies | ManageMyWeb"
        description="Explore our 14+ global client websites across the Netherlands, UK, Ireland, USA, Australia, and Canada—including Moyee Coffee, FairChain Foundation, DermaDistributor, and Elite Hair Care USA."
        keywords="3D ecommerce case studies, ManageMyWeb clients, Moyee Coffee website, FairChain Foundation, ecommerce portfolio"
        canonicalUrl="https://managemyweb.co/case-studies"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <ClientLogos
        title="14+ Global Client Websites"
        subtitle="Netherlands · UK · Ireland · USA · Australia · Canada"
      />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Featured Highlights
            </p>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
              }}
            >
              Commercial impact across industries.
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
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
                      Visit Live Site ↗
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
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
