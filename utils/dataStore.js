import fs from 'fs';
import path from 'path';
import os from 'os';

export const DEFAULT_CONFIRMATION_SUBJECT = 'Your 3D store preview for {{storeName}}';

export const DEFAULT_CONFIRMATION_BODY = [
  'Hi {{firstName}},',
  '',
  'Thanks for reaching out to ManageMyWeb. I received your request for a 3D storefront preview for {{storeName}}.',
  '',
  'Our team is reviewing your catalog right now and putting together a working 3D prototype so you can see how your products look inside an interactive showroom. I’ll send your private preview link over within 48 hours.',
  '',
  'Quick question while we set this up: are there 2 or 3 best-selling products on your site you’d especially like us to feature on the main display?',
  '',
  'You can reply directly to this email, or message me on WhatsApp (+92 317 4075023) anytime.',
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

function getBundledPath(filename) {
  return path.join(process.cwd(), 'data', filename);
}

function getTmpPath(filename) {
  return path.join(os.tmpdir(), `mmw_${filename}`);
}

export function readJsonData(filename, fallback = {}) {
  const tmpPath = getTmpPath(filename);
  const bundledPath = getBundledPath(filename);

  // 1. Prefer runtime-updated file in /tmp if it exists (used on Vercel serverless)
  if (fs.existsSync(tmpPath)) {
    try {
      return JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
    } catch (e) {
      // fall through to bundled file
    }
  }

  // 2. Read from bundled data/ directory
  if (fs.existsSync(bundledPath)) {
    try {
      return JSON.parse(fs.readFileSync(bundledPath, 'utf8'));
    } catch (e) {
      return fallback;
    }
  }

  return fallback;
}

export function writeJsonData(filename, data) {
  const jsonString = JSON.stringify(data, null, 2);
  const bundledPath = getBundledPath(filename);
  const tmpPath = getTmpPath(filename);

  // Always write to /tmp so serverless invocations in the same instance see the latest data
  try {
    fs.writeFileSync(tmpPath, jsonString, 'utf8');
  } catch (e) {
    // ignore tmp write errors
  }

  // Also write to data/ directory when running locally (writable filesystem)
  try {
    fs.writeFileSync(bundledPath, jsonString, 'utf8');
    return { persistedTo: 'disk' };
  } catch (err) {
    // On Vercel (/var/task is EROFS read-only), /tmp succeeded above
    return { persistedTo: 'tmp' };
  }
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

  return {
    host,
    port,
    // Port 465 always uses implicit SSL (secure: true); Port 587 uses STARTTLS (secure: false)
    secure: port === 465,
    user,
    pass,
    fromEmail,
    fromName,
    notifyEmail,
    confirmationSubject,
    confirmationBody,
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
    .replace(/\{\{\s*category\s*\}\}/gi, variables.category || 'E-Commerce');
}

export function getCookieStore() {
  const raw = readJsonData('cookie-stats.json', DEFAULT_COOKIE_DATA);
  return {
    config: {
      ...DEFAULT_COOKIE_DATA.config,
      ...(raw.config || {}),
    },
    stats: {
      ...DEFAULT_COOKIE_DATA.stats,
      ...(raw.stats || {}),
      pageViewsByPath: {
        ...DEFAULT_COOKIE_DATA.stats.pageViewsByPath,
        ...(raw.stats?.pageViewsByPath || {}),
      },
    },
    recentConsents: Array.isArray(raw.recentConsents) ? raw.recentConsents : [],
  };
}
