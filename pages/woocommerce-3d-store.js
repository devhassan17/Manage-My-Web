import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
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
      q: 'Does this work with my current WordPress & WooCommerce store?',
      a: 'Yes. We connect directly to your WooCommerce product API so inventory, pricing, variations, and orders continue inside WordPress just like before.',
    },
    {
      q: 'My WordPress / WooCommerce site is slow—will adding 3D make it worse?',
      a: 'Actually, the opposite! Our 3D showroom runs on ultra-fast cloud edge servers rather than your shared WordPress hosting, so it opens in ~1 second. And we can also speed up and host your main WordPress store.',
    },
    {
      q: 'Do my payment gateways like Stripe, PayPal, or local banks keep working?',
      a: 'Yes. Customers still check out through your existing WooCommerce payment plugins and tax/shipping setup.',
    },
    {
      q: 'Can you also manage our monthly WordPress updates and security backups?',
      a: 'Yes. Most WooCommerce owners pair their site with our Monthly Website Care plan so plugins, backups, SSL, speed, and daily edits are handled safely without site crashes.',
    },
  ];

  return (
    <>
      <SEOHead
        title="WooCommerce 3D Store Design & Speed Care | ManageMyWeb"
        description="Upgrade your WordPress & WooCommerce website into a fast 3D store customers can walk through—while keeping your payments, plugins, and orders untouched. Free 48h demo."
        keywords="WooCommerce 3D store, WordPress 3D online shop, fix slow WooCommerce site, WooCommerce website management, speed up WooCommerce store"
        canonicalUrl="https://www.managemyweb.co/woocommerce-3d-store"
        schemaData={[
          {
            '@type': 'Service',
            name: 'WooCommerce 3D Store Design & WordPress Care',
            serviceType: 'WooCommerce Development & Optimization',
            provider: { '@id': 'https://www.managemyweb.co/#organization' },
            areaServed: 'Worldwide',
            description:
              'Turn slow WordPress and WooCommerce product grids into a fast walkable 3D online store with full speed and hosting care.',
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
              For WordPress &amp; WooCommerce Stores
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
              Upgrade <span style={{ color: '#0066CC' }}>WooCommerce</span> into a fast 3D store without plugin headaches.
            </h1>
            <p style={{ color: '#424245', fontSize: '17px', lineHeight: 1.6, marginBottom: '24px' }}>
              Tired of slow WordPress themes and plugin conflicts? Let shoppers walk through a super-fast 3D shop while all your products, Stripe/PayPal checkouts, and orders stay right inside WooCommerce.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-apple-blue"
                style={{ padding: '13px 26px', fontSize: '15px' }}
              >
                Get Free 48h WooCommerce 3D Demo
              </button>
              <Link href="/services/web-management" className="btn-apple-secondary" style={{ padding: '13px 24px', fontSize: '15px', color: '#1D1D1F' }}>
                Fix Slow WordPress Hosting
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
                  title: 'No Heavy WordPress Bloats',
                  desc: 'Your 3D showroom is served cleanly from fast edge servers—so heavy WP plugins never lag your shoppers.',
                },
                {
                  title: 'Keep Every Payment Gateway',
                  desc: 'Stripe, PayPal, WooPayments, COD, and custom regional checkouts keep working seamlessly.',
                },
                {
                  title: 'Safe Updates & Daily Backups',
                  desc: 'No more broken sites after updating WordPress plugins. We manage security, speed caching, and off-site backups.',
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

        <FAQSection title="WooCommerce 3D & Speed Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
