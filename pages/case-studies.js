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
      title: 'Moka Roasters — 3D Flagship Roastery',
      category: 'Specialty Coffee · Direct Trade',
      image: '/images/coffee_store_hero.jpg',
      metrics: [
        { label: 'Time on Site', value: '+340%', note: '46s → 3m 42s' },
        { label: 'Order Value', value: '+62%', note: 'Bundle lift' },
        { label: 'Story Views', value: '4.8×', note: 'FairChain Wall' },
      ],
      quote: '“Shoppers spend minutes inspecting roast profiles on our 3D shelves and reading our provenance wall.”',
      author: 'Marcus Vance, Founder',
    },
    {
      title: 'Atelier Horology — 3D Watch Salon',
      category: 'Fine Timepieces & Luxury',
      image: '/images/spatial_devices_preview.jpg',
      metrics: [
        { label: 'Conversion Lift', value: '+185%', note: 'High-ticket' },
        { label: 'Returns', value: '-48%', note: '360° inspection' },
        { label: 'Global Reach', value: '38 Markets', note: '< 1.1s load' },
      ],
      quote: '“Our 3D display cases give international collectors the confidence of visiting our Geneva salon.”',
      author: 'Elena Rostova, Creative Director',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Case Studies & Conversion Results | ManageMyWeb"
        description="Documented commercial results (+340% time on site, +62% average order value, +185% conversion lift) from e-commerce brands that upgraded to interactive 3D retail storefronts."
        keywords="3D ecommerce case studies, virtual store conversion rate, 3D retail ROI, interactive storefront results, ManageMyWeb portfolio"
        canonicalUrl="https://managemyweb.co/case-studies"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Case Studies
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '10px',
              }}
            >
              Measured results.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.45 }}>
              Real conversion and engagement lifts from 3D storefronts.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {cases.map((item) => (
              <div
                key={item.title}
                className="apple-card"
                style={{
                  borderRadius: '22px',
                  padding: 'clamp(24px, 3.5vw, 36px)',
                  background: '#FFFFFF',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p className="apple-eyebrow" style={{ marginBottom: '6px' }}>
                    {item.category}
                  </p>
                  <h2 style={{ fontSize: '23px', fontWeight: 600, color: '#1D1D1F', marginBottom: '18px', lineHeight: 1.2 }}>
                    {item.title}
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
                    {item.metrics.map((m) => (
                      <div key={m.label} style={{ background: '#F5F5F7', padding: '12px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#1D1D1F', fontWeight: 500 }}>{m.label}</div>
                        <div style={{ fontSize: '11px', color: '#6E6E73' }}>{m.note}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote
                    style={{
                      borderLeft: '2px solid #1D1D1F',
                      paddingLeft: '14px',
                      color: '#424245',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      marginBottom: '8px',
                    }}
                  >
                    {item.quote}
                  </blockquote>
                  <div style={{ fontSize: '12.5px', color: '#6E6E73', fontWeight: 500 }}>— {item.author}</div>
                </div>

                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', borderRadius: '16px', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ClientLogos
        title="All 14 Global Client Websites"
        subtitle="Netherlands · UK · Ireland · USA · Australia · Canada"
      />

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
