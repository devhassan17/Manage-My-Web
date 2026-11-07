import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer({ onOpenDemoModal }) {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState({
    whatsappNumber: '+92 317 4075023',
    supportEmail: 'sales@managemyweb.co',
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.contact) {
          setContactInfo({
            whatsappNumber: data.contact.whatsappNumber || '+92 317 4075023',
            supportEmail: data.contact.supportEmail || 'sales@managemyweb.co',
          });
        }
      })
      .catch(() => {});
  }, []);

  const waRaw = (contactInfo.whatsappNumber || '923174075023').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like to discuss a 3D store prototype and managed web operations.'
  )}`;

  return (
    <footer
      style={{
        background: '#F5F5F7',
        borderTop: '1px solid #D2D2D7',
        color: '#6E6E73',
        fontSize: '12px',
        lineHeight: 1.5,
      }}
    >
      {/* Pre-Footer Consultative Sales Callout */}
      <div
        style={{
          borderBottom: '1px solid #D2D2D7',
          padding: '72px 0',
          background: '#FFFFFF',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#6E6E73',
                marginBottom: '8px',
              }}
            >
              Complimentary Prototype Program
            </p>
            <h3
              style={{
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 600,
                color: '#1D1D1F',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              See your products inside a 3D store before spending a dollar.
            </h3>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.5 }}>
              Share your store URL during our 60-day onboarding window. Our engineers will build a working, interactive 3D walkthrough of your storefront in 48 hours—with zero obligation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenDemoModal}
              className="btn-apple-blue"
              style={{ padding: '13px 26px', fontSize: '15px' }}
            >
              Request Free Prototype
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-secondary"
              style={{ padding: '13px 24px', fontSize: '15px', color: '#1D1D1F' }}
            >
              Speak with an Engineer
            </a>
          </div>
        </div>
      </div>

      {/* Apple-Style Multi-Column Directory */}
      <div className="container" style={{ paddingTop: '44px', paddingBottom: '36px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
            paddingBottom: '36px',
            borderBottom: '1px solid #D2D2D7',
          }}
        >
          {/* Column 1 */}
          <div>
            <div style={{ fontWeight: 600, color: '#1D1D1F', marginBottom: '10px', fontSize: '12px' }}>
              ManageMyWeb
            </div>
            <p style={{ color: '#6E6E73', fontSize: '12px', lineHeight: 1.6, marginBottom: '14px' }}>
              Bespoke 3D retail storefronts and end-to-end web operations for modern commerce brands.
            </p>
            <div style={{ color: '#1D1D1F', fontWeight: 500, fontSize: '12px', marginBottom: '4px' }}>
              WhatsApp: {contactInfo.whatsappNumber}
            </div>
            <div style={{ color: '#424245', fontSize: '12px' }}>
              <a href={`mailto:${contactInfo.supportEmail}`} style={{ color: '#0066CC', textDecoration: 'none' }}>
                {contactInfo.supportEmail}
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
              Spatial Storefronts
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link href="/services/3d-virtual-stores" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Virtual Store Architecture
                </Link>
              </li>
              <li>
                <Link href="/experience" style={{ color: '#424245', textDecoration: 'none' }}>
                  Interactive Showroom Demo
                </Link>
              </li>
              <li>
                <Link href="/services/3d-virtual-stores#interactive-shelves" style={{ color: '#424245', textDecoration: 'none' }}>
                  Product Shelving Systems
                </Link>
              </li>
              <li>
                <Link href="/services/3d-virtual-stores#spatial-checkout" style={{ color: '#424245', textDecoration: 'none' }}>
                  Express Bar Checkout
                </Link>
              </li>
              <li>
                <Link href="/services/3d-virtual-stores#fairchain-story" style={{ color: '#424245', textDecoration: 'none' }}>
                  Provenance & Impact Displays
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
              Web Operations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link href="/services" style={{ color: '#424245', textDecoration: 'none' }}>
                  All Studio Capabilities
                </Link>
              </li>
              <li>
                <Link href="/services/web-management" style={{ color: '#424245', textDecoration: 'none' }}>
                  Managed Hosting & DNS
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-growth" style={{ color: '#424245', textDecoration: 'none' }}>
                  Conversion Engineering
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: '#424245', textDecoration: 'none' }}>
                  Pricing & Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link href="/case-studies" style={{ color: '#424245', textDecoration: 'none' }}>
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#424245', textDecoration: 'none' }}>
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/blog" style={{ color: '#424245', textDecoration: 'none' }}>
                  Editorial Journal
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: '#424245', textDecoration: 'none' }}>
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#424245', textDecoration: 'none' }}>
                  Contact Sales
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: '#6E6E73', textDecoration: 'none' }}>
                  Studio Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div
          style={{
            paddingTop: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            color: '#6E6E73',
          }}
        >
          <div>
            Copyright © {currentYear} ManageMyWeb Studio Inc. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ color: '#424245', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <span style={{ color: '#D2D2D7' }}>|</span>
            <Link href="/terms" style={{ color: '#424245', textDecoration: 'none' }}>
              Terms of Use
            </Link>
            <span style={{ color: '#D2D2D7' }}>|</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('mmw:open-cookie-settings'));
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#424245',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cookie Preferences
            </button>
            <span style={{ color: '#D2D2D7' }}>|</span>
            <Link href="/sitemap.xml" style={{ color: '#424245', textDecoration: 'none' }}>
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
