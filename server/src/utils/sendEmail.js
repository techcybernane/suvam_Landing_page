import nodemailer from "nodemailer";

let cachedTransporter = null;
let cachedKey = "";

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

function getTransporter() {
  if (!isSmtpConfigured()) return null;
  const key = `${process.env.SMTP_HOST}:${process.env.SMTP_PORT}:${process.env.SMTP_USER}`;
  if (cachedTransporter && cachedKey === key) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  cachedKey = key;
  return cachedTransporter;
}

/**
 * Sends an email if SMTP is configured via env vars; otherwise logs it to the
 * console so local development and demos work without a mail provider on hand.
 */
export async function sendEmail({ to, subject, html, text }) {
  const fromName = process.env.SMTP_FROM_NAME || "CybernaNet";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "hello@cybernanet.com";
  const from = `"${fromName}" <${fromEmail}>`;
  const recipients = Array.isArray(to) ? to.join(", ") : to;

  const transporter = getTransporter();
  if (!transporter) {
    console.log("\n[email:not-sent — SMTP not configured, printing instead]");
    console.log(`From: ${from}`);
    console.log(`To: ${recipients}`);
    console.log(`Subject: ${subject}`);
    console.log(`${text || html}\n`);
    return { delivered: false, reason: "smtp-not-configured" };
  }

  await transporter.sendMail({ from, to: recipients, subject, html, text });
  return { delivered: true };
}

export function smtpStatus() {
  return { configured: isSmtpConfigured() };
}
