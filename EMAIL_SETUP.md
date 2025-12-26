# Email Setup Guide

## Automated Response Email

The automated response email is sent from **no-reply@yashkamboj.com** to prevent replies.

## Configuration

### Option 1: Using Gmail (Recommended for Quick Setup)

1. **Set up Gmail App Password**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use this password in `EMAIL_PASS`

2. **Add to `.env` file:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_FROM="Yash Portfolio <your-email@gmail.com>"
   NO_REPLY_EMAIL="Yash Portfolio <no-reply@yashkamboj.com>"
   CONTACT_EMAIL=your-email@gmail.com
   ```

**Note:** Gmail will show the email as coming from your Gmail address, but the "From" field will display as `no-reply@yashkamboj.com` in the recipient's inbox.

### Option 2: Custom Domain Email (Professional Setup)

If you have a custom domain email service (Google Workspace, Microsoft 365, etc.):

1. **Set up SMTP:**
   ```env
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=no-reply@yashkamboj.com
   SMTP_PASS=your-password
   EMAIL_FROM="Yash Portfolio <contact@yashkamboj.com>"
   NO_REPLY_EMAIL="Yash Portfolio <no-reply@yashkamboj.com>"
   CONTACT_EMAIL=contact@yashkamboj.com
   ```

2. **Create the no-reply email address** in your email service
   - This ensures emails actually come from that address
   - Configure it to not receive replies (or set up auto-forwarding)

### Option 3: Email Service Provider (SendGrid, Mailgun, etc.)

For production with high volume:

1. **Sign up for service** (many have free tiers)
2. **Configure SMTP:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=your-api-key
   EMAIL_FROM="Yash Portfolio <contact@yashkamboj.com>"
   NO_REPLY_EMAIL="Yash Portfolio <no-reply@yashkamboj.com>"
   CONTACT_EMAIL=contact@yashkamboj.com
   ```

## How It Works

1. **Automated Response** (to submitter):
   - From: `no-reply@yashkamboj.com`
   - Sent immediately after form submission
   - Includes 2-business-day response timeline

2. **Admin Notification** (to you):
   - From: Your regular email address
   - Contains the contact form submission details
   - Sent to `CONTACT_EMAIL`

## Testing

1. **Test locally:**
   ```bash
   npm run dev
   ```
   Submit the contact form and check:
   - Console logs for email sending status
   - Your email inbox for the admin notification
   - The submitter's email for the automated response

2. **Check email headers:**
   - Verify "From" field shows `no-reply@yashkamboj.com`
   - Verify reply-to is not set (or set to your contact email)

## Troubleshooting

### "From address not verified" error
- **Gmail:** You can't actually send from a different address unless verified
- **Solution:** The email will show your Gmail address, but the display name will show "no-reply@yashkamboj.com"
- **Better solution:** Use a custom domain email service

### Emails going to spam
- Add SPF, DKIM, and DMARC records to your domain
- Use a reputable email service
- Avoid spam trigger words in subject/content

### Emails not sending
- Check email credentials in `.env`
- Verify SMTP settings
- Check server logs for errors
- Test with a different email service

## Production Checklist

- [ ] Email service configured
- [ ] `NO_REPLY_EMAIL` set in environment variables
- [ ] Test automated response email
- [ ] Test admin notification email
- [ ] Verify "From" address in recipient's inbox
- [ ] Set up SPF/DKIM records (for custom domain)
- [ ] Monitor email delivery rates

---

**Note:** The `no-reply@yashkamboj.com` address is primarily for display purposes. The actual sending will use your configured email service credentials. For true no-reply functionality, set up a custom domain email account.

