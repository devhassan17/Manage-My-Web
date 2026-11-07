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
        title="About ManageMyWeb | 3D Retail Architecture & Managed Web Operations"
        description="Learn why we replace generic 2D e-commerce templates with architectural 3D storefronts and end-to-end web stewardship for modern brands."
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
              Great brands deserve better than flat templates.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.55 }}>
              In 1999, online shopping was designed as a grid of small thumbnails to fit dial-up connections. Decades later, 99% of e-commerce websites—across fashion, beauty, electronics, home goods, and specialty retail—still use the exact same layout. We founded ManageMyWeb to bring flagship architecture and human curation to digital commerce.
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
                Why We Built ManageMyWeb
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '16px', lineHeight: 1.15 }}>
                Bridging the gap between physical flagship stores and online commerce.
              </h2>
              <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '14px' }}>
                When a customer walks into an Apple Store, a Soho fashion boutique, or an artisanal roastery, the space itself communicates quality. Products are curated on tables and shelves, specialists are ready to help, and checkout is effortless.
              </p>
              <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '24px' }}>
                Yet online, those same brands are flattened into identical four-column grids. We engineer interactive 3D storefronts for every e-commerce vertical—and manage the entire technical stack behind the scenes—so your digital presence finally matches the quality of your products.
              </p>
              <Link href="/services/3d-virtual-stores" className="btn-apple-dark">
                Explore 3D Store Architecture
              </Link>
            </div>

            <div>
              <img
                src="/images/spatial_devices_preview.jpg"
                alt="3D Storefront Architecture"
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
                title: 'Bespoke to Your Industry',
                desc: 'Whether you sell streetwear, skincare, watches, hardware, or specialty foods, every 3D room is architected specifically around your catalog.',
              },
              {
                num: '02',
                title: 'Lightweight Mobile Engineering',
                desc: 'We avoid bloated code and heavy plugins. Our WebGL scenes render at 60 frames per second on everyday iPhones and Android devices.',
              },
              {
                num: '03',
                title: 'Direct Engineer Stewardship',
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
