import nodemailer from 'nodemailer';
import { verifyAdmin } from '../../../utils/auth';
import { readDataAsync, writeDataAsync, getSmtpConfig } from '../../../utils/dataStore';

function calculateTotals(items = [], discount = 0, taxRate = 0) {
  const subtotal = (items || []).reduce((sum, item) => {
    const qty = Number(item.qty) || 1;
    const price = Number(item.price) || 0;
    return sum + qty * price;
  }, 0);
  const disc = Number(discount) || 0;
  const afterDiscount = Math.max(0, subtotal - disc);
  const tax = Math.round(afterDiscount * ((Number(taxRate) || 0) / 100));
  const totalAmount = afterDiscount + tax;
  return { subtotal, discount: disc, taxRate: Number(taxRate) || 0, tax, totalAmount };
}

function buildQuotationEmailHtml(quote, senderEmail) {
  const cur = quote.currency || '$';
  const rowsHtml = (quote.items || [])
    .map((item) => {
      const lineTotal = (Number(item.qty) || 1) * (Number(item.price) || 0);
      return `
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #E5E5EA;">
            <div style="font-weight: 600; color: #1D1D1F; font-size: 14px;">${item.title || 'Deliverable'}</div>
            ${
              item.description
                ? `<div style="font-size: 12.5px; color: #6E6E73; margin-top: 3px; line-height: 1.45;">${item.description}</div>`
                : ''
            }
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #E5E5EA; text-align: center; color: #424245; font-size: 13.5px;">
            ${item.qty || 1}
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #E5E5EA; text-align: right; font-weight: 600; color: #1D1D1F; font-size: 14px; white-space: nowrap;">
            ${cur}${lineTotal.toLocaleString()}
          </td>
        </tr>
      `;
    })
    .join('');

  const firstName = (quote.clientName || 'there').split(' ')[0];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #FFFFFF; color: #1D1D1F; border: 1px solid #D2D2D7; border-radius: 18px; overflow: hidden;">
      <!-- Top Header -->
      <div style="background: #F5F5F7; padding: 28px 32px; border-bottom: 1px solid #D2D2D7;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #0066CC; margin-bottom: 4px;">
                Official Project Quotation
              </div>
              <div style="font-size: 22px; font-weight: 600; color: #1D1D1F; letter-spacing: -0.02em;">
                ManageMyWeb
              </div>
              <div style="font-size: 12.5px; color: #6E6E73; margin-top: 2px;">
                3D Virtual Storefronts &amp; Managed Web Operations
              </div>
            </td>
            <td style="text-align: right; vertical-align: top;">
              <div style="font-size: 13px; font-weight: 600; color: #1D1D1F;">${quote.quoteNumber}</div>
              <div style="font-size: 12px; color: #6E6E73; margin-top: 3px;">Valid Until: ${quote.validUntil || '14 Days'}</div>
              <div style="font-size: 12px; color: #6E6E73; margin-top: 2px;">Timeline: ${quote.timeline || '10–14 Business Days'}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Client & Project Info -->
      <div style="padding: 24px 32px; border-bottom: 1px solid #E5E5EA; background: #FAFAFA;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top; width: 50%;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B; margin-bottom: 3px;">Prepared For</div>
              <div style="font-size: 15px; font-weight: 600; color: #1D1D1F;">${quote.clientName}</div>
              ${quote.storeName ? `<div style="font-size: 13px; color: #424245;">${quote.storeName}</div>` : ''}
              <div style="font-size: 12.5px; color: #6E6E73; margin-top: 2px;">${quote.clientEmail}</div>
              ${quote.clientPhone ? `<div style="font-size: 12.5px; color: #6E6E73;">${quote.clientPhone}</div>` : ''}
            </td>
            <td style="vertical-align: top; width: 50%; text-align: right;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B; margin-bottom: 3px;">Solution Package</div>
              <div style="font-size: 14.5px; font-weight: 600; color: #0066CC;">${quote.packageTitle}</div>
              <div style="font-size: 12px; color: #6E6E73; margin-top: 3px;">Terms: ${quote.paymentTerms}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Personal Message -->
      <div style="padding: 24px 32px; border-bottom: 1px solid #E5E5EA;">
        <p style="margin: 0 0 12px 0; font-size: 14.5px; line-height: 1.55; color: #1D1D1F;">
          Hi ${firstName},
        </p>
        <p style="margin: 0; font-size: 14px; line-height: 1.55; color: #424245;">
          ${
            quote.notes ||
            `Following our review of your store requirements, here is the itemized scope and proposal for your custom 3D storefront and web operations.`
          }
        </p>
      </div>

      <!-- Line Items Table -->
      <div style="padding: 16px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #D2D2D7;">
              <th style="padding: 10px 12px; text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B;">Deliverable</th>
              <th style="padding: 10px 12px; text-align: center; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B;">Qty</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div style="padding: 20px 32px; background: #FBFBFD; border-top: 1px solid #E5E5EA;">
        <table style="width: 100%; max-width: 280px; margin-left: auto; border-collapse: collapse; font-size: 13.5px;">
          <tr>
            <td style="padding: 4px 0; color: #6E6E73;">Subtotal:</td>
            <td style="padding: 4px 0; text-align: right; font-weight: 500;">${cur}${quote.subtotal.toLocaleString()}</td>
          </tr>
          ${
            quote.discount > 0
              ? `
              <tr>
                <td style="padding: 4px 0; color: #34C759;">Studio Onboarding Credit:</td>
                <td style="padding: 4px 0; text-align: right; color: #34C759; font-weight: 600;">-${cur}${quote.discount.toLocaleString()}</td>
              </tr>
            `
              : ''
          }
          ${
            quote.tax > 0
              ? `
              <tr>
                <td style="padding: 4px 0; color: #6E6E73;">Tax (${quote.taxRate}%):</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 500;">+${cur}${quote.tax.toLocaleString()}</td>
              </tr>
            `
              : ''
          }
          <tr style="border-top: 2px solid #1D1D1F;">
            <td style="padding: 10px 0 0 0; font-size: 16px; font-weight: 600; color: #1D1D1F;">Total Investment:</td>
            <td style="padding: 10px 0 0 0; text-align: right; font-size: 20px; font-weight: 700; color: #0066CC;">
              ${cur}${quote.totalAmount.toLocaleString()}
            </td>
          </tr>
        </table>
      </div>

      <!-- Accept CTA & Next Steps -->
      <div style="padding: 28px 32px; background: #FFFFFF; text-align: center; border-top: 1px solid #E5E5EA;">
        <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #6E6E73;">
          To approve this scope or request any timeline adjustments, reply directly to this email or message on WhatsApp:
        </p>
        <a href="https://wa.me/923174075023?text=Hi%20ManageMyWeb,%20I'm%20approving%20Quotation%20${quote.quoteNumber}" 
           style="display: inline-block; background: #0066CC; color: #FFFFFF; padding: 12px 28px; border-radius: 980px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 4px 14px rgba(0,102,204,0.25);">
          Approve Quotation on WhatsApp
        </a>
      </div>

      <!-- Footer -->
      <div style="background: #F5F5F7; padding: 20px 32px; text-align: center; font-size: 11.5px; color: #86868B; border-top: 1px solid #E5E5EA;">
        <div>ManageMyWeb Studio · E-Commerce Engineering &amp; 3D Virtual Flagships</div>
        <div style="margin-top: 4px;">
          sales@managemyweb.co · +92 317 4075023 · https://managemyweb.co
        </div>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  // Enforce server-side admin authentication
  if (!verifyAdmin(req, res)) return;

  let quotations = await readDataAsync('quotations.json', []);
  if (!Array.isArray(quotations)) quotations = [];

  // GET: Return all quotations + summary statistics
  if (req.method === 'GET') {
    const totalQuotations = quotations.length;
    const totalQuotedAmount = quotations.reduce((sum, q) => sum + (Number(q.totalAmount) || 0), 0);
    const acceptedQuotes = quotations.filter((q) => q.status === 'Accepted');
    const acceptedAmount = acceptedQuotes.reduce((sum, q) => sum + (Number(q.totalAmount) || 0), 0);
    const sentCount = quotations.filter((q) => q.status === 'Sent' || q.status === 'Accepted').length;

    return res.status(200).json({
      quotations,
      stats: {
        totalQuotations,
        totalQuotedAmount,
        acceptedCount: acceptedQuotes.length,
        acceptedAmount,
        sentCount,
      },
    });
  }

  // POST: Create or update quotation (and optionally email it to client)
  if (req.method === 'POST') {
    try {
      const {
        id,
        quoteNumber,
        leadId,
        clientName,
        clientEmail,
        clientPhone,
        storeName,
        websiteUrl,
        journeyType,
        packageTitle,
        currency = '$',
        validUntil,
        timeline,
        paymentTerms,
        items = [],
        discount = 0,
        taxRate = 0,
        status = 'Draft',
        notes = '',
        sendEmail = false,
      } = req.body;

      if (!clientName || !clientEmail) {
        return res.status(400).json({ error: 'Client name and email are required for a quotation.' });
      }

      const totals = calculateTotals(items, discount, taxRate);
      const nowIso = new Date().toISOString();

      const resolvedId = id || `quote-${Date.now()}`;
      const resolvedNumber =
        quoteNumber || `QT-${new Date().getFullYear()}-${String(quotations.length + 101).padStart(3, '0')}`;

      const quoteRecord = {
        id: resolvedId,
        quoteNumber: resolvedNumber,
        createdAt: nowIso,
        updatedAt: nowIso,
        leadId: leadId || '',
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: (clientPhone || '').trim(),
        storeName: (storeName || '').trim(),
        websiteUrl: (websiteUrl || '').trim(),
        journeyType: journeyType || 'Demo → Step 2 Quotation',
        packageTitle: packageTitle || 'Custom 3D Storefront & Web Operations',
        currency,
        validUntil: validUntil || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        timeline: timeline || '10–14 Business Days',
        paymentTerms: paymentTerms || '50% Kickoff Deposit · 50% Upon Storefront Launch',
        items,
        discount: totals.discount,
        taxRate: totals.taxRate,
        subtotal: totals.subtotal,
        totalAmount: totals.totalAmount,
        status: sendEmail ? 'Sent' : status,
        notes,
      };

      const existingIdx = quotations.findIndex((q) => q.id === resolvedId);
      if (existingIdx >= 0) {
        quoteRecord.createdAt = quotations[existingIdx].createdAt || nowIso;
        quotations[existingIdx] = quoteRecord;
      } else {
        quotations.unshift(quoteRecord);
      }

      await writeDataAsync('quotations.json', quotations);

      // Update associated lead status if leadId is linked
      if (leadId) {
        const leads = await readDataAsync('leads.json', []);
        const leadIdx = leads.findIndex((l) => l.id === leadId);
        if (leadIdx >= 0) {
          leads[leadIdx].status = sendEmail ? 'Quotation Sent' : leads[leadIdx].status;
          leads[leadIdx].quotedAmount = totals.totalAmount;
          leads[leadIdx].quoteNumber = resolvedNumber;
          await writeDataAsync('leads.json', leads);
        }
      }

      let emailDispatched = false;
      let emailError = null;

      if (sendEmail) {
        try {
          const smtpConfig = getSmtpConfig();
          if (smtpConfig && smtpConfig.isConfigured && smtpConfig.host && smtpConfig.user && smtpConfig.pass) {
            const portNum = Number(smtpConfig.port) || 465;
            const transporter = nodemailer.createTransport({
              host: smtpConfig.host,
              port: portNum,
              secure: portNum === 465,
              auth: {
                user: smtpConfig.user,
                pass: smtpConfig.pass,
              },
              connectionTimeout: 10000,
            });

            const senderAddress = smtpConfig.fromEmail || smtpConfig.user || 'sales@managemyweb.co';
            const htmlPayload = buildQuotationEmailHtml(quoteRecord, senderAddress);

            await transporter.sendMail({
              from: `"${smtpConfig.fromName || 'ManageMyWeb'}" <${senderAddress}>`,
              to: quoteRecord.clientEmail,
              cc: smtpConfig.notifyEmail || senderAddress,
              replyTo: smtpConfig.notifyEmail || senderAddress,
              subject: `Quotation ${quoteRecord.quoteNumber}: ${quoteRecord.packageTitle} for ${
                quoteRecord.storeName || quoteRecord.clientName
              }`,
              html: htmlPayload,
            });

            emailDispatched = true;
          } else {
            emailError = 'SMTP password is not configured yet in SMTP Settings.';
          }
        } catch (err) {
          emailError = err.message;
        }
      }

      return res.status(200).json({
        success: true,
        quotation: quoteRecord,
        quotations,
        emailDispatched,
        emailError,
      });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save quotation: ' + e.message });
    }
  }

  // PATCH: Update status of quotation
  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    const idx = quotations.findIndex((q) => q.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Quotation not found' });

    quotations[idx].status = status;
    quotations[idx].updatedAt = new Date().toISOString();
    await writeDataAsync('quotations.json', quotations);
    return res.status(200).json({ success: true, quotation: quotations[idx], quotations });
  }

  // DELETE: Remove quotation
  if (req.method === 'DELETE') {
    const { id } = req.query;
    quotations = quotations.filter((q) => q.id !== id);
    await writeDataAsync('quotations.json', quotations);
    return res.status(200).json({ success: true, quotations });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
