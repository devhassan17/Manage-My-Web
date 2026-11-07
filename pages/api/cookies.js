import { getCookieStore, writeJsonData, DEFAULT_COOKIE_DATA } from '../../utils/dataStore';

function parseDeviceLabel(userAgent = '') {
  const ua = userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|mobile/.test(ua);
  const os = ua.includes('mac')
    ? 'macOS'
    : ua.includes('win')
    ? 'Windows'
    : ua.includes('iphone') || ua.includes('ipad')
    ? 'iOS'
    : ua.includes('android')
    ? 'Android'
    : 'Linux/Other';
  const browser = ua.includes('edg')
    ? 'Edge'
    : ua.includes('chrome') && !ua.includes('edg')
    ? 'Chrome'
    : ua.includes('safari') && !ua.includes('chrome')
    ? 'Safari'
    : ua.includes('firefox')
    ? 'Firefox'
    : 'Browser';

  return `${isMobile ? 'Mobile' : 'Desktop'} · ${os} / ${browser}`;
}

export default function handler(req, res) {
  const store = getCookieStore();

  // GET: Return cookie config + stats + recent logs
  if (req.method === 'GET') {
    return res.status(200).json(store);
  }

  // POST: Record visitor consent decision OR pageview event
  if (req.method === 'POST') {
    try {
      const { eventType = 'consent', decision, categories, path = '/', visitorId } = req.body || {};

      if (eventType === 'pageview') {
        const cleanPath = (path || '/').split('?')[0] || '/';
        store.stats.totalPageViews = (store.stats.totalPageViews || 0) + 1;
        store.stats.pageViewsByPath[cleanPath] = (store.stats.pageViewsByPath[cleanPath] || 0) + 1;
        writeJsonData('cookie-stats.json', store);
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

      const entry = {
        id: `consent-${Date.now()}`,
        timestamp: new Date().toISOString(),
        decision: resolvedDecision,
        categories: resolvedCategories,
        path: cleanPath,
        device: parseDeviceLabel(req.headers['user-agent'] || ''),
        visitorId: visitorId || `v-${Math.random().toString(36).substring(2, 8)}`,
      };

      store.recentConsents.unshift(entry);
      if (store.recentConsents.length > 100) {
        store.recentConsents = store.recentConsents.slice(0, 100);
      }

      writeJsonData('cookie-stats.json', store);

      return res.status(200).json({
        success: true,
        entry,
        stats: store.stats,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to record cookie consent: ' + e.message });
    }
  }

  // PUT: Update cookie banner configuration from Admin Dashboard
  if (req.method === 'PUT') {
    try {
      const { config } = req.body || {};
      store.config = {
        ...store.config,
        ...(config || {}),
      };
      writeJsonData('cookie-stats.json', store);
      return res.status(200).json({
        success: true,
        message: 'Cookie banner configuration updated.',
        store,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update cookie config: ' + e.message });
    }
  }

  // DELETE: Reset cookie statistics from Admin Dashboard
  if (req.method === 'DELETE') {
    try {
      const resetStore = {
        config: store.config,
        stats: {
          ...DEFAULT_COOKIE_DATA.stats,
          pageViewsByPath: {},
        },
        recentConsents: [],
      };
      writeJsonData('cookie-stats.json', resetStore);
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

