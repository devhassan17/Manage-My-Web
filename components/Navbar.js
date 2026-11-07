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
    { label: '3D Stores', href: '/services/3d-virtual-stores' },
    { label: 'Web Ops', href: '/services/web-management' },
    { label: 'Live Demo ↗', href: 'https://crazy-3d-website-idea.vercel.app/', external: true },
    { label: 'Clients', href: '/case-studies' },
    { label: 'Quotation', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const waRaw = '923174075023';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like to discuss a 3D store demo or quotation.'
  )}`;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(251, 251, 253, 0.88)' : 'rgba(251, 251, 253, 0.82)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <nav
        className="container-wide"
        style={{
          maxWidth: '1120px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Minimal Apple-Style Wordmark */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#1D1D1F',
            whiteSpace: 'nowrap',
            flexShrink: 0,
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
              whiteSpace: 'nowrap',
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
            gap: '22px',
            whiteSpace: 'nowrap',
          }}
          className="desktop-nav-menu"
        >
          {navLinks.map((link) => {
            const isActive =
              !link.external &&
              (router.pathname === link.href ||
                (link.href !== '/' && router.pathname.startsWith(link.href)));
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                style={{
                  textDecoration: 'none',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#1D1D1F' : '#424245',
                  opacity: isActive ? 1 : 0.88,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease, opacity 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = isActive ? '#1D1D1F' : '#424245';
                  e.currentTarget.style.opacity = isActive ? '1' : '0.88';
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <Link
            href="/pricing"
            style={{
              fontSize: '12px',
              color: '#1D1D1F',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '6px 13px',
              borderRadius: '980px',
              border: '1px solid #D2D2D7',
              whiteSpace: 'nowrap',
            }}
            className="desktop-only-link"
          >
            Get Quote
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
              whiteSpace: 'nowrap',
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
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
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
              Free 3D Demo / Quote
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-secondary"
              style={{ width: '100%', textAlign: 'center' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .desktop-only-link {
          display: none;
        }
        @media (min-width: 900px) {
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
