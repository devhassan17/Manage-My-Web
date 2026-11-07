import Head from 'next/head';

const SITE_URL = 'https://managemyweb.co';

const BREADCRUMB_LABELS = {
  services: 'Services',
  '3d-virtual-stores': '3D Virtual Storefronts',
  'web-management': 'Managed Web Operations',
  'ecommerce-growth': 'E-Commerce Conversion Growth',
  experience: 'Interactive 3D Showroom',
  'case-studies': 'Client Case Studies',
  pricing: 'Pricing & Retainers',
  about: 'About ManageMyWeb',
  contact: 'Contact & Free Prototype',
  faq: 'Frequently Asked Questions',
  blog: 'Editorial Journal',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

function buildBreadcrumbs(canonicalUrl, pageTitle) {
  const cleanPath = (canonicalUrl || SITE_URL).replace(SITE_URL, '').split('?')[0].replace(/\/$/, '');
  const segments = cleanPath.split('/').filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  let currentUrl = SITE_URL;
  segments.forEach((seg, idx) => {
    currentUrl += `/${seg}`;
    const isLast = idx === segments.length - 1;
    const label =
      BREADCRUMB_LABELS[seg] ||
      (isLast && pageTitle ? pageTitle.split('|')[0].trim() : seg.replace(/-/g, ' '));
    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: label,
      item: currentUrl,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items,
  };
}

export default function SEOHead({
  title = 'ManageMyWeb | Custom 3D Virtual Stores & Managed E-Commerce Operations',
  description = 'Turn your online store into an interactive 3D retail showroom. ManageMyWeb builds bespoke 3D virtual storefronts and manages hosting, speed, and conversion growth for fashion, beauty, electronics, home, and luxury brands.',
  keywords = '3D virtual store, 3D ecommerce website, interactive 3D Shopify store, virtual retail showroom, spatial commerce agency, WebGL online store, 3D product configurator ecommerce, managed web operations, Shopify speed optimization, ecommerce conversion rate optimization, ManageMyWeb',
  ogImage = '/images/coffee_store_hero.jpg',
  ogType = 'website',
  canonicalUrl = 'https://managemyweb.co',
  noIndex = false,
  schemaData = null,
}) {
  const fullTitle = title.includes('ManageMyWeb') ? title : `${title} | ManageMyWeb`;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
  const cleanCanonical = canonicalUrl.startsWith('http')
    ? canonicalUrl
    : `${SITE_URL}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`;

  const organizationSchema = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'ManageMyWeb',
    legalName: 'ManageMyWeb Studio Inc.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/coffee_store_hero.jpg`,
    image: absoluteOgImage,
    description:
      'Bespoke 3D virtual storefront engineering and full-stack managed web operations for modern e-commerce brands across fashion, beauty, electronics, jewelry, home goods, and specialty retail.',
    email: 'sales@managemyweb.co',
    telephone: '+92-317-4075023',
    priceRange: '$$$',
    areaServed: 'Worldwide',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-317-4075023',
        email: 'sales@managemyweb.co',
        contactType: 'sales',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      'https://twitter.com/managemyweb',
      'https://linkedin.com/company/managemyweb',
      'https://github.com/devhassan17/Manage-My-Web',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '3D Virtual Storefront & Web Management Services',
      itemListElement: [
        {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          name: 'Complimentary 3D Storefront Prototype (48-Hour Turnaround)',
          description:
            'Custom working 3D virtual showroom preview built with your actual e-commerce products before committing to a retainer.',
        },
        {
          '@type': 'Offer',
          name: 'Custom 3D Virtual Store Architecture',
          description:
            'Interactive 60fps WebGL / Three.js 3D retail storefronts integrated directly with Shopify, WooCommerce, and headless commerce.',
        },
        {
          '@type': 'Offer',
          name: 'Managed Web Operations & Conversion Engineering',
          description:
            '24/7 cloud hosting, Core Web Vitals optimization, security patching, and conversion rate optimization.',
        },
      ],
    },
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ManageMyWeb',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${cleanCanonical}#webpage`,
    url: cleanCanonical,
    name: fullTitle,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  const breadcrumbSchema = buildBreadcrumbs(cleanCanonical, fullTitle);

  const graphNodes = [organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema];
  if (schemaData) {
    if (Array.isArray(schemaData)) {
      graphNodes.push(...schemaData);
    } else {
      const cleanedCustom = { ...schemaData };
      delete cleanedCustom['@context'];
      graphNodes.push(cleanedCustom);
    }
  }

  const structuredDataPayload = {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ManageMyWeb" />
      <meta name="publisher" content="ManageMyWeb" />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta
        name="googlebot"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      <link rel="canonical" href={cleanCanonical} />
      <link rel="alternate" hrefLang="en" href={cleanCanonical} />
      <link rel="alternate" hrefLang="x-default" href={cleanCanonical} />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="ManageMyWeb" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter / X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@managemyweb" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* JSON-LD Structured Data (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataPayload),
        }}
      />
    </Head>
  );
}
