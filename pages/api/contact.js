import nodemailer from 'nodemailer';
import {
  readJsonData,
  writeJsonData,
  getSmtpConfig,
  renderEmailTemplate,
  DEFAULT_CONFIRMATION_SUBJECT,
  DEFAULT_CONFIRMATION_BODY,
} from '../../utils/dataStore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      storeName,
      websiteUrl,
      category,
      revenueRange,
      message,
      promoCode,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const leads = readJsonData('leads.json', []);

    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      storeName: (storeName || '').trim(),
      websiteUrl: (websiteUrl || '').trim(),
      category: category || 'E-Commerce Store',
      revenueRange: revenueRange || 'Not Specified',
      message: (message || '').trim(),
      promoCode: promoCode || 'FREE-3D-DEMO-60D',
      status: 'New',
      notes: '',
    };

    leads.unshift(newLead);
    writeJsonData('leads.json', leads);

    // Attempt SMTP dispatch if configured
    let emailSent = false;
    let emailError = null;

    try {
      const smtpConfig = getSmtpConfig();
      const siteSettings = readJsonData('site-settings.json', {});
      const configuredSupportEmail = siteSettings?.contact?.supportEmail;

      if (smtpConfig && smtpConfig.isConfigured && smtpConfig.host && smtpConfig.user && smtpConfig.pass) {
        const portNum = Number(smtpConfig.port) || 465;
        const isImplicitSsl = portNum === 465;

        const transporter = nodemailer.createTransport({
          host: smtpConfig.host,
          port: portNum,
          secure: isImplicitSsl,
          auth: {
            user: smtpConfig.user,
            pass: smtpConfig.pass,
          },
          connectionTimeout: 10000,
        });

        const firstName = newLead.name.split(' ')[0];
        const brandLabel = newLead.storeName || 'your store';
        const senderAddress = smtpConfig.fromEmail || smtpConfig.user || 'sales@managemyweb.co';
        const adminReceiverAddress =
          smtpConfig.notifyEmail || configuredSupportEmail || senderAddress;

        // 1. Send notification to Studio Admin (notifyEmail / sales@managemyweb.co)
        await transporter.sendMail({
          from: `"${smtpConfig.fromName || 'ManageMyWeb'}" <${senderAddress}>`,
          to: adminReceiverAddress,
          replyTo: newLead.email,
          subject: `New 3D Prototype Request: ${newLead.storeName || newLead.name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 560px; padding: 28px; background: #FFFFFF; color: #1D1D1F; border: 1px solid #D2D2D7; border-radius: 14px;">
              <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6E6E73; margin: 0 0 6px 0;">New Client Inquiry</p>
              <h2 style="font-size: 20px; font-weight: 600; color: #1D1D1F; margin: 0 0 18px 0;">${newLead.storeName || newLead.name}</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1D1D1F;">
                <tr><td style="padding: 6px 0; color: #6E6E73; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${newLead.name}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Email</td><td style="padding: 6px 0;"><a href="mailto:${newLead.email}" style="color: #0066CC; text-decoration: none;">${newLead.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Phone / WhatsApp</td><td style="padding: 6px 0;">${newLead.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Store Name</td><td style="padding: 6px 0;">${newLead.storeName || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Website</td><td style="padding: 6px 0;">${newLead.websiteUrl || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Category</td><td style="padding: 6px 0;">${newLead.category}</td></tr>
              </table>
              <div style="background: #F5F5F7; padding: 14px 16px; border-radius: 10px; margin-top: 18px; font-size: 14px; color: #1D1D1F; line-height: 1.5;">
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #6E6E73; margin-bottom: 4px;">Client Notes</div>
                ${newLead.message || 'No additional notes provided.'}
              </div>
            </div>
          `,
        });

        // 2. Render and send customizable confirmation email to the client
        const templateVars = {
          firstName,
          name: newLead.name,
          storeName: brandLabel,
          websiteUrl: newLead.websiteUrl || '',
          category: newLead.category || 'E-Commerce',
        };

        const renderedSubject = renderEmailTemplate(
          smtpConfig.confirmationSubject || DEFAULT_CONFIRMATION_SUBJECT,
          templateVars
        );
        const renderedBody = renderEmailTemplate(
          smtpConfig.confirmationBody || DEFAULT_CONFIRMATION_BODY,
          templateVars
        );

        const htmlParagraphs = renderedBody
          .split(/\n\s*\n/)
          .map(
            (para) =>
              `<p style="margin: 0 0 16px 0; white-space: pre-line;">${para
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')}</p>`
          )
          .join('');

        await transporter.sendMail({
          from: `"${smtpConfig.fromName || 'ManageMyWeb'}" <${senderAddress}>`,
          to: newLead.email,
          replyTo: adminReceiverAddress,
          subject: renderedSubject,
          text: renderedBody,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 540px; color: #1D1D1F; font-size: 15px; line-height: 1.6;">
              ${htmlParagraphs}
            </div>
          `,
        });

        emailSent = true;
      }
    } catch (err) {
      console.error('SMTP notification error:', err);
      emailError = err.message;
    }

    return res.status(200).json({
      success: true,
      message: 'Prototype request registered. We will send your preview link within 48 hours.',
      leadId: newLead.id,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return res.status(500).json({ error: 'Internal server error while saving lead.' });
  }
}
