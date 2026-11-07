import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    whatsappNumber: '+92 317 4075023',
    supportEmail: 'sales@managemyweb.co',
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.contact) {
          setContactInfo({
            whatsappNumber: data.contact.whatsappNumber || '+92 317 4075023',
            supportEmail: data.contact.supportEmail || 'sales@managemyweb.co',
          });
        }
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    websiteUrl: '',
    category: 'Fashion, Apparel & Footwear',
    revenueRange: 'Not Specified',
    requestType: 'demo',
    requestedPackage: 'Spatial Retail Flagship',
    productCount: '15 - 50 Products',
    platform: 'Shopify',
    message: '',
    promoCode: 'FREE-3D-DEMO-60D',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const waRaw = (contactInfo.whatsappNumber || '923174075023').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like to request a 3D store demo / custom quotation.'
  )}`;

  return (
    <>
      <SEOHead
        title="Contact & Request Free 3D Store Prototype | ManageMyWeb"
        description="Request a complimentary custom 3D prototype of your online store delivered in 48 hours, or speak directly with ManageMyWeb engineers on WhatsApp (+92 317 4075023) and sales@managemyweb.co."
        keywords="request 3D store prototype, free 3D ecommerce demo, hire 3D web developer, contact ManageMyWeb, custom 3D Shopify store quote, managed web operations contact"
        canonicalUrl="https://managemyweb.co/contact"
        schemaData={{
          '@type': 'ContactPage',
          name: 'Contact ManageMyWeb Studio',
          url: 'https://managemyweb.co/contact',
          description: 'Request a complimentary 48-hour 3D virtual store prototype for your e-commerce brand.',
        }}
      />

      <CountdownBanner onClaimDemo={() => {}} />
      <Navbar onOpenDemoModal={() => {}} />

      <main style={{ paddingTop: '52px', paddingBottom: '80px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '8px' }}>
              Get Started
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '10px',
              }}
            >
              Free 3D Demo or Custom Quote.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '16px', lineHeight: 1.45 }}>
              Share your store URL below—or message our engineers directly on WhatsApp.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Inquiry Form */}
            <div className="apple-card" style={{ padding: '32px', borderRadius: '20px', background: '#FFFFFF' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 8px' }}>
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
                      margin: '0 auto 14px auto',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                    {formData.requestType === 'quotation' ? 'Quotation Request Received' : 'Step 1: 3D Demo Confirmed'}
                  </h3>
                  <p style={{ color: '#424245', fontSize: '14.5px', lineHeight: 1.5, marginBottom: '18px' }}>
                    {formData.requestType === 'quotation'
                      ? `Thanks, ${formData.name}. We will email your itemized quotation within 24 hours.`
                      : `Thanks, ${formData.name}. Your free 3D preview will be ready within 48 hours (Step 1), followed by your custom quotation (Step 2).`}
                  </p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-apple-blue">
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Segmented Switcher */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                      background: '#F5F5F7',
                      padding: '4px',
                      borderRadius: '11px',
                      border: '1px solid #E5E5EA',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, requestType: 'demo' })}
                      style={{
                        padding: '9px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: formData.requestType === 'demo' ? '#FFFFFF' : 'transparent',
                        boxShadow: formData.requestType === 'demo' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                        color: '#1D1D1F',
                        fontSize: '12.5px',
                        fontWeight: formData.requestType === 'demo' ? 600 : 500,
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
                        padding: '9px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: formData.requestType === 'quotation' ? '#FFFFFF' : 'transparent',
                        boxShadow: formData.requestType === 'quotation' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                        color: '#1D1D1F',
                        fontSize: '12.5px',
                        fontWeight: formData.requestType === 'quotation' ? 600 : 500,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      2. Custom Quotation
                    </button>
                  </div>

                  {errorMsg && (
                    <div
                      style={{
                        background: '#FFF2F2',
                        border: '1px solid #FFD6D6',
                        color: '#D70015',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '13px',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Marcus Vance"
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
                        placeholder="marcus@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
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
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Category
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
                        <option value="Other E-Commerce Store">Other E-Commerce Store</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
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
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Products to highlight or specific requirements..."
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
                    style={{ padding: '13px 24px', fontSize: '14.5px', width: '100%' }}
                  >
                    {loading
                      ? 'Submitting...'
                      : formData.requestType === 'quotation'
                      ? 'Request Custom Quotation'
                      : 'Start Step 1: Request Free 3D Demo'}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="apple-card" style={{ padding: '26px', borderRadius: '18px', background: '#FFFFFF' }}>
                <p className="apple-eyebrow" style={{ marginBottom: '6px' }}>
                  Direct WhatsApp
                </p>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Chat with an engineer.
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '16px' }}>
                  Quick answers on Shopify sync, 3D demos, and custom quotations.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-apple-dark"
                  style={{ width: '100%', padding: '11px', fontSize: '13.5px' }}
                >
                  WhatsApp · {contactInfo.whatsappNumber}
                </a>
              </div>

              <div className="apple-card" style={{ padding: '24px', borderRadius: '18px', background: '#FFFFFF' }}>
                <div style={{ fontSize: '13.5px', color: '#424245', marginBottom: '6px' }}>
                  <strong style={{ color: '#1D1D1F' }}>Email:</strong>{' '}
                  <a href={`mailto:${contactInfo.supportEmail}`} style={{ color: '#0066CC', textDecoration: 'none' }}>
                    {contactInfo.supportEmail}
                  </a>
                </div>
                <div style={{ fontSize: '13.5px', color: '#424245', marginBottom: '6px' }}>
                  <strong style={{ color: '#1D1D1F' }}>WhatsApp:</strong> {contactInfo.whatsappNumber}
                </div>
                <div style={{ fontSize: '13px', color: '#1D7D3F', fontWeight: 500 }}>
                  Replies in under 2 hours
                </div>
              </div>

              <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid #D2D2D7' }}>
                <img
                  src="/images/spatial_devices_preview.jpg"
                  alt="3D Storefront across devices"
                  style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => {}} />
    </>
  );
}
