import nodemailer from 'nodemailer';
import { getSmtpConfig, writeJsonData } from '../../../utils/dataStore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail, host, port, user, pass, fromEmail, fromName } = req.body;
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
    writeJsonData('smtp-config.json', {
      host: finalHost,
      port: finalPort,
      secure: isImplicitSsl,
      user: finalUser,
      pass: finalPass,
      fromEmail: finalFromEmail,
      fromName: finalFromName,
      isConfigured: true,
    });

    const info = await transporter.sendMail({
      from: `"${finalFromName}" <${finalFromEmail}>`,
      to: targetEmail,
      subject: 'ManageMyWeb SMTP Connection Verified',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 520px; padding: 24px; background: #FFFFFF; color: #1D1D1F; border: 1px solid #D2D2D7; border-radius: 14px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1D1D1F; margin: 0 0 10px 0;">SMTP Connection Verified</h2>
          <p style="font-size: 14px; color: #424245; line-height: 1.5; margin: 0 0 16px 0;">
            Your Zoho Mail outbound configuration for <strong>ManageMyWeb</strong> is active and ready to send client confirmations.
          </p>
          <div style="background: #F5F5F7; padding: 12px 14px; border-radius: 10px; font-family: monospace; font-size: 12.5px; color: #1D1D1F; line-height: 1.6;">
            Host: ${finalHost}<br/>
            Port: ${finalPort} (${isImplicitSsl ? 'SSL' : 'STARTTLS'})<br/>
            Sender: ${finalFromEmail}<br/>
            Verified at: ${new Date().toISOString()}
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `Test email sent to ${targetEmail} (Message ID: ${info.messageId})`,
    });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    return res.status(500).json({
      error: `SMTP Connection Failed: ${error.message}`,
    });
  }
}
