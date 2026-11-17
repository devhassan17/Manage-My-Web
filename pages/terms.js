import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Use | ManageMyWeb"
        description="Terms and scope guidelines for custom 3D storefront builds and ongoing website management."
        canonicalUrl="https://www.managemyweb.co/terms"
        showBreadcrumbs={true}
      />

      <Navbar onOpenDemoModal={() => { }} />

      <main style={{ paddingTop: '40px', paddingBottom: '96px', background: '#FBFBFD' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <Breadcrumbs path="/terms" currentLabel="Terms of Service" />
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
                Qualified inquiries receive a complimentary custom interactive 3D prototype preview of their storefront before entering any paid development contract.
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
                3. Ongoing Website Support Scope
              </h2>
              <p>
                Managed retainer clients receive scheduled cloud hosting monitoring, off-site backups, and direct engineering support according to the agreed maintenance schedule in their written proposal.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenDemoModal={() => { }} />
    </>
  );
}
