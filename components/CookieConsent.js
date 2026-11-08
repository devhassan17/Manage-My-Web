import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function getClientTelemetry() {
  if (typeof window === 'undefined') return {};
  let webgl = 'WebGL 2.0 (Active)';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        webgl = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'WebGL 2.0 (Active)';
      }
    }
  } catch (e) {}

  const params = new URLSearchParams(window.location.search || '');
  return {
    referrer: document.referrer || 'Direct / Bookmark',
    screenResolution: `${window.screen?.width || 0} × ${window.screen?.height || 0}`,
    viewportSize: `${window.innerWidth || 0} × ${window.innerHeight || 0}`,
    pixelRatio: window.devicePixelRatio ? `${window.devicePixelRatio}x (Retina)` : '1x',
    colorScheme:
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'Dark Mode'
        : 'Light Mode',
    language: navigator.language || navigator.userLanguage || 'en-US',
    touchPoints: (navigator.maxTouchPoints || 0) > 0 ? 'Touchscreen' : 'Mouse / Trackpad',
    hardwareConcurrency: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} CPU Cores` : '',
    deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB RAM` : '',
    networkType: navigator.connection?.effectiveType ? navigator.connection.effectiveType.toUpperCase() : '',
    timezone: Intl?.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : '',
    webgl,
    utm: {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    },
  };
}

