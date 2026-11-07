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
    // Port 465 always uses implicit SSL (secure: true); Port 587 uses STARTTLS (secure: false)
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
