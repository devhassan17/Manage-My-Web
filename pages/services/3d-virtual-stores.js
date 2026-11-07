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
        title="3D Virtual Storefronts & Spatial Retail | ManageMyWeb"
        description="Transform your online catalog into a walkable 3D flagship storefront. Customers explore product shelves, express checkout counters, and brand provenance exhibits."
        canonicalUrl="https://managemyweb.co/services/3d-virtual-stores"
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              3D Storefront Architecture
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
            <p style={{ fontSize: '18px', color: '#6E6E73', lineHeight: 1.55, maxWidth: '680px', margin: '0 auto' }}>
              We replace flat thumbnail grids with architectural 3D retail spaces where visitors inspect shelves, check out in one tap, and connect with your brand story.
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

          {/* Embedded 3D Store Canvas */}
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
                  Interactive Product Shelving
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '18px' }}>
                  Instead of scrolling past tiny square images, customers step up to natural wood shelves. They can select individual bags or bottles, inspect origin details and tasting notes, and add products straight to their bag.
                </p>
                <ul style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.8, paddingLeft: '18px' }}>
                  <li>Custom 3D product packaging tailored to your catalog</li>
                  <li>Interactive product cards with tasting profiles and specifications</li>
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
                  alt="Express Bar Checkout"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 02
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Express Bar Checkout
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '20px' }}>
                  Multi-step form checkouts cause nearly 70% of shoppers to abandon their carts. Our express counter brings the simplicity of stepping up to a café register with one-tap Apple Pay, Google Pay, and Stripe checkout.
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
                  Provenance & Brand Story Wall
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '18px' }}>
                  Your customers care about how your products are sourced and crafted, yet very few click a standard &ldquo;About&rdquo; link in the footer. Placing your provenance exhibit right inside the showroom turns your ethics into a tangible reason to buy.
                </p>
                <ul style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.8, paddingLeft: '18px' }}>
                  <li>85% origin value retention and direct-trade metrics</li>
                  <li>Interactive sustainability and reforestation milestones</li>
                  <li>Verified harvest origins and craftsmanship highlights</li>
                </ul>
              </div>
              <div>
                <img
                  src="/images/fairchain_harvest.jpg"
                  alt="FairChain Provenance Wall"
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
                  alt="Concierge Dispatch Booth"
                  style={{ width: '100%', borderRadius: '18px', display: 'block' }}
                />
              </div>
              <div>
                <p className="apple-eyebrow" style={{ marginBottom: '10px', color: '#0066CC' }}>
                  Zone 04
                </p>
                <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#1D1D1F', marginBottom: '14px' }}>
                  Concierge Dispatch Booth
                </h2>
                <p style={{ color: '#424245', fontSize: '16px', lineHeight: 1.65, marginBottom: '22px' }}>
                  An architectural postal booth inside your storefront makes wholesale inquiries, corporate gifting requests, and customer correspondence feel warm and personal.
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
