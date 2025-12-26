import nodemailer from 'nodemailer';

// Create transporter (configure with your email service)
const createTransporter = () => {
  // For production, use environment variables
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // For other SMTP services
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development: use ethereal.email for testing
  return nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass',
    },
  });
};

export const sendEmail = async ({ to, subject, html, text, from }) => {
  try {
    // Skip email sending if not configured (for development)
    if (!process.env.EMAIL_USER && !process.env.SMTP_HOST) {
      console.log('📧 Email not configured. Would send:', { to, subject, from: from || 'default' });
      return { success: true, message: 'Email service not configured' };
    }

    const transporter = createTransporter();
    
    // Use custom "from" if provided, otherwise use default
    const fromAddress = from || process.env.EMAIL_FROM || `"Yash Portfolio" <${process.env.EMAIL_USER}>`;
    
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
};

