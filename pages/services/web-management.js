import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import CountdownBanner from '../../components/CountdownBanner';
import Navbar from '../../components/Navbar';
import LeadModal from '../../components/LeadModal';
import Footer from '../../components/Footer';

export default function WebManagement() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="Managed Web Operations, Cloud Hosting & Technical Stewardship | ManageMyWeb"
        description="Hand off your cloud edge hosting, domains, DNS records, DMARC/SPF email deliverability, Core Web Vitals optimization, and daily website updates to a dedicated engineering team."
        keywords="managed web operations, ecommerce website management service, managed cloud hosting, Core Web Vitals optimization, DNS and DMARC management, website maintenance retainer"
        canonicalUrl="https://managemyweb.co/services/web-management"
        schemaData={{
          '@type': 'Service',
          name: 'Managed Web Operations & Cloud Infrastructure',
          serviceType: 'Website Management & Cloud Hosting',
          provider: {
            '@type': 'Organization',
            name: 'ManageMyWeb',
            url: 'https://managemyweb.co',
          },
          areaServed: 'Worldwide',
        }}
      />

      <CountdownBanner onClaimDemo={() => setDemoModalOpen(true)} />
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Managed Web Operations
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
              We run your website so you can run your business.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.45 }}>
              Hosting, DNS, speed, security, and daily edits handled by senior engineers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '18px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Global Edge Cloud Hosting',
                desc: 'Sub-second load times on NVMe edge infrastructure with global CDN caching.',
              },
              {
                num: '02',
                title: 'DNS & Domain Management',
                desc: 'Zero-downtime management of DNS records, SSL certificates, and renewals.',
              },
              {
                num: '03',
                title: 'Email Deliverability',
                desc: 'Full DKIM, SPF, and DMARC authentication so your emails never land in spam.',
              },
              {
                num: '04',
                title: 'Security & Daily Backups',
                desc: 'Automated off-site backups, firewall protection, and 24/7 uptime monitoring.',
              },
              {
                num: '05',
                title: 'Same-Day WhatsApp Edits',
                desc: 'Message us on WhatsApp for seasonal banners, new products, or copy updates.',
              },
              {
                num: '06',
                title: 'Speed & SEO Hygiene',
                desc: 'Continuous Core Web Vitals tuning for 95+ Google Lighthouse scores.',
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
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
