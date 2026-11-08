import fs from 'fs';
import path from 'path';
import { verifyAdmin } from '../../../utils/auth';
import { readDataAsync, writeDataAsync } from '../../../utils/dataStore';

function cleanAnalyticsId(raw = '') {
  const str = String(raw || '').trim();
  if (!str) return '';
  const match = str.match(/\b(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+|AW-[A-Z0-9]+)\b/i);
  return match ? match[1].toUpperCase() : str;
}

function cleanGscToken(raw = '') {
  const str = String(raw || '').trim();
  if (!str) return '';
  const contentMatch = str.match(/content=["']([^"']+)["']/i);
  if (contentMatch) return contentMatch[1].trim();
  return str.replace(/^google-site-verification=/i, '').trim();
}

function cleanGtmId(raw = '') {
  const str = String(raw || '').trim();
  if (!str) return '';
  const match = str.match(/\b(GTM-[A-Z0-9]+)\b/i);
  return match ? match[1].toUpperCase() : str;
}

function cleanVerificationFileName(raw = '') {
  const str = String(raw || '').trim();
  if (!str) return '';
  const base = path.basename(str);
  if (/^google[a-zA-Z0-9_-]+\.html$/i.test(base)) {
    return base;
  }
  return '';
}

export default async function handler(req, res) {
  // Enforce server-side admin authentication
  if (!verifyAdmin(req, res)) return;

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
    seo: {
      googleAnalyticsId: '',
      googleSiteVerification: '',
      googleTagManagerId: '',
      googleVerificationFileName: '',
      googleVerificationFileContent: '',
    },
    shortcuts: [
      {
        id: 'sc-1',
        title: 'Google Analytics (GA4)',
        url: 'https://analytics.google.com/analytics/web/',
        category: 'Analytics',
        icon: '📊',
        description: 'Real-time traffic, active visitors, user acquisition, and events',
      },
      {
        id: 'sc-2',
        title: 'Microsoft Clarity',
        url: 'https://clarity.microsoft.com/projects',
        category: 'Heatmaps & UX',
        icon: '🔥',
        description: 'Session recordings, click heatmaps, and scroll behavior',
      },
      {
        id: 'sc-3',
        title: 'Google Search Console',
        url: 'https://search.google.com/search-console',
        category: 'SEO & Ranking',
        icon: '🔍',
        description: 'Index status, sitemaps, search keywords, and crawl diagnostics',
      },
      {
        id: 'sc-4',
        title: 'Zoho Webmail',
        url: 'https://mail.zoho.com/zm/',
        category: 'Email & Sales',
        icon: '✉️',
        description: 'Inbound leads, client communications, and quotation dispatches',
      },
      {
        id: 'sc-5',
        title: 'Vercel Dashboard & KV',
        url: 'https://vercel.com/dashboard',
        category: 'Infrastructure',
        icon: '▲',
        description: 'Deployments, edge function logs, and Upstash KV database',
      },
      {
        id: 'sc-6',
        title: 'WhatsApp Web',
        url: 'https://web.whatsapp.com',
        category: 'Direct Messaging',
        icon: '💬',
        description: 'Real-time chat with store owners and quotation sign-offs',
      },
    ],
  };

  if (req.method === 'GET') {
    try {
      const data = await readDataAsync('site-settings.json', defaultSettings);
      return res.status(200).json({
        ...defaultSettings,
        ...data,
        contact: {
          ...defaultSettings.contact,
          ...(data.contact || {}),
        },
        seo: {
          ...defaultSettings.seo,
          ...(data.seo || {}),
        },
        shortcuts: Array.isArray(data.shortcuts) && data.shortcuts.length > 0 ? data.shortcuts : defaultSettings.shortcuts,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read settings' });
    }
  }

  if (req.method === 'POST') {
    try {
      const current = await readDataAsync('site-settings.json', defaultSettings);
      const incomingSeo = req.body.seo || {};

      const fileName =
        incomingSeo.googleVerificationFileName !== undefined
          ? cleanVerificationFileName(incomingSeo.googleVerificationFileName)
          : current.seo?.googleVerificationFileName || '';

      const fileContent =
        incomingSeo.googleVerificationFileContent !== undefined
          ? String(incomingSeo.googleVerificationFileContent || '').trim()
          : current.seo?.googleVerificationFileContent || (fileName ? `google-site-verification: ${fileName}` : '');

      if (fileName) {
        try {
          const publicFilePath = path.join(process.cwd(), 'public', fileName);
          fs.writeFileSync(
            publicFilePath,
            fileContent || `google-site-verification: ${fileName}`,
            'utf8'
          );
        } catch (err) {
          // On read-only serverless filesystems, /api/google-verify handles it via next.config.js rewrite
        }
      }

      const updatedSeo = {
        ...defaultSettings.seo,
        ...(current.seo || {}),
        ...(incomingSeo.googleAnalyticsId !== undefined
          ? { googleAnalyticsId: cleanAnalyticsId(incomingSeo.googleAnalyticsId) }
          : {}),
        ...(incomingSeo.googleSiteVerification !== undefined
          ? { googleSiteVerification: cleanGscToken(incomingSeo.googleSiteVerification) }
          : {}),
        ...(incomingSeo.googleTagManagerId !== undefined
          ? { googleTagManagerId: cleanGtmId(incomingSeo.googleTagManagerId) }
          : {}),
        googleVerificationFileName: fileName,
        googleVerificationFileContent: fileContent,
      };

      const updated = {
        ...current,
        ...req.body,
        promo: {
          ...current.promo,
          ...(req.body.promo || {}),
        },
        contact: {
          ...defaultSettings.contact,
          ...(current.contact || {}),
          ...(req.body.contact || {}),
        },
        seo: updatedSeo,
        shortcuts: Array.isArray(req.body.shortcuts)
          ? req.body.shortcuts
          : current.shortcuts || defaultSettings.shortcuts,
      };

      const result = await writeDataAsync('site-settings.json', updated);
      return res.status(200).json({
        success: true,
        settings: updated,
        persistedTo: result.persistedTo,
        cloudPersisted: result.cloudPersisted,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save settings: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
