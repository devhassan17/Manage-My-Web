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
        title="Interactive 3D Flagship Storefront Demo | ManageMyWeb"
        description="Explore our live 3D e-commerce storefront demo. Walk around in 360°, inspect products on the shelves, test express checkout, and request a custom 3D prototype for your brand."
        keywords="interactive 3D store demo, live 3D ecommerce showroom, 360 virtual store walkthrough, WebGL retail demo, Three.js online store example, ManageMyWeb demo"
        canonicalUrl="https://managemyweb.co/experience"
        ogImage="/images/spatial_devices_preview.jpg"
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
