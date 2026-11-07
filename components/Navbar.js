import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar({ onOpenDemoModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Storefronts', href: '/services/3d-virtual-stores' },
    { label: 'Web Management', href: '/services/web-management' },
    { label: 'Interactive Demo', href: '/experience' },
    { label: 'Client Results', href: '/case-studies' },
    { label: 'Get Quotation', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/blog' },
  ];

  const waRaw = '923174075023';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like to discuss a complimentary 3D store prototype for our brand.'
  )}`;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(251, 251, 253, 0.86)' : 'rgba(251, 251, 253, 0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <nav
        className="container"
        style={{
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Minimal Apple-Style Wordmark */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            textDecoration: 'none',
            color: '#1D1D1F',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="#1D1D1F" />
            <path
              d="M6.5 16.5V8.5L12 12.5L17.5 8.5V16.5"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontWeight: 600,
              fontSize: '15px',
              letterSpacing: '-0.02em',
              color: '#1D1D1F',
            }}
          >
            ManageMyWeb
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '26px',
          }}
          className="desktop-nav-menu"
        >
          {navLinks.map((link) => {
            const isActive =
              router.pathname === link.href ||
              (link.href !== '/' && router.pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? '#1D1D1F' : '#424245',
                  opacity: isActive ? 1 : 0.85,
                  transition: 'color 0.15s ease, opacity 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = isActive ? '#1D1D1F' : '#424245';
                  e.currentTarget.style.opacity = isActive ? '1' : '0.85';
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/pricing"
            style={{
              fontSize: '12px',
              color: '#1D1D1F',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: '980px',
              border: '1px solid #D2D2D7',
            }}
            className="desktop-only-link"
          >
            Request Quotation
          </Link>

          <button
            onClick={onOpenDemoModal}
            style={{
              background: '#0071E3',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: '980px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#0077ED')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#0071E3')}
          >
            Free 3D Demo
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              background: 'transparent',
              border: 'none',
              padding: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1D1D1F',
              cursor: 'pointer',
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3l12 12M15 3L3 15" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5.5h14M2 12.5h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#FBFBFD',
            borderBottom: '1px solid #D2D2D7',
            padding: '16px 24px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#1D1D1F',
                fontSize: '16px',
                fontWeight: 500,
                padding: '10px 0',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDemoModal) onOpenDemoModal();
              }}
              className="btn-apple-blue"
              style={{ width: '100%' }}
            >
              Request Complimentary Prototype
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-secondary"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Message Studio on WhatsApp
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .desktop-only-link {
          display: none;
        }
        @media (min-width: 920px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .desktop-only-link {
            display: inline-block;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
