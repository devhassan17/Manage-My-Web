import fs from 'fs';
import path from 'path';
import os from 'os';

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
    isConfigured: true,
  });

  const host = process.env.SMTP_HOST || saved.host || 'smtp.zoho.com';
  const port = Number(process.env.SMTP_PORT || saved.port || 465);
  const user = process.env.SMTP_USER || saved.user || 'sales@managemyweb.co';
  const pass = process.env.SMTP_PASS || saved.pass || '';
  const fromEmail = process.env.SMTP_FROM_EMAIL || saved.fromEmail || user;
  const fromName = process.env.SMTP_FROM_NAME || saved.fromName || 'ManageMyWeb';

  return {
    host,
    port,
    // Port 465 always uses implicit SSL (secure: true); Port 587 uses STARTTLS (secure: false)
    secure: port === 465,
    user,
    pass,
    fromEmail,
    fromName,
    isConfigured: Boolean(host && user && pass),
  };
}

