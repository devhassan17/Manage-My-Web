import { useState } from 'react';

export default function VirtualCoffeeStore3D({ onOpenContact, isFullscreen = false }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const demoUrl = 'https://crazy-3d-website-idea.vercel.app/';

  if (isFullscreen) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#1D1D1F',
        }}
      >
        {!iframeLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F5F5F7',
              color: '#1D1D1F',
              zIndex: 5,
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                border: '2px solid #D2D2D7',
                borderTopColor: '#1D1D1F',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#6E6E73' }}>
              Loading 3D Storefront...
            </span>
          </div>
        )}

        <iframe
          src={demoUrl}
          title="Interactive 3D E-Commerce Storefront Preview"
          onLoad={() => setIframeLoaded(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid #D2D2D7',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
        background: '#FFFFFF',
        textAlign: 'left',
      }}
    >
      {/* Studio Window Header */}
      <div
        style={{
          background: '#F5F5F7',
          borderBottom: '1px solid #D2D2D7',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1D7D3F', display: 'inline-block' }} />
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>
              Live 3D Store Demo
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              color: '#1D1D1F',
              padding: '5px 12px',
              borderRadius: '980px',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Fullscreen ↗
          </a>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="btn-apple-blue"
              style={{ padding: '5px 13px', fontSize: '12px' }}
            >
              Build My 3D Store
            </button>
          )}
        </div>
      </div>

      {/* Live 3D Embed */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '620px',
          background: '#1D1D1F',
        }}
      >
        {!iframeLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F5F5F7',
              color: '#1D1D1F',
              zIndex: 5,
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                border: '2px solid #D2D2D7',
                borderTopColor: '#1D1D1F',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#6E6E73' }}>
              Loading 3D Storefront...
            </span>
          </div>
        )}

        <iframe
          src={demoUrl}
          title="Interactive 3D E-Commerce Storefront Preview"
          onLoad={() => setIframeLoaded(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />
      </div>

      {/* Minimal Bottom Bar */}
      <div
        style={{
          background: '#F5F5F7',
          borderTop: '1px solid #D2D2D7',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12px',
          color: '#6E6E73',
        }}
      >
        <span>Custom-built for Fashion, Beauty, Electronics, Luxury, Home &amp; Food brands</span>
        <span style={{ color: '#1D1D1F', fontWeight: 500 }}>Shopify &amp; WooCommerce Sync</span>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
