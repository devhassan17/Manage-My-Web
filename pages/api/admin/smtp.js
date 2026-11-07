import {
  getSmtpConfig,
  readJsonData,
  writeJsonData,
  DEFAULT_CONFIRMATION_SUBJECT,
  DEFAULT_CONFIRMATION_BODY,
  DEFAULT_QUOTATION_SUBJECT,
  DEFAULT_QUOTATION_BODY,
} from '../../../utils/dataStore';

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

  // POST: Update SMTP config + confirmation & quotation email templates
  if (req.method === 'POST') {
    try {
      const existing = getSmtpConfig();
      const {
        host,
        port,
        user,
        pass,
        fromEmail,
        fromName,
        notifyEmail,
        confirmationSubject,
        confirmationBody,
        quotationSubject,
        quotationBody,
      } = req.body;

      const resolvedPort = port !== undefined ? Number(port) : existing.port || 465;
      const resolvedSecure = resolvedPort === 465;
      const resolvedUser = user !== undefined ? user.trim() : existing.user || 'sales@managemyweb.co';
      const resolvedFromEmail =
        fromEmail !== undefined && fromEmail.trim()
          ? fromEmail.trim()
          : existing.fromEmail || resolvedUser;
      const resolvedNotifyEmail =
        notifyEmail !== undefined && notifyEmail.trim()
          ? notifyEmail.trim()
          : existing.notifyEmail || resolvedFromEmail;

      const updated = {
        host: host !== undefined ? host.trim() : existing.host || 'smtp.zoho.com',
        port: resolvedPort,
        secure: resolvedSecure,
        user: resolvedUser,
        pass: pass && pass !== '••••••••' ? pass : existing.pass || '',
        fromEmail: resolvedFromEmail,
        fromName: fromName !== undefined ? fromName.trim() : existing.fromName || 'ManageMyWeb',
        notifyEmail: resolvedNotifyEmail,
        confirmationSubject:
          confirmationSubject !== undefined
            ? confirmationSubject
            : existing.confirmationSubject || DEFAULT_CONFIRMATION_SUBJECT,
        confirmationBody:
          confirmationBody !== undefined
            ? confirmationBody
            : existing.confirmationBody || DEFAULT_CONFIRMATION_BODY,
        quotationSubject:
          quotationSubject !== undefined
            ? quotationSubject
            : existing.quotationSubject || DEFAULT_QUOTATION_SUBJECT,
        quotationBody:
          quotationBody !== undefined
            ? quotationBody
            : existing.quotationBody || DEFAULT_QUOTATION_BODY,
        isConfigured: true,
      };

      writeJsonData('smtp-config.json', updated);

      // Keep public site contact email in sync if notifyEmail was updated
      try {
        const currentSettings = readJsonData('site-settings.json', {});
        if (currentSettings && currentSettings.contact) {
          currentSettings.contact.supportEmail = resolvedNotifyEmail;
          writeJsonData('site-settings.json', currentSettings);
        }
      } catch (e) {
        // non-blocking
      }

      return res.status(200).json({
        success: true,
        message: 'Email settings and both confirmation templates saved.',
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
