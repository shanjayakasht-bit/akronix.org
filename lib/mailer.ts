import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailPayload) {
  const { name, email, phone, subject, message } = data;

  // ── Email to YOU (notification) ──────────────────────────────────────────
  await transporter.sendMail({
    from: `"Akronix Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: adminEmailTemplate({ name, email, phone, subject, message }),
  });

  // ── Auto-reply to the visitor ────────────────────────────────────────────
  await transporter.sendMail({
    from: `"Akronix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your message — Akronix`,
    html: autoReplyTemplate({ name }),
  });
}

// ─── Templates ───────────────────────────────────────────────────────────────

function adminEmailTemplate({
  name,
  email,
  phone,
  subject,
  message,
}: ContactEmailPayload) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                📬 New Contact Form Submission
              </h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">Akronix Website</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <table width="100%" cellpadding="0" cellspacing="0">
                ${infoRow("Name", name)}
                ${infoRow("Email", `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>`)}
                ${phone ? infoRow("Phone", phone) : ""}
                ${infoRow("Subject", subject)}
              </table>

              <!-- Message -->
              <div style="margin-top:24px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <div style="background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;color:#1e293b;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</div>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                   style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                  Reply to ${name}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                This email was sent automatically from the Akronix contact form · <a href="https://akronix.in" style="color:#64748b;">akronix.in</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;width:120px;">
        <span style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1e293b;">
        ${value}
      </td>
    </tr>`;
}

function autoReplyTemplate({ name }: { name: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Akronix</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">We've got your message!</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Hi ${name} 👋</h2>
              <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
                Thank you for reaching out to us. We've received your message and a member of our team will get back to you within <strong>1–2 business days</strong>.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#475569;line-height:1.7;">
                In the meantime, feel free to explore our work or follow us on social media.
              </p>

              <div style="text-align:center;">
                <a href="https://akronix.in"
                   style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                  Visit Our Website
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                © ${new Date().getFullYear()} Akronix · <a href="https://akronix.in" style="color:#64748b;">akronix.in</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
