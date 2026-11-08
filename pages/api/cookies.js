import { verifyAdmin } from '../../utils/auth';
import {
  getCookieStore,
  readDataAsync,
  writeDataAsync,
  DEFAULT_COOKIE_DATA,
} from '../../utils/dataStore';

function getCountryFlag(countryCode = '') {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
}

function parseDetailedClient(uaString = '') {
  const ua = uaString.toLowerCase();

  // Operating System
  let os = 'Unknown OS';
  if (ua.includes('mac os x') || ua.includes('macintosh')) {
    const match = uaString.match(/Mac OS X ([0-9_]+)/i);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  } else if (ua.includes('windows nt 10.0')) {
    os = 'Windows 10/11';
  } else if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('iphone')) {
    const match = uaString.match(/OS ([0-9_]+)/i);
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS (iPhone)';
  } else if (ua.includes('ipad')) {
    os = 'iPadOS';
  } else if (ua.includes('android')) {
    const match = uaString.match(/Android ([0-9.]+)/i);
    os = match ? `Android ${match[1]}` : 'Android';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  }

  // Browser
  let browser = 'Unknown Browser';
  if (ua.includes('edg/')) {
    const match = uaString.match(/Edg\/([0-9.]+)/i);
    browser = `Microsoft Edge ${match ? match[1].split('.')[0] : ''}`.trim();
  } else if (ua.includes('chrome/') && !ua.includes('edg/')) {
    const match = uaString.match(/Chrome\/([0-9.]+)/i);
    browser = `Google Chrome ${match ? match[1].split('.')[0] : ''}`.trim();
  } else if (ua.includes('safari/') && !ua.includes('chrome/')) {
    const match = uaString.match(/Version\/([0-9.]+)/i);
    browser = `Apple Safari ${match ? match[1].split('.')[0] : ''}`.trim();
  } else if (ua.includes('firefox/')) {
    const match = uaString.match(/Firefox\/([0-9.]+)/i);
    browser = `Mozilla Firefox ${match ? match[1].split('.')[0] : ''}`.trim();
  }

  // Form factor
  let deviceType = 'Desktop';
  if (/mobile|iphone|android|ipod/.test(ua)) deviceType = 'Mobile';
  if (/ipad|tablet/.test(ua)) deviceType = 'Tablet';

  return {
    os,
    browser,
    deviceType,
    summary: `${deviceType} · ${os} / ${browser}`,
  };
}

function resolveTrafficSource(referrer = '') {
  if (!referrer || referrer === 'Direct / Bookmark' || referrer === '') {
    return 'Direct Navigation / Bookmark';
  }
  const refLower = referrer.toLowerCase();
  if (refLower.includes('google.')) return 'Google Organic Search';
  if (refLower.includes('bing.')) return 'Bing Search';
  if (refLower.includes('duckduckgo.')) return 'DuckDuckGo';
  if (refLower.includes('linkedin.')) return 'LinkedIn Network';
  if (refLower.includes('instagram.')) return 'Instagram';
  if (refLower.includes('twitter.') || refLower.includes('x.com')) return 'X / Twitter';
  if (refLower.includes('facebook.')) return 'Facebook';
  if (refLower.includes('youtube.')) return 'YouTube';
  if (refLower.includes('reddit.')) return 'Reddit';
  try {
    const url = new URL(referrer);
    return `Referral: ${url.hostname}`;
  } catch (e) {
    return referrer;
  }
}

async function resolveCookieStore() {
  const raw = await readDataAsync('cookie-stats.json', DEFAULT_COOKIE_DATA);
  return {
    config: {
      ...DEFAULT_COOKIE_DATA.config,
      ...(raw?.config || {}),
    },
    stats: {
      ...DEFAULT_COOKIE_DATA.stats,
      ...(raw?.stats || {}),
      pageViewsByPath: {
        ...DEFAULT_COOKIE_DATA.stats.pageViewsByPath,
        ...(raw?.stats?.pageViewsByPath || {}),
      },
    },
    recentConsents: Array.isArray(raw?.recentConsents) ? raw.recentConsents : [],
  };
}

