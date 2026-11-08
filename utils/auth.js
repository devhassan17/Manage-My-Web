import crypto from 'crypto';
import { readJsonData, writeJsonData } from './dataStore';

// Default strong password for ManageMyWeb Admin Dashboard
// Can be customized via ADMIN_PASSWORD environment variable in Vercel / .env.local
export const DEFAULT_ADMIN_PASSWORD = 'MMW_Studio_2026!#SecureAdmin99';

// Signing secret for HMAC-SHA256 tokens
const TOKEN_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  process.env.SECRET_KEY ||
  'mmw_secret_salt_2026_studio_admin_c09e3a7f82b41d';

// Token lifetime: 7 days in milliseconds
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export function getAdminPassword() {
  // 1. Check environment variable
  if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim()) {
    return process.env.ADMIN_PASSWORD.trim();
  }

  // 2. Check saved password in settings if user updated it from admin panel
  try {
    const settings = readJsonData('site-settings.json', {});
    if (settings.security?.adminPassword && settings.security.adminPassword.trim()) {
      return settings.security.adminPassword.trim();
    }
  } catch (e) {
    // ignore
  }

  // 3. Fallback to strong default
  return DEFAULT_ADMIN_PASSWORD;
}

export function isDefaultPasswordInUse() {
  const current = getAdminPassword();
  return current === DEFAULT_ADMIN_PASSWORD;
}

export function generateAdminToken() {
  const now = Date.now();
  const payload = {
    role: 'admin',
    iat: now,
    exp: now + TOKEN_EXPIRY_MS,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payloadStr)
    .digest('base64url');

  return {
    token: `${payloadStr}.${signature}`,
    expiresAt: new Date(payload.exp).toISOString(),
  };
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.trim().split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payloadStr)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload || payload.role !== 'admin') return null;

    // Check expiration
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (e) {
    return null;
  }
}

export function extractBearerToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && typeof authHeader === 'string') {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match) return match[1].trim();
  }

  // Also support custom header x-admin-token
  const xToken = req.headers['x-admin-token'];
  if (xToken && typeof xToken === 'string') {
    return xToken.trim();
  }

  return null;
}

/**
 * Server-side middleware helper for protecting admin API routes.
 * Usage:
 *   export default async function handler(req, res) {
 *     if (!verifyAdmin(req, res)) return;
 *     ...
 *   }
 */
export function verifyAdmin(req, res) {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: Admin authentication token required in Authorization header.',
    });
    return false;
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    res.status(401).json({
      error: 'Unauthorized: Invalid or expired admin session token. Please sign in again.',
    });
    return false;
  }

  return true;
}

