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
    'Hello ManageMyWeb team, I would like to discuss a 3D store demo and quotation.'
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
      {/* Pre-Footer CTA */}
      <div
        style={{
          borderBottom: '1px solid #D2D2D7',
          padding: '48px 0',
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
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <h3
              style={{
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 600,
                color: '#1D1D1F',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '6px',
              }}
            >
              Ready to see your store in 3D?
            </h3>
            <p style={{ color: '#6E6E73', fontSize: '14.5px' }}>
              Start with a free 48-hour 3D demo or request a custom quotation today.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenDemoModal}
              className="btn-apple-blue"
              style={{ padding: '11px 22px', fontSize: '14px' }}
            >
              Free 3D Demo / Quote
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-secondary"
              style={{ padding: '11px 20px', fontSize: '14px', color: '#1D1D1F' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="container" style={{ paddingTop: '36px', paddingBottom: '28px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '28px',
            paddingBottom: '28px',
            borderBottom: '1px solid #D2D2D7',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: '#1D1D1F', marginBottom: '6px', fontSize: '12px' }}>
              ManageMyWeb
            </div>
            <p style={{ color: '#6E6E73', fontSize: '12px', lineHeight: 1.5, marginBottom: '10px' }}>
              3D storefronts &amp; managed web operations.
            </p>
            <div style={{ color: '#1D1D1F', fontWeight: 500, fontSize: '12px', marginBottom: '2px' }}>
              WhatsApp: {contactInfo.whatsappNumber}
            </div>
            <div style={{ color: '#424245', fontSize: '12px' }}>
              <a href={`mailto:${contactInfo.supportEmail}`} style={{ color: '#0066CC', textDecoration: 'none' }}>
                {contactInfo.supportEmail}
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              3D Storefronts
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/services/3d-virtual-stores" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Virtual Stores
                </Link>
              </li>
              <li>
                <Link href="/experience" style={{ color: '#424245', textDecoration: 'none' }}>
                  Live 3D Demo
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: '#424245', textDecoration: 'none' }}>
                  Get Quotation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/services" style={{ color: '#424245', textDecoration: 'none' }}>
                  All Capabilities
                </Link>
              </li>
              <li>
                <Link href="/services/web-management" style={{ color: '#424245', textDecoration: 'none' }}>
                  Managed Hosting &amp; DNS
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-growth" style={{ color: '#424245', textDecoration: 'none' }}>
                  Conversion Engineering
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/case-studies" style={{ color: '#424245', textDecoration: 'none' }}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#424245', textDecoration: 'none' }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: '#424245', textDecoration: 'none' }}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#424245', textDecoration: 'none' }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: '#6E6E73', textDecoration: 'none' }}>
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div
          style={{
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            color: '#6E6E73',
          }}
        >
          <div>© {currentYear} ManageMyWeb. All rights reserved.</div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ color: '#424245', textDecoration: 'none' }}>
              Privacy
            </Link>
            <span style={{ color: '#D2D2D7' }}>|</span>
            <Link href="/terms" style={{ color: '#424245', textDecoration: 'none' }}>
              Terms
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
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
