import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function About() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="About ManageMyWeb | Spatial Storefronts & FairChain Ethics"
        description="Learn why we replace generic 2D e-commerce templates with architectural 3D storefronts and end-to-end web stewardship."
        canonicalUrl="https://managemyweb.co/about"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Our Philosophy
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '18px',
              }}
            >
              Crafted brands deserve better than flat templates.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.55 }}>
              In 1999, online shopping was designed as a grid of small thumbnails to fit dial-up connections. Decades later, 99% of e-commerce websites still use the exact same layout. We founded ManageMyWeb to bring architectural warmth and human curation to digital retail.
            </p>
          </div>

          <div
            style={{
              padding: 'clamp(28px, 4vw, 52px)',
              borderRadius: '24px',
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '44px',
              alignItems: 'center',
              marginBottom: '72px',
            }}
          >
            <div>
              <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                Origin Story
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '16px', lineHeight: 1.15 }}>
                How Ethiopian single-origin coffee inspired our 3D retail architecture.
              </h2>
              <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '14px' }}>
                Our work began alongside specialty coffee roasters in Sidama and Antioquia who were roasting microlots with 100% solar power and returning 85% of export value directly to farming families.
              </p>
              <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '24px' }}>
                Yet online, those extraordinary roasts sat inside generic white thumbnail boxes indistinguishable from supermarket commodities. We built a 3D roastery where visitors could step up to the shelves, inspect origin data, and witness the harvest story firsthand.
              </p>
              <Link href="/services/3d-virtual-stores" className="btn-apple-dark">
                Explore 3D Store Architecture
              </Link>
            </div>

            <div>
              <img
                src="/images/fairchain_harvest.jpg"
                alt="FairChain Coffee Harvest"
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Core Principles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                num: '01',
                title: 'FairChain Digital Stewardship',
                desc: 'We allocate 5% of studio revenue to native shade-tree reforestation and direct-trade smallholder coffee co-operatives.',
              },
              {
                num: '02',
                title: 'Lightweight Engineering',
                desc: 'We avoid bloated code and heavy plugins. Our WebGL scenes render at 60 frames per second on everyday mobile devices in under a second.',
              },
              {
                num: '03',
                title: 'Direct Engineer Access',
                desc: 'No ticket queues or account middlemen. Every client communicates directly with the senior engineers managing their storefront.',
              },
            ].map((v) => (
              <div key={v.title} className="apple-card" style={{ padding: '36px', borderRadius: '20px', background: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', marginBottom: '12px' }}>{v.num}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                  {v.title}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.6 }}>{v.desc}</p>
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
