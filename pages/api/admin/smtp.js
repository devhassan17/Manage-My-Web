import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const smtpFilePath = path.join(process.cwd(), 'data', 'smtp-config.json');

  if (!fs.existsSync(smtpFilePath)) {
    fs.writeFileSync(
      smtpFilePath,
      JSON.stringify(
        {
          host: '',
          port: 587,
          secure: false,
          user: '',
          pass: '',
          fromEmail: '',
          fromName: 'ManageMyWeb Studio Concierge',
          isConfigured: false
        },
        null,
        2
      ),
      'utf8'
    );
  }

  // GET: Return current SMTP config (mask password)
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(smtpFilePath, 'utf8'));
      return res.status(200).json({
        ...data,
        pass: data.pass ? '••••••••' : '',
        hasPasswordSet: Boolean(data.pass)
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read SMTP config' });
    }
  }

  // POST: Update SMTP config
  if (req.method === 'POST') {
    try {
      const existing = JSON.parse(fs.readFileSync(smtpFilePath, 'utf8') || '{}');
      const {
        host,
        port,
        secure,
        user,
        pass,
        fromEmail,
        fromName,
        isConfigured
      } = req.body;

      const updated = {
        host: host !== undefined ? host.trim() : existing.host || '',
        port: port !== undefined ? Number(port) : existing.port || 587,
        secure: secure !== undefined ? Boolean(secure) : existing.secure || false,
        user: user !== undefined ? user.trim() : existing.user || '',
        // If password is not changed (e.g. user submitted mask), keep existing
        pass: pass && pass !== '••••••••' ? pass : existing.pass || '',
        fromEmail: fromEmail !== undefined ? fromEmail.trim() : existing.fromEmail || '',
        fromName: fromName !== undefined ? fromName.trim() : existing.fromName || 'ManageMyWeb Studio',
        isConfigured: isConfigured !== undefined ? Boolean(isConfigured) : true
      };

      fs.writeFileSync(smtpFilePath, JSON.stringify(updated, null, 2), 'utf8');

      return res.status(200).json({
        success: true,
        message: 'SMTP settings updated successfully.',
        config: {
          ...updated,
          pass: updated.pass ? '••••••••' : '',
          hasPasswordSet: Boolean(updated.pass)
        }
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update SMTP config: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
