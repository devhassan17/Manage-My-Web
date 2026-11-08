import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadModal from '../components/LeadModal';

export default function Custom404() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const quickLinks = [
    { href: '/', title: 'Home', desc: 'Overview of 3D e-commerce stores & operations' },
    { href: '/experience', title: 'Interactive 3D Demo', desc: 'Walk inside our 360° virtual showroom' },
    { href: '/services/3d-virtual-stores', title: '3D Storefronts', desc: 'Custom 3D retail spaces for Shopify & WooCommerce' },
    { href: '/case-studies', title: 'Client Portfolio', desc: 'Explore 14+ global client brand websites' },
    { href: '/pricing', title: 'Pricing & Quotations', desc: 'Request a custom quotation or free 48h demo' },
    { href: '/faq', title: 'FAQ', desc: 'Answers about cost, speed, Shopify, and setup' },
    { href: '/blog', title: 'Journal', desc: 'Guides and benchmarks on 3D e-commerce' },
    { href: '/contact', title: 'Contact Us', desc: 'Get in touch with our engineering team directly' },
  ];

  return (
    <>
      <SEOHead
        title="404 — Page Not Found | ManageMyWeb"
        description="The page you are looking for doesn't exist or has moved. Explore our 3D virtual storefronts, view client case studies, or request a free 48-hour demo."
        canonicalUrl="https://www.managemyweb.co/404"
        noIndex={true}
      />

      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main style={{ paddingTop: '72px', paddingBottom: '96px', background: '#FBFBFD', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0066CC',
              marginBottom: '12px',
            }}
          >
            404 Error · Page Not Found
          </p>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 54px)',
              fontWeight: 600,
              letterSpacing: '-0.035em',
              color: '#1D1D1F',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            The page you’re looking for isn’t here.
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: '#6E6E73',
              maxWidth: '560px',
              margin: '0 auto 36px auto',
              lineHeight: 1.55,
            }}
          >
            The link you clicked may be broken, or the page may have moved. Here are the most helpful places to go:
          </p>

          {/* Quick Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <Link
              href="/"
              className="btn-apple-blue"
              style={{
                padding: '13px 26px',
                fontSize: '15px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ← Back to Home
            </Link>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="btn-apple-secondary"
              style={{
                padding: '13px 26px',
                fontSize: '15px',
                color: '#1D1D1F',
              }}
            >
              Get Free 48h 3D Demo
            </button>

            <Link
              href="/experience"
              className="apple-link"
              style={{ fontSize: '15px', marginLeft: '6px' }}
            >
              <span>Watch 3D Demo Video</span>
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          {/* Directory of Key Pages */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              borderRadius: '24px',
              padding: '36px 32px',
              textAlign: 'left',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '18px',
                letterSpacing: '-0.01em',
              }}
            >
              Explore Popular Sections
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    background: '#F5F5F7',
                    textDecoration: 'none',
                    border: '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: '#0066CC',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{item.title}</span>
                    <span aria-hidden="true" style={{ fontSize: '13px' }}>→</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#6E6E73', lineHeight: 1.45 }}>
                    {item.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />
      <LeadModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}

