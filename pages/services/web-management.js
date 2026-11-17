import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import FAQSection from '../../components/FAQSection';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function WebManagement() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'What does monthly website management include?',
      a: 'We take over cloud hosting, domain renewals, DNS updates, SSL certificates, business email setup (SPF/DKIM/DMARC), mobile speed fixes, daily off-site backups, and same-day site edits whenever you message us on WhatsApp.',
    },
    {
      q: 'Can you manage my website even if it is not 3D?',
      a: 'Yes! We manage standard Shopify stores, WordPress/WooCommerce sites, and custom web apps.',
    },
    {
      q: 'How fast do you make edits when I message you?',
      a: 'Most small changes—new sale banners, text edits, adding products, fixing bugs—are completed the very same day.',
    },
    {
      q: 'Will I still own my domain name and website files?',
      a: '100% yes. Your domain, code, store database, and email accounts always stay registered in your company name.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Monthly Website Management, Cloud Hosting & Care | ManageMyWeb"
        description="Stop wrestling with slow hosting, broken DNS, spam email issues, or waiting weeks on freelancers. We manage your hosting, backups, speed, and daily website edits."
        keywords="website management service, monthly website maintenance, managed cloud hosting, WordPress speed optimization, DNS and DMARC setup, same day website updates"
        canonicalUrl="https://www.managemyweb.co/services/web-management"
        schemaData={[
          {
            '@type': 'Service',
            name: 'Monthly Website Management & Cloud Hosting',
            serviceType: 'Website Maintenance & Hosting',
            provider: { '@id': 'https://www.managemyweb.co/#organization' },
            areaServed: 'Worldwide',
            description:
              'Full-service monthly website hosting, speed optimization, DNS & email authentication, security backups, and same-day edits over WhatsApp.',
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
        <div className="container" style={{ paddingBottom: '72px' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Website Management &amp; Hosting
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '12px',
              }}
            >
              We run your website tech so you can run your business.
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Stop chasing unreliable freelancers or worrying about broken updates. Send one WhatsApp message for any edit while we keep your site fast, backed up, and online 24/7.
            </p>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="btn-apple-blue"
              style={{ padding: '12px 24px', fontSize: '14.5px' }}
            >
              Ask for a Monthly Care Quote
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '18px',
              marginBottom: '48px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Fast Global Cloud Hosting',
                desc: 'We host your site on fast edge servers with global CDN caching so shoppers worldwide load pages in under a second.',
              },
              {
                num: '02',
                title: 'Domain, DNS & SSL Renewal Care',
                desc: 'Never worry about broken records, expired SSL security warnings, or losing track of where your domain is registered.',
              },
              {
                num: '03',
                title: 'Business Email That Hits Inboxes',
                desc: 'Proper SPF, DKIM, and DMARC setup on Zoho or Google Workspace so receipts and sales quotes never land in spam.',
              },
              {
                num: '04',
                title: 'Daily Off-Site Backups & Uptime Watch',
                desc: 'Every day your site is backed up off-site, protected behind a firewall, and watched 24/7 for uptime.',
              },
              {
                num: '05',
                title: 'Same-Day Edits on WhatsApp',
                desc: 'Need a holiday sale banner, new product added, or pricing updated? Message our engineers on WhatsApp and it gets done today.',
              },
              {
                num: '06',
                title: 'Speed & Google SEO Health',
                desc: 'We fix heavy images, clean out leftover plugin code, update sitemaps, and keep Google Core Web Vitals green.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="apple-card"
                style={{ padding: '26px', borderRadius: '18px', background: '#FFFFFF' }}
              >
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0066CC', marginBottom: '8px' }}>
                  {card.num}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  {card.title}
                </h2>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.55 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: '20px', padding: '32px', maxWidth: '880px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px' }}>
              What happens when you send us a WhatsApp message?
            </h2>
            <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.6, marginBottom: '18px' }}>
              No ticketing portals or 5-day support waits. Whether you need a new landing page for Friday ads, a broken checkout script fixed immediately, or a quick swap of holiday photos, you message the exact engineers running your site.
            </p>
            <Link href="/blog/monthly-website-maintenance-checklist" className="apple-link" style={{ fontSize: '14.5px' }}>
              Read our complete monthly website maintenance checklist →
            </Link>
          </div>
        </div>

        <FAQSection title="Website Management Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} initialMode="quotation" initialPackage="Managed Web Concierge" />
    </>
  );
}
