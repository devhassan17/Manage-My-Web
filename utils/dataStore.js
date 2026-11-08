import fs from 'fs';
import path from 'path';
import os from 'os';

export const DEFAULT_CONFIRMATION_SUBJECT = 'Step 1: Your 3D store demo for {{storeName}}';

export const DEFAULT_CONFIRMATION_BODY = [
  'Hi {{firstName}},',
  '',
  'Thanks for reaching out to ManageMyWeb. I received your request for Step 1: your complimentary 3D storefront demo for {{storeName}}.',
  '',
  'Here is how our 2-step process works:',
  '1. Free 3D Demo (In Progress): Our team is building an interactive 3D preview featuring your products and will send your private walkthrough link within 48 hours.',
  '2. Custom Quotation: Once you explore the 3D demo with your team and share any adjustments, we will prepare a custom quotation tailored to your exact catalog scope.',
  '',
  'Quick question while we set this up: are there 2 or 3 best-selling products on your site you’d especially like us to feature on the main display?',
  '',
  'You can reply directly to this email, or message me on WhatsApp (+92 317 4075023) anytime.',
  '',
  'Best regards,',
  'ManageMyWeb',
  'sales@managemyweb.co · +92 317 4075023',
].join('\n');

export const DEFAULT_QUOTATION_SUBJECT = 'Your custom quotation request for {{storeName}}';

export const DEFAULT_QUOTATION_BODY = [
  'Hi {{firstName}},',
  '',
  'Thanks for contacting ManageMyWeb. I received your request for a custom quotation for {{storeName}} ({{packageScope}}).',
  '',
  'Our engineering team is reviewing your store requirements right now and putting together an itemized proposal with scope, timeline, and investment options. I will send your custom quotation over within 24 hours.',
  '',
  'Also, if you would like us to include a complimentary 3D preview of 2 or 3 of your products alongside your quotation, just reply with the product links or message me on WhatsApp (+92 317 4075023).',
  '',
  'Best regards,',
  'ManageMyWeb',
  'sales@managemyweb.co · +92 317 4075023',
].join('\n');

export const DEFAULT_COOKIE_DATA = {
  config: {
    enabled: true,
    bannerTitle: 'Cookie & Privacy Preferences',
    bannerText:
      'We use cookies to deliver smooth 3D WebGL storefront previews, measure site performance, and improve your browsing experience. You can accept all cookies or customize your preferences at any time.',
    privacyPolicyUrl: '/privacy',
    defaultAnalytics: true,
    defaultMarketing: true,
    defaultFunctional: true,
  },
  stats: {
    totalDecisions: 0,
    acceptedAll: 0,
    essentialOnly: 0,
    customized: 0,
    analyticsOptIn: 0,
    marketingOptIn: 0,
    functionalOptIn: 0,
    totalPageViews: 0,
    pageViewsByPath: {},
  },
  recentConsents: [],
};

// In-memory cache for ultra-fast serverless execution
const memoryCache = new Map();

function getBundledPath(filename) {
  return path.join(process.cwd(), 'data', filename);
}

function getTmpPath(filename) {
  return path.join(os.tmpdir(), `mmw_${filename}`);
}

/**
 * Synchronous read fallback (used by initial static rendering and sync routes)
 */
export function readJsonData(filename, fallback = {}) {
  // Check memory cache first
  if (memoryCache.has(filename)) {
    return memoryCache.get(filename);
  }

  const tmpPath = getTmpPath(filename);
  const bundledPath = getBundledPath(filename);

  // 1. Runtime-updated file in /tmp
  if (fs.existsSync(tmpPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
      memoryCache.set(filename, parsed);
      return parsed;
    } catch (e) {}
  }

  // 2. Bundled data/ directory
  if (fs.existsSync(bundledPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(bundledPath, 'utf8'));
      memoryCache.set(filename, parsed);
      return parsed;
    } catch (e) {
      return fallback;
    }
  }

  return fallback;
}

/**
 * Synchronous write fallback
 */
export function writeJsonData(filename, data) {
  memoryCache.set(filename, data);
  const jsonString = JSON.stringify(data, null, 2);
  const bundledPath = getBundledPath(filename);
  const tmpPath = getTmpPath(filename);

  // Always write to /tmp for current serverless instance
  try {
    fs.writeFileSync(tmpPath, jsonString, 'utf8');
  } catch (e) {}

  // Write to data/ directory if writable (e.g. local dev environment)
  try {
    fs.writeFileSync(bundledPath, jsonString, 'utf8');
    return { persistedTo: 'disk' };
  } catch (err) {
    return { persistedTo: 'tmp' };
  }
}

export function getKvCredentials() {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_API_URL ||
    process.env.DATABASE_REST_URL ||
    process.env.KV_URL ||
    process.env.STORAGE_URL ||
    '';
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_API_TOKEN ||
    process.env.DATABASE_REST_TOKEN ||
    '';

  const isConfigured = Boolean(url && token);
  const provider =
    process.env.KV_REST_API_URL || process.env.KV_URL
      ? 'Vercel KV'
      : process.env.STORAGE_REST_API_URL || process.env.STORAGE_URL
      ? 'Upstash KV'
      : process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_API_URL
      ? 'Upstash Redis'
      : isConfigured
      ? 'Cloud KV REST'
      : 'Local Disk & Tmp';

  return { url, token, isConfigured, provider };
}

/**
 * Execute a command against Cloud Redis KV (Upstash / Vercel KV)
 */
