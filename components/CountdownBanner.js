import { useState, useEffect } from 'react';

export default function CountdownBanner({ onClaimDemo }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 59,
    hours: 23,
    minutes: 42,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storageKey = 'managemyweb_promo_deadline_v1';
    let targetTime;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      targetTime = parseInt(stored, 10);
    } else {
      targetTime = Date.now() + 60 * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#F5F5F7',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        fontSize: '12px',
        color: '#1D1D1F',
        position: 'relative',
        zIndex: 90,
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: '9px',
          paddingBottom: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px 16px',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#1D1D1F' }}>
          <strong style={{ fontWeight: 600 }}>Q4 Studio Onboarding:</strong> We build a complimentary 3D store prototype for qualified brands before you commit to a build.
        </span>

        <span
          style={{
            color: '#6E6E73',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          Window closes in {mounted ? `${timeLeft.days}d ${timeLeft.hours}h` : '59d 23h'}
        </span>

        <button
          onClick={onClaimDemo}
          style={{
            background: 'none',
            border: 'none',
            color: '#0066CC',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          <span>Request your prototype</span>
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
