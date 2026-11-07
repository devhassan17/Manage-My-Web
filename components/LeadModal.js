import { useState } from 'react';

export default function LeadModal({ isOpen, onClose, initialCategory = 'Specialty Coffee & Roastery' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    websiteUrl: '',
    category: initialCategory,
    revenueRange: '$20k - $50k / mo',
    message: '',
    promoCode: 'FREE-3D-DEMO-60D',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Unable to submit request. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const waRaw = '13322910881';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    `Hello ManageMyWeb, I just requested a complimentary 3D store prototype for ${formData.storeName || 'our brand'}.`
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(29, 29, 31, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '20px',
          maxWidth: '540px',
          width: '100%',
          padding: '36px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.18)',
          position: 'relative',
          color: '#1D1D1F',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#F5F5F7',
            border: 'none',
            color: '#6E6E73',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#E8F5E9',
                color: '#1D7D3F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
              Prototype Request Received
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.5, marginBottom: '24px' }}>
              Thank you, {formData.name}. Our engineering team will review{' '}
              <strong style={{ color: '#1D1D1F' }}>{formData.storeName || 'your catalog'}</strong> and prepare a private interactive 3D walkthrough link within 48 hours.
            </p>

            <div
              style={{
                background: '#F5F5F7',
                padding: '16px 20px',
                borderRadius: '12px',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '13px', marginBottom: '6px' }}>
                What to expect next
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#424245', fontSize: '13px', lineHeight: 1.6 }}>
                <li>We select 3–5 hero products from your current site and model your 3D shelf layout.</li>
                <li>We send you a direct browser link you can test on iPhone, Mac, or desktop.</li>
                <li>No invoice, retainer, or obligation unless you choose to move forward.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-apple-blue"
              >
                Message Our Team on WhatsApp
              </a>
              <button onClick={onClose} className="btn-apple-secondary">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#0066CC',
                marginBottom: '6px',
              }}
            >
              Complimentary 3D Store Prototype
            </p>

            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              See your store in 3D before you commit.
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '22px' }}>
              Tell us where to find your current catalog. We will build a working 3D preview tailored to your brand within 48 hours at no cost.
            </p>

            {errorMsg && (
              <div
                style={{
                  background: '#FFF2F2',
                  border: '1px solid #FFD6D6',
                  color: '#D70015',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  marginBottom: '16px',
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Thorne"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="Aura Coffee Roasters"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Current Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="auracoffee.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Industry
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Specialty Coffee & Roastery">Specialty Coffee & Roastery</option>
                    <option value="Apparel & Footwear">Apparel & Footwear</option>
                    <option value="Watches & Fine Jewelry">Watches & Fine Jewelry</option>
                    <option value="Home & Architectural Goods">Home & Architectural Goods</option>
                    <option value="Fragrance & Skincare">Fragrance & Skincare</option>
                    <option value="Consumer Hardware & Audio">Consumer Hardware & Audio</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Phone or WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2831"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                  Notes or specific products to feature (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your flagship products, brand story, or current website challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="ios-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '12px', color: '#6E6E73' }}>
                  Delivered in 48 hours · No commitment
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-apple-blue"
                  style={{ padding: '12px 26px', fontSize: '14px' }}
                >
                  {loading ? 'Submitting...' : 'Request Free Prototype'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
