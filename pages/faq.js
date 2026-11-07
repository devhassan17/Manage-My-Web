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
      category: 'Demo & Quotation',
      q: 'How does the Free 3D Demo and Custom Quotation work?',
      a: 'Choose Step 1 to receive a free 48-hour 3D preview of your products before getting your Step 2 quotation—or request a direct itemized quotation within 24 hours.',
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
        title="Frequently Asked Questions | ManageMyWeb"
        description="Answers regarding bespoke 3D retail storefronts, mobile browser performance, Shopify integration, and managed web operations."
        canonicalUrl="https://managemyweb.co/faq"
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
