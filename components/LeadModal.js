import { useState, useEffect } from 'react';

export default function LeadModal({
  isOpen,
  onClose,
  initialCategory = 'Fashion, Apparel & Footwear',
  initialMode = 'demo',
  initialPackage = 'Spatial Retail Flagship',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    websiteUrl: '',
    category: initialCategory,
    revenueRange: 'Not Specified',
    requestType: initialMode,
    requestedPackage: initialPackage,
    productCount: '15 - 50 Products',
    platform: 'Shopify',
    message: '',
    promoCode: 'FREE-3D-DEMO-60D',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      category: initialCategory || prev.category,
      requestType: initialMode || 'demo',
      requestedPackage: initialPackage || prev.requestedPackage,
    }));
  }, [initialCategory, initialMode, initialPackage, isOpen]);

  if (!isOpen) return null;

  const isQuotation = formData.requestType === 'quotation';

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

  const waRaw = '923174075023';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    isQuotation
      ? `Hello ManageMyWeb, I just requested a custom quotation (${formData.requestedPackage}) for ${formData.storeName || 'our store'}.`
      : `Hello ManageMyWeb, I just requested a Free 3D Demo for ${formData.storeName || 'our store'}.`
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
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
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
            top: '16px',
            right: '16px',
            background: '#F5F5F7',
            border: 'none',
            color: '#6E6E73',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 4px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#E8F5E9',
                color: '#1D7D3F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
              {isQuotation ? 'Quotation Request Received' : 'Step 1: Free 3D Demo Confirmed'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>
              {isQuotation
                ? `Thanks, ${formData.name}. We will send your itemized quotation within 24 hours.`
                : `Thanks, ${formData.name}. We will email your free 3D preview link in 48 hours (Step 1), followed by your custom quotation (Step 2).`}
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-apple-blue">
                Chat on WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-apple-secondary"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Mode Switcher */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                background: '#F5F5F7',
                padding: '4px',
                borderRadius: '11px',
                marginBottom: '16px',
                border: '1px solid #E5E5EA',
              }}
            >
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestType: 'demo' })}
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: !isQuotation ? '#FFFFFF' : 'transparent',
                  boxShadow: !isQuotation ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                  color: '#1D1D1F',
                  fontSize: '12px',
                  fontWeight: !isQuotation ? 600 : 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                1. Free 3D Demo First
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestType: 'quotation' })}
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isQuotation ? '#FFFFFF' : 'transparent',
                  boxShadow: isQuotation ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                  color: '#1D1D1F',
                  fontSize: '12px',
                  fontWeight: isQuotation ? 600 : 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                2. Custom Quotation
              </button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
              {isQuotation ? 'Request Custom Quotation' : 'Step 1: Free 3D Demo → Step 2: Quote'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '13px', marginBottom: '14px' }}>
              {isQuotation
                ? 'Receive a tailored quotation in 24 hours.'
                : 'Preview your store in 3D in 48 hours at zero cost.'}
            </p>

            {errorMsg && (
              <div
                style={{
                  background: '#FFF2F2',
                  border: '1px solid #FFD6D6',
                  color: '#D70015',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  marginBottom: '12px',
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
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
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    Store Name
                  </label>
                  <input
                    type="text"
                    placeholder="Atelier Studio"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="yourstore.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Fashion, Apparel & Footwear">Fashion &amp; Footwear</option>
                    <option value="Beauty, Cosmetics & Fragrance">Beauty &amp; Fragrance</option>
                    <option value="Consumer Electronics & Audio">Electronics &amp; Audio</option>
                    <option value="Watches, Jewelry & Luxury Goods">Watches &amp; Luxury</option>
                    <option value="Home, Furniture & Decor">Home &amp; Furniture</option>
                    <option value="Food, Beverage & Specialty Goods">Food &amp; Beverage</option>
                    <option value="Other E-Commerce Store">Other E-Commerce</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+92 317 4075023"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    Package
                  </label>
                  <select
                    value={formData.requestedPackage}
                    onChange={(e) => setFormData({ ...formData, requestedPackage: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Spatial Retail Flagship">Spatial Retail Flagship</option>
                    <option value="3D Storefront Launchpad">3D Storefront Launchpad</option>
                    <option value="Managed Web Concierge">Managed Web Concierge</option>
                    <option value="Full 3D Store + Managed Web Bundle">3D Store + Managed Bundle</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                    Catalog SKUs
                  </label>
                  <select
                    value={formData.productCount}
                    onChange={(e) => setFormData({ ...formData, productCount: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Up to 15 Products">Up to 15 SKUs</option>
                    <option value="15 - 50 Products">15 – 50 SKUs</option>
                    <option value="50 - 200 Products">50 – 200 SKUs</option>
                    <option value="200+ Products">200+ SKUs</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Optional notes or products to feature..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="ios-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-apple-blue"
                style={{ padding: '12px 20px', fontSize: '14px', width: '100%', marginTop: '4px' }}
              >
                {loading
                  ? 'Submitting...'
                  : isQuotation
                  ? 'Request Custom Quotation'
                  : 'Start with Free 3D Demo'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
