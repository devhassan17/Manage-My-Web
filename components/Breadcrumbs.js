import Link from 'next/link';

export const SITE_URL = 'https://www.managemyweb.co';

export const BREADCRUMB_LABELS = {
  services: 'Services',
  '3d-virtual-stores': 'Custom 3D Virtual Store Development',
  'web-management': 'Managed Website Operations',
  'ecommerce-growth': 'E-Commerce Conversion Optimization',
  'shopify-3d-store': 'Shopify 3D Store Development',
  'woocommerce-3d-store': 'WooCommerce 3D Store Development',
  '3d-store-examples': '3D Store Examples',
  experience: 'Live 3D Store Demo',
  'case-studies': 'Projects & Client Work',
  pricing: 'Pricing & Quotation',
  about: 'About ManageMyWeb',
  contact: 'Request Demo or Quote',
  faq: '3D Store FAQs',
  blog: 'Guides & Insights',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

export function getBreadcrumbItems(cleanCanonical, pageTitle) {
  const cleanPath = (cleanCanonical || SITE_URL).replace(SITE_URL, '').split('?')[0].replace(/\/$/, '');
  const segments = cleanPath.split('/').filter(Boolean);

  const items = [{ label: 'Home', href: '/', url: SITE_URL }];
  let currentPath = '';

  segments.forEach((seg, idx) => {
    currentPath += `/${seg}`;
    const isLast = idx === segments.length - 1;
    const label =
      BREADCRUMB_LABELS[seg] ||
      (isLast && pageTitle ? pageTitle.split('|')[0].trim() : seg.replace(/-/g, ' '));
    items.push({
      label,
      href: currentPath,
      url: `${SITE_URL}${currentPath}`,
    });
  });

  return items;
}

/**
 * Renders accessible HTML breadcrumbs matching BreadcrumbList structured data.
 */
export default function Breadcrumbs({ path = '/', currentLabel = '' }) {
  const cleanCanonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const items = getBreadcrumbItems(cleanCanonical, currentLabel);
  if (items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        fontSize: '12.5px',
        color: '#6E6E73',
        marginBottom: '18px',
      }}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {idx > 0 && <span aria-hidden="true">/</span>}
            {isLast ? (
              <span aria-current="page" style={{ color: '#1D1D1F', fontWeight: 500 }}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} style={{ color: '#0066CC', textDecoration: 'none' }}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

