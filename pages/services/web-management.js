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

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Managed Web Operations
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '18px',
              }}
            >
              We run your web infrastructure so you can run your business.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.55 }}>
              Hosting, DNS records, domain renewals, SSL certificates, email authentication, speed tuning, and daily content edits—handled by senior engineers under a single predictable monthly retainer.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Global Edge Cloud Hosting',
                desc: 'We migrate and host your storefront on NVMe edge infrastructure with HTTP/3 and global CDN caching for sub-second load times.',
              },
              {
                num: '02',
                title: 'DNS & Domain Stewardship',
                desc: 'Complete management of A records, CNAMEs, TXT verifications, SSL certificates, and domain renewals with zero downtime.',
              },
              {
                num: '03',
                title: 'Business Email Deliverability',
                desc: 'Google Workspace and custom SMTP configuration with strict DKIM, SPF, and DMARC policies so your emails reach the primary inbox.',
              },
              {
                num: '04',
                title: 'Security & Daily Backups',
                desc: 'Automated off-site daily backups, web application firewall protection, DDoS mitigation, and continuous uptime monitoring.',
              },
              {
                num: '05',
                title: 'Same-Day Content & Product Edits',
                desc: 'Need a seasonal banner, pricing update, or new product launch? Send a quick message on WhatsApp and we publish it the same day.',
              },
              {
                num: '06',
                title: 'Core Web Vitals & SEO Hygiene',
                desc: 'Ongoing image optimization, clean semantic markup, and performance audits to maintain 95+ Lighthouse scores.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="apple-card"
                style={{ padding: '36px', borderRadius: '20px', background: '#FFFFFF' }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', marginBottom: '12px' }}>
                  {card.num}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '14.5px', lineHeight: 1.6 }}>{card.desc}</p>
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
