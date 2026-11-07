import Head from 'next/head';

export default function SEOHead({
  title = 'ManageMyWeb | 3D Virtual Stores & Spatial E-Commerce Experiences',
  description = 'Most e-commerce websites look the same. We create 3D virtual game-like stores where customers explore product shelves, checkout counters, FairChain impact stories, and postal booths. Claim your free demo prototype today.',
  keywords = '3D virtual store, game-like ecommerce, virtual coffee shop, spatial shopping, three.js ecommerce, ManageMyWeb, web management, high converting store, FairChain ecommerce',
  ogImage = '/images/coffee_store_hero.jpg',
  canonicalUrl = 'https://managemyweb.co',
  schemaData = null,
}) {
  const fullTitle = title.includes('ManageMyWeb') ? title : `${title} | ManageMyWeb Studio`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ManageMyWeb Studio',
    url: 'https://managemyweb.co',
    logo: 'https://managemyweb.co/images/coffee_store_hero.jpg',
    description: description,
    sameAs: [
      'https://twitter.com/managemyweb',
      'https://linkedin.com/company/managemyweb',
      'https://github.com/devhassan17/Manage-My-Web'
    ],
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      name: 'Free 3D Virtual Store Prototype Demo (60-Day Window)',
      description: 'Receive a complimentary bespoke 3D interactive virtual store prototype if you contact our studio within 60 days.'
    }
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ManageMyWeb Studio" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData || defaultSchema),
        }}
      />
    </Head>
  );
}
