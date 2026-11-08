import nodemailer from 'nodemailer';
import {
  readDataAsync,
  writeDataAsync,
  getSmtpConfig,
  renderEmailTemplate,
  DEFAULT_CONFIRMATION_SUBJECT,
  DEFAULT_CONFIRMATION_BODY,
  DEFAULT_QUOTATION_SUBJECT,
  DEFAULT_QUOTATION_BODY,
} from '../../utils/dataStore';

function getPreDesignedItemsForPackage(pkg = '') {
  if (pkg.toLowerCase().includes('managed') && !pkg.toLowerCase().includes('3d')) {
    return [
      {
        title: 'Managed Web Concierge & Global Edge Hosting',
        description: '24/7 cloud NVMe hosting, SSL/DNS management, DMARC/SPF email security, and daily backups.',
        qty: 1,
        price: 490,
      },
      {
        title: 'Core Web Vitals & Unlimited Routine Store Updates',
        description: 'Continuous speed tuning and same-day catalog/content updates.',
        qty: 1,
        price: 0,
      },
    ];
  }
  if (pkg.toLowerCase().includes('launchpad')) {
    return [
      {
        title: '3D Storefront Launchpad Architecture (WebGL / 60fps)',
        description: 'Custom 3D showroom with interactive product shelving, express bar checkout, and provenance wall.',
        qty: 1,
        price: 1850,
      },
      {
        title: 'Shopify / WooCommerce Catalog & Checkout Integration',
        description: 'Live inventory, variant, and express checkout synchronization.',
        qty: 1,
        price: 350,
      },
    ];
  }
  return [
    {
      title: 'Spatial Retail Flagship 3D Storefront',
      description: 'Multi-zone architectural 3D showroom with custom lighting, acoustic soundscape, and 360° product inspection.',
      qty: 1,
      price: 2900,
    },
    {
      title: 'Express Checkout Counter & Live Catalog Sync',
      description: 'Direct integration with Shopify, WooCommerce, or headless commerce + Apple Pay / Stripe express register.',
      qty: 1,
      price: 500,
    },
  ];
}

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
      requestType = 'demo', // 'demo' | 'quotation'
      requestedPackage = 'Spatial Retail Flagship',
      productCount = '15 - 50 Products',
      platform = 'Shopify',
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const isQuotationRequest = requestType === 'quotation';
    const leads = await readDataAsync('leads.json', []);

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
      requestType: isQuotationRequest ? 'quotation' : 'demo',
      journeyStage: isQuotationRequest
        ? 'Direct Quotation Requested'
        : 'Step 1: Free Demo (Step 2: Quote)',
      requestedPackage: requestedPackage || 'Spatial Retail Flagship',
      productCount: productCount || '15 - 50 Products',
      platform: platform || 'Shopify',
      message: (message || '').trim(),
      promoCode: promoCode || 'FREE-3D-DEMO-60D',
      status: isQuotationRequest ? 'Quotation Requested' : 'New',
      notes: '',
    };

    leads.unshift(newLead);
    await writeDataAsync('leads.json', leads);

    // Automatically pre-create an adjustable Draft Quotation in quotations.json when a user requests a quotation
    if (isQuotationRequest) {
      const quotations = await readDataAsync('quotations.json', []);
      const defaultItems = getPreDesignedItemsForPackage(newLead.requestedPackage);
      const subtotal = defaultItems.reduce((s, i) => s + (Number(i.qty) || 1) * (Number(i.price) || 0), 0);
      const draftQuote = {
        id: `quote-${Date.now()}`,
        quoteNumber: `QT-${new Date().getFullYear()}-${String(quotations.length + 101).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        leadId: newLead.id,
        clientName: newLead.name,
        clientEmail: newLead.email,
        clientPhone: newLead.phone,
        storeName: newLead.storeName,
        websiteUrl: newLead.websiteUrl,
        journeyType: 'Direct Quotation Request',
        packageTitle: newLead.requestedPackage,
        currency: '$',
        validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        timeline: '10–14 Business Days',
        paymentTerms: '50% Kickoff Deposit · 50% Upon Storefront Launch',
        items: defaultItems,
        discount: 0,
        taxRate: 0,
        subtotal,
        totalAmount: subtotal,
        status: 'Draft',
        notes: `Platform: ${newLead.platform} · Estimated SKUs: ${newLead.productCount}. ${newLead.message || ''}`.trim(),
      };
      quotations.unshift(draftQuote);
      await writeDataAsync('quotations.json', quotations);
    }

    // Attempt SMTP dispatch if configured
    let emailSent = false;
    let emailError = null;

    try {
      const smtpConfig = getSmtpConfig();
      const siteSettings = await readDataAsync('site-settings.json', {});
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

        const inquiryBadge = isQuotationRequest
          ? 'Direct Custom Quotation Request'
          : 'Step 1: Free 3D Demo Request (Step 2: Quotation)';

        // 1. Send notification to Studio Admin (sales@managemyweb.co)
        await transporter.sendMail({
          from: `"${smtpConfig.fromName || 'ManageMyWeb'}" <${senderAddress}>`,
          to: adminReceiverAddress,
          replyTo: newLead.email,
          subject: `${isQuotationRequest ? '[Quotation Request]' : '[3D Demo Request]'}: ${newLead.storeName || newLead.name
            }`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 560px; padding: 28px; background: #FFFFFF; color: #1D1D1F; border: 1px solid #D2D2D7; border-radius: 14px;">
              <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #0066CC; margin: 0 0 6px 0;">${inquiryBadge}</p>
              <h2 style="font-size: 20px; font-weight: 600; color: #1D1D1F; margin: 0 0 18px 0;">${newLead.storeName || newLead.name}</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1D1D1F;">
                <tr><td style="padding: 6px 0; color: #6E6E73; width: 140px;">Visitor Flow</td><td style="padding: 6px 0; font-weight: 600; color: #0066CC;">${newLead.journeyStage}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Name</td><td style="padding: 6px 0; font-weight: 500;">${newLead.name}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Email</td><td style="padding: 6px 0;"><a href="mailto:${newLead.email}" style="color: #0066CC; text-decoration: none;">${newLead.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Phone / WhatsApp</td><td style="padding: 6px 0;">${newLead.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Store Name</td><td style="padding: 6px 0;">${newLead.storeName || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Website</td><td style="padding: 6px 0;">${newLead.websiteUrl || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Category</td><td style="padding: 6px 0;">${newLead.category}</td></tr>
                <tr><td style="padding: 6px 0; color: #6E6E73;">Requested Scope</td><td style="padding: 6px 0; font-weight: 500;">${newLead.requestedPackage} (${newLead.productCount} · ${newLead.platform})</td></tr>
              </table>
              <div style="background: #F5F5F7; padding: 14px 16px; border-radius: 10px; margin-top: 18px; font-size: 14px; color: #1D1D1F; line-height: 1.5;">
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #6E6E73; margin-bottom: 4px;">Client Notes</div>
                ${newLead.message || 'No additional notes provided.'}
              </div>
            </div>
          `,
        });

        // 2. Render and send the right confirmation email based on Visitor Flow (Demo vs Quotation)
        const templateVars = {
          firstName,
          name: newLead.name,
          storeName: brandLabel,
          websiteUrl: newLead.websiteUrl || '',
          category: newLead.category || 'E-Commerce',
          packageScope: newLead.requestedPackage || 'Custom 3D Storefront & Web Operations',
        };

        const rawSubject = isQuotationRequest
          ? smtpConfig.quotationSubject || DEFAULT_QUOTATION_SUBJECT
          : smtpConfig.confirmationSubject || DEFAULT_CONFIRMATION_SUBJECT;

        const rawBody = isQuotationRequest
          ? smtpConfig.quotationBody || DEFAULT_QUOTATION_BODY
          : smtpConfig.confirmationBody || DEFAULT_CONFIRMATION_BODY;

        const renderedSubject = renderEmailTemplate(rawSubject, templateVars);
        const renderedBody = renderEmailTemplate(rawBody, templateVars);

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
      requestType: newLead.requestType,
      message: isQuotationRequest
        ? 'Quotation request received. We will send your custom itemized proposal within 24 hours.'
        : 'Step 1 confirmed: We are building your free 3D demo and will send your preview link within 48 hours.',
      leadId: newLead.id,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return res.status(500).json({ error: 'Internal server error while saving lead.' });
  }
}
