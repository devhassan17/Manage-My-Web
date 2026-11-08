const BASE_URL = 'https://managemyweb.co';

const SITEMAP_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily', image: '/favicon.svg', title: 'ManageMyWeb 3D Virtual Stores & Managed E-Commerce' },
  { path: '/experience', priority: '0.95', changefreq: 'weekly', image: '/favicon.svg', title: 'Interactive 3D Storefront Live Showroom' },
  { path: '/services', priority: '0.9', changefreq: 'weekly', image: '/favicon.svg', title: '3D Storefront & Managed Web Services' },
  { path: '/services/3d-virtual-stores', priority: '0.95', changefreq: 'weekly', image: '/favicon.svg', title: 'Custom 3D Virtual Store Architecture' },
  { path: '/services/web-management', priority: '0.85', changefreq: 'weekly', image: '/favicon.svg', title: 'Managed Web Hosting & Technical Operations' },
  { path: '/services/ecommerce-growth', priority: '0.85', changefreq: 'weekly', image: '/favicon.svg', title: 'E-Commerce Conversion Rate Optimization' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly', image: '/favicon.svg', title: '3D Store & Managed Retainer Pricing' },
  { path: '/case-studies', priority: '0.85', changefreq: 'weekly', image: '/images/clients/moyee-nl.png', title: '3D E-Commerce Client Case Studies' },
  { path: '/contact', priority: '0.9', changefreq: 'weekly', image: '/favicon.svg', title: 'Request Free 3D Store Prototype' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', image: '/favicon.svg', title: 'About ManageMyWeb Studio' },
  { path: '/faq', priority: '0.8', changefreq: 'weekly', image: '/favicon.svg', title: '3D Virtual Store Frequently Asked Questions' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly', image: '/favicon.svg', title: 'Spatial Commerce & Web Engineering Journal' },
  { path: '/blog/future-of-ecommerce-3d-virtual-stores', priority: '0.75', changefreq: 'monthly', image: '/favicon.svg', title: 'Why 3D Virtual Stores Are Replacing Flat Product Grids' },
  { path: '/blog/fairchain-coffee-story-in-spatial-web', priority: '0.75', changefreq: 'monthly', image: '/images/clients/fairchain.png', title: 'Turning Product Provenance into Interactive 3D Storytelling' },
  { path: '/blog/why-traditional-ecommerce-grids-are-dying', priority: '0.75', changefreq: 'monthly', image: '/favicon.svg', title: 'Overcoming Rising Ad Costs with Spatial Merchandising' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly', image: null, title: 'Privacy Policy' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly', image: null, title: 'Terms of Service' },
];

export async function getServerSideProps({ res }) {
  const nowIso = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