async function executeKvCommand(commandArray) {
  const { url, token, isConfigured } = getKvCredentials();
  if (!isConfigured) return null;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commandArray),
    });

    if (!res.ok) {
      console.warn(`[Cloud KV Error] HTTP ${res.status}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data?.result !== undefined ? data.result : data;
  } catch (err) {
    console.warn('[Cloud KV Fetch Error]', err.message);
    return null;
  }
}

/**
 * Read data asynchronously from Cloud KV if available, with fallback to /tmp, memory cache, and local disk.
 */
export async function readDataAsync(filename, fallback = {}) {
  const cacheKey = `mmw_${filename}`;
  const { isConfigured } = getKvCredentials();

  // 1. Try reading from Cloud KV if configured
  if (isConfigured) {
    try {
      const rawResult = await executeKvCommand(['GET', cacheKey]);
      if (rawResult !== null && rawResult !== undefined) {
        let parsed = null;
        if (typeof rawResult === 'string') {
          try {
            parsed = JSON.parse(rawResult);
          } catch (e) {
            parsed = rawResult;
          }
        } else {
          parsed = rawResult;
        }

        if (parsed !== null && parsed !== undefined) {
          memoryCache.set(filename, parsed);
          try {
            fs.writeFileSync(getTmpPath(filename), JSON.stringify(parsed, null, 2), 'utf8');
          } catch (e) {}
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[Cloud KV readDataAsync error]', e.message);
    }
  }

  // 2. Read from local cache (synchronous fallback)
  const localData = readJsonData(filename, fallback);

  // If Cloud KV is configured but the key was empty, seed Cloud KV with localData
  if (isConfigured && localData !== undefined) {
    try {
      await executeKvCommand(['SET', cacheKey, JSON.stringify(localData)]);
    } catch (e) {}
  }

  return localData;
}

/**
 * Write data asynchronously to Cloud KV (persisting across rebuilds) and local caches.
 */
export async function writeDataAsync(filename, data) {
  const cacheKey = `mmw_${filename}`;
  const jsonString = JSON.stringify(data, null, 2);

  // 1. Update memory cache
  memoryCache.set(filename, data);

  // 2. Update local files (/tmp and bundled data/ if writable)
  const localRes = writeJsonData(filename, data);

  // 3. Update Cloud KV if configured (survives site rebuilds!)
  const { isConfigured, provider } = getKvCredentials();
  let cloudSuccess = false;

  if (isConfigured) {
    try {
      const setResult = await executeKvCommand(['SET', cacheKey, jsonString]);
      cloudSuccess = setResult === 'OK' || Boolean(setResult);
    } catch (e) {
      console.warn('[Cloud KV write error]', e.message);
    }
  }

  return {
    ...localRes,
    cloudPersisted: cloudSuccess,
    cloudProvider: isConfigured ? provider : null,
  };
}

export function getSmtpConfig() {
  const saved = readJsonData('smtp-config.json', {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    user: 'sales@managemyweb.co',
    pass: '',
    fromEmail: 'sales@managemyweb.co',
    fromName: 'ManageMyWeb',
    notifyEmail: 'sales@managemyweb.co',
    confirmationSubject: DEFAULT_CONFIRMATION_SUBJECT,
    confirmationBody: DEFAULT_CONFIRMATION_BODY,
    quotationSubject: DEFAULT_QUOTATION_SUBJECT,
    quotationBody: DEFAULT_QUOTATION_BODY,
    isConfigured: true,
  });

  const host = process.env.SMTP_HOST || saved.host || 'smtp.zoho.com';
  const port = Number(process.env.SMTP_PORT || saved.port || 465);
  const user = process.env.SMTP_USER || saved.user || 'sales@managemyweb.co';
  const pass = process.env.SMTP_PASS || saved.pass || '';
  const fromEmail = process.env.SMTP_FROM_EMAIL || saved.fromEmail || user;
  const fromName = process.env.SMTP_FROM_NAME || saved.fromName || 'ManageMyWeb';
  const notifyEmail = process.env.SMTP_NOTIFY_EMAIL || saved.notifyEmail || fromEmail || user;
  const confirmationSubject = saved.confirmationSubject || DEFAULT_CONFIRMATION_SUBJECT;
  const confirmationBody = saved.confirmationBody || DEFAULT_CONFIRMATION_BODY;
  const quotationSubject = saved.quotationSubject || DEFAULT_QUOTATION_SUBJECT;
  const quotationBody = saved.quotationBody || DEFAULT_QUOTATION_BODY;

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    fromEmail,
    fromName,
    notifyEmail,
    confirmationSubject,
    confirmationBody,
    quotationSubject,
    quotationBody,
    isConfigured: Boolean(host && user && pass),
  };
}

export function renderEmailTemplate(template, variables = {}) {
  if (!template) return '';
  return template
    .replace(/\{\{\s*firstName\s*\}\}/gi, variables.firstName || 'there')
    .replace(/\{\{\s*name\s*\}\}/gi, variables.name || 'there')
    .replace(/\{\{\s*storeName\s*\}\}/gi, variables.storeName || 'your store')
    .replace(/\{\{\s*websiteUrl\s*\}\}/gi, variables.websiteUrl || '')
    .replace(/\{\{\s*category\s*\}\}/gi, variables.category || 'E-Commerce')
    .replace(/\{\{\s*packageScope\s*\}\}/gi, variables.packageScope || 'Custom 3D Storefront & Web Operations');
}

export function getCookieStore() {
  const raw = readJsonData('cookie-stats.json', DEFAULT_COOKIE_DATA);
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
