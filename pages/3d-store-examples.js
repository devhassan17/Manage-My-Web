import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import ClientLogos from '../components/ClientLogos';
import FAQSection from '../components/FAQSection';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function ThreeDStoreExamples() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const examples = [
    {
      industry: 'Specialty Coffee & Pantry',
      title: 'Walkable Roastery & Provenance Room',
      desc: 'Visitors walk past natural shelves featuring hero bags and brewing bundles, inspect origin notes right beside each product, and continue to checkout.',
      highlights: ['Curated multi-item bundle shelves', 'Origin story right beside pricing', 'Clear lead vs checkout flow'],
    },
    {
      industry: 'Fashion, Apparel & Footwear',
      title: 'Boutique Showroom & Sneaker Pedestals',
      desc: 'Shoppers explore styled lookbooks on hanging racks and illuminated sneaker pedestals with quick variant selectors.',
      highlights: ['Curated drop staging', 'Interactive size & color selection', 'Mobile-friendly camera views'],
    },
    {
      industry: 'Beauty, Skincare & Fragrance',
      title: 'Clean Routine Counters',
      desc: 'Group cleansers, serums, and gift sets together in daylight-lit counter stations instead of making shoppers hunt across separate category menus.',
      highlights: ['Morning & evening routine sets', 'Ingredient highlights on inspect', 'Natural bundle presentation'],
    },
    {
      industry: 'Watches, Jewelry & Luxury',
      title: 'Macro Display Cases & Concierge Desk',
      desc: 'High-ticket shoppers inspect metal textures and close-up angles before clicking directly to checkout or opening a private concierge inquiry.',
      highlights: ['Close-up detail exploration', 'Direct WhatsApp & quote path', 'Custom ambient lighting mood'],
    },
    {
      industry: 'Electronics & Audio Hardware',
      title: 'Interactive Hands-On Demo Tables',
      desc: 'Display flagship headphones, gear, or accessories side by side on sleek product tables with clear port and specification callouts.',
      highlights: ['Visual comparison on one table', 'Spec highlights beside products', 'Pre-order & cart support'],
    },
    {
      industry: 'Home, Lighting & Furniture',
      title: 'Room-Scale Interior Staging',
      desc: 'Stage tables, lamps, and accents inside styled room corners so buyers visualize matching sets before choosing dimensions.',
      highlights: ['Context-led room browsing', 'Multi-item room pairing', 'Direct link back to PDP details'],
    },
  ];

  const faqs = [
    {
      q: 'Can we preview our own products inside one of these layouts?',
      a: 'Yes. Share your store URL and 2 or 3 priority products and we will build a working custom preview featuring your own items before discussing a project quote.',
    },
    {
      q: 'Do we need existing CAD/3D files for every SKU?',
      a: 'No. We help scope lightweight 3D staging from your existing product photography, dimensions, and reference assets during discovery.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Virtual Showroom & E-Commerce Examples | ManageMyWeb"
        description="Explore interactive 3D e-commerce showroom examples across specialty coffee, fashion, beauty, watches, electronics, and furniture. View our live demo or request a custom preview."
        keywords="3D ecommerce website examples, virtual showroom examples, interactive 3D shop demo, Shopify 3D store showcase"
        canonicalUrl="https://www.managemyweb.co/3d-store-examples"
        showBreadcrumbs={true}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <section className="container" style={{ paddingBottom: '52px' }}>
          <Breadcrumbs path="/3d-store-examples" currentLabel="3D Store Examples" />

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Showroom Concepts &amp; Use Cases
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
              3D Virtual Showroom &amp; Store Examples by Industry
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Each 3D showroom is tailored around how shoppers actually evaluate your category—whether through outfit staging, routine counters, hardware comparison tables, or B2B inquiry desks.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
                Request a Custom 3D Demo
              </button>
              <Link href="/experience" className="btn-apple-secondary" style={{ padding: '12px 22px', fontSize: '14.5px', color: '#1D1D1F' }}>
                Open Fullscreen Walkthrough
              </Link>
            </div>
          </div>

          <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
        </section>

        <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid #D2D2D7', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                Showroom concepts designed around buyer intent
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {examples.map((ex) => (
                <div key={ex.title} className="apple-card" style={{ padding: '28px', borderRadius: '20px', background: '#FBFBFD' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {ex.industry}
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    {ex.title}
                  </h3>
                  <p style={{ color: '#424245', fontSize: '14px', lineHeight: 1.55, marginBottom: '14px' }}>
                    {ex.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', margin: 0, padding: 0, color: '#1D1D1F', fontSize: '13px', fontWeight: 500 }}>
                    {ex.highlights.map((h) => (
                      <li key={h}>✓ {h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientLogos />
        <FAQSection title="Showroom Example Questions" items={faqs} background="#FBFBFD" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
