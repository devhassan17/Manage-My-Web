import { verifyAdmin } from '../../../utils/auth';
import {
  getKvCredentials,
  readDataAsync,
  writeDataAsync,
  readJsonData,
  writeJsonData,
} from '../../../utils/dataStore';

export default async function handler(req, res) {
  // Protect with admin authentication
  if (!verifyAdmin(req, res)) return;

  const credentials = getKvCredentials();

  // GET: Return current storage engine info, counts, and test connection
  if (req.method === 'GET') {
    try {
      const leads = await readDataAsync('leads.json', []);
      const quotations = await readDataAsync('quotations.json', []);
      const settings = await readDataAsync('site-settings.json', {});
      const cookies = await readDataAsync('cookie-stats.json', {});

      return res.status(200).json({
        storage: {
          isCloudConfigured: credentials.isConfigured,
          provider: credentials.provider,
          urlMasked: credentials.url ? credentials.url.replace(/\/\/[^@]*@/, '//***@').substring(0, 35) + '...' : 'None (Local / Tmp)',
        },
        counts: {
          leads: Array.isArray(leads) ? leads.length : 0,
          quotations: Array.isArray(quotations) ? quotations.length : 0,
          cookieDecisions: cookies?.stats?.totalDecisions || 0,
        },
        setupGuide: {
          recommended: 'Vercel KV or Upstash Redis',
          steps: [
            '1. Go to your Vercel Dashboard -> Your Project -> Storage tab.',
            '2. Click "Create Database" and select "KV" (powered by Upstash).',
            '3. Connect the KV database to your project environments (Production & Preview).',
            '4. Vercel automatically populates KV_REST_API_URL and KV_REST_API_TOKEN.',
            '5. Redeploy your site — all leads, quotations, and settings will now persist permanently across all rebuilds!',
          ],
        },
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to inspect database state: ' + e.message });
    }
  }

  // POST: Backup or Restore operations
  if (req.method === 'POST') {
    const { action = 'backup', backupData } = req.body || {};

    if (action === 'backup') {
      try {
        const leads = await readDataAsync('leads.json', []);
        const quotations = await readDataAsync('quotations.json', []);
        const settings = await readDataAsync('site-settings.json', {});
        const smtp = await readDataAsync('smtp-config.json', {});
        const cookies = await readDataAsync('cookie-stats.json', {});

        return res.status(200).json({
          success: true,
          timestamp: new Date().toISOString(),
          version: '2026.1',
          data: {
            leads,
            quotations,
            settings,
            smtp,
            cookies,
          },
        });
      } catch (err) {
        return res.status(500).json({ error: 'Backup creation failed: ' + err.message });
      }
    }

    if (action === 'restore') {
      if (!backupData || typeof backupData !== 'object') {
        return res.status(400).json({ error: 'Invalid backup payload provided.' });
      }

      try {
        if (Array.isArray(backupData.leads)) {
          await writeDataAsync('leads.json', backupData.leads);
        }
        if (Array.isArray(backupData.quotations)) {
          await writeDataAsync('quotations.json', backupData.quotations);
        }
        if (backupData.settings && typeof backupData.settings === 'object') {
          await writeDataAsync('site-settings.json', backupData.settings);
        }
        if (backupData.smtp && typeof backupData.smtp === 'object') {
          await writeDataAsync('smtp-config.json', backupData.smtp);
        }
        if (backupData.cookies && typeof backupData.cookies === 'object') {
          await writeDataAsync('cookie-stats.json', backupData.cookies);
        }

        return res.status(200).json({
          success: true,
          message: 'Data successfully restored to persistent storage!',
        });
      } catch (err) {
        return res.status(500).json({ error: 'Restore failed: ' + err.message });
      }
    }

    return res.status(400).json({ error: 'Unknown action specified.' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

