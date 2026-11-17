export default function CountdownBanner({ onClaimDemo }) {
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
          <strong style={{ fontWeight: 600 }}>Free 3D Store Demo:</strong> Share your store link to preview your products in a working 3D browser showroom before quoting.
        </span>

        <button
          type="button"
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
          Request Free Demo ›
        </button>
      </div>
    </div>
  );
}
