import Head from 'next/head';
import siteSettings from '../data/site-settings.json';

const SITE_URL = 'https://www.managemyweb.co';

const BREADCRUMB_LABELS = {
  services: 'Services',
  '3d-virtual-stores': '3D Online Stores',
  'web-management': 'Website Management',
  'ecommerce-growth': 'Store Speed & Sales Growth',
  'shopify-3d-store': 'Shopify 3D Store',
  'woocommerce-3d-store': 'WooCommerce 3D Store',
  '3d-store-examples': '3D Store Examples',
  experience: 'Live 3D Store Demo',
  'case-studies': 'Client Websites',
  pricing: 'Pricing & Free Demo',
  about: 'About Us',
  contact: 'Contact & Free Demo',
  faq: 'Questions & Answers',
  blog: 'Guides & Blog',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

function buildBreadcrumbs(cleanCanonical, pageTitle) {
  const cleanPath = (cleanCanonical || SITE_URL).replace(SITE_URL, '').split('?')[0].replace(/\/$/, '');
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
    '@id': `${cleanCanonical}#breadcrumb`,
    itemListElement: items,
  };
}

export default function SEOHead({
  title = 'ManageMyWeb | 3D Online Stores & Monthly Website Management',
  description = 'Turn your Shopify, WooCommerce, or custom website into a 3D online store shoppers can walk through. Plus full hosting, speed fixes, and daily updates. Try a free 3D demo in 48 hours.',
  keywords = '3D online store, 3D Shopify store, WooCommerce 3D store, interactive 3D website, virtual store builder, website management service, monthly website maintenance, Shopify speed optimization, ManageMyWeb',
  ogImage = '/images/og-cover.png',
  ogType = 'website',
  canonicalUrl = SITE_URL,
  noIndex = false,
  schemaData = null,
  serverSeo = null,
}) {
  const fullTitle = title.includes('ManageMyWeb') ? title : `${title} | ManageMyWeb`;
  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage.replace('https://managemyweb.co', SITE_URL)
    : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
  const cleanCanonical = (
    canonicalUrl.startsWith('http')
      ? canonicalUrl
      : `${SITE_URL}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`
  ).replace('https://managemyweb.co', SITE_URL);

  const gscVerification =
    serverSeo?.googleSiteVerification ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    siteSettings?.seo?.googleSiteVerification ||
    '';

  const organizationSchema = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'ManageMyWeb',
    alternateName: ['Manage My Web', 'ManageMyWeb Studio'],
    legalName: 'ManageMyWeb Studio',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: absoluteOgImage,
    description:
      'ManageMyWeb builds custom interactive 3D online stores for Shopify, WooCommerce, and custom e-commerce brands, and handles hosting, speed, backups, and daily store updates.',
    email: 'sales@managemyweb.co',
    telephone: '+92-317-4075023',
    priceRange: 'Free Demo · Custom Quote',
    areaServed: ['NL', 'GB', 'IE', 'US', 'AU', 'CA', 'Worldwide'],
    knowsAbout: [
      '3D Online Stores',
      '3D Shopify Stores',
      '3D WooCommerce Stores',
      'Interactive 3D Websites',
      'Website Management Services',
      'Monthly Website Maintenance',
      'Online Store Speed Optimization',
      'Shopify Checkout & Conversion Improvement',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-317-4075023',
        email: 'sales@managemyweb.co',
        contactType: 'sales',
        availableLanguage: ['English'],
      },
    ],
    sameAs: ['https://github.com/devhassan17/Manage-My-Web'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '3D Store Design & Monthly Website Management',
      itemListElement: [
        {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          name: 'Free 48-Hour 3D Store Demo',
          description:
            'Send your online store link and get a free working 3D store demo featuring your actual products within 48 hours.',
        },
        {
          '@type': 'Offer',
          name: 'Custom 3D Online Store Build',
          description:
            'Walkable 3D online shop connected directly to your Shopify, WooCommerce, or custom checkout and inventory.',
        },
        {
          '@type': 'Offer',
          name: 'Monthly Website Management & Care',
          description:
            'Hosting, domain & DNS care, SSL, business email setup, speed tuning, daily backups, and same-day edits over WhatsApp.',
        },
      ],
    },
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ManageMyWeb',
    alternateName: ['Manage My Web', 'managemyweb.co', 'www.managemyweb.co'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  const siteNavigationSchema = {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#navigation`,
    name: 'ManageMyWeb Main Navigation',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: '3D Online Stores',
        description: 'Turn your Shopify, WooCommerce, or custom store into a walkable 3D shop.',
        url: `${SITE_URL}/services/3d-virtual-stores`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Shopify 3D Store',
        description: 'Add an interactive 3D shopping experience directly onto your Shopify store.',
        url: `${SITE_URL}/shopify-3d-store`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Website Management',
        description: 'Monthly hosting, speed fixes, security backups, and same-day WhatsApp updates.',
        url: `${SITE_URL}/services/web-management`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Live 3D Demo & Examples',
        description: 'Watch the 30-second store demo or try our interactive 3D showroom.',
        url: `${SITE_URL}/experience`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Pricing & Free Demo',
        description: 'Start with a free 48-hour 3D demo or ask for a custom quote.',
        url: `${SITE_URL}/pricing`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 6,
        name: 'Guides & FAQ',
        description: 'Plain-English guides on 3D stores, costs, Shopify setup, and SEO.',
        url: `${SITE_URL}/blog`,
      },
    ],
  };

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${cleanCanonical}#webpage`,
    url: cleanCanonical,
    name: fullTitle,
    description,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteOgImage,
    },
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'main p'],
    },
    inLanguage: 'en-US',
  };

  const breadcrumbSchema = buildBreadcrumbs(cleanCanonical, fullTitle);

  const graphNodes = [
    organizationSchema,
    websiteSchema,
    siteNavigationSchema,
    webPageSchema,
    breadcrumbSchema,
  ];

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
      <meta name="application-name" content="ManageMyWeb" />
      <meta name="apple-mobile-web-app-title" content="ManageMyWeb" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ManageMyWeb" />
      <meta name="publisher" content="ManageMyWeb" />
      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
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
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="ManageMyWeb AI Guide" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="ManageMyWeb Full Guide" />

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
