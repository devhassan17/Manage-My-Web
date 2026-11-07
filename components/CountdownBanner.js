import { useState, useEffect } from 'react';

export default function CountdownBanner({ onClaimDemo }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 59,
    hours: 23,
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
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        });
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
          paddingTop: '8px',
          paddingBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '6px 14px',
          textAlign: 'center',
        }}
      >
        <span>
          <strong style={{ fontWeight: 600 }}>Free 48h 3D Demo:</strong> Preview your store in 3D before you invest.
        </span>

        <span style={{ color: '#6E6E73', fontVariantNumeric: 'tabular-nums' }}>
          {mounted ? `${timeLeft.days}d ${timeLeft.hours}h left` : '59d 23h left'}
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
          }}
        >
          Claim Free Demo ›
        </button>
      </div>
    </div>
  );
}
