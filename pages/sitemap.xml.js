const BASE_URL = 'https://www.managemyweb.co';

const VIDEO_META = {
  thumbnailLoc: `${BASE_URL}/images/og-cover.png`,
  title: 'Turn Your E-Commerce Website Into a Walkable 3D Store — 30-Second Explainer',
  description:
    'See how ManageMyWeb transforms standard flat Shopify, WooCommerce, and custom e-commerce websites into interactive 3D virtual stores customers can walk inside on any phone or laptop.',
  contentLoc: `${BASE_URL}/videos/3d-store-preview.mp4`,
  duration: 30,
  publicationDate: '2026-11-08T00:00:00+00:00',
};

const SITEMAP_ROUTES = [
  {
    path: '',
    priority: '1.0',
    changefreq: 'daily',
    image: '/images/og-cover.png',
    title: 'ManageMyWeb — 3D E-Commerce Websites & Full Store Management',
    hasVideo: true,
  },
  {
    path: '/experience',
    priority: '0.95',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Interactive 3D E-Commerce Storefront Live Showroom & Video Walkthrough',
    hasVideo: true,
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D E-Commerce Storefront & Managed Web Services',
  },
  {
    path: '/services/3d-virtual-stores',
    priority: '0.95',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Custom 3D Virtual Storefronts for Shopify, WooCommerce & Custom Brands',
  },
  {
    path: '/services/web-management',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Managed Web Hosting, Speed Optimization & Technical Operations',
  },
  {
    path: '/services/ecommerce-growth',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'E-Commerce Conversion Rate Optimization & Spatial Merchandising',
  },
  {
    path: '/pricing',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Request Custom Quotation or Free 48-Hour 3D Store Demo',
  },
  {
    path: '/case-studies',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/clients/moyee-nl.png',
    title: '14+ Global Client E-Commerce Websites & Case Studies',
  },
  {
    path: '/contact',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Request Your Free 48-Hour 3D Store Demo or Custom Quotation',
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    image: '/images/og-cover.png',
    title: 'About ManageMyWeb E-Commerce Engineering Studio',
  },
  {
    path: '/faq',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D Virtual Store & E-Commerce Management Frequently Asked Questions',
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Spatial Commerce & E-Commerce Engineering Journal',
  },
  {
    path: '/blog/future-of-ecommerce-3d-virtual-stores',
    priority: '0.75',
    changefreq: 'monthly',
    image: '/images/og-cover.png',
    title: 'Why 3D Virtual Stores Are Replacing Flat Product Grids',
  },
  {
    path: '/blog/fairchain-coffee-story-in-spatial-web',
    priority: '0.75',
    changefreq: 'monthly',
    image: '/images/clients/fairchain.png',
    title: 'Turning Product Provenance into Interactive 3D Storytelling',
  },
  {
    path: '/blog/why-traditional-ecommerce-grids-are-dying',
    priority: '0.75',
    changefreq: 'monthly',
    image: '/images/og-cover.png',
    title: 'Overcoming Rising Ad Costs with Spatial Merchandising',
  },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly', image: null, title: 'Privacy Policy' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly', image: null, title: 'Terms of Service' },
];

export async function getServerSideProps({ res }) {
  const nowIso = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${SITEMAP_ROUTES.map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${
      route.image
        ? `
    <image:image>
      <image:loc>${BASE_URL}${route.image}</image:loc>
      <image:title>${route.title.replace(/&/g, '&amp;')}</image:title>
    </image:image>`
        : ''
    }${
      route.hasVideo
        ? `
    <video:video>
      <video:thumbnail_loc>${VIDEO_META.thumbnailLoc}</video:thumbnail_loc>
      <video:title>${VIDEO_META.title.replace(/&/g, '&amp;')}</video:title>
      <video:description>${VIDEO_META.description.replace(/&/g, '&amp;')}</video:description>
      <video:content_loc>${VIDEO_META.contentLoc}</video:content_loc>
      <video:duration>${VIDEO_META.duration}</video:duration>
      <video:publication_date>${VIDEO_META.publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
        : ''
    }
  </url>`
  ).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
