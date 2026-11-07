import { getSmtpConfig, writeJsonData } from '../../../utils/dataStore';

export default function handler(req, res) {
  // GET: Return current SMTP config (mask password)
  if (req.method === 'GET') {
    try {
      const data = getSmtpConfig();
      return res.status(200).json({
        ...data,
        pass: data.pass ? '••••••••' : '',
        hasPasswordSet: Boolean(data.pass),
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read SMTP config' });
    }
  }

  // POST: Update SMTP config
  if (req.method === 'POST') {
    try {
      const existing = getSmtpConfig();
      const { host, port, user, pass, fromEmail, fromName } = req.body;

      const resolvedPort = port !== undefined ? Number(port) : existing.port || 465;
      // Automatically enforce secure=true ONLY for port 465 (implicit SSL) and secure=false for port 587 (STARTTLS)
      const resolvedSecure = resolvedPort === 465;

      const updated = {
        host: host !== undefined ? host.trim() : existing.host || 'smtp.zoho.com',
        port: resolvedPort,
        secure: resolvedSecure,
        user: user !== undefined ? user.trim() : existing.user || 'sales@managemyweb.co',
        // If password is not changed (e.g. user submitted mask), keep existing
        pass: pass && pass !== '••••••••' ? pass : existing.pass || '',
        fromEmail: fromEmail !== undefined ? fromEmail.trim() : existing.fromEmail || 'sales@managemyweb.co',
        fromName: fromName !== undefined ? fromName.trim() : existing.fromName || 'ManageMyWeb',
        isConfigured: true,
      };

      writeJsonData('smtp-config.json', updated);

      return res.status(200).json({
        success: true,
        message: 'SMTP settings saved.',
        config: {
          ...updated,
          pass: updated.pass ? '••••••••' : '',
          hasPasswordSet: Boolean(updated.pass),
        },
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update SMTP config: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
