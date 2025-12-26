import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/emailService.js';

const router = express.Router();

// Get client IP and user agent
const getClientInfo = (req) => ({
  ipAddress: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown',
  userAgent: req.headers['user-agent'] || 'unknown',
});

// Submit contact form
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
      .trim()
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('subject')
      .trim()
      .notEmpty().withMessage('Subject is required')
      .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
    body('message')
      .trim()
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;
      const clientInfo = getClientInfo(req);

      // Create contact entry (if MongoDB is available)
      let contact = null;
      try {
        contact = await Contact.create({
          name,
          email,
          subject,
          message,
          ...clientInfo,
        });
      } catch (dbError) {
        console.warn('⚠️  Could not save to database (MongoDB not connected):', dbError.message);
        // Continue without saving to database
      }

      // Send automated response to the submitter
      const autoResponseHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1eff8e, #11d1ff); color: #0b0f10; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f5f5f5; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #1eff8e; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Thank You for Contacting Me!</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out through my portfolio website. I've received your message regarding <strong>"${subject}"</strong>.</p>
              <p>Your request will be reviewed and I'll get back to you within <span class="highlight">2 business days</span>.</p>
              <p>If your inquiry is urgent, please feel free to reach out directly via email or LinkedIn.</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p><strong>Your Message:</strong></p>
              <p style="background: white; padding: 15px; border-left: 3px solid #1eff8e; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p>Best regards,<br><strong>Yash Kamboj</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated response from no-reply@yashkamboj.com. Please do not reply to this email.</p>
              <p>For inquiries, please use the contact form at <a href="https://yashkamboj.com">yashkamboj.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `;

      const autoResponseText = `
Thank You for Contacting Me!

Hi ${name},

Thank you for reaching out through my portfolio website. I've received your message regarding "${subject}".

Your request will be reviewed and I'll get back to you within 2 business days.

If your inquiry is urgent, please feel free to reach out directly via email or LinkedIn.

Your Message:
${message}

Best regards,
Yash Kamboj

---
This is an automated response from no-reply@yashkamboj.com. Please do not reply to this email.
For inquiries, please use the contact form at https://yashkamboj.com
      `;

      // Send automated response to submitter (from no-reply address)
      sendEmail({
        to: email,
        from: process.env.NO_REPLY_EMAIL || '"Yash Portfolio" <no-reply@yashkamboj.com>',
        subject: `Re: ${subject} - Thank you for contacting Yash Kamboj`,
        html: autoResponseHtml,
        text: autoResponseText,
      }).catch(err => console.error('Auto-response email error:', err));

      // Send notification email to admin (async, don't wait)
      sendEmail({
        to: process.env.CONTACT_EMAIL || 'contact@yashkamboj.com',
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>IP: ${clientInfo.ipAddress}</small></p>
          <p><small>Time: ${new Date().toISOString()}</small></p>
        `,
      }).catch(err => console.error('Admin notification email error:', err));

      res.status(201).json({
        success: true,
        message: 'Thank you for your message! You\'ll receive a confirmation email shortly. I\'ll get back to you within 2 business days.',
        id: contact?._id || 'no-db',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
      });
    }
  }
);

// Get all contacts (admin only - add auth middleware in production)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
});

// Update contact status (admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { status, repliedAt } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, repliedAt: repliedAt ? new Date(repliedAt) : null },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
    });
  }
});

export default router;

