import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
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
      industry: 'Food, Coffee & Specialty Drinks',
      title: 'Warm Flagship Roastery Showroom',
      desc: 'Customers walk past warm wood shelves, tap whole-bean bags or gift sets, learn where the beans came from, and pay at the bar counter.',
      highlights: ['Natural pairing of beans & mugs', 'Origin story right next to price tags', '3.4× longer browsing time'],
    },
    {
      industry: 'Fashion, Apparel & Footwear',
      title: 'Streetwear Boutique & Sneaker Wall',
      desc: 'Shoppers walk between hanging clothing racks and illuminated sneaker pedestals, spin shoes 360°, pick sizes, and check out fast.',
      highlights: ['Full outfit styling on racks', 'Interactive size & color swatches', 'Higher multi-item cart value'],
    },
    {
      industry: 'Beauty, Skincare & Perfume',
      title: 'Clean Clinical Counter & Routine Sets',
      desc: 'Buyers browse morning and night skincare routines grouped on sunlit glass counters instead of hunting through 12 separate tabs.',
      highlights: ['Easy 3-step routine bundles', 'Ingredient notes displayed clearly', 'Ideal for high-repeat gift sets'],
    },
    {
      industry: 'Watches, Jewelry & Accessories',
      title: 'Illuminated Glass Display Cases',
      desc: 'Close-up macro zoom lets high-ticket buyers inspect watch dials, straps, and metal finishes before booking concierge help or buying.',
      highlights: ['Trust-building zoom detail', 'Direct VIP WhatsApp chat button', 'Custom luxury mood lighting'],
    },
    {
      industry: 'Tech, Gadgets & Audio Gear',
      title: 'Hands-On Interactive Demo Table',
      desc: 'Just like stepping into an Apple Store table: shoppers inspect headphones, ports, colors, and specs right beside one another.',
      highlights: ['Visual comparison on one table', 'Clear spec popups on click', 'Fewer pre-purchase returns'],
    },
    {
      industry: 'Home Decor & Furniture',
      title: 'Real-Scale Living Room Setup',
      desc: 'Instead of guessing from cropped photos, buyers walk inside styled spaces to see lamps, tables, and art together.',
      highlights: ['Shop the whole room layout', 'True proportions and styling', 'Great for higher-ticket decor'],
    },
  ];

  const faqs = [
    {
      q: 'Can you build a 3D example using my own real store products?',
      a: 'Yes! You do not have to guess what your store would look like. Send your link and we will build a free working 3D preview featuring 2 or 3 of your actual items in 48 hours.',
    },
    {
      q: 'Do I have to upload heavy 3D files myself?',
      a: 'No. Our team handles creating and compressing the 3D showcase from your regular product photos, links, and brand colors.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Website Examples by Industry | ManageMyWeb"
        description="Explore interactive 3D online store examples across coffee, clothing, skincare, watches, tech, and home decor. Walk through our live demo or request a free custom preview."
        keywords="3D ecommerce website examples, 3D online store examples, interactive 3D shop demo, 3D Shopify store example, virtual store examples"
        canonicalUrl="https://www.managemyweb.co/3d-store-examples"
        schemaData={{
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', background: '#FBFBFD' }}>
        <section className="container" style={{ paddingBottom: '52px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              3D Website Examples
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
              See what a 3D online store looks like across different industries.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Every brand gets a space tailored to its products—whether you sell coffee beans, sneakers, skincare sets, or luxury watches.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
                See Your Own Store in 3D Free
              </button>
              <Link href="/experience" className="btn-apple-secondary" style={{ padding: '12px 22px', fontSize: '14.5px', color: '#1D1D1F' }}>
                Fullscreen Video Walkthrough
              </Link>
            </div>
          </div>

          <VirtualCoffeeStore3D onOpenContact={() => setDemoModalOpen(true)} />
        </section>

        <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid #D2D2D7', borderBottom: '1px solid #D2D2D7' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                Layouts tailored to what your customers want to see.
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
        <FAQSection title="Example & Custom Demo FAQ" items={faqs} background="#FBFBFD" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
