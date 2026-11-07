const BASE_URL = 'https://managemyweb.co';

export async function getServerSideProps({ res }) {
  const pages = [
    '',
    '/services',
    '/services/3d-virtual-stores',
    '/services/web-management',
    '/services/ecommerce-growth',
    '/experience',
    '/case-studies',
    '/pricing',
    '/about',
    '/contact',
    '/faq',
    '/blog',
    '/blog/future-of-ecommerce-3d-virtual-stores',
    '/blog/fairchain-coffee-story-in-spatial-web',
    '/blog/why-traditional-ecommerce-grids-are-dying',
    '/privacy',
    '/terms',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const priority = page === '' ? '1.0' : page.includes('3d-virtual') ? '0.9' : '0.8';
      const changefreq = page === '' ? 'daily' : 'weekly';
      return `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
