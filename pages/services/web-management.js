import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import FAQSection from '../../components/FAQSection';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function WebManagement() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const faqs = [
    {
      q: 'What does Managed Website Operations include?',
      a: 'Our ongoing engineering support plan covers cloud hosting setup and monitoring, domain and DNS care, SSL renewal checks, SPF/DKIM/DMARC email configuration, off-site security backups, mobile speed hygiene, and routine storefront edits.',
    },
    {
      q: 'Can we hire you for website management without ordering a 3D store?',
      a: 'Yes. Managed Website Operations is offered as a dedicated service for existing Shopify, WooCommerce, and custom e-commerce websites.',
    },
    {
      q: 'Do we keep ownership of our domain and site assets?',
      a: 'Yes. All domain registrations, source files, customer databases, and third-party accounts remain owned by your business.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Managed Website Operations & E-Commerce Support | ManageMyWeb"
        description="Technical website management for e-commerce brands: hosting, DNS, monitoring, security, updates and ongoing optimization. Discuss a custom support plan."
        keywords="managed website operations, ecommerce website maintenance, technical website support, managed cloud hosting, WordPress and Shopify maintenance"
        canonicalUrl="https://www.managemyweb.co/services/web-management"
        showBreadcrumbs={true}
        schemaData={{
          '@type': 'Service',
          name: 'Managed Website Operations & E-Commerce Support',
          serviceType: 'Website Management & Support',
          provider: { '@id': 'https://www.managemyweb.co/#organization' },
          areaServed: 'Worldwide',
          description:
            'Ongoing technical website operations for online stores: cloud hosting, DNS, email deliverability, security backups, speed hygiene, and routine updates.',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '40px', background: '#FBFBFD' }}>
        <div className="container" style={{ paddingBottom: '72px' }}>
          <Breadcrumbs path="/services/web-management" currentLabel="Managed Website Operations" />

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Ongoing Website Support
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
              Managed Website Operations &amp; E-Commerce Support
            </h1>
            <p style={{ color: '#424245', fontSize: '16.5px', lineHeight: 1.55, marginBottom: '22px' }}>
              Keep your online store healthy without wrestling with broken DNS changes, slow plugins, or unreliable freelancers. Our team manages your hosting, backups, email setup, and day-to-day updates.
            </p>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="btn-apple-blue"
              style={{ padding: '12px 24px', fontSize: '14.5px' }}
            >
              Discuss a Custom Support Plan
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
                title: 'Cloud Hosting & Edge Caching',
                desc: 'Modern CDN caching and clean hosting setup so visitors worldwide experience responsive page loads without server bottlenecks.',
              },
              {
                num: '02',
                title: 'Domain, DNS & SSL Hygiene',
                desc: 'Clean tracking of DNS records, domain renewals, and HTTPS SSL certificates so avoidable outages never catch you off guard.',
              },
              {
                num: '03',
                title: 'Business Email Configuration',
                desc: 'Proper SPF, DKIM, and DMARC records on Zoho or Google Workspace to strengthen inbox placement for receipts and customer replies.',
              },
              {
                num: '04',
                title: 'Off-Site Backups & Uptime Checks',
                desc: 'Regular off-site backups paired with active uptime monitoring and security patches across themes, plugins, or apps.',
              },
              {
                num: '05',
                title: 'Routine Storefront Updates',
                desc: 'Fast execution of promotional banners, collection swaps, copy updates, and landing-page tweaks through direct team communication.',
              },
              {
                num: '06',
                title: 'Speed & Technical SEO Hygiene',
                desc: 'Ongoing image compression, leftover script audits, sitemap checks, and clean structured metadata.',
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
              Built to protect existing SEO and revenue during updates
            </h2>
            <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.6, marginBottom: '18px' }}>
              Small technical mistakes—blocking robots by accident, breaking mobile layouts with oversized images, or updating incompatible plugins directly in production—cost stores organic visibility and sales. We test updates cleanly and monitor core health every month.
            </p>
            <Link href="/blog/monthly-website-maintenance-checklist" className="apple-link" style={{ fontSize: '14.5px' }}>
              Read our complete website maintenance checklist →
            </Link>
          </div>
        </div>

        <FAQSection title="Website Operations Questions" items={faqs} background="#F5F5F7" />
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} initialMode="quotation" initialPackage="Managed Web Concierge" />
    </>
  );
}
