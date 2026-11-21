import Head from 'next/head';
import siteSettings from '../data/site-settings.json';
import { SITE_URL, getBreadcrumbItems } from './Breadcrumbs';

function buildBreadcrumbSchema(cleanCanonical, pageTitle) {
  const items = getBreadcrumbItems(cleanCanonical, pageTitle);
  if (items.length <= 1) return null;

  return {
    '@type': 'BreadcrumbList',
    '@id': `${cleanCanonical}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.url,
    })),
  };
}

export default function SEOHead({
  title = '3D E-Commerce Website Development | ManageMyWeb',
  description = 'Build a custom 3D e-commerce storefront for Shopify, WooCommerce, or custom brands. Let customers explore virtual stores in their browser and request a free demo.',
  keywords = '3D ecommerce website development, 3D virtual store development, Shopify 3D store, WooCommerce 3D store, interactive 3D storefront, website management service, ManageMyWeb',
  ogImage = '/images/og-cover.png',
  ogType = 'website',
  canonicalUrl = `${SITE_URL}/`,
  noIndex = false,
  showBreadcrumbs = false,
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
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ManageMyWeb',
    alternateName: ['Manage My Web'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: absoluteOgImage,
    description:
      'Custom 3D e-commerce website development and virtual storefront engineering for Shopify, WooCommerce, and custom retail brands, plus ongoing website management.',
    email: 'sales@managemyweb.co',
    telephone: '+92-317-4075023',
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
    inLanguage: 'en-US',
  };

  const graphNodes = [organizationSchema, websiteSchema, webPageSchema];

  // Emit BreadcrumbList strictly when corresponding visible breadcrumbs are rendered (SEO-004)
  if (showBreadcrumbs) {
    const breadcrumbSchema = buildBreadcrumbSchema(cleanCanonical, fullTitle);
    if (breadcrumbSchema) {
      graphNodes.push(breadcrumbSchema);
    }
  }

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
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="ManageMyWeb Overview" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="ManageMyWeb Guide" />

      {/* Open Graph / Social */}
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
