import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function CaseStudies() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const cases = [
    {
      title: 'Moka Roasters: Turning a Flat Catalog into an Interactive 3D Flagship Roastery',
      category: 'Specialty Coffee · Direct Trade',
      image: '/images/coffee_store_hero.jpg',
      metrics: [
        { label: 'Time on Site', value: '+340%', note: '46s to 3m 42s' },
        { label: 'Average Order Value', value: '+62%', note: '$28 to $45.36' },
        { label: 'Story Engagement', value: '4.8×', note: 'FairChain Wall' },
      ],
      quote:
        '“Visitors used to treat our single-origin microlots like generic grocery coffee. Once ManageMyWeb launched our 3D roastery, customers began spending minutes inspecting roast profiles on the shelves and reading our farmer provenance wall.”',
      author: 'Marcus Vance, Founder at Moka Roasters',
    },
    {
      title: 'Atelier Horology: A Digital Watch Salon Built for Mobile & Vision Pro',
      category: 'Fine Timepieces & Accessories',
      image: '/images/spatial_devices_preview.jpg',
      metrics: [
        { label: 'Conversion Lift', value: '+185%', note: '$1,200+ average ticket' },
        { label: 'Product Returns', value: '-48%', note: '360° case inspection' },
        { label: 'Global Reach', value: '38 Markets', note: 'Sub-second edge delivery' },
      ],
      quote:
        '“Collectors hesitate when looking at flat JPEG thumbnails. Stepping up to our 3D display cases gave international buyers the confidence of visiting our Geneva showroom in person.”',
      author: 'Elena Rostova, Creative Director',
    },
  ];

  return (
    <>
      <SEOHead
        title="Client Results & Case Studies | ManageMyWeb"
        description="Documented commercial results from brands that upgraded from standard 2D templates to interactive 3D retail storefronts."
        canonicalUrl="https://managemyweb.co/case-studies"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Documented Client Impact
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
              Measured commercial results.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.5 }}>
              How modern retail brands increased session duration, average order value, and buyer trust with 3D storefronts.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {cases.map((item) => (
              <div
                key={item.title}
                className="apple-card"
                style={{
                  borderRadius: '24px',
                  padding: 'clamp(28px, 4vw, 48px)',
                  background: '#FFFFFF',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '44px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                    {item.category}
                  </p>
                  <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '22px', lineHeight: 1.2 }}>
                    {item.title}
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                    {item.metrics.map((m) => (
                      <div
                        key={m.label}
                        style={{
                          background: '#F5F5F7',
                          padding: '14px',
                          borderRadius: '14px',
                        }}
                      >
                        <div style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: '12px', color: '#1D1D1F', fontWeight: 500 }}>{m.label}</div>
                        <div style={{ fontSize: '11px', color: '#6E6E73' }}>{m.note}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote
                    style={{
                      borderLeft: '2px solid #1D1D1F',
                      paddingLeft: '16px',
                      color: '#424245',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      marginBottom: '12px',
                    }}
                  >
                    {item.quote}
                  </blockquote>
                  <div style={{ fontSize: '13px', color: '#6E6E73', fontWeight: 500 }}>
                    — {item.author}
                  </div>
                </div>

                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      borderRadius: '18px',
                      display: 'block',
                    }}
                  />
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
