import { useState, useEffect } from 'react';

export default function LeadModal({
  isOpen,
  onClose,
  initialCategory = 'Fashion, Apparel & Footwear',
  initialMode = 'demo', // 'demo' | 'quotation'
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
    requestType: initialMode, // 'demo' | 'quotation'
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
      ? `Hello ManageMyWeb, I just requested a custom quotation (${formData.requestedPackage}) for ${formData.storeName || 'our e-commerce brand'}.`
      : `Hello ManageMyWeb, I just requested Step 1 (Free 3D Store Demo) for ${formData.storeName || 'our e-commerce brand'}.`
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
          borderRadius: '22px',
          maxWidth: '580px',
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
              {isQuotation ? 'Custom Quotation Request Received' : 'Step 1 Confirmed: 3D Demo in Progress'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '15px', lineHeight: 1.5, marginBottom: '22px' }}>
              {isQuotation ? (
                <>
                  Thank you, {formData.name}. Our engineering team is preparing a tailored quotation for{' '}
                  <strong style={{ color: '#1D1D1F' }}>{formData.storeName || 'your store'}</strong> ({formData.requestedPackage}) and will send your itemized proposal within 24 hours.
                </>
              ) : (
                <>
                  Thank you, {formData.name}. Our team is building your complimentary 3D store demo for{' '}
                  <strong style={{ color: '#1D1D1F' }}>{formData.storeName || 'your catalog'}</strong>. Once you review the demo (Step 1), we will prepare your custom quotation (Step 2).
                </>
              )}
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
                {isQuotation ? 'Your Quotation Roadmap' : 'Your 2-Step Engagement Roadmap'}
              </div>
              {isQuotation ? (
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#424245', fontSize: '13px', lineHeight: 1.6 }}>
                  <li>We review your store catalog, SKU volume ({formData.productCount}), and platform ({formData.platform}).</li>
                  <li>You receive a formal itemized quotation via email within 24 hours.</li>
                  <li>We can also include a complimentary 3D preview of your hero products upon request.</li>
                </ul>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#424245', fontSize: '13px', lineHeight: 1.6 }}>
                  <li><strong>Step 1 (Free 3D Demo):</strong> Within 48 hours, you receive a private interactive 3D walkthrough link featuring your products.</li>
                  <li><strong>Step 2 (Custom Quotation):</strong> After you test the 3D demo with your team, we send a custom quotation tailored to your final scope.</li>
                </ul>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-apple-blue">
                Message Our Team on WhatsApp
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
            {/* Segmented Mode Switcher: Demo First vs Direct Quotation */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                background: '#F5F5F7',
                padding: '4px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #E5E5EA',
              }}
            >
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestType: 'demo' })}
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: !isQuotation ? '#FFFFFF' : 'transparent',
                  boxShadow: !isQuotation ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                  color: '#1D1D1F',
                  fontSize: '12.5px',
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
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: isQuotation ? '#FFFFFF' : 'transparent',
                  boxShadow: isQuotation ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                  color: '#1D1D1F',
                  fontSize: '12.5px',
                  fontWeight: isQuotation ? 600 : 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                2. Request Custom Quotation
              </button>
            </div>

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
              {isQuotation
                ? 'Direct Custom Quotation · 24-Hour Turnaround'
                : 'Step 1: Free 3D Store Demo → Step 2: Custom Quotation'}
            </p>

            <h2
              style={{
                fontSize: '23px',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}
            >
              {isQuotation
                ? 'Request a tailored quotation for your store.'
                : 'Start with a free 3D demo, then get your quote.'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '18px' }}>
              {isQuotation
                ? 'Every store has a unique catalog and technical scope. Tell us what you need and our engineers will send an itemized quotation within 24 hours.'
                : 'Want to see your products inside an interactive 3D showroom first? We will build a free working 3D preview in 48 hours (Step 1), followed by your custom quotation (Step 2).'}
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

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    Brand / Store Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atelier Studio"
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
                    placeholder="yourstore.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    E-Commerce Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Fashion, Apparel & Footwear">Fashion, Apparel & Footwear</option>
                    <option value="Beauty, Cosmetics & Fragrance">Beauty, Cosmetics & Fragrance</option>
                    <option value="Consumer Electronics & Audio">Consumer Electronics & Audio</option>
                    <option value="Watches, Jewelry & Luxury Goods">Watches, Jewelry & Luxury Goods</option>
                    <option value="Home, Furniture & Decor">Home, Furniture & Decor</option>
                    <option value="Food, Beverage & Specialty Goods">Food, Beverage & Specialty Goods</option>
                    <option value="Sports, Fitness & Outdoors">Sports, Fitness & Outdoors</option>
                    <option value="Other E-Commerce Store">Other E-Commerce Store</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Phone or WhatsApp
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

              {/* Scope Selectors for Quotation or Demo */}
              <div style={{ display: 'grid', gridTemplateColumns: isQuotation ? '1.3fr 1fr 1fr' : '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Desired Scope / Package
                  </label>
                  <select
                    value={formData.requestedPackage}
                    onChange={(e) => setFormData({ ...formData, requestedPackage: e.target.value })}
                    className="ios-input"
                  >
                    <option value="Spatial Retail Flagship">Spatial Retail Flagship (3D Store)</option>
                    <option value="3D Storefront Launchpad">3D Storefront Launchpad</option>
                    <option value="Managed Web Concierge">Managed Web Concierge Retainer</option>
                    <option value="Full 3D Store + Managed Web Bundle">Full 3D Store + Managed Web Bundle</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                    Catalog Size
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

                {isQuotation && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                      Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="ios-input"
                    >
                      <option value="Shopify">Shopify</option>
                      <option value="WooCommerce">WooCommerce</option>
                      <option value="Custom / Headless">Custom / Headless</option>
                      <option value="New Store">New Store</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                  {isQuotation
                    ? 'Project requirements or features to include in quotation'
                    : 'Products to feature in your free 3D demo (optional)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    isQuotation
                      ? 'Share any custom features, timeline goals, or integrations you want included in your quotation...'
                      : 'Tell us 2–3 best-selling products or layout ideas for your free 3D preview...'
                  }
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
                  {isQuotation
                    ? 'Itemized proposal in 24h · Zero obligation'
                    : 'Step 1: Free 48h 3D Demo → Step 2: Custom Quote'}
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-apple-blue"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  {loading
                    ? 'Submitting...'
                    : isQuotation
                    ? 'Request Custom Quotation'
                    : 'Start with Free 3D Demo'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
