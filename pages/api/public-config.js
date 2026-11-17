import { readDataAsync } from '../../utils/dataStore';

const FALLBACK_CONTACT = {
  whatsappNumber: '+92 317 4075023',
  supportEmail: 'sales@managemyweb.co',
  studioLocation: 'Global E-Commerce Team',
};

/**
 * Serves non-sensitive public contact and promotion details for the storefront UI.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await readDataAsync('site-settings.json', {});
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    return res.status(200).json({
      contact: {
        ...FALLBACK_CONTACT,
        ...(data?.contact || {}),
      },
      promo: data?.promo || null,
    });
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');
    return res.status(200).json({
      contact: FALLBACK_CONTACT,
      promo: null,
    });
  }
}
