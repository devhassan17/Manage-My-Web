import { useState } from 'react';

/**
 * Reusable accessible FAQ accordion section in clean Apple styling.
 */
export default function FAQSection({
  title = 'Common Questions',
  subtitle = '',
  items = [],
  background = '#FBFBFD',
  compact = false,
}) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{
        padding: compact ? '56px 0' : '72px 0',
        background,
        borderTop: '1px solid #E5E5EA',
      }}
    >
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.4vw, 36px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#1D1D1F',
              marginBottom: subtitle ? '8px' : 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.5 }}>{subtitle}</p>
          )}
        </div>

        <div style={{ borderTop: '1px solid #D2D2D7' }}>
          {items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} style={{ borderBottom: '1px solid #D2D2D7' }}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 0',
                    background: 'transparent',
                    border: 'none',
                    color: '#1D1D1F',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    fontFamily: 'inherit',
                  }}
                >
                  <div>
                    {faq.category && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#0066CC',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          display: 'block',
                          marginBottom: '3px',
                          fontWeight: 600,
                        }}
                      >
                        {faq.category}
                      </span>
                    )}
                    <span>{faq.q}</span>
                  </div>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: '20px',
                      color: '#6E6E73',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      paddingBottom: '18px',
                      color: '#424245',
                      fontSize: '15px',
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