export default function CookieConsent() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [bannerConfig, setBannerConfig] = useState({
    enabled: true,
    bannerTitle: 'Cookie Preferences',
    bannerText: 'We use cookies for 3D previews and site analytics.',
    privacyPolicyUrl: '/privacy',
  });

  const [categories, setCategories] = useState({
    essential: true,
    analytics: true,
    marketing: true,
    functional: true,
  });

  useEffect(() => {
    // Do not show cookie banner on the Admin dashboard
    if (router.pathname.startsWith('/admin')) {
      setVisible(false);
      return;
    }

    let visitorId = localStorage.getItem('mmw_visitor_id');
    if (!visitorId) {
      visitorId = `v-${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem('mmw_visitor_id', visitorId);
    }

    const savedConsent = localStorage.getItem('mmw_cookie_consent');

    // Fetch banner config from server
    fetch('/api/cookies')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.config) {
          setBannerConfig(data.config);
          if (!savedConsent && data.config.enabled !== false) {
            setCategories({
              essential: true,
              analytics: data.config.defaultAnalytics !== false,
              marketing: data.config.defaultMarketing !== false,
              functional: data.config.defaultFunctional !== false,
            });
            setVisible(true);
          }
        } else if (!savedConsent) {
          setVisible(true);
        }
      })
      .catch(() => {
        if (!savedConsent) setVisible(true);
      });

    // If user already accepted analytics cookies, log pageview
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed?.categories?.analytics) {
          fetch('/api/cookies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventType: 'pageview',
              path: router.asPath || '/',
              visitorId,
            }),
          }).catch(() => {});
        }
      } catch (e) {
        // ignore parse error
      }
    }
  }, [router.pathname, router.asPath]);

  // Listen for custom event to reopen cookie settings from Footer
  useEffect(() => {
    const handleOpenSettings = () => {
      const savedConsent = localStorage.getItem('mmw_cookie_consent');
      if (savedConsent) {
        try {
          const parsed = JSON.parse(savedConsent);
          if (parsed?.categories) {
            setCategories({
              essential: true,
              analytics: Boolean(parsed.categories.analytics),
              marketing: Boolean(parsed.categories.marketing),
              functional: Boolean(parsed.categories.functional),
            });
          }
        } catch (e) {}
      }
      setShowCustomize(true);
      setVisible(true);
    };

    window.addEventListener('mmw:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('mmw:open-cookie-settings', handleOpenSettings);
  }, []);

  const recordDecision = async (decision, selectedCategories) => {
    const visitorId = localStorage.getItem('mmw_visitor_id') || `v-${Math.random().toString(36).substring(2, 8)}`;
    const payload = {
      decision,
      categories: selectedCategories,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('mmw_cookie_consent', JSON.stringify(payload));
    document.cookie = `mmw_cookie_consent=${encodeURIComponent(decision)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    setVisible(false);
    setShowCustomize(false);

    try {
      const telemetry = getClientTelemetry();
      await fetch('/api/cookies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'consent',
          decision,
          categories: selectedCategories,
          path: router.asPath || '/',
          visitorId,
          telemetry,
        }),
      });
    } catch (e) {
      // non-blocking
    }
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setCategories(allEnabled);
    recordDecision('accepted_all', allEnabled);
  };

  const handleEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setCategories(essentialOnly);
    recordDecision('essential_only', essentialOnly);
  };

  const handleSaveCustom = () => {
    recordDecision('custom', {
      ...categories,
      essential: true,
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie Preferences"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          maxWidth: '880px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: ' saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          border: '1px solid #D2D2D7',
          borderRadius: '20px',
          padding: '24px 28px',
          boxShadow: '0 18px 48px rgba(0, 0, 0, 0.12)',
          color: '#1D1D1F',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  letterSpacing: '-0.01em',
                }}
              >
                {bannerConfig.bannerTitle || 'Cookie & Privacy Preferences'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#424245', lineHeight: 1.55, margin: 0 }}>
              {bannerConfig.bannerText}{' '}
              <Link
                href={bannerConfig.privacyPolicyUrl || '/privacy'}
                style={{ color: '#0066CC', textDecoration: 'none', fontWeight: 500 }}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setShowCustomize(!showCustomize)}
              className="btn-apple-secondary"
              style={{ padding: '9px 16px', fontSize: '13px' }}
            >
              {showCustomize ? 'Hide Settings' : 'Customize'}
            </button>
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="btn-apple-secondary"
              style={{ padding: '9px 16px', fontSize: '13px' }}
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="btn-apple-blue"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Expandable Granular Cookie Preferences */}
        {showCustomize && (
          <div
            style={{
              marginTop: '20px',
              paddingTop: '18px',
              borderTop: '1px solid #E5E5EA',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              {/* Strictly Necessary */}
              <div
                style={{
                  background: '#F5F5F7',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #E5E5EA',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>Essential Cookies</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#6E6E73' }}>Always Active</span>
                </div>
                <p style={{ fontSize: '11.5px', color: '#6E6E73', lineHeight: 1.4, margin: 0 }}>
                  Required for core site security, form submissions, and session stability.
                </p>
              </div>

              {/* Functional / 3D WebGL */}
              <label
                style={{
                  background: '#F5F5F7',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #E5E5EA',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>3D &amp; Functional</span>
                  <input
                    type="checkbox"
                    checked={categories.functional}
                    onChange={(e) => setCategories({ ...categories, functional: e.target.checked })}
                    style={{ accentColor: '#0071E3', width: '15px', height: '15px' }}
                  />
                </div>
                <p style={{ fontSize: '11.5px', color: '#6E6E73', lineHeight: 1.4, margin: 0 }}>
                  Remembers 3D showroom lighting, audio settings, and viewport preferences.
                </p>
              </label>

              {/* Analytics */}
              <label
                style={{
                  background: '#F5F5F7',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #E5E5EA',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>Analytics &amp; Speed</span>
                  <input
                    type="checkbox"
                    checked={categories.analytics}
                    onChange={(e) => setCategories({ ...categories, analytics: e.target.checked })}
                    style={{ accentColor: '#0071E3', width: '15px', height: '15px' }}
                  />
                </div>
                <p style={{ fontSize: '11.5px', color: '#6E6E73', lineHeight: 1.4, margin: 0 }}>
                  Helps us measure page load performance, visitor flows, and popular 3D zones.
                </p>
              </label>

              {/* Marketing */}
              <label
                style={{
                  background: '#F5F5F7',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #E5E5EA',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>Attribution</span>
                  <input
                    type="checkbox"
                    checked={categories.marketing}
                    onChange={(e) => setCategories({ ...categories, marketing: e.target.checked })}
                    style={{ accentColor: '#0071E3', width: '15px', height: '15px' }}
                  />
                </div>
                <p style={{ fontSize: '11.5px', color: '#6E6E73', lineHeight: 1.4, margin: 0 }}>
                  Tracks 60-day onboarding campaign codes and referral attribution.
                </p>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="btn-apple-dark"
                style={{ padding: '8px 18px', fontSize: '12.5px' }}
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

