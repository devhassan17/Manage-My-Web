import React from 'react';

export const CLIENTS_LIST = [
  {
    id: 1,
    name: 'Moyee Coffee Netherlands',
    country: 'Netherlands',
    domain: 'moyeecoffee.com',
    url: 'https://www.moyeecoffee.com',
    logo: '/images/clients/moyee-nl.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 2,
    name: 'Moyee Coffee UK',
    country: 'UK',
    domain: 'moyeecoffee.co.uk',
    url: 'https://www.moyeecoffee.co.uk',
    logo: '/images/clients/moyee-uk.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 3,
    name: 'Moyee Coffee Ireland',
    country: 'Ireland',
    domain: 'moyeecoffee.ie',
    url: 'https://moyeecoffee.ie',
    logo: '/images/clients/moyee-ie.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 4,
    name: 'FairChain Foundation',
    country: 'Netherlands',
    domain: 'fairchain.org',
    url: 'https://fairchain.org',
    logo: '/images/clients/fairchain.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 5,
    name: 'Pink Loans',
    country: 'Australia',
    domain: 'pinkloans.com.au',
    url: 'https://www.pinkloans.com.au',
    logo: '/images/clients/pink-loans.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 6,
    name: 'Dynamic Fit Pros',
    country: 'USA',
    domain: 'dynamicfitpros.com',
    url: 'https://www.dynamicfitpros.com',
    logo: '/images/clients/dynamic-fit-pros.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 7,
    name: 'American APD',
    country: 'USA',
    domain: 'americanapd.com',
    url: 'https://americanapd.com',
    logo: '/images/clients/american-apd.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 8,
    name: 'DermaDistributor',
    country: 'USA',
    domain: 'dermadistributor.com',
    url: 'https://www.dermadistributor.com',
    logo: '/images/clients/dermadistributor.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 9,
    name: 'Elite Hair Care USA',
    country: 'USA',
    domain: 'elitehaircareusa.com',
    url: 'https://elitehaircareusa.com',
    logo: '/images/clients/elite-hair-care.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 10,
    name: 'Lorrie Rivers Holistic',
    country: 'USA',
    domain: 'lorrieriversholistic.com',
    url: 'https://lorrieriversholistic.com',
    logo: '/images/clients/lorrie-rivers.png',
    verifiedSource: 'Official Site Logo',
  },
  {
    id: 11,
    name: 'The Jenaya Store',
    country: 'Australia',
    domain: 'thejenayastore.com.au',
    url: 'https://www.thejenayastore.com.au',
    logo: '/images/clients/the-jenaya-store.png',
    verifiedSource: 'Official Site Icon',
  },
  {
    id: 12,
    name: 'The Hidden Epidemic',
    country: 'USA',
    domain: 'thehiddenepidemic.com',
    url: 'https://www.thehiddenepidemic.com',
    logo: '/images/clients/the-hidden-epidemic.svg',
    verifiedSource: 'Custom Wordmark (Site Offline)',
  },
  {
    id: 13,
    name: 'Lawn Candy Cards',
    country: 'Canada',
    domain: 'lawncandycards.ca',
    url: 'https://lawncandycards.ca',
    logo: '/images/clients/lawn-candy-cards.svg',
    verifiedSource: 'Custom Wordmark (Site Offline)',
  },
  {
    id: 14,
    name: 'Empires Property',
    country: 'International',
    domain: 'empiresproperty.com',
    url: 'https://empiresproperty.com',
    logo: '/images/clients/empires-property.svg',
    verifiedSource: 'Custom Wordmark (Site Offline)',
  },
];

export default function ClientLogos({ title = 'Trusted by Global Brands', subtitle = '14+ E-Commerce & Digital Platforms Delivered Across 6 Countries' }) {
  return (
    <section
      style={{
        padding: '64px 0',
        background: '#FFFFFF',
        borderBottom: '1px solid #D2D2D7',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
          <p className="apple-eyebrow" style={{ marginBottom: '6px' }}>
            Client Portfolio
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.4vw, 38px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#1D1D1F',
              marginBottom: '6px',
            }}
          >
            {title}
          </h2>
          <p style={{ color: '#6E6E73', fontSize: '14.5px' }}>{subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {CLIENTS_LIST.map((client) => (
            <a
              key={client.id}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card apple-card-interactive"
              style={{
                padding: '18px 18px 16px 18px',
                borderRadius: '16px',
                background: '#FBFBFD',
                border: '1px solid #E5E5EA',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              {/* Logo Container */}
              <div
                style={{
                  height: '64px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 16px',
                }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  loading="lazy"
                  style={{
                    maxHeight: '42px',
                    maxWidth: '150px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* Client Meta */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    marginBottom: '3px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#1D1D1F',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {client.name}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px',
                    color: '#6E6E73',
                  }}
                >
                  <span style={{ color: '#0066CC', fontWeight: 500 }}>{client.domain} ↗</span>
                  <span
                    style={{
                      background: '#F5F5F7',
                      padding: '2px 7px',
                      borderRadius: '980px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: '#424245',
                    }}
                  >
                    {client.country}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

