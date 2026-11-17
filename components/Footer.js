import Link from 'next/link';
import { usePublicContact } from '../utils/usePublicConfig';

export default function Footer({ onOpenDemoModal }) {
  const currentYear = new Date().getFullYear();
  const { contactInfo, waRaw } = usePublicContact();
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like a free 3D store demo or quote.'
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
              Want to see your real store in 3D?
            </h3>
            <p style={{ color: '#6E6E73', fontSize: '14.5px' }}>
              Send us your store link for a free 48-hour 3D preview—no commitment required.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenDemoModal}
              className="btn-apple-blue"
              style={{ padding: '11px 22px', fontSize: '14px' }}
            >
              Get Free 3D Demo
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-secondary"
              style={{ padding: '11px 20px', fontSize: '14px', color: '#1D1D1F' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Directory Links (Strong Internal SEO Link Graph) */}
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
              Custom 3D online stores &amp; full monthly website care.
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
              3D Online Stores
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/services/3d-virtual-stores" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Virtual Stores
                </Link>
              </li>
              <li>
                <Link href="/shopify-3d-store" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Store for Shopify
                </Link>
              </li>
              <li>
                <Link href="/woocommerce-3d-store" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Store for WooCommerce
                </Link>
              </li>
              <li>
                <Link href="/3d-store-examples" style={{ color: '#424245', textDecoration: 'none' }}>
                  3D Store Examples
                </Link>
              </li>
              <li>
                <Link href="/experience" style={{ color: '#424245', textDecoration: 'none' }}>
                  Live 3D Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Website Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/services" style={{ color: '#424245', textDecoration: 'none' }}>
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services/web-management" style={{ color: '#424245', textDecoration: 'none' }}>
                  Website Hosting &amp; Care
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-growth" style={{ color: '#424245', textDecoration: 'none' }}>
                  Speed &amp; Sales Growth
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: '#424245', textDecoration: 'none' }}>
                  Pricing &amp; Free Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Resources &amp; Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <Link href="/case-studies" style={{ color: '#424245', textDecoration: 'none' }}>
                  Client Websites
                </Link>
              </li>
              <li>
                <Link href="/blog" style={{ color: '#424245', textDecoration: 'none' }}>
                  Guides &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: '#424245', textDecoration: 'none' }}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#424245', textDecoration: 'none' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#424245', textDecoration: 'none' }}>
                  Contact Us
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
