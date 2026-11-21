import { BLOG_POSTS_LIST } from '../data/blogPosts';

const BASE_URL = 'https://www.managemyweb.co';

const VIDEO_META = {
  thumbnailLoc: `${BASE_URL}/images/og-cover.png`,
  title: 'How a 3D Online Store Works — 30-Second Walkthrough',
  description:
    'Watch how ManageMyWeb turns a standard Shopify, WooCommerce, or custom online store into a fast 3D shop customers can walk through on any phone or computer.',
  contentLoc: `${BASE_URL}/videos/3d-store-preview.mp4`,
  duration: 30,
  publicationDate: '2026-11-08T00:00:00+00:00',
};

const CORE_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    image: '/images/og-cover.png',
    title: 'Custom 3D E-Commerce Website Development — ManageMyWeb',
    hasVideo: true,
  },
  {
    path: '/shopify-3d-store',
    priority: '0.95',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Shopify 3D Store Development & Integration',
  },
  {
    path: '/woocommerce-3d-store',
    priority: '0.95',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'WooCommerce 3D Store Development & Speed Care',
  },
  {
    path: '/3d-store-examples',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D Virtual Showroom & E-Commerce Examples',
    hasVideo: true,
  },
  {
    path: '/experience',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Live 3D Online Store Demo & Video Walkthrough',
    hasVideo: true,
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D E-Commerce Development & Web Services',
  },
  {
    path: '/services/3d-virtual-stores',
    priority: '0.95',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Custom 3D Virtual Store Development',
  },
  {
    path: '/services/web-management',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Managed Website Operations & E-Commerce Support',
  },
  {
    path: '/services/ecommerce-growth',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'E-Commerce Conversion & Checkout Optimization',
  },
  {
    path: '/pricing',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D Store Development Pricing & Quotation',
  },
  {
    path: '/case-studies',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/clients/moyee-nl.png',
    title: 'E-Commerce Projects & Client Work',
  },
  {
    path: '/contact',
    priority: '0.9',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: 'Request a 3D Store Demo or Custom Quote',
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    image: '/images/og-cover.png',
    title: 'About ManageMyWeb | 3D Commerce Engineers',
  },
  {
    path: '/faq',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D E-Commerce Website FAQs',
  },
  {
    path: '/blog',
    priority: '0.85',
    changefreq: 'weekly',
    image: '/images/og-cover.png',
    title: '3D E-Commerce Guides & Development Insights',
  },
];

const LEGAL_ROUTES = [
  { path: '/privacy', priority: '0.4', changefreq: 'yearly', image: null, title: 'Privacy Policy' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly', image: null, title: 'Terms of Service' },
];

export async function getServerSideProps({ res }) {
  const nowIso = new Date().toISOString();

  const blogRoutes = BLOG_POSTS_LIST.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: '0.85',
    changefreq: 'monthly',
    image: post.image || '/images/og-cover.png',
    title: post.title,
    lastmod: `${post.isoDate}T00:00:00+00:00`,
  }));

  const allRoutes = [...CORE_ROUTES, ...blogRoutes, ...LEGAL_ROUTES];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || nowIso}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${
      route.image
        ? `
    <image:image>
      <image:loc>${BASE_URL}${route.image}</image:loc>
      <image:title>${route.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
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
  )
  .join('\n')}
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
