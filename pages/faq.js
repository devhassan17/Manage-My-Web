import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';

export default function FAQPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      category: 'Basics',
      q: 'What is a 3D e-commerce website?',
      a: 'A 3D e-commerce website is an online store you can walk through like a real shop. Instead of scrolling a grid of flat photos, customers move around a virtual store in their browser, click products on the shelves, and buy—on phone or laptop, with no app download.',
    },
    {
      category: 'Demo & Quotation',
      q: 'How does the Free 3D Demo and Custom Quotation work?',
      a: 'Choose Step 1 to receive a free 48-hour 3D preview of your products before getting your Step 2 quotation—or request a direct itemized quotation within 24 hours.',
    },
    {
      category: 'Cost',
      q: 'How much does a 3D online store cost?',
      a: 'Every store is quoted individually because the cost depends on how many products you have, how custom the 3D space is, and whether you also want us to manage hosting and updates. You can see a free 48-hour demo with your own products first, then receive an itemized quotation.',
    },
    {
      category: 'Mobile Speed',
      q: 'Does a 3D store run fast on iPhones and Android phones?',
      a: 'Yes. 60fps directly inside mobile Safari and Chrome in under 1.1 seconds—no app download required.',
    },
    {
      category: 'Integrations',
      q: 'Does it connect to our existing Shopify or WooCommerce catalog?',
      a: 'Yes. Your products, variants, stock, and order fulfillment remain 100% synced with your current store.',
    },
    {
      category: 'Integrations',
      q: 'Do I need to rebuild my current website to get a 3D store?',
      a: 'No. Your 3D store is added on top of your existing Shopify, WooCommerce, or custom website. Your products, checkout, and orders stay where they are today.',
    },
    {
      category: 'Industries',
      q: 'Which types of online stores can be turned into 3D?',
      a: 'Any product-based store: fashion and footwear, beauty and skincare, coffee and food, watches and jewelry, electronics, and home goods. We design the 3D space around your products and brand.',
    },
    {
      category: 'SEO',
      q: 'Can Google index products inside a 3D storefront?',
      a: 'Yes. Every page and product includes full semantic HTML and Schema.org JSON-LD markup for Google indexing.',
    },
    {
      category: 'Managed Operations',
      q: 'What does ManageMyWeb handle monthly?',
      a: 'Cloud hosting, domains, DNS, business email (SPF/DKIM/DMARC), speed optimization, security backups, and same-day edits via WhatsApp.',
    },
    {
      category: 'Timeline',
      q: 'How fast can we launch?',
      a: 'Your free 3D demo is ready in 48 hours. Full production storefronts launch in 2 to 3 weeks.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D E-Commerce Website FAQ: Cost, Shopify, Speed & Setup | ManageMyWeb"
        description="Answers to common questions about 3D e-commerce websites: what they are, how much they cost, Shopify and WooCommerce integration, mobile speed, and how the free 48-hour 3D demo works."
        keywords="what is a 3D ecommerce website, 3D online store cost, 3D Shopify store, WooCommerce 3D store, 3D virtual store FAQ"
        canonicalUrl="https://www.managemyweb.co/faq"
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

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              FAQ
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 46px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                marginBottom: '8px',
              }}
            >
              Questions &amp; Answers
            </h1>
          </div>

          <div style={{ borderTop: '1px solid #D2D2D7' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={faq.q} style={{ borderBottom: '1px solid #D2D2D7' }}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 0',
                      background: 'transparent',
                      border: 'none',
                      color: '#1D1D1F',
                      fontSize: '16px',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#0066CC',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          display: 'block',
                          marginBottom: '3px',
                          fontWeight: 600,
                        }}
                      >
                        {faq.category}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '20px',
                        color: '#6E6E73',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        paddingBottom: '18px',
                        color: '#424245',
                        fontSize: '14.5px',
                        lineHeight: 1.55,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
