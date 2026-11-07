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

    // Use passed config, or fallback to saved config
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

    // Verify SMTP connection
    await transporter.verify();

    // Dispatch test email
    const info = await transporter.sendMail({
      from: `"${finalFromName || 'ManageMyWeb Test'}" <${finalFromEmail || finalUser}>`,
      to: targetEmail,
      subject: '✅ ManageMyWeb SMTP Test - Connection Verified!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; background: #0B0C10; color: #FFFFFF; border-radius: 16px;">
          <h2 style="color: #30D158;">SMTP Dispatch Succeeded!</h2>
          <p style="color: #CBD5E0;">Your SMTP email credentials for <strong>ManageMyWeb Studio</strong> have been successfully verified.</p>
          <div style="background: rgba(255,255,255,0.06); padding: 14px; border-radius: 10px; margin: 16px 0; font-family: monospace; font-size: 13px; color: #63B3ED;">
            Host: ${finalHost}<br/>
            Port: ${finalPort}<br/>
            User: ${finalUser}<br/>
            Timestamp: ${new Date().toISOString()}
          </div>
          <p style="color: #A0AEC0; font-size: 13px;">When new clients submit inquiries or claim the free 3D demo store, you will receive real-time email alerts instantly.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `Test email sent successfully to ${targetEmail}! Message ID: ${info.messageId}`,
    });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    return res.status(500).json({
      error: `SMTP Connection Failed: ${error.message}`,
    });
  }
}
