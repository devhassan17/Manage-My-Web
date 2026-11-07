import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const settingsFilePath = path.join(process.cwd(), 'data', 'site-settings.json');

  if (!fs.existsSync(settingsFilePath)) {
    return res.status(404).json({ error: 'Settings file not found' });
  }

  // GET: Fetch settings
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read settings' });
    }
  }

  // POST: Update settings
  if (req.method === 'POST') {
    try {
      const current = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
      const updated = {
        ...current,
        ...req.body,
        promo: {
          ...current.promo,
          ...(req.body.promo || {})
        }
      };

      fs.writeFileSync(settingsFilePath, JSON.stringify(updated, null, 2), 'utf8');
      return res.status(200).json({ success: true, settings: updated });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save settings: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
