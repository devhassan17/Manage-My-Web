import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import VirtualCoffeeStore3D from '../../components/VirtualCoffeeStore3D';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function ThreeDVirtualStores() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const zones = [
    {
      id: 'interactive-shelves',
      zone: 'Zone 01',
      title: '3D Product Displays & Shelving',
      desc: 'Shoppers walk up to racks and shelves, inspect items in 360°, and add directly to bag.',
      stat: '+48% Discovery Depth',
    },
    {
      id: 'spatial-checkout',
      zone: 'Zone 02',
      title: 'Express Counter Checkout',
      desc: 'One-tap Apple Pay, Google Pay, and Stripe synced with Shopify or WooCommerce.',
      stat: '+62% Order Value Lift',
    },
    {
      id: 'fairchain-story',
      zone: 'Zone 03',
      title: 'Brand Story & Provenance Wall',
      desc: 'Highlight craftsmanship, materials, and origin stories directly inside the showroom.',
      stat: '3.4× Repeat Retention',
    },
    {
      id: 'postal-dispatch',
      zone: 'Zone 04',
      title: 'VIP Client & Concierge Desk',
      desc: 'In-store desk for sizing questions, wholesale inquiries, and instant support.',
      stat: '94% Inquiry Completion',
    },
  ];

  return (
    <>
      <SEOHead
        title="Custom 3D Virtual Storefronts for E-Commerce Brands | ManageMyWeb"
        description="Transform any e-commerce catalog—fashion, beauty, electronics, luxury watches, home furniture, or specialty goods—into a walkable 60fps 3D flagship storefront synced with Shopify or WooCommerce."
        keywords="3D virtual store builder, custom 3D Shopify store, 3D fashion boutique online, 3D beauty showroom, 3D electronics store, spatial retail website, WebGL ecommerce development"
        canonicalUrl="https://www.managemyweb.co/services/3d-virtual-stores"
        schemaData={{
          '@type': 'Service',
          name: 'Custom 3D Virtual Storefront Development',
          serviceType: '3D E-Commerce Web Development',
          provider: {
            '@type': 'Organization',
            name: 'ManageMyWeb',
            url: 'https://www.managemyweb.co',
          },
          areaServed: 'Worldwide',
          description:
            'Custom 60fps 3D virtual retail storefronts for fashion, beauty, electronics, luxury, home, and specialty e-commerce brands.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              3D Storefront Architecture
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
              A digital store that feels like a physical flagship.
            </h1>
            <p style={{ fontSize: '16px', color: '#6E6E73', lineHeight: 1.45 }}>
              Custom 60fps 3D storefronts for fashion, beauty, electronics, luxury, home, and specialty retail.
            </p>

            <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '12px 24px', fontSize: '14.5px' }}
              >
                Free 3D Demo / Quotation
              </button>
              <a
                href="https://crazy-3d-website-idea.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
                style={{ fontSize: '15px' }}
              >
                <span>Open live 3D website in new tab</span>
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
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
