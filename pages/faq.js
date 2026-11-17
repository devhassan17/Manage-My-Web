import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
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
      q: 'What is a 3D online store?',
      a: 'It is an online shop designed like a real room customers can walk inside right in their browser. Instead of only scrolling flat product boxes, visitors walk up to shelves, spin items 360°, pick sizes, and buy—on phone or laptop, with no app download.',
    },
    {
      category: 'Free Demo',
      q: 'How does the Free 48-Hour 3D Demo work?',
      a: 'Send us your store website link and 2 or 3 products. Within 48 hours we build a free working 3D preview of your own items so you can test it on your phone before getting any quote.',
    },
    {
      category: 'Cost',
      q: 'How much does a 3D website cost?',
      a: 'It depends on how many products you want in 3D, how custom you want the room design, and whether you want monthly website care too. Testing the free 48h demo first lets us send you an honest custom quote based on your exact store.',
    },
    {
      category: 'Shopify & Woo',
      q: 'Do I need to leave Shopify or WooCommerce?',
      a: 'No! We connect your 3D showroom straight to your existing Shopify or WooCommerce catalog. Your products, prices, inventory, payment methods, and orders stay completely unchanged.',
    },
    {
      category: 'Shopify & Woo',
      q: 'Do I have to rebuild my current website?',
      a: 'Not at all. Your regular pages stay online for fast search traffic, and your new 3D showroom runs alongside them on the exact same domain.',
    },
    {
      category: 'Speed',
      q: 'Will it run smoothly on iPhones and Android phones?',
      a: 'Yes. We compress 3D models and textures carefully so pages open in roughly 1 second at a smooth 60 frames per second inside Chrome and Safari—no VR headset or app required.',
    },
    {
      category: 'SEO',
      q: 'Do 3D websites rank well on Google?',
      a: 'Yes, when built the right way. Every page includes readable semantic HTML headings, descriptions, fast mobile loading, clean XML sitemaps, and Schema.org markup so Google indexes and ranks every page properly.',
    },
    {
      category: 'Web Care',
      q: 'What does your Monthly Website Management service handle?',
      a: 'We manage cloud hosting, domain renewals, DNS & SSL, SPF/DKIM/DMARC business email authentication, speed optimization, daily backups, and same-day store edits right over WhatsApp.',
    },
    {
      category: 'Web Care',
      q: 'Can you fix and speed up my website even without 3D?',
      a: 'Yes! Plenty of clients hire us purely to run their WordPress, WooCommerce, Shopify, or custom website—handling hosting, speed fixes, and quick daily updates.',
    },
    {
      category: 'Ownership',
      q: 'Will we still own our domain name and store code?',
      a: 'Always 100% yes. Domains, accounts, customer lists, and assets stay completely under your business ownership.',
    },
    {
      category: 'Timeline',
      q: 'How quickly can a full store go live?',
      a: 'Your free demo is ready in 48 hours. Once approved, full custom 3D stores usually launch in 2 to 3 weeks.',
    },
  ];

  return (
    <>
      <SEOHead
        title="3D Online Store FAQ: Cost, Shopify, Mobile Speed & SEO | ManageMyWeb"
        description="Honest answers to common questions about 3D websites, how much they cost, connecting with Shopify or WooCommerce, Google SEO, mobile speed, and monthly website care."
        keywords="3D ecommerce FAQ, how much does a 3D website cost, 3D Shopify store questions, do 3D websites rank on Google, website maintenance FAQ"
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

      <main style={{ paddingTop: '52px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '780px', textAlign: 'center', marginBottom: '12px' }}>
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
            Straight answers to common questions.
          </h1>
          <p style={{ color: '#6E6E73', fontSize: '16px', marginBottom: '8px' }}>
            Everything store owners ask before trying our free 48-hour 3D demo or hiring us to manage their website.
          </p>
        </div>

        <FAQSection title="" items={faqs} background="#FBFBFD" compact />

        <div className="container" style={{ maxWidth: '780px', paddingBottom: '72px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setDemoModalOpen(true)} className="btn-apple-blue" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              Get My Free 3D Demo
            </button>
            <Link href="/blog" className="btn-apple-secondary" style={{ padding: '12px 22px', fontSize: '14.5px', color: '#1D1D1F' }}>
              Read Detailed Guides →
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