export default async function handler(req, res) {
  const store = await resolveCookieStore();

  // GET: Return cookie config + stats + recent logs
  if (req.method === 'GET') {
    return res.status(200).json(store);
  }

  // POST: Record visitor consent decision OR pageview event (public endpoint)
  if (req.method === 'POST') {
    try {
      const {
        eventType = 'consent',
        decision,
        categories,
        path = '/',
        visitorId,
        telemetry = {},
      } = req.body || {};

      if (eventType === 'pageview') {
        const cleanPath = (path || '/').split('?')[0] || '/';
        store.stats.totalPageViews = (store.stats.totalPageViews || 0) + 1;
        store.stats.pageViewsByPath[cleanPath] = (store.stats.pageViewsByPath[cleanPath] || 0) + 1;
        await writeDataAsync('cookie-stats.json', store);
        return res.status(200).json({ success: true });
      }

      // Consent decision event
      const resolvedDecision = decision || 'accepted_all'; // 'accepted_all' | 'essential_only' | 'custom'
      const resolvedCategories = {
        essential: true,
        analytics: Boolean(categories?.analytics),
        marketing: Boolean(categories?.marketing),
        functional: Boolean(categories?.functional),
      };

      store.stats.totalDecisions = (store.stats.totalDecisions || 0) + 1;
      if (resolvedDecision === 'accepted_all') {
        store.stats.acceptedAll = (store.stats.acceptedAll || 0) + 1;
      } else if (resolvedDecision === 'essential_only') {
        store.stats.essentialOnly = (store.stats.essentialOnly || 0) + 1;
      } else {
        store.stats.customized = (store.stats.customized || 0) + 1;
      }

      if (resolvedCategories.analytics) {
        store.stats.analyticsOptIn = (store.stats.analyticsOptIn || 0) + 1;
      }
      if (resolvedCategories.marketing) {
        store.stats.marketingOptIn = (store.stats.marketingOptIn || 0) + 1;
      }
      if (resolvedCategories.functional) {
        store.stats.functionalOptIn = (store.stats.functionalOptIn || 0) + 1;
      }

      const cleanPath = (path || '/').split('?')[0] || '/';
      store.stats.totalPageViews = (store.stats.totalPageViews || 0) + 1;
      store.stats.pageViewsByPath[cleanPath] = (store.stats.pageViewsByPath[cleanPath] || 0) + 1;

      // Extract client environment & Geo headers
      const rawUA = req.headers['user-agent'] || '';
      const clientInfo = parseDetailedClient(rawUA);
      const countryCode = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
      const city = req.headers['x-vercel-ip-city'] || '';
      const region = req.headers['x-vercel-ip-country-region'] || '';
      const flag = getCountryFlag(countryCode);
      const ipAddress = (
        req.headers['x-forwarded-for'] ||
        req.socket?.remoteAddress ||
        '127.0.0.1'
      ).split(',')[0].trim();
      const edgePoP = req.headers['x-vercel-id'] || 'Vercel Edge Global';
      const timezone = req.headers['x-vercel-ip-timezone'] || telemetry.timezone || 'UTC';
      const rawReferrer = telemetry.referrer || req.headers['referer'] || 'Direct / Bookmark';

      const entry = {
        id: `consent-${Date.now()}`,
        timestamp: new Date().toISOString(),
        decision: resolvedDecision,
        categories: resolvedCategories,
        path: cleanPath,
        visitorId: visitorId || `v-${Math.random().toString(36).substring(2, 8)}`,

        // Device & Environment
        device: clientInfo.summary,
        deviceType: clientInfo.deviceType,
        os: clientInfo.os,
        browser: clientInfo.browser,
        userAgent: rawUA,

        // Geo & Network Details
        country: countryCode || 'US',
        countryFlag: flag,
        city: city || 'Local / Edge',
        region: region || '',
        location: city ? `${city}, ${region ? region + ', ' : ''}${countryCode || ''}`.trim() : countryCode ? `${countryCode}` : 'Global Edge Network',
        ip: ipAddress,
        edgePoP,
        timezone,
        latitude: req.headers['x-vercel-ip-latitude'] || '',
        longitude: req.headers['x-vercel-ip-longitude'] || '',

        // Traffic Acquisition & Source
        referrer: rawReferrer,
        trafficSource: resolveTrafficSource(rawReferrer),
        utm: telemetry.utm || {},

        // Display & Hardware Telemetry
        screenResolution: telemetry.screenResolution || 'Standard Viewport',
        viewportSize: telemetry.viewportSize || '',
        pixelRatio: telemetry.pixelRatio || '1x',
        colorScheme: telemetry.colorScheme || 'Light Mode',
        language: telemetry.language || req.headers['accept-language']?.split(',')[0] || 'en-US',
        touchPoints: telemetry.touchPoints || 'Mouse / Trackpad',
        hardwareConcurrency: telemetry.hardwareConcurrency || '',
        deviceMemory: telemetry.deviceMemory || '',
        networkType: telemetry.networkType || '',
        webgl: telemetry.webgl || 'WebGL 2.0 (Active)',

        // Legal & Compliance Audit
        auditProtocol: 'GDPR Article 7 & CCPA Compliant Audit Record',
      };

      store.recentConsents.unshift(entry);
      if (store.recentConsents.length > 100) {
        store.recentConsents = store.recentConsents.slice(0, 100);
      }

      await writeDataAsync('cookie-stats.json', store);

      return res.status(200).json({
        success: true,
        entry,
        stats: store.stats,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to record cookie consent: ' + e.message });
    }
  }

  // PUT: Update cookie banner configuration from Admin Dashboard (Admin Only)
  if (req.method === 'PUT') {
    if (!verifyAdmin(req, res)) return;
    try {
      const { config } = req.body || {};
      store.config = {
        ...store.config,
        ...(config || {}),
      };
      await writeDataAsync('cookie-stats.json', store);
      return res.status(200).json({
        success: true,
        message: 'Cookie banner configuration updated.',
        store,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update cookie config: ' + e.message });
    }
  }

  // DELETE: Reset cookie statistics from Admin Dashboard (Admin Only)
  if (req.method === 'DELETE') {
    if (!verifyAdmin(req, res)) return;
    try {
      const resetStore = {
        config: store.config,
        stats: {
          ...DEFAULT_COOKIE_DATA.stats,
          pageViewsByPath: {},
        },
        recentConsents: [],
      };
      await writeDataAsync('cookie-stats.json', resetStore);
      return res.status(200).json({
        success: true,
        message: 'Cookie consent statistics reset.',
        store: resetStore,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to reset cookie stats: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
