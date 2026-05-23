/**
 * Email Service — Resend Integration
 *
 * Setup instructions:
 * 1. Install resend: pnpm --filter @workspace/api-server add resend
 * 2. Set environment variables (see below)
 * 3. Uncomment the Resend import and remove the stub block
 *
 * Required environment variables:
 *   RESEND_API_KEY    — Your Resend API key (get from resend.com)
 *   RESEND_FROM_EMAIL — Sender address verified with Resend (e.g. "VIDERO <hello@yourdomain.co.uk>")
 *   BUSINESS_EMAIL    — Your internal notification recipient (e.g. "owner@yourdomain.co.uk")
 */

import { Resend } from "resend";

interface LeadEmailData {
  name: string;
  email: string;
  company?: string | null;
  clientType: string;
  message?: string | null;
  sourcePage?: string | null;
}

function isConfigured(): boolean {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.BUSINESS_EMAIL
  );
}

function clientTypeLabel(value: string): string {
  const map: Record<string, string> = {
    letting_agency: "Letting Agency",
    independent_landlord: "Independent Landlord",
    serviced_accommodation: "Serviced Accommodation Operator",
    airbnb_host: "Airbnb Host",
    other: "Other",
  };
  return map[value] ?? value;
}

function autoResponseHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enquiry Received — VIDERO</title>
</head>
<body style="margin:0;padding:0;background:#f8f8f8;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8e8e8;">
        <!-- Header -->
        <tr>
          <td style="background:#0D0D2A;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.4);font-weight:400;">Property Documentation</p>
            <p style="margin:6px 0 0;font-size:18px;letter-spacing:6px;text-transform:uppercase;color:#ffffff;font-family:Georgia,serif;font-weight:400;">VIDERO</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#7B2FE8;font-weight:500;">Enquiry Received</p>
            <h1 style="margin:0 0 20px;font-size:24px;color:#16163F;font-family:Georgia,serif;font-weight:400;line-height:1.3;">Thanks for reaching out, ${name}.</h1>
            <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;font-weight:300;">We've received your enquiry and will review your requirements shortly. You can expect a structured response within 48 hours.</p>
            <p style="margin:0 0 32px;font-size:14px;color:#555;line-height:1.7;font-weight:300;">In the meantime, feel free to browse our services or get in touch directly.</p>
            <!-- CTA -->
            ${process.env.PUBLIC_URL ? `
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:linear-gradient(135deg,#7B2FE8,#3F60F0);padding:12px 28px;">
                  <a href="${process.env.PUBLIC_URL}/services" style="color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;letter-spacing:1px;">View Our Services</a>
                </td>
              </tr>
            </table>` : ""}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #f0f0f0;padding:24px 40px;">
            <p style="margin:0;font-size:11px;color:#aaa;font-weight:300;line-height:1.6;">VIDERO Property Systems · Bristol, United Kingdom<br/>This is an automated confirmation. Please do not reply to this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalNotificationHtml(lead: LeadEmailData, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Lead — VIDERO</title></head>
<body style="margin:0;padding:40px 0;background:#f8f8f8;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8e8e8;">
      <tr><td style="background:#0D0D2A;padding:24px 32px;">
        <p style="margin:0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);">VIDERO</p>
        <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;">New Enquiry Received</p>
      </td></tr>
      <tr><td style="padding:32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ["Name", lead.name],
            ["Email", lead.email],
            ["Organisation", lead.company || "—"],
            ["Client Type", clientTypeLabel(lead.clientType)],
            ["Message", lead.message || "—"],
            ["Source Page", lead.sourcePage || "—"],
            ["Submitted At", timestamp],
          ].map(([label, value]) => `
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f5f5f5;width:35%;">
              <span style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;font-weight:500;">${label}</span>
            </td>
            <td style="padding:8px 0;border-bottom:1px solid #f5f5f5;">
              <span style="font-size:13px;color:#333;font-weight:400;">${value}</span>
            </td>
          </tr>`).join("")}
        </table>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

export async function sendLeadEmails(lead: LeadEmailData): Promise<void> {
  if (!isConfigured()) {
    console.warn("[Email] Skipping — RESEND_API_KEY / RESEND_FROM_EMAIL / BUSINESS_EMAIL not set.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

  const results = await Promise.allSettled([
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [lead.email],
      subject: "Enquiry Received — VIDERO Property Documentation",
      html: autoResponseHtml(lead.name),
    }),
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.BUSINESS_EMAIL!],
      subject: `New VIDERO Enquiry — ${lead.name}`,
      html: internalNotificationHtml(lead, timestamp),
    }),
  ]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[Email] Failed to send email ${i + 1}:`, result.reason);
    }
  });
}
