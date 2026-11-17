import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import VirtualCoffeeStore3D from '../../components/VirtualCoffeeStore3D';
import FAQSection from '../../components/FAQSection';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function ThreeDVirtualStores() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const zones = [
    {
      id: 'interactive-shelves',
      zone: 'Zone 01',
      title: 'Walk-Up 3D Product Shelves',
      desc: 'Customers walk right up to custom shelves and racks, spin items in 360°, check sizes, and add to bag.',
      stat: '+48% More Products Viewed',
    },
    {
      id: 'spatial-checkout',
      zone: 'Zone 02',
      title: 'One-Tap Checkout Counter',
      desc: 'No long multi-page forms. Shoppers tap Apple Pay, Google Pay, or card synced live with Shopify or WooCommerce.',
      stat: '+62% Bigger Orders',
    },
    {
      id: 'fairchain-story',
      zone: 'Zone 03',
      title: 'Brand Story & Origin Wall',
      desc: 'Show buyers why your brand is special—materials, making process, and real photos—right next to your shelves.',
      stat: '3.4× More Repeat Buyers',
    },
    {
      id: 'postal-dispatch',
      zone: 'Zone 04',
      title: 'Customer Help & Wholesale Desk',
      desc: 'A built-in help counter for sizing questions, custom bulk orders, or direct WhatsApp chat with your team.',
      stat: '94% Inquiries Answered',
    },
  ];

  const faqs = [
    {
      q: 'What is a 3D virtual store?',
      a: 'It is an online shop designed like a real room customers can walk through inside Chrome or Safari—clicking real products off shelves, spinning them in 360°, and checking out in one tap.',
    },
    {
      q: 'Do shoppers need a VR headset or app to open it?',
      a: 'No. It runs directly in a normal web browser on iPhones, Android phones, tablets, and laptops in around 1 second.',
    },
    {
      q: 'Will it sync with my Shopify or WooCommerce products?',
      a: 'Yes. Prices, stock counts, variants, and checkout orders stay 100% connected to your current store backend.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Custom 3D Online Stores & Virtual Shops | ManageMyWeb"
        description="Turn your online catalog—clothing, beauty, electronics, watches, home decor, or coffee—into a fast 3D store customers can walk through on any phone. Get a free 48h demo."
        keywords="3D virtual store, custom 3D online store, 3D Shopify store, interactive 3D ecommerce website, walkable online store builder"
        canonicalUrl="https://www.managemyweb.co/services/3d-virtual-stores"
        schemaData={[
          {
            '@type': 'Service',
            name: 'Custom 3D Online Store Design',
            serviceType: '3D E-Commerce Website Design',
            provider: { '@id': 'https://www.managemyweb.co/#organization' },
            areaServed: 'Worldwide',
            description:
              'Custom browser-ready 3D online stores for clothing, beauty, electronics, jewelry, home decor, and specialty food brands.',
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
        <div className="container" style={{ paddingBottom: '72px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              3D Online Stores
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.6vw, 52px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              An online store that feels like walking into your flagship shop.
            </h1>
            <p style={{ fontSize: '16.5px', color: '#424245', lineHeight: 1.55 }}>
              Built for clothing, beauty, electronics, watches, home decor, and food brands—fast in every mobile browser with zero app downloads.
            </p>

            <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '12px 24px', fontSize: '14.5px' }}
              >
                Get Free 48h 3D Demo
              </button>
              <Link
                href="/3d-store-examples"
                className="btn-apple-secondary"
                style={{ padding: '12px 20px', fontSize: '14.5px', color: '#1D1D1F' }}
              >
                See Store Examples
              </Link>
              <a
                href="https://crazy-3d-website-idea.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
                style={{ fontSize: '15px' }}
              >
                <span>Open live 3D website</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div style={{ marginBottom: '56px' }}>
            <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '48px',
            }}
          >
            {zones.map((z) => (
              <div
                key={z.id}
                id={z.id}
                className="apple-card"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                }}
              >
                <div style={{ padding: '26px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase' }}>
                      {z.zone}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#1D1D1F', background: '#F5F5F7', padding: '3px 10px', borderRadius: '980px' }}>
                      {z.stat}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    {z.title}
                  </h2>
                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5 }}>{z.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Links */}
          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                Works with your current platform
              </h2>
              <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>
                Do not stress about rebuilding everything you already set up. We connect directly to your Shopify, WooCommerce, or custom product database.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <Link href="/shopify-3d-store" className="btn-apple-dark" style={{ fontSize: '13.5px', padding: '11px 18px' }}>
                Shopify 3D Guide →
              </Link>
              <Link href="/woocommerce-3d-store" className="btn-apple-secondary" style={{ fontSize: '13.5px', padding: '11px 18px', color: '#1D1D1F' }}>
                WooCommerce 3D Guide →
              </Link>
            </div>
          </div>
        </div>

        <FAQSection title="3D Store Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
