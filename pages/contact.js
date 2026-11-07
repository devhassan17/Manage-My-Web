import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CountdownBanner from '../components/CountdownBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    websiteUrl: '',
    category: 'Specialty Coffee & Roastery',
    revenueRange: '$20k - $50k / mo',
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

  const waRaw = '13322910881';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(
    'Hello ManageMyWeb team, I would like to request a complimentary 3D store prototype for our brand.'
  )}`;

  return (
    <>
      <SEOHead
        title="Contact & Request Free 3D Prototype | ManageMyWeb"
        description="Contact ManageMyWeb to request a complimentary custom 3D prototype of your online store or discuss managed web operations."
        canonicalUrl="https://managemyweb.co/contact"
      />

      <CountdownBanner onClaimDemo={() => {}} />
      <Navbar onOpenDemoModal={() => {}} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
              Studio Concierge
            </p>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#1D1D1F',
                lineHeight: 1.08,
                marginBottom: '16px',
              }}
            >
              Let’s build your 3D store preview.
            </h1>
            <p style={{ color: '#6E6E73', fontSize: '18px', lineHeight: 1.5 }}>
              Share your current website below. Our engineers will prepare a custom interactive 3D walkthrough featuring your products within 48 hours at no cost.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Inquiry Form */}
            <div
              className="apple-card"
              style={{
                padding: '40px',
                borderRadius: '22px',
                background: '#FFFFFF',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '24px 8px' }}>
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
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
                    Prototype Request Confirmed
                  </h3>
                  <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                    Thank you, {formData.name}. Our engineering team has received your request for{' '}
                    <strong>{formData.storeName || formData.websiteUrl || 'your store'}</strong> and will deliver your interactive 3D preview link within 48 hours.
                  </p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-apple-blue">
                    Message Our Engineers on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '2px' }}>
                    Request Complimentary Prototype
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '13.5px', marginBottom: '8px' }}>
                    No retainer or credit card required. All brand assets are kept strictly confidential.
                  </p>

                  {errorMsg && (
                    <div
                      style={{
                        background: '#FFF2F2',
                        border: '1px solid #FFD6D6',
                        color: '#D70015',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '13px',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
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
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="marcus@roastery.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                        Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="Moka Roasters"
                        value={formData.storeName}
                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        className="ios-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                        Website URL
                      </label>
                      <input
                        type="text"
                        placeholder="mokaroasters.com"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                        Industry
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="ios-input"
                      >
                        <option value="Specialty Coffee & Roastery">Specialty Coffee & Roastery</option>
                        <option value="Apparel & Streetwear">Apparel & Streetwear</option>
                        <option value="Watches & Fine Jewelry">Watches & Fine Jewelry</option>
                        <option value="Fragrance & Skincare">Fragrance & Skincare</option>
                        <option value="Consumer Electronics">Consumer Electronics</option>
                        <option value="Other Retail">Other Retail</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                        Phone or WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (332) 291-0881"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Project Goals or Products to Highlight
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your flagship products, brand story, or current website priorities..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="ios-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#6E6E73' }}>
                      48-hour prototype turnaround
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-apple-blue"
                      style={{ padding: '13px 28px', fontSize: '14.5px' }}
                    >
                      {loading ? 'Submitting...' : 'Submit Prototype Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Contact Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="apple-card" style={{ padding: '32px', borderRadius: '20px', background: '#FFFFFF' }}>
                <p className="apple-eyebrow" style={{ marginBottom: '10px' }}>
                  Direct Engineer Access
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                  Prefer to chat directly?
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  Speak directly with our lead engineers on WhatsApp for quick questions about Shopify integration, timelines, or custom 3D environments.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-apple-dark"
                  style={{ width: '100%' }}
                >
                  WhatsApp · +1 (332) 291-0881
                </a>
              </div>

              <div className="apple-card" style={{ padding: '32px', borderRadius: '20px', background: '#FFFFFF' }}>
                <p className="apple-eyebrow" style={{ marginBottom: '12px' }}>
                  Studio Information
                </p>
                <div style={{ fontSize: '14px', color: '#424245', marginBottom: '8px' }}>
                  <strong style={{ color: '#1D1D1F' }}>Email:</strong>{' '}
                  <a href="mailto:hello@managemyweb.co" style={{ color: '#0066CC', textDecoration: 'none' }}>
                    hello@managemyweb.co
                  </a>
                </div>
                <div style={{ fontSize: '14px', color: '#424245', marginBottom: '8px' }}>
                  <strong style={{ color: '#1D1D1F' }}>Locations:</strong> San Francisco & London
                </div>
                <div style={{ fontSize: '14px', color: '#1D7D3F', fontWeight: 500 }}>
                  Average response time under 2 hours
                </div>
              </div>

              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #D2D2D7',
                }}
              >
                <img
                  src="/images/coffee_post_office.jpg"
                  alt="Concierge Dispatch Desk"
                  style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }}
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
