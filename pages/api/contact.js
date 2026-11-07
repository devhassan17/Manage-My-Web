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
      promoCode
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
      notes: ''
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

          // Send notification to admin
          await transporter.sendMail({
            from: `"${smtpConfig.fromName || 'ManageMyWeb Concierge'}" <${smtpConfig.fromEmail || smtpConfig.user}>`,
            to: smtpConfig.user,
            subject: `🔥 New Free 3D Demo Lead: ${newLead.storeName || newLead.name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; background: #0B0C10; color: #FFFFFF; border-radius: 16px;">
                <h2 style="color: #0A84FF; margin-top: 0;">🚀 New 3D Virtual Store Demo Request</h2>
                <p style="color: #A0AEC0;">A new founder has applied for the 60-day promotional free 3D demo website:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0; color: #E2E8F0;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${newLead.name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${newLead.email}" style="color: #0A84FF;">${newLead.email}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Phone/WhatsApp:</td><td>${newLead.phone || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Store Name:</td><td>${newLead.storeName || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Website URL:</td><td><a href="${newLead.websiteUrl}" style="color: #0A84FF;" target="_blank">${newLead.websiteUrl || 'N/A'}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Category:</td><td>${newLead.category}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Revenue:</td><td>${newLead.revenueRange}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Promo Code:</td><td><span style="background: #1A365D; color: #63B3ED; padding: 4px 8px; border-radius: 6px;">${newLead.promoCode}</span></td></tr>
                </table>
                <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin-top: 16px;">
                  <h4 style="margin: 0 0 8px 0; color: #30D158;">Founder's Message / Vision:</h4>
                  <p style="margin: 0; line-height: 1.6; color: #CBD5E0;">${newLead.message || 'No additional message provided.'}</p>
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://wa.me/${(newLead.phone || '').replace(/[^0-9]/g, '')}" style="display: inline-block; background: #25D366; color: #FFFFFF; padding: 12px 24px; border-radius: 980px; text-decoration: none; font-weight: 600; margin-right: 12px;">Reply on WhatsApp</a>
                  <a href="mailto:${newLead.email}" style="display: inline-block; background: #0A84FF; color: #FFFFFF; padding: 12px 24px; border-radius: 980px; text-decoration: none; font-weight: 600;">Reply via Email</a>
                </div>
              </div>
            `,
          });

          // Send confirmation back to founder
          await transporter.sendMail({
            from: `"${smtpConfig.fromName || 'ManageMyWeb Studio'}" <${smtpConfig.fromEmail || smtpConfig.user}>`,
            to: newLead.email,
            subject: `✨ 3D Store Demo Locked In! We're Crafting Your Virtual Prototype`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; background: #0B0C10; color: #FFFFFF; border-radius: 16px;">
                <h2 style="color: #0A84FF;">Hi ${newLead.name}, Your 3D Demo Reservation Is Confirmed!</h2>
                <p style="color: #CBD5E0; line-height: 1.6;">Thank you for claiming our <strong>60-day promotional offer</strong>. Most e-commerce stores look identical, but we're about to transform how your customers experience <strong>${newLead.storeName || 'your brand'}</strong>.</p>
                <div style="background: rgba(10, 132, 255, 0.1); border: 1px solid rgba(10, 132, 255, 0.3); padding: 16px; border-radius: 12px; margin: 20px 0;">
                  <h4 style="margin: 0 0 6px 0; color: #0A84FF;">Your Free Prototype Perks:</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #E2E8F0; line-height: 1.6;">
                    <li>Custom 3D walkaround showroom with interactive product shelves</li>
                    <li>Interactive 3D checkout counter and spatial product inspection</li>
                    <li>Brand impact/story corner (like our FairChain Coffee showcase)</li>
                    <li>Direct postal/contact booth integration</li>
                    <li>Zero cost or obligation ($3,500 design value waived)</li>
                  </ul>
                </div>
                <p style="color: #A0AEC0;">Our creative spatial team is reviewing your website. We will contact you within 24 hours with your interactive prototype preview.</p>
                <p style="color: #718096; font-size: 13px; margin-top: 30px;">ManageMyWeb Studio • Next-Gen 3D E-Commerce Operations</p>
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
      message: 'Demo inquiry registered successfully! Our spatial engineers will contact you within 24 hours.',
      leadId: newLead.id,
      emailSent,
      emailError
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return res.status(500).json({ error: 'Internal server error while saving lead.' });
  }
}
