import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

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

    const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');
    let leads = [];
    if (fs.existsSync(leadsFilePath)) {
      const fileData = fs.readFileSync(leadsFilePath, 'utf8');
      leads = JSON.parse(fileData || '[]');
    }

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
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');

    // Attempt SMTP dispatch if configured
    let emailSent = false;
    let emailError = null;
    const smtpFilePath = path.join(process.cwd(), 'data', 'smtp-config.json');

    if (fs.existsSync(smtpFilePath)) {
      try {
        const smtpConfig = JSON.parse(fs.readFileSync(smtpFilePath, 'utf8'));
        if (smtpConfig && smtpConfig.isConfigured && smtpConfig.host && smtpConfig.user && smtpConfig.pass) {
          const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: Number(smtpConfig.port) || 587,
            secure: smtpConfig.secure === true || Number(smtpConfig.port) === 465,
            auth: {
              user: smtpConfig.user,
              pass: smtpConfig.pass,
            },
          });

          const firstName = newLead.name.split(' ')[0];
          const brandLabel = newLead.storeName || 'your store';
          const siteReference = newLead.websiteUrl ? ` (${newLead.websiteUrl})` : '';

          // 1. Send notification to Studio Admin (sales@managemyweb.co)
          await transporter.sendMail({
            from: `"${smtpConfig.fromName || 'ManageMyWeb Sales'}" <${smtpConfig.fromEmail || smtpConfig.user}>`,
            to: smtpConfig.fromEmail || smtpConfig.user || 'sales@managemyweb.co',
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

          // 2. Send short, personal, human confirmation email to the client
          const plainTextConfirmation = [
            `Hi ${firstName},`,
            ``,
            `Thanks for reaching out to ManageMyWeb. I received your request for a 3D storefront preview for ${brandLabel}${siteReference}.`,
            ``,
            `Our team is reviewing your catalog now and putting together a working 3D prototype so you can walk through and see how your products look inside an interactive space. I will send your private preview link over within 48 hours.`,
            ``,
            `Quick question while we set this up: are there 2 or 3 best-selling products on your site you would especially like us to feature on the main display?`,
            ``,
            `Feel free to reply directly to this email, or message me on WhatsApp anytime at +92 317 4075023.`,
            ``,
            `Best regards,`,
            `Sales Team — ManageMyWeb`,
            `sales@managemyweb.co`,
            `WhatsApp: +92 317 4075023`,
          ].join('\n');

          await transporter.sendMail({
            from: `"${smtpConfig.fromName || 'ManageMyWeb'}" <${smtpConfig.fromEmail || smtpConfig.user}>`,
            to: newLead.email,
            replyTo: smtpConfig.fromEmail || 'sales@managemyweb.co',
            subject: `Your 3D store preview for ${newLead.storeName || 'your brand'}`,
            text: plainTextConfirmation,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 540px; color: #1D1D1F; font-size: 15px; line-height: 1.6;">
                <p style="margin: 0 0 16px 0;">Hi ${firstName},</p>
                <p style="margin: 0 0 16px 0;">
                  Thanks for reaching out to ManageMyWeb. I received your request for a 3D storefront preview for <strong>${brandLabel}</strong>${siteReference}.
                </p>
                <p style="margin: 0 0 16px 0;">
                  Our team is reviewing your catalog right now and putting together a working 3D prototype so you can see how your products look inside an interactive showroom. I’ll send your private preview link over within 48 hours.
                </p>
                <p style="margin: 0 0 16px 0;">
                  Quick question while we set this up: are there 2 or 3 best-selling products on your site you’d especially like us to feature on the main display?
                </p>
                <p style="margin: 0 0 24px 0;">
                  You can reply directly to this email, or message me on <a href="https://wa.me/923174075023" style="color: #0066CC; text-decoration: none;">WhatsApp (+92 317 4075023)</a> anytime.
                </p>
                <div style="border-top: 1px solid #E5E5EA; padding-top: 14px; font-size: 13px; color: #6E6E73; line-height: 1.5;">
                  <strong style="color: #1D1D1F;">ManageMyWeb</strong><br />
                  3D Storefronts &amp; Managed Web Operations<br />
                  <a href="mailto:sales@managemyweb.co" style="color: #0066CC; text-decoration: none;">sales@managemyweb.co</a> · +92 317 4075023
                </div>
              </div>
            `,
          });

          emailSent = true;
        }
      } catch (err) {
        console.error('SMTP notification error:', err);
        emailError = err.message;
      }
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
