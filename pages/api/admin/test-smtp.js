import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail, host, port, secure, user, pass, fromEmail, fromName } = req.body;

    const targetEmail = testEmail || user;
    if (!targetEmail) {
      return res.status(400).json({ error: 'Test recipient email is required.' });
    }

    let finalHost = host;
    let finalPort = port;
    let finalSecure = secure;
    let finalUser = user;
    let finalPass = pass;
    let finalFromEmail = fromEmail;
    let finalFromName = fromName;

    if (!finalHost || !finalUser || !finalPass || finalPass === '••••••••') {
      const smtpFilePath = path.join(process.cwd(), 'data', 'smtp-config.json');
      if (fs.existsSync(smtpFilePath)) {
        const saved = JSON.parse(fs.readFileSync(smtpFilePath, 'utf8'));
        finalHost = finalHost || saved.host;
        finalPort = finalPort || saved.port;
        finalSecure = finalSecure !== undefined ? finalSecure : saved.secure;
        finalUser = finalUser || saved.user;
        if (!finalPass || finalPass === '••••••••') finalPass = saved.pass;
        finalFromEmail = finalFromEmail || saved.fromEmail;
        finalFromName = finalFromName || saved.fromName;
      }
    }

    if (!finalHost || !finalUser || !finalPass) {
      return res.status(400).json({
        error: 'Incomplete SMTP credentials. Please enter Host, Port, User, and Password.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: finalHost,
      port: Number(finalPort) || 587,
      secure: Boolean(finalSecure) || Number(finalPort) === 465,
      auth: {
        user: finalUser,
        pass: finalPass,
      },
      connectionTimeout: 10000,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"${finalFromName || 'ManageMyWeb'}" <${finalFromEmail || finalUser}>`,
      to: targetEmail,
      subject: 'ManageMyWeb SMTP Connection Verified',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 520px; padding: 24px; background: #FFFFFF; color: #1D1D1F; border: 1px solid #D2D2D7; border-radius: 14px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1D1D1F; margin: 0 0 10px 0;">SMTP Connection Verified</h2>
          <p style="font-size: 14px; color: #424245; line-height: 1.5; margin: 0 0 16px 0;">
            Your outbound email configuration for <strong>ManageMyWeb</strong> is active and ready to send client confirmations.
          </p>
          <div style="background: #F5F5F7; padding: 12px 14px; border-radius: 10px; font-family: monospace; font-size: 12.5px; color: #1D1D1F; line-height: 1.6;">
            Host: ${finalHost}<br/>
            Port: ${finalPort}<br/>
            Sender: ${finalFromEmail || finalUser}<br/>
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
