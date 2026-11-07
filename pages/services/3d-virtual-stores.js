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

  return (
    <>
      <SEOHead
        title="Custom 3D Virtual Storefronts for E-Commerce Brands | ManageMyWeb"
        description="Transform any e-commerce catalog—fashion, beauty, electronics, luxury watches, home furniture, or specialty goods—into a walkable 60fps 3D flagship storefront synced with Shopify or WooCommerce."
        keywords="3D virtual store builder, custom 3D Shopify store, 3D fashion boutique online, 3D beauty showroom, 3D electronics store, spatial retail website, WebGL ecommerce development"
        canonicalUrl="https://managemyweb.co/services/3d-virtual-stores"
        schemaData={{
          '@type': 'Service',
          name: 'Custom 3D Virtual Storefront Development',
          serviceType: '3D E-Commerce Web Development',
          provider: {
            '@type': 'Organization',
            name: 'ManageMyWeb',
            url: 'https://managemyweb.co',
          },
          areaServed: 'Worldwide',
          description:
            'Custom 60fps 3D virtual retail storefronts for fashion, beauty, electronics, luxury, home, and specialty e-commerce brands.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              3D Storefront Architecture for All E-Commerce Brands
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '18px',
              }}
            >
              A digital storefront that feels like a physical flagship.
            </h1>
            <p style={{ fontSize: '18px', color: '#6E6E73', lineHeight: 1.55, maxWidth: '700px', margin: '0 auto' }}>
              Whether you sell apparel, cosmetics, electronics, watches, furniture, or specialty goods, we replace flat thumbnail grids with architectural 3D retail spaces where shoppers inspect products, check out in one tap, and connect with your brand story.
            </p>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '13px 28px', fontSize: '15px' }}
              >
                Request Free 3D Prototype
              </button>
              <Link href="/experience" className="apple-link" style={{ fontSize: '16px' }}>
                <span>Open fullscreen showroom</span>
                <span aria-hidden="true">›</span>
              </Link>
            </div>
          </div>

          {/* Embedded Live 3D Storefront Preview */}
          <div style={{ marginBottom: '88px' }}>
            <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
          </div>

          {/* 4 Architectural Zones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Zone 1 */}
            <div
              id="interactive-shelves"
              className="apple-card"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                borderRadius: '24px',
                background: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '44px',
                alignItems: 'center',
              }}
            >
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 01
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Interactive Product Displays, Racks & Shelving
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '18px' }}>
                  Instead of scrolling past tiny square images, shoppers walk up to custom apparel racks, display tables, or shelving. They can pick up individual products, inspect materials and specifications in 360°, and add items straight to their bag.
                </p>
                <ul style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.8, paddingLeft: '18px' }}>
                  <li>Custom 3D product models and fixtures tailored to your industry</li>
                  <li>Interactive product cards with variants, sizing, and specifications</li>
                  <li>Real-time inventory sync with Shopify and WooCommerce</li>
                </ul>
              </div>
              <div>
                <img
                  src="/images/coffee_store_hero.jpg"
                  alt="3D Product Shelving"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
            </div>

            {/* Zone 2 */}
            <div
              id="spatial-checkout"
              className="apple-card"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                borderRadius: '24px',
                background: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '44px',
                alignItems: 'center',
              }}
            >
              <div>
                <img
                  src="/images/spatial_devices_preview.jpg"
                  alt="Express Counter Checkout"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 02
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Express Counter Checkout
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '20px' }}>
                  Multi-step form checkouts cause nearly 70% of shoppers to abandon their carts. Our express counter brings the simplicity of stepping up to a flagship register with one-tap Apple Pay, Google Pay, and Stripe checkout.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: '#F5F5F7', padding: '14px 20px', borderRadius: '14px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F' }}>+62%</div>
                    <div style={{ fontSize: '12px', color: '#6E6E73' }}>Average Order Value Lift</div>
                  </div>
                  <div style={{ background: '#F5F5F7', padding: '14px 20px', borderRadius: '14px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F' }}>-41%</div>
                    <div style={{ fontSize: '12px', color: '#6E6E73' }}>Checkout Abandonment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone 3 */}
            <div
              id="fairchain-story"
              className="apple-card"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                borderRadius: '24px',
                background: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '44px',
                alignItems: 'center',
              }}
            >
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 03
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Brand Story & Craftsmanship Wall
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '18px' }}>
                  Shoppers care about how your products are designed, sourced, and built—yet very few click a standard &ldquo;About&rdquo; link in the footer. Placing your brand story exhibit right inside the showroom turns your quality into a tangible reason to buy.
                </p>
                <ul style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.8, paddingLeft: '18px' }}>
                  <li>Interactive material, engineering, and craftsmanship breakdowns</li>
                  <li>Sustainability, provenance, and customer proof displays</li>
                  <li>Custom editorial video or 3D storytelling panels</li>
                </ul>
              </div>
              <div>
                <img
                  src="/images/fairchain_harvest.jpg"
                  alt="Brand Story & Craftsmanship Wall"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
            </div>

            {/* Zone 4 */}
            <div
              id="postal-dispatch"
              className="apple-card"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                borderRadius: '24px',
                background: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '44px',
                alignItems: 'center',
              }}
            >
              <div>
                <img
                  src="/images/coffee_post_office.jpg"
                  alt="Concierge Dispatch Desk"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 04
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  VIP Client & Concierge Desk
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '22px' }}>
                  An architectural concierge booth inside your storefront makes styling consultations, wholesale inquiries, corporate gifting requests, and customer correspondence feel warm and personal.
                </p>
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="btn-apple-dark"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  Request Your Custom 3D Prototype
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
