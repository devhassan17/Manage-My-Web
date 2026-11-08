import { useState } from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import VirtualCoffeeStore3D from '../components/VirtualCoffeeStore3D';
import LeadModal from '../components/LeadModal';

export default function ExperiencePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="Interactive 3D E-Commerce Storefront Demo & Video Walkthrough | ManageMyWeb"
        description="Watch our 30-second voiceover explainer or open the live 3D e-commerce storefront demo. Walk around in 360°, inspect products on the shelves, test express checkout, and request a free 48-hour 3D demo."
        keywords="interactive 3D store demo, live 3D ecommerce showroom, 360 virtual store walkthrough, WebGL retail demo, Three.js online store example, ManageMyWeb demo"
        canonicalUrl="https://www.managemyweb.co/experience"
        schemaData={{
          '@type': 'VideoObject',
          name: '30-Second 3D E-Commerce Storefront Walkthrough & Voiceover Explainer',
          description:
            'See how customers walk inside a 3D online store on their phone or laptop, click products on the shelves, add to bag, and pay in one tap.',
          thumbnailUrl: ['https://www.managemyweb.co/images/og-cover.png'],
          uploadDate: '2026-11-08T00:00:00+00:00',
          duration: 'PT30S',
          contentUrl: 'https://www.managemyweb.co/videos/3d-store-preview.mp4',
          embedUrl: 'https://www.managemyweb.co/experience',
        }}
      />

      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#1D1D1F' }}>
        <VirtualCoffeeStore3D
          isFullscreen={true}
          onOpenContact={() => setDemoModalOpen(true)}
        />

        {/* Floating Minimal Exit / Action Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '980px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'saturate(180%) blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: '#1D1D1F',
              textDecoration: 'none',
            }}
          >
            ← Back to ManageMyWeb
          </Link>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="btn-apple-blue"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
            }}
          >
            Build a 3D Store for Your Brand
          </button>
        </div>
      </div>

      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCategory="Fashion, Apparel & Footwear"
      />
    </>
  );
}
