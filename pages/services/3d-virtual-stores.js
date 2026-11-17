import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
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
      title: 'Interactive 3D Product Shelves',
      desc: 'Shoppers move around custom shelves and product pedestals, spin featured items, review size or color variants, and add directly to their cart.',
      badge: 'Product Discovery',
    },
    {
      id: 'spatial-checkout',
      zone: 'Zone 02',
      title: 'Existing Commerce Checkout Routing',
      desc: 'Items pass into your existing Shopify, WooCommerce, or supported cart so existing payment providers, shipping rules, and taxes continue working normally.',
      badge: 'Cart Integration',
    },
    {
      id: 'fairchain-story',
      zone: 'Zone 03',
      title: 'In-Store Brand Story Wall',
      desc: 'Display material origin, craft notes, or short brand clips right beside your products instead of hiding them in a separate footer page.',
      badge: 'Brand Context',
    },
    {
      id: 'postal-dispatch',
      zone: 'Zone 04',
      title: 'Direct Support & Wholesale Desk',
      desc: 'Let hesitant buyers or wholesale inquiries message your team directly on WhatsApp or submit a custom bulk quote inside the experience.',
      badge: 'Lead Capture',
    },
  ];

  const faqs = [
    {
      q: 'What is custom 3D virtual store development?',
      a: 'We build a custom interactive 3D showroom inside Chrome, Safari, and Edge connected to your e-commerce product catalog so visitors can explore products on shelves and route seamlessly into checkout.',
    },
    {
      q: 'What stays inside Shopify or WooCommerce?',
      a: 'Where supported by your storefront setup, your product database, pricing rules, inventory levels, payment gateways, shipping calculations, and order management stay inside Shopify or WooCommerce.',
    },
    {
      q: 'How do mobile performance and low-power fallbacks work?',
      a: 'We compress 3D geometry and textures carefully so mobile browsers stay responsive, while keeping core product text, navigation, static previews, and checkout buttons available in normal semantic HTML.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Custom 3D Virtual Store Development | ManageMyWeb"
        description="Explore bespoke browser-based 3D virtual stores with product displays, brand storytelling and commerce integrations. See how ManageMyWeb develops your showroom."
        keywords="custom 3D virtual store development, 3D ecommerce website development, Shopify 3D store integration, WooCommerce 3D showroom"
        canonicalUrl="https://www.managemyweb.co/services/3d-virtual-stores"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Service',
          name: 'Custom 3D Virtual Store Development',
          serviceType: '3D E-Commerce Website Development',
          provider: { '@id': 'https://www.managemyweb.co/#organization' },
          areaServed: 'Worldwide',
          description:
            'Browser-based interactive 3D virtual storefront design and integration for Shopify, WooCommerce, and custom e-commerce brands.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <Breadcrumbs path="/services/3d-virtual-stores" currentLabel="Custom 3D Virtual Store Development" />

          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Core Development Service
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.6vw, 50px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '14px',
              }}
            >
              Custom 3D Virtual Store Development
            </h1>
            <p style={{ fontSize: '16.5px', color: '#424245', lineHeight: 1.6 }}>
              We turn standard e-commerce product grids into walkable browser-based 3D showrooms for fashion, beauty, electronics, jewelry, home decor, and food brands—connected with your existing Shopify, WooCommerce, or custom checkout where supported.
            </p>

            <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '12px 24px', fontSize: '14.5px' }}
              >
                Request a Free 3D Store Demo
              </button>
              <Link
                href="/3d-store-examples"
                className="btn-apple-secondary"
                style={{ padding: '12px 20px', fontSize: '14.5px', color: '#1D1D1F' }}
              >
                View Industry Examples
              </Link>
              <a
                href="https://crazy-3d-website-idea.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-link"
                style={{ fontSize: '15px' }}
              >
                <span>Open live interactive demo</span>
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
                      {z.badge}
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

          {/* Technical Scope, Tradeoffs & Platform Flow */}
          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '36px' }}>
            <div>
              <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                Data Flow &amp; Platform Dependencies
              </h2>
              <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.65, marginBottom: '12px' }}>
                A 3D store does not force you to rebuild inventory management. Selected products, prices, and variant choices pull from your catalog API, while add-to-cart and checkout route back to your main commerce checkout where supported by your setup and third-party apps.
              </p>
              <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                <strong>Honest constraint:</strong> Custom checkout scripts or heavily customized third-party cart drawers may require tailored integration testing during the prototype stage.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                Mobile Behavior, Accessibility &amp; Fallbacks
              </h2>
              <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.65, marginBottom: '12px' }}>
                Real buyers open store links on phones over varied cellular networks. We optimize 3D models and textures for mobile GPUs, respect browser reduced-motion preferences, and maintain clean semantic HTML headings and purchase buttons outside any WebGL/canvas element.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/shopify-3d-store" className="apple-link" style={{ fontSize: '14px' }}>
                  Shopify Integration Details →
                </Link>
                <Link href="/woocommerce-3d-store" className="apple-link" style={{ fontSize: '14px' }}>
                  WooCommerce Integration Details →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <FAQSection title="3D Virtual Store Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
