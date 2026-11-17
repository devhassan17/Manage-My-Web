import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import FAQSection from '../components/FAQSection';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function Shopify3DStorePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'Do I have to leave Shopify or change my checkout?',
      a: 'No. Your Shopify admin, products, prices, inventory, discounts, and Shop Pay / Apple Pay checkout stay 100% untouched. We connect your 3D store right onto your existing Shopify store.',
    },
    {
      q: 'Does a 3D Shopify store work on iPhones and Android phones?',
      a: 'Yes. Shoppers open your normal website link in Safari or Chrome and walk around immediately—no app download or VR headset required.',
    },
    {
      q: 'Will a 3D store slow down my Shopify theme?',
      a: 'No. Your standard product pages stay just as fast, and the interactive 3D showroom uses compressed files that load in around 1 second at 60fps.',
    },
    {
      q: 'How can I see my Shopify products in 3D first?',
      a: 'Send us your Shopify website link and 2 or 3 product URLs. Within 48 hours we build a free working 3D preview with your actual products before quoting anything.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Shopify Store Design & Management | Free 48h Demo | ManageMyWeb"
        description="Turn your existing Shopify website into a walkable 3D online store without touching your products, inventory, or Shop Pay checkout. Try a free 48-hour 3D Shopify demo."
        keywords="3D Shopify store, add 3D store to Shopify, interactive Shopify website, Shopify 3D store builder, Shopify 3D product viewer, Shopify speed optimization"
        canonicalUrl="https://www.managemyweb.co/shopify-3d-store"
        schemaData={[
          {
            '@type': 'Service',
            name: 'Shopify 3D Store Design & Integration',
            serviceType: 'Shopify 3D Storefront Development',
            provider: { '@id': 'https://www.managemyweb.co/#organization' },
            areaServed: 'Worldwide',
            description:
              'Add an interactive walkable 3D store onto an existing Shopify catalog with live inventory and checkout sync.',
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', background: '#FBFBFD' }}>
        <section className="container" style={{ paddingBottom: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              For Shopify Store Owners
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.8vw, 52px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Add a 3D store to your <span style={{ color: '#0066CC' }}>Shopify</span> site—without rebuilding.
            </h1>
            <p style={{ color: '#424245', fontSize: '17px', lineHeight: 1.6, marginBottom: '24px' }}>
              Every Shopify store uses the same handful of flat themes. Give shoppers a walkable 3D flagship room synced live with your Shopify inventory, variants, and Shop Pay / Apple Pay checkout.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '13px 26px', fontSize: '15px' }}
              >
                Get Free 48h Shopify 3D Demo
              </button>
              <Link href="/pricing" className="btn-apple-secondary" style={{ padding: '13px 24px', fontSize: '15px', color: '#1D1D1F' }}>
                Ask for a Quote
              </Link>
            </div>
          </div>

          <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
        </section>

        <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid #D2D2D7' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                Keep everything inside Shopify working the way it does today.
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '15.5px' }}>
                You do not lose a single order, app, discount rule, or pixel.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {[
                {
                  title: 'Live Product & Stock Sync',
                  desc: 'Change a price, size, or photo in your Shopify dashboard and it updates inside your 3D store automatically.',
                },
                {
                  title: 'Native Shopify Cart & Shop Pay',
                  desc: 'Shoppers add items off 3D shelves directly into your Shopify cart and pay with Shop Pay, Apple Pay, Google Pay, or cards.',
                },
                {
                  title: 'Keep Your Regular Pages Too',
                  desc: 'Your normal product collections stay intact for search traffic, while a prominent button invites buyers into your 3D showroom.',
                },
                {
                  title: 'Monthly Shopify Speed & Edits',
                  desc: 'Want us to clean up bloated Shopify apps, improve mobile speed, and update banners via WhatsApp? We can manage that too.',
                },
              ].map((item) => (
                <div key={item.title} className="apple-card" style={{ padding: '26px', borderRadius: '18px', background: '#FBFBFD' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href="/blog/can-you-add-a-3d-store-to-shopify" className="apple-link" style={{ fontSize: '15px' }}>
                Read our step-by-step Shopify 3D setup guide →
              </Link>
            </div>
          </div>
        </section>

        <FAQSection title="Shopify 3D Store Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
