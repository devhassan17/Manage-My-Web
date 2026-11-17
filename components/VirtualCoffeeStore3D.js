import React, { useRef, useState, useEffect } from 'react';

export default function VirtualCoffeeStore3D({ onOpenContact, isFullscreen = false }) {
  const demoUrl = 'https://crazy-3d-website-idea.vercel.app/';
  const videoSrc = '/videos/3d-store-preview.mp4';
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      if (videoRef.current) videoRef.current.pause();
    }
  }, []);

  const toggleAudio = () => {
    if (!videoRef.current) return;
    if (staticFallback) setStaticFallback(false);
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    if (!nextMuted) {
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch(() => {});
    }
    setIsMuted(nextMuted);
  };

  const toggleStaticMode = () => {
    const nextStatic = !staticFallback;
    setStaticFallback(nextStatic);
    if (nextStatic && videoRef.current) {
      videoRef.current.pause();
    } else if (!nextStatic && videoRef.current && !reducedMotion) {
      videoRef.current.play().catch(() => {});
    }
  };

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
        {staticFallback ? (
          <img
            src="/images/og-cover.png"
            alt="Preview of an interactive 3D e-commerce showroom showing product shelves and checkout counter"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/images/og-cover.png"
            preload="metadata"
            autoPlay={!reducedMotion}
            loop={!reducedMotion}
            muted={isMuted}
            playsInline
            controls
            aria-label="30-second video demo of walking through an interactive 3D online store"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 50,
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={toggleStaticMode}
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              color: '#1D1D1F',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '980px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {staticFallback ? 'Play Video Walkthrough' : 'Static Preview Mode'}
          </button>

          {!staticFallback && (
            <button
              type="button"
              onClick={toggleAudio}
              style={{
                background: isMuted ? '#0066CC' : '#1D1D1F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '980px',
                padding: '10px 18px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
              }}
            >
              {isMuted ? 'Turn On Audio' : 'Mute Audio'}
            </button>
          )}

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
            Open Interactive 3D Demo ↗
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} aria-hidden="true">
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1D7D3F', display: 'inline-block' }} aria-hidden="true" />
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>
              30-Second 3D Storefront Walkthrough
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={toggleStaticMode}
            style={{
              background: '#FFFFFF',
              color: '#424245',
              border: '1px solid #D2D2D7',
              padding: '6px 12px',
              borderRadius: '980px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {staticFallback ? 'Show Video' : 'Low-Power Preview'}
          </button>

          {!staticFallback && (
            <button
              type="button"
              onClick={toggleAudio}
              style={{
                background: isMuted ? '#E8F0FE' : '#E8F5E9',
                color: isMuted ? '#0066CC' : '#1D7D3F',
                border: isMuted ? '1px solid #B8D4FE' : '1px solid #B7E1CD',
                padding: '6px 14px',
                borderRadius: '980px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isMuted ? 'Turn On Audio' : 'Mute Audio'}
            </button>
          )}

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
            <span>Open Live Interactive 3D Store</span>
            <span aria-hidden="true">↗</span>
          </a>

          {onOpenContact && (
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-apple-blue"
              style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              Request Free 3D Demo
            </button>
          )}
        </div>
      </div>

      {/* Video or Low-Power Static Preview */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: '#000000',
          lineHeight: 0,
        }}
      >
        {staticFallback ? (
          <img
            src="/images/og-cover.png"
            alt="Static preview of a browser-based 3D virtual storefront showing walkable aisles, product shelves, and checkout counter"
            width={1200}
            height={630}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              maxHeight: '620px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/images/og-cover.png"
            preload="metadata"
            autoPlay={!reducedMotion}
            loop={!reducedMotion}
            muted={isMuted}
            playsInline
            controls
            aria-label="30-second explainer showing how shoppers walk through a 3D online store"
            width={1280}
            height={720}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              maxHeight: '620px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* Readable HTML Summary Below Frame (Accessible + Crawler Friendly) */}
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
          color: '#424245',
        }}
      >
        <span>
          Browser-accessible 3D virtual store demo built for Shopify, WooCommerce, and custom e-commerce catalogs—works on desktop and mobile with no app required.
        </span>
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
          Open live 3D store demo in new tab ↗
        </a>
      </div>

      <noscript>
        <div style={{ padding: '14px 18px', background: '#FFFFFF', color: '#1D1D1F', fontSize: '13.5px', lineHeight: 1.5 }}>
          Interactive 3D storefront walkthrough: visitors explore virtual product shelves, inspect items, add products to their cart, and complete checkout in their web browser without installing an app.
        </div>
      </noscript>
    </div>
  );
}
