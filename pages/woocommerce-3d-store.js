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

export default function WooCommerce3DStorePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'How does a 3D storefront connect to WordPress & WooCommerce?',
      a: 'We integrate with your WooCommerce Store API / REST catalog so featured products, prices, variations, and cart actions sync cleanly without disrupting your WordPress database.',
    },
    {
      q: 'What if our current WordPress server is slow?',
      a: 'Heavy 3D assets and textures can be hosted on fast cloud CDN storage alongside compressed loading so the showroom does not overload shared PHP servers. We can also assist with ongoing WordPress caching and hosting improvements.',
    },
    {
      q: 'Do Stripe, PayPal, and local payment plugins keep working?',
      a: 'Yes, where supported by standard WooCommerce checkout routing—orders, taxes, and payment confirmations continue arriving inside your existing WooCommerce Orders screen.',
    },
    {
      q: 'Can you also maintain plugins, security, and backups for WooCommerce?',
      a: 'Yes. Through our separate Managed Website Operations service, we help maintain WooCommerce updates safely with staged testing and daily off-site backups.',
    },
  ];

  return (
    <>
      <SEOHead
        title="WooCommerce 3D Store Development & Speed Care | ManageMyWeb"
        description="Connect an interactive browser-based 3D storefront to your WordPress & WooCommerce store while keeping existing plugins, gateways, and orders running normally."
        keywords="WooCommerce 3D store development, WordPress 3D storefront, WooCommerce virtual showroom, WooCommerce speed optimization"
        canonicalUrl="https://www.managemyweb.co/woocommerce-3d-store"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Service',
          name: 'WooCommerce 3D Storefront Development',
          serviceType: 'WooCommerce 3D E-Commerce Development',
          provider: { '@id': 'https://www.managemyweb.co/#organization' },
          areaServed: 'Worldwide',
          description:
            'Edge-delivered interactive 3D showroom integration connected cleanly to WordPress & WooCommerce catalogs and checkout.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <section className="container" style={{ paddingBottom: '56px' }}>
          <Breadcrumbs path="/woocommerce-3d-store" currentLabel="WooCommerce 3D Store Development" />

          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              WooCommerce Integration
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
              WooCommerce 3D Store Development Built for WordPress Speed
            </h1>
            <p style={{ color: '#424245', fontSize: '17px', lineHeight: 1.6, marginBottom: '24px' }}>
              Pair a lightweight, CDN-delivered 3D showroom with your WooCommerce catalog—keeping your existing WordPress plugins, regional payment gateways, and order management intact.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '13px 26px', fontSize: '15px' }}
              >
                Request a Free 3D Demo
              </button>
              <Link href="/services/web-management" className="btn-apple-secondary" style={{ padding: '13px 24px', fontSize: '15px', color: '#1D1D1F' }}>
                Explore WordPress Support
              </Link>
            </div>
          </div>

          <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
        </section>

        <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid #D2D2D7' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {[
                {
                  title: 'Offloads Heavy Assets From Shared Hosting',
                  desc: '3D geometry and compressed textures serve directly from edge CDN nodes rather than taxing your WordPress PHP workers.',
                },
                {
                  title: 'Works With Existing Payment Plugins',
                  desc: 'Stripe, PayPal, WooPayments, and local bank/COD gateways continue handling final payment inside WooCommerce checkout.',
                },
                {
                  title: 'Optional Staged Updates & Backups',
                  desc: 'Keep WordPress core and WooCommerce extensions maintained safely through off-site backups and staging checks.',
                },
              ].map((item) => (
                <div key={item.title} className="apple-card" style={{ padding: '26px', borderRadius: '18px', background: '#FBFBFD' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    {item.title}
                  </h2>
                  <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection title="WooCommerce 3D Integration Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
