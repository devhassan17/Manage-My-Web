import Head from 'next/head';
import siteSettings from '../data/site-settings.json';

const SITE_URL = 'https://www.managemyweb.co';

const BREADCRUMB_LABELS = {
  services: 'Services',
  '3d-virtual-stores': '3D Virtual Storefronts',
  'web-management': 'Managed Web Operations',
  'ecommerce-growth': 'E-Commerce Conversion Growth',
  experience: 'Interactive 3D Showroom',
  'case-studies': 'Client Case Studies',
  pricing: 'Custom Quotation & 3D Demo',
  about: 'About ManageMyWeb',
  contact: 'Contact & Free 3D Demo',
  faq: 'Frequently Asked Questions',
  blog: 'Editorial Journal',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

function buildBreadcrumbs(canonicalUrl, pageTitle) {
  const normalizedUrl = (canonicalUrl || SITE_URL).replace('https://managemyweb.co', SITE_URL);
  const cleanPath = normalizedUrl.replace(SITE_URL, '').split('?')[0].replace(/\/$/, '');
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
  title = 'ManageMyWeb | 3D E-Commerce Websites & Full Store Management',
  description = 'Turn your e-commerce website into a walkable 3D online store. ManageMyWeb builds custom 3D storefronts for Shopify, WooCommerce, and custom brands—and manages your hosting, speed, and daily store updates.',
  keywords = '3D virtual store, 3D ecommerce website, interactive 3D Shopify store, WooCommerce 3D store, virtual retail showroom, spatial commerce agency, WebGL online store, 3D product configurator ecommerce, managed web operations, Shopify speed optimization, ecommerce conversion rate optimization, ManageMyWeb',
  ogImage = '/images/og-cover.png',
  ogType = 'website',
  canonicalUrl = 'https://www.managemyweb.co',
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
  const gaMeasurementId =
    serverSeo?.googleAnalyticsId ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    siteSettings?.seo?.googleAnalyticsId ||
    '';

  const organizationSchema = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'ManageMyWeb',
    alternateName: ['Manage My Web', 'ManageMyWeb Studio'],
    legalName: 'ManageMyWeb Studio Inc.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: absoluteOgImage,
    description:
      'Bespoke 3D virtual storefront engineering and full-stack managed web operations for modern e-commerce brands across fashion, beauty, electronics, jewelry, home goods, and specialty retail.',
    email: 'sales@managemyweb.co',
    telephone: '+92-317-4075023',
    priceRange: 'Custom Quotation',
    areaServed: ['NL', 'GB', 'IE', 'US', 'AU', 'CA', 'Worldwide'],
    knowsAbout: [
      '3D E-Commerce Websites',
      '3D Virtual Storefronts',
      'Shopify 3D Store Integration',
      'WooCommerce 3D Virtual Showroom',
      'WebGL and Three.js Retail Architecture',
      'Spatial Commerce',
      'Managed Web Operations',
      'E-Commerce Conversion Rate Optimization',
      'Core Web Vitals Speed Optimization',
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
    sameAs: [
      'https://twitter.com/managemyweb',
      'https://linkedin.com/company/managemyweb',
      'https://github.com/devhassan17/Manage-My-Web',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '3D E-Commerce Storefront & Web Management Services',
      itemListElement: [
        {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          name: 'Step 1: Complimentary 48-Hour 3D Store Demo',
          description:
            'Custom working 3D virtual showroom preview built with your actual e-commerce products in 48 hours before receiving your custom quotation.',
        },
        {
          '@type': 'Offer',
          name: 'Step 2: Custom 3D Virtual Store Architecture (Custom Quotation)',
          description:
            'Interactive 60fps WebGL / Three.js 3D retail storefronts integrated directly with Shopify, WooCommerce, and custom e-commerce catalogs.',
        },
        {
          '@type': 'Offer',
          name: 'Managed Web Operations & Conversion Engineering (Custom Quotation)',
          description:
            '24/7 cloud hosting, Core Web Vitals optimization, domain/DNS management, security backups, and same-day store updates via WhatsApp.',
        },
      ],
    },
  };

  // Google Search Site Name & Sitelinks Schema
  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ManageMyWeb',
    alternateName: ['Manage My Web', 'ManageMyWeb Studio', 'managemyweb.co', 'www.managemyweb.co'],
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
        name: '3D Storefronts',
        description: 'Walkable 3D flagship retail stores for Shopify, WooCommerce, and custom e-commerce brands.',
        url: `${SITE_URL}/services/3d-virtual-stores`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Interactive 3D Demo',
        description: 'Watch the 30-second voiceover walkthrough or explore our live 360° interactive 3D storefront.',
        url: `${SITE_URL}/experience`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Web Management',
        description: '24/7 cloud hosting, DNS, speed optimization, and technical stewardship.',
        url: `${SITE_URL}/services/web-management`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Client Results',
        description: '14+ global client e-commerce websites across the Netherlands, UK, Ireland, USA, Australia, and Canada.',
        url: `${SITE_URL}/case-studies`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Get Quotation & Free 3D Demo',
        description: 'Start with a complimentary 48-hour 3D store demo or request a direct custom quotation.',
        url: `${SITE_URL}/pricing`,
      },
    ],
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
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLMs.txt Knowledge Base" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="LLMs Full Reference Guide" />

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
