import nodemailer from 'nodemailer';
import { verifyAdmin } from '../../../utils/auth';
import { getSmtpConfig, writeDataAsync } from '../../../utils/dataStore';

export default async function handler(req, res) {
  // Enforce server-side admin authentication
  if (!verifyAdmin(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail, host, port, user, pass, fromEmail, fromName } = req.body || {};
    const saved = getSmtpConfig();

    const finalHost = (host || saved.host || 'smtp.zoho.com').trim();
    const finalPort = Number(port || saved.port || 465);
    const finalUser = (user || saved.user || 'sales@managemyweb.co').trim();
    const finalPass = pass && pass !== '••••••••' ? pass : saved.pass;
    const finalFromEmail = (fromEmail || saved.fromEmail || finalUser).trim();
    const finalFromName = (fromName || saved.fromName || 'ManageMyWeb').trim();
    const targetEmail = (testEmail || finalUser).trim();

    if (!targetEmail) {
      return res.status(400).json({ error: 'Test recipient email is required.' });
    }

    if (!finalHost || !finalUser || !finalPass) {
      return res.status(400).json({
        error: 'Incomplete SMTP credentials. Please enter your Zoho Password / App Password.',
      });
    }

    // Port 465 requires implicit SSL (secure: true).
    // Port 587 uses STARTTLS (secure: false) — passing secure:true on 587 causes OpenSSL wrong_version_number.
    const isImplicitSsl = finalPort === 465;

    const transporter = nodemailer.createTransport({
      host: finalHost,
      port: finalPort,
      secure: isImplicitSsl,
      auth: {
        user: finalUser,
        pass: finalPass,
      },
      connectionTimeout: 10000,
    });

    await transporter.verify();

    // Persist verified settings so subsequent form submissions use them
    await writeDataAsync('smtp-config.json', {
      host: finalHost,
      port: finalPort,
      secure: isImplicitSsl,
      user: finalUser,
      pass: finalPass,
      fromEmail: finalFromEmail,
      fromName: finalFromName,
      isConfigured: true,
    });

    const testReference = `diag-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;

    const info = await transporter.sendMail({
      from: `"${finalFromName}" <${finalFromEmail}>`,
      to: targetEmail,
      subject: `ManageMyWeb SMTP Connection Test · ${new Date().toLocaleTimeString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E5EA; border-radius: 16px; padding: 32px;">
          <div style="display: inline-block; background: #34C759; color: #FFFFFF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">
            Connection Verified
          </div>
          <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #1D1D1F;">SMTP Handshake Successful!</h2>
          <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: #424245;">
            Your Zoho Mail SMTP credentials are valid and active. Customer confirmations and project quotations will now be delivered automatically through your domain address.
          </p>
          <div style="background: #F5F5F7; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: #6E6E73;">
            <div><strong>Host:</strong> ${finalHost}:${finalPort} (${isImplicitSsl ? 'SSL' : 'STARTTLS'})</div>
            <div><strong>Sender:</strong> ${finalFromName} &lt;${finalFromEmail}&gt;</div>
            <div><strong>Delivered To:</strong> ${targetEmail}</div>
            <div style="margin-top: 6px; font-size: 11.5px;">Diagnostic Ref: ${testReference}</div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `Test email sent successfully to ${targetEmail}`,
      messageId: info.messageId,
    });
  } catch (error) {
    let friendlyMessage = error.message;
    if (error.code === 'EAUTH') {
      friendlyMessage =
        'Authentication failed. Please verify your Zoho email and ensure you are using a Zoho Application-Specific Password (not your standard web login if 2FA is enabled).';
    } else if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
      friendlyMessage =
        'Connection timed out. Check that port 465 (SSL) or port 587 (STARTTLS) is accessible from your network.';
    }

    return res.status(500).json({
      error: friendlyMessage,
      details: error.code || 'SMTP_ERROR',
    });
  }
}
