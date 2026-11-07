import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | ManageMyWeb"
        description="How ManageMyWeb protects your brand data, e-commerce credentials, and customer analytics."
        canonicalUrl="https://managemyweb.co/privacy"
      />

      <Navbar onOpenDemoModal={() => {}} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#6E6E73', fontSize: '14px', marginBottom: '32px' }}>
            Last Updated: November 2, 2026
          </p>

          <div
            className="apple-card"
            style={{
              padding: '40px',
              borderRadius: '20px',
              background: '#FFFFFF',
              color: '#424245',
              lineHeight: 1.7,
              fontSize: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                1. Confidentiality & Brand Data Security
              </h2>
              <p>
                ManageMyWeb Studio respects your proprietary brand assets. Any catalog information, product photography, or technical credentials shared with our engineering team for 3D store prototypes or ongoing web management are encrypted and handled under strict confidentiality.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                2. Information We Collect
              </h2>
              <p>
                When you request a complimentary 3D store prototype or contact our studio, we collect your name, work email, website URL, and phone or WhatsApp number solely to prepare your prototype and communicate regarding your project.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                3. Zero Third-Party Data Sharing
              </h2>
              <p>
                We never sell, rent, or share your contact details or store analytics with third-party data brokers or advertising networks.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                4. Contact
              </h2>
              <p>
                For questions regarding data privacy or record deletion, contact{' '}
                <a href="mailto:privacy@managemyweb.co" style={{ color: '#0066CC', textDecoration: 'none' }}>
                  privacy@managemyweb.co
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => {}} />
    </>
  );
}
