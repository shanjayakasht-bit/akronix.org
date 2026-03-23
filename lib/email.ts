import nodemailer from "nodemailer";
 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
 
export interface LeadEmailPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
}
 
export async function sendLeadNotificationEmail(
  payload: LeadEmailPayload
): Promise<void> {
  const { firstName, lastName, email, phone, company, message, source } =
    payload;
 
  const adminEmail = process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER;
 
  await transporter.sendMail({
    from: `"Akronix Leads" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `New Lead: ${firstName} ${lastName}${company ? ` from ${company}` : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New Lead Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 140px;">Name</td>
            <td style="padding: 8px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${
            phone
              ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Phone</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>`
              : ""
          }
          ${
            company
              ? `<tr style="background: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Company</td>
            <td style="padding: 8px;">${company}</td>
          </tr>`
              : ""
          }
          ${
            source
              ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Source</td>
            <td style="padding: 8px;">${source}</td>
          </tr>`
              : ""
          }
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">
          Submitted via Akronix website · ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    text: `
New Lead: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}${source ? `Source: ${source}\n` : ""}
Message:
${message}
    `.trim(),
  });
}
 
export async function sendLeadConfirmationEmail(
  payload: Pick<LeadEmailPayload, "firstName" | "email">
): Promise<void> {
  const { firstName, email } = payload;
 
  await transporter.sendMail({
    from: `"Akronix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${firstName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">We got your message!</h2>
        <p>Hi ${firstName},</p>
        <p>Thanks for getting in touch. A member of our team will review your enquiry and get back to you shortly.</p>
        <p style="color: #888; font-size: 12px; margin-top: 32px;">— The Akronix Team</p>
      </div>
    `,
    text: `Hi ${firstName},\n\nThanks for getting in touch. A member of our team will review your enquiry and get back to you shortly.\n\n— The Akronix Team`,
  });
}
