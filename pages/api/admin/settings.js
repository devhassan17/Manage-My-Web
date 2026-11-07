import { readJsonData, writeJsonData } from '../../../utils/dataStore';

export default function handler(req, res) {
  const defaultSettings = {
    promo: {
      enabled: true,
      code: 'FREE-3D-DEMO-60D',
      headline: 'Complimentary 3D Storefront Prototype for Qualifying Brands',
      subheadline: 'Experience your catalog in interactive 3D before committing to a plan',
      deadlineDays: 60,
      startDate: '2026-10-25T00:00:00.000Z',
      endDate: '2026-12-24T23:59:59.000Z',
      totalSlots: 15,
      claimedSlots: 11,
    },
    contact: {
      whatsappNumber: '+92 317 4075023',
      supportEmail: 'sales@managemyweb.co',
      studioLocation: 'Global E-Commerce Engineering',
    },
  };

  // GET: Fetch settings
  if (req.method === 'GET') {
    try {
      const data = readJsonData('site-settings.json', defaultSettings);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read settings' });
    }
  }

  // POST: Update settings
  if (req.method === 'POST') {
    try {
      const current = readJsonData('site-settings.json', defaultSettings);
      const updated = {
        ...current,
        ...req.body,
        promo: {
          ...current.promo,
          ...(req.body.promo || {}),
        },
      };

      writeJsonData('site-settings.json', updated);
      return res.status(200).json({ success: true, settings: updated });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save settings: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
