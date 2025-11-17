// config/email.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ EMAIL ENV NOT FOUND");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔍 Optional: test SMTP connection (VERY useful on Render)
    await transporter.verify();
    console.log("✅ SMTP connection established");

    const info = await transporter.sendMail({
      from: `"Movian" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📩 Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Email error:", {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    return null;
  }
};
