import React from 'react';

export default function VirtualCoffeeStore3D({ onOpenContact, isFullscreen = false }) {
  const demoUrl = 'https://crazy-3d-website-idea.vercel.app/';
  const videoSrc = '/videos/3d-store-preview.mp4';

  if (isFullscreen) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#1D1D1F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          controls
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 50,
          }}
        >
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-apple-blue"
            style={{
              padding: '10px 20px',
              fontSize: '13.5px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
            }}
          >
            Open Live Interactive 3D Website ↗
          </a>
        </div>
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
          padding: '11px 18px',
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
              3D Storefront Walkthrough Preview
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1D1D1F',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '980px',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Open Live 3D Website in New Tab</span>
            <span aria-hidden="true">↗</span>
          </a>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="btn-apple-blue"
              style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              Build My 3D Store
            </button>
          )}
        </div>
      </div>

      {/* Fast Native MP4 Video Showcase */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: '#000000',
          lineHeight: 0,
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          controls
          style={{
            width: '100%',
            maxHeight: '620px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Minimal Bottom Bar with Direct New-Tab Link */}
      <div
        style={{
          background: '#F5F5F7',
          borderTop: '1px solid #D2D2D7',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12.5px',
          color: '#6E6E73',
        }}
      >
        <span>Custom-built for Fashion, Beauty, Electronics, Luxury, Home &amp; Food brands</span>
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#0066CC',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Try Interactive 3D Demo in New Tab ↗
        </a>
      </div>
    </div>
  );
}
