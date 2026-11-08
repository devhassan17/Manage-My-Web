import {
  getAdminPassword,
  generateAdminToken,
  verifyAdminToken,
  extractBearerToken,
  isDefaultPasswordInUse,
  DEFAULT_ADMIN_PASSWORD,
} from '../../../utils/auth';
import { readJsonData, writeJsonData } from '../../../utils/dataStore';

export default function handler(req, res) {
  // GET: Verify existing token session
  if (req.method === 'GET') {
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({ authenticated: false, error: 'No token provided' });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return res.status(401).json({ authenticated: false, error: 'Token expired or invalid' });
    }

    return res.status(200).json({
      authenticated: true,
      role: 'admin',
      expiresAt: new Date(payload.exp).toISOString(),
      defaultPasswordInUse: isDefaultPasswordInUse(),
    });
  }

  // POST: Sign in with password OR change password
  if (req.method === 'POST') {
    const { action = 'login', password, currentPassword, newPassword } = req.body || {};

    // Password change action
    if (action === 'change_password') {
      const token = extractBearerToken(req);
      const payload = verifyAdminToken(token);
      if (!payload) {
        return res.status(401).json({ error: 'Unauthorized: Valid admin token required to change password' });
      }

      const activePassword = getAdminPassword();
      if (!currentPassword || currentPassword !== activePassword) {
        return res.status(400).json({ error: 'Current password does not match.' });
      }

      if (!newPassword || newPassword.length < 10) {
        return res.status(400).json({
          error: 'New password must be at least 10 characters long and include numbers and special characters.',
        });
      }

      // Save new password in site-settings.json
      const settings = readJsonData('site-settings.json', {});
      settings.security = {
        ...(settings.security || {}),
        adminPassword: newPassword.trim(),
        passwordUpdatedAt: new Date().toISOString(),
      };
      writeJsonData('site-settings.json', settings);

      const tokenObj = generateAdminToken();
      return res.status(200).json({
        success: true,
        message: 'Admin password updated successfully.',
        token: tokenObj.token,
        expiresAt: tokenObj.expiresAt,
        defaultPasswordInUse: false,
      });
    }

    // Default: Login action
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const activePassword = getAdminPassword();
    if (password !== activePassword) {
      return res.status(401).json({
        error: 'Incorrect admin password. Please enter the strong password configured for your studio.',
      });
    }

    const { token, expiresAt } = generateAdminToken();
    return res.status(200).json({
      success: true,
      token,
      expiresAt,
      defaultPasswordInUse: isDefaultPasswordInUse(),
      message: 'Authentication successful.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

