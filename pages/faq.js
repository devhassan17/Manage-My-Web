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
      category: 'Complimentary Prototype Program',
      q: 'How does the complimentary 3D prototype work?',
      a: 'During our 60-day onboarding window, you can submit your current website URL and our engineering team will build a working, interactive 3D walkthrough featuring your products at no cost. There is no obligation, no upfront fee, and no credit card required.',
    },
    {
      category: 'Complimentary Prototype Program',
      q: 'What is included in the custom 3D prototype?',
      a: 'Your prototype includes a tailored 3D architectural showroom featuring interactive product shelving with your packaging, an express barista or boutique checkout counter, a brand provenance wall, and a concierge contact desk.',
    },
    {
      category: 'Technology & Performance',
      q: 'Does a 3D storefront run smoothly on iPhones and Android devices?',
      a: 'Yes. We engineer every storefront using hardware-accelerated WebGL and Three.js. It runs at 60 frames per second directly inside mobile Safari, Chrome, iPad, desktop browsers, and Apple Vision Pro with zero app installation.',
    },
    {
      category: 'Technology & Performance',
      q: 'Will a 3D storefront slow down initial page load times?',
      a: 'No. We combine Next.js server-side rendering with progressive asset streaming. Critical page content renders immediately while 3D geometry streams in the background, achieving sub-second first paint.',
    },
    {
      category: 'Search & SEO',
      q: 'Can Google index products inside a 3D storefront?',
      a: 'Yes. Every product title, description, price, and article includes complete semantic HTML markup and Schema.org JSON-LD structured data so search engines index your catalog effortlessly.',
    },
    {
      category: 'Integrations',
      q: 'Does this connect to our existing Shopify or WooCommerce inventory?',
      a: 'Yes. We connect directly to your Shopify or WooCommerce backend so inventory counts, product variants, pricing, and order fulfillment remain synchronized with your existing operations.',
    },
    {
      category: 'Web Operations Concierge',
      q: 'What does ManageMyWeb handle on a day-to-day basis?',
      a: 'We manage your cloud edge hosting, domain and DNS records, business email deliverability (SPF, DKIM, DMARC), security patches, speed tuning, and routine site edits. Whenever you need an update, simply message our engineers.',
    },
    {
      category: 'Timelines',
      q: 'How long does a full production 3D storefront take to launch?',
      a: 'Your complimentary prototype is delivered within 48 hours. A complete production storefront with full catalog integration typically launches within 2 to 3 weeks.',
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

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Knowledge Base
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                marginBottom: '14px',
              }}
            >
              Frequently Asked Questions
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px' }}>
              Everything you need to know about our 3D storefronts, prototype program, and managed web operations.
            </p>
          </div>

          <div style={{ borderTop: '1px solid #D2D2D7' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    borderBottom: '1px solid #D2D2D7',
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 0',
                      background: 'transparent',
                      border: 'none',
                      color: '#1D1D1F',
                      fontSize: '17px',
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
                          marginBottom: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {faq.category}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '22px',
                        fontWeight: 400,
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
                        paddingBottom: '22px',
                        color: '#424245',
                        fontSize: '15.5px',
                        lineHeight: 1.6,
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
