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
        title="About ManageMyWeb | 3D Retail Architecture & Managed Web Engineering"
        description="Learn why ManageMyWeb replaces generic 2D e-commerce templates with architectural 3D storefronts and end-to-end web stewardship for modern brands worldwide."
        keywords="about ManageMyWeb, 3D ecommerce agency, spatial web engineering studio, managed web operations team"
        canonicalUrl="https://www.managemyweb.co/about"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              About ManageMyWeb
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.6vw, 50px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              Great brands deserve better than flat templates.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16.5px', lineHeight: 1.5 }}>
              We build interactive 3D storefronts for modern e-commerce brands—and manage their entire web stack year-round.
            </p>
          </div>

          <div
            style={{
              padding: 'clamp(24px, 3.5vw, 40px)',
              borderRadius: '22px',
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '36px',
              alignItems: 'center',
              marginBottom: '48px',
            }}
          >
            <div>
              <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
                Our Mission
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px', lineHeight: 1.15 }}>
                Flagship retail architecture on the web.
              </h2>
              <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                99% of online stores use the same 2D grid. We turn your catalog into a walkable 3D showroom and handle your hosting, speed, DNS, and daily edits under one roof.
              </p>
              <Link href="/services/3d-virtual-stores" className="btn-apple-dark" style={{ padding: '11px 22px', fontSize: '14px' }}>
                Explore 3D Storefronts
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
              }}
            >
              {[
                { stat: '14+', label: 'Global Client Stores' },
                { stat: '6', label: 'Countries Served' },
                { stat: '60 fps', label: 'Mobile WebGL Engine' },
                { stat: '99.99%', label: 'Managed Uptime SLA' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: '#F5F5F7',
                    borderRadius: '16px',
                    padding: '22px 18px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#6E6E73', fontWeight: 500 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Built for Any Industry',
                desc: 'Tailored 3D rooms for fashion, beauty, electronics, watches, home, and food.',
              },
              {
                num: '02',
                title: '60fps Mobile Speed',
                desc: 'Instant loading on iPhone and Android browsers with zero app downloads.',
              },
              {
                num: '03',
                title: 'Direct Engineer Access',
                desc: 'Message our senior engineers directly on WhatsApp for same-day updates.',
              },
            ].map((v) => (
              <div key={v.title} className="apple-card" style={{ padding: '28px', borderRadius: '18px', background: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', marginBottom: '8px' }}>{v.num}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>{v.title}</h3>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5 }}>{v.desc}</p>
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
