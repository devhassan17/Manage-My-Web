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
        title="Interactive 3D Flagship Roastery | ManageMyWeb"
        description="Explore our interactive 3D retail storefront. Inspect product shelving, test one-tap bar checkout, view provenance displays, and visit the dispatch desk."
        canonicalUrl="https://managemyweb.co/experience"
      />

      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#EBE9E4' }}>
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
          }}
        >
          <Link
            href="/"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '980px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'saturate(180%) blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: '#1D1D1F',
              textDecoration: 'none',
            }}
          >
            ← Back to Overview
          </Link>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="btn-apple-blue"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
            }}
          >
            Request Prototype for Your Brand
          </button>
        </div>
      </div>

      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCategory="Specialty Coffee & Roastery"
      />
    </>
  );
}
