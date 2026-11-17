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
        title="About ManageMyWeb | Who Builds Your 3D Stores & Manages Your Site"
        description="Learn why we started ManageMyWeb: most online stores look identical, and most founders are tired of dealing with broken hosting, slow pages, and unreliable freelancers."
        keywords="about ManageMyWeb, 3D online store team, website management company, Shopify developers, WooCommerce experts"
        canonicalUrl="https://www.managemyweb.co/about"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              About Us
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
              Great brands deserve better than cookie-cutter websites.
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55 }}>
              We started ManageMyWeb to fix two problems every online store faces: boring identical website templates, and the endless headache of hosting, slow pages, and technical updates.
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
                Why We Exist
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px', lineHeight: 1.15 }}>
                Your store design team + your full-time tech team.
              </h2>
              <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
                99% of online shops look exactly alike—a banner and rows of square photos. We help brands stand out by turning their products into a walkable 3D shop customers can explore right inside Safari or Chrome.
              </p>
              <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.65, marginBottom: '22px' }}>
                And unlike hit-and-run agencies that vanish after launch day, our engineers stay on hand every day—watching server uptime, boosting speed, setting up DNS and email, and shipping small site changes the very day you message us on WhatsApp.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/services/3d-virtual-stores" className="btn-apple-dark" style={{ padding: '11px 22px', fontSize: '14px' }}>
                  See How 3D Stores Work
                </Link>
                <Link href="/case-studies" className="btn-apple-secondary" style={{ padding: '11px 22px', fontSize: '14px', color: '#1D1D1F' }}>
                  See Client Websites
                </Link>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
              }}
            >
              {[
                { stat: '14+', label: 'Live Client Brands' },
                { stat: '6', label: 'Countries Served' },
                { stat: '< 1.1s', label: 'Average Page Load' },
                { stat: '48h', label: 'Free 3D Demo Turnaround' },
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
                title: 'Made For Real Store Owners',
                desc: 'Everything we build speaks plain English and connects cleanly with Shopify, WooCommerce, and custom backends.',
              },
              {
                num: '02',
                title: 'Zero App Downloads',
                desc: 'Your customers open a normal website link on their phone or laptop and walk inside right away.',
              },
              {
                num: '03',
                title: 'Talk Directly to Engineers',
                desc: 'No ticket queues. Message the exact people building and running your store on WhatsApp whenever you need help.',
              },
            ].map((v) => (
              <div key={v.title} className="apple-card" style={{ padding: '28px', borderRadius: '18px', background: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', marginBottom: '8px' }}>{v.num}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>{v.title}</h3>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55 }}>{v.desc}</p>
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
