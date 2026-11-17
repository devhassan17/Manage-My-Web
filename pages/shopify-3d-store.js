import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
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
      a: 'No. Your Shopify catalog, pricing, inventory counts, tax rules, and checkout flow remain inside Shopify where supported. The 3D showroom connects with your storefront catalog via Shopify Storefront APIs or theme integration.',
    },
    {
      q: 'What are the integration limits to keep in mind on Shopify?',
      a: 'Standard variants, cart permalinks, and Shop Pay / Apple Pay work smoothly through Shopify checkout handoff. Heavily custom third-party cart drawer apps or complex subscription bundles may require tailored scoping during the prototype stage.',
    },
    {
      q: 'Does a 3D Shopify storefront hurt mobile page speed?',
      a: 'Your standard Shopify collection and product pages remain unaffected. When visitors open the 3D showroom, assets are compressed and lazy-loaded with static preview fallbacks so mobile devices stay responsive.',
    },
    {
      q: 'How do we test our own Shopify products in 3D first?',
      a: 'Share your Shopify store URL and 2 or 3 featured products to request a working 3D browser prototype before discussing a full implementation quote.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Shopify 3D Store Development & Integration | ManageMyWeb"
        description="Build an interactive 3D storefront connected to your existing Shopify catalog, variants, and checkout. Review Shopify integration details and request a free 3D store demo."
        keywords="Shopify 3D store development, add 3D store to Shopify, Shopify 3D virtual showroom, Shopify Storefront API 3D, interactive Shopify store"
        canonicalUrl="https://www.managemyweb.co/shopify-3d-store"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Service',
          name: 'Shopify 3D Storefront Development',
          serviceType: 'Shopify 3D E-Commerce Development',
          provider: { '@id': 'https://www.managemyweb.co/#organization' },
          areaServed: 'Worldwide',
          description:
            'Custom browser-based 3D storefront integration built for Shopify catalogs, variant selection, and native Shopify checkout routing.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <section className="container" style={{ paddingBottom: '56px' }}>
          <Breadcrumbs path="/shopify-3d-store" currentLabel="Shopify 3D Store Development" />

          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Shopify Integration
            </p>
            <h1
              style={{
                fontSize: 'clamp(34px, 4.8vw, 50px)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Shopify 3D Store Development Without Replacing Your Backend
            </h1>
            <p style={{ color: '#424245', fontSize: '17px', lineHeight: 1.6, marginBottom: '24px' }}>
              Connect an interactive browser-based 3D showroom directly to your Shopify products, variants, and native checkout—keeping your existing inventory, apps, and order fulfillment running smoothly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '13px 26px', fontSize: '15px' }}
              >
                Request a Free 3D Demo
              </button>
              <Link href="/pricing" className="btn-apple-secondary" style={{ padding: '13px 24px', fontSize: '15px', color: '#1D1D1F' }}>
                Get a Custom Quote
              </Link>
            </div>
          </div>

          <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
        </section>

        <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid #D2D2D7' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                How Shopify Catalog &amp; Checkout Integration Works
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '15.5px' }}>
                Your Shopify admin stays the single source of truth for stock, variants, and orders.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {[
                {
                  title: 'Shopify Storefront API Sync',
                  desc: 'Featured titles, prices, stock availability, and size or color variants stay synced directly from your Shopify catalog.',
                },
                {
                  title: 'Native Shopify Cart & Checkout',
                  desc: 'When visitors pick products in 3D, selections pass to your Shopify checkout flow supporting Shop Pay, Apple Pay, and card gateways.',
                },
                {
                  title: 'Coexists With Standard Collection Pages',
                  desc: 'Keep your existing theme templates for fast search and direct links while giving visitors a clear entry into the 3D showroom.',
                },
                {
                  title: 'Honest Scope & App Compatibility Check',
                  desc: 'Before any full build, we inspect third-party bundle or subscription apps to make sure checkout handoff behaves reliably.',
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
                Read our step-by-step Shopify 3D integration guide →
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
