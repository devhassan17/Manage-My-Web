import nodemailer from 'nodemailer';
import { readJsonData, writeJsonData, getSmtpConfig } from '../../../utils/dataStore';

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

      <!-- Body -->
      <div style="padding: 32px;">
        <p style="font-size: 15px; line-height: 1.6; color: #1D1D1F; margin: 0 0 14px 0;">
          Hi ${firstName},
        </p>
        <p style="font-size: 14.5px; line-height: 1.6; color: #424245; margin: 0 0 24px 0;">
          Thank you for exploring a 3D storefront and web operations partnership with ManageMyWeb. Below is your customized quotation prepared for <strong style="color: #1D1D1F;">${quote.storeName || quote.clientName}</strong>.
        </p>

        <!-- Client Summary Pill -->
        <div style="background: #F5F5F7; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: #424245;">
          <strong style="color: #1D1D1F;">Prepared For:</strong> ${quote.clientName} (${quote.storeName || 'Brand Storefront'})<br/>
          <strong style="color: #1D1D1F;">Scope:</strong> ${quote.packageTitle || 'Custom 3D Storefront & Web Operations'}
        </div>

        <!-- Line Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <thead>
            <tr style="background: #F5F5F7; border-bottom: 1px solid #D2D2D7;">
              <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #6E6E73; text-transform: uppercase;">Deliverable &amp; Scope</th>
              <th style="padding: 10px 12px; text-align: center; font-size: 11px; font-weight: 600; color: #6E6E73; text-transform: uppercase; width: 55px;">Qty</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #6E6E73; text-transform: uppercase; width: 100px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- Totals Box -->
        <div style="background: #F5F5F7; border-radius: 14px; padding: 18px 20px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
            <tr>
              <td style="padding: 4px 0; color: #6E6E73;">Subtotal</td>
              <td style="padding: 4px 0; text-align: right; color: #1D1D1F; font-weight: 500;">${cur}${Number(quote.subtotal || 0).toLocaleString()}</td>
            </tr>
            ${
              Number(quote.discount) > 0
                ? `<tr>
                    <td style="padding: 4px 0; color: #1D7D3F;">Onboarding Program Discount</td>
                    <td style="padding: 4px 0; text-align: right; color: #1D7D3F; font-weight: 500;">-${cur}${Number(quote.discount).toLocaleString()}</td>
                  </tr>`
                : ''
            }
            ${
              Number(quote.taxRate) > 0
                ? `<tr>
                    <td style="padding: 4px 0; color: #6E6E73;">Tax (${quote.taxRate}%)</td>
                    <td style="padding: 4px 0; text-align: right; color: #1D1D1F;">${cur}${Math.round(((quote.subtotal - (quote.discount || 0)) * quote.taxRate) / 100).toLocaleString()}</td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding: 10px 0 2px 0; border-top: 1px solid #D2D2D7; font-size: 16px; font-weight: 600; color: #1D1D1F;">Total Investment</td>
              <td style="padding: 10px 0 2px 0; border-top: 1px solid #D2D2D7; text-align: right; font-size: 20px; font-weight: 600; color: #0066CC;">${cur}${Number(quote.totalAmount || 0).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        ${
          quote.notes
            ? `<div style="margin-bottom: 22px; font-size: 13.5px; color: #424245; line-height: 1.55;">
                <strong style="color: #1D1D1F; display: block; margin-bottom: 4px;">Notes &amp; Included Terms:</strong>
                ${quote.notes}
              </div>`
            : ''
        }

        <div style="font-size: 13px; color: #6E6E73; margin-bottom: 24px;">
          <strong style="color: #1D1D1F;">Payment Schedule:</strong> ${quote.paymentTerms || '50% Kickoff Deposit · 50% Upon Storefront Launch'}
        </div>

        <p style="font-size: 14px; color: #1D1D1F; line-height: 1.6; margin: 0 0 24px 0;">
          To approve this quotation or request any adjustments to the scope, simply reply to this email or message us directly on <a href="https://wa.me/923174075023" style="color: #0066CC; text-decoration: none; font-weight: 500;">WhatsApp (+92 317 4075023)</a>.
        </p>

        <div style="border-top: 1px solid #E5E5EA; padding-top: 16px; font-size: 12.5px; color: #6E6E73; line-height: 1.5;">
          <strong style="color: #1D1D1F;">ManageMyWeb Studio</strong><br/>
          <a href="mailto:${senderEmail}" style="color: #0066CC; text-decoration: none;">${senderEmail}</a> · WhatsApp: +92 317 4075023<br/>
          https://managemyweb.co
        </div>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  let quotations = readJsonData('quotations.json', []);
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

      writeJsonData('quotations.json', quotations);

      // Update associated lead status if leadId is linked
      if (leadId) {
        const leads = readJsonData('leads.json', []);
        const leadIdx = leads.findIndex((l) => l.id === leadId);
        if (leadIdx >= 0) {
          leads[leadIdx].status = sendEmail ? 'Quotation Sent' : leads[leadIdx].status;
          leads[leadIdx].quotedAmount = totals.totalAmount;
          leads[leadIdx].quoteNumber = resolvedNumber;
          writeJsonData('leads.json', leads);
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
    writeJsonData('quotations.json', quotations);
    return res.status(200).json({ success: true, quotation: quotations[idx], quotations });
  }

  // DELETE: Remove quotation
  if (req.method === 'DELETE') {
    const { id } = req.query;
    quotations = quotations.filter((q) => q.id !== id);
    writeJsonData('quotations.json', quotations);
    return res.status(200).json({ success: true, quotations });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

