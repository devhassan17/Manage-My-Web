import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Use | ManageMyWeb"
        description="Terms and service level agreements for bespoke 3D storefront builds and managed web operations."
        canonicalUrl="https://managemyweb.co/terms"
      />

      <Navbar onOpenDemoModal={() => {}} />

      <main style={{ paddingTop: '64px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
            Terms of Use
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
                1. Complimentary 3D Prototype Program
              </h2>
              <p>
                Qualified inquiries submitted during our 60-day onboarding window receive a custom interactive 3D prototype preview of their storefront at no cost and with no obligation to enter a paid build contract.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                2. Client Ownership & Managed Operations
              </h2>
              <p>
                Clients retain full legal ownership of their domain names, brand assets, product catalogs, and customer transaction data. ManageMyWeb acts as your technical partner responsible for storefront engineering, hosting uptime, and DNS management.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                3. Service Level Agreement (SLA)
              </h2>
              <p>
                Managed retainer clients receive 99.99% cloud edge uptime monitoring and priority under-2-hour engineer response for critical production issues.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => {}} />
    </>
  );
}
