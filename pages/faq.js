import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function FAQPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      category: 'Basics',
      q: 'What is a 3D e-commerce website?',
      a: 'It is an interactive online store designed as a walkable virtual shop right inside your web browser. Instead of browsing only flat photo grids, visitors explore 3D shelves, inspect featured products, and proceed to checkout using their phone or desktop computer without installing an app.',
    },
    {
      category: 'Free Demo',
      q: 'How does the Free 3D Store Demo work?',
      a: 'Share your existing website link along with 2 or 3 priority products. Our team builds a working browser preview with your real items so you can review design, mobile interaction, and fit before deciding on a full quote.',
    },
    {
      category: 'Pricing',
      q: 'What affects the cost of a 3D online store?',
      a: 'Final pricing depends on how many hero products are staged in 3D, room customization level, commerce platform integration needs, extra interactive panels, and whether you include ongoing monthly technical management.',
    },
    {
      category: 'Shopify & Woo',
      q: 'Do I need to leave Shopify or WooCommerce?',
      a: 'No. We integrate your 3D storefront alongside your existing Shopify or WooCommerce catalog so inventory, pricing, payment methods, and fulfillment workflows keep operating where supported.',
    },
    {
      category: 'Shopify & Woo',
      q: 'Do I have to rebuild my current website?',
      a: 'No. Your existing category pages stay online for fast search access while visitors can enter the 3D showroom directly from a button or dedicated route.',
    },
    {
      category: 'Mobile & Access',
      q: 'Does a 3D store work smoothly on iPhones and Android phones?',
      a: 'We compress 3D assets and textures carefully for mobile browsers in Safari and Chrome. For older devices or visitors who prefer reduced motion, essential HTML copy, product links, and checkout actions remain directly usable.',
    },
    {
      category: 'SEO',
      q: 'Can Google index content inside a 3D storefront?',
      a: 'Yes, when built properly. We never trap key information inside an empty canvas—every page includes semantic HTML headings, readable text, fast assets, sitemaps, and Schema.org markup outside WebGL.',
    },
    {
      category: 'Operations',
      q: 'What does Managed Website Operations cover?',
      a: 'Our optional monthly website support service covers hosting management, domain/DNS records, SSL checks, email authentication (SPF/DKIM/DMARC), off-site backups, speed hygiene, and routine storefront edits.',
    },
    {
      category: 'Ownership',
      q: 'Who owns the domain name and store data?',
      a: 'You retain full legal ownership of your domain name, brand assets, product catalog, analytics accounts, and customer transaction data.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Website FAQs | ManageMyWeb"
        description="Plain-English answers about custom 3D online stores: how browser demos work, Shopify and WooCommerce compatibility, Google SEO, mobile fallbacks, and pricing scope."
        keywords="3D ecommerce website FAQ, 3D Shopify store questions, how 3D websites work, 3D online store cost"
        canonicalUrl="https://www.managemyweb.co/faq"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '780px', marginBottom: '12px' }}>
          <Breadcrumbs path="/faq" currentLabel="Frequently Asked Questions" />

          <div style={{ textAlign: 'center' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              FAQ
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 46px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                marginBottom: '12px',
              }}
            >
              3D E-Commerce Website FAQs
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', marginBottom: '8px' }}>
              Straight answers on platform compatibility, browser speed, SEO, scope, and optional website support.
            </p>
          </div>
        </div>

        <FAQSection title="" items={faqs} background="#FBFBFD" compact />

        <div className="container" style={{ maxWidth: '780px', paddingBottom: '72px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              Request a Free 3D Store Demo
            </button>
            <Link href="/blog" className="btn-apple-secondary" style={{ padding: '12px 22px', fontSize: '14.5px', color: '#1D1D1F' }}>
              Browse Detailed Guides →
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
