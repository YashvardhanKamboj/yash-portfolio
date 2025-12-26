# Deployment Guide

This guide covers deploying your portfolio to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to your project on [vercel.com](https://vercel.com)
   - Settings → Environment Variables
   - Add all variables from `.env.example`

5. **MongoDB Setup**
   - Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
   - Create a cluster
   - Get connection string
   - Add to `MONGODB_URI` in Vercel

### Option 2: Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Select your repository

2. **Add MongoDB**
   - Click "+ New" → Database → MongoDB
   - Railway will provide connection string

3. **Set Environment Variables**
   - Go to Variables tab
   - Add all variables from `.env.example`

4. **Deploy**
   - Railway auto-deploys on push to main branch

### Option 3: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect your GitHub repository

2. **Configure**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node

3. **Add MongoDB**
   - New → MongoDB
   - Copy connection string

4. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Set `MONGODB_URI` to your MongoDB connection string

### Option 4: Heroku

1. **Install Heroku CLI**
   ```bash
   npm i -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-portfolio-name
   ```

4. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=$(heroku config:get MONGODB_URI)
   # Add other variables as needed
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

## 📧 Email Configuration

### Gmail Setup

1. **Enable App Password**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use this password in `EMAIL_PASS`

2. **Environment Variables**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM="Yash Portfolio <your-email@gmail.com>"
   ```

### Custom SMTP

For other email providers (SendGrid, Mailgun, etc.):

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
EMAIL_FROM="Yash Portfolio <your-email@example.com>"
```

## 🗄️ MongoDB Setup

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up (free tier available)

2. **Create Cluster**
   - Choose free M0 tier
   - Select region closest to you
   - Create cluster

3. **Database Access**
   - Security → Database Access
   - Add new database user
   - Save username and password

4. **Network Access**
   - Security → Network Access
   - Add IP Address: `0.0.0.0/0` (allow all, or specific IPs)

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

6. **Set in Environment**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Local MongoDB (Development Only)

```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## 🔐 Security Checklist

Before going live:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change `ADMIN_PASSWORD` to a secure password
- [ ] Set `NODE_ENV=production`
- [ ] Review CORS settings in `server.js`
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Set up proper email service
- [ ] Test contact form
- [ ] Test rate limiting
- [ ] Review MongoDB access controls

## 🧪 Testing Deployment

1. **Health Check**
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Test Contact Form**
   - Submit a test message
   - Check email inbox

3. **Test Analytics**
   - Visit site
   - Check admin dashboard (⌘+Shift+Y)

4. **Check Logs**
   - Most platforms provide logs in dashboard
   - Monitor for errors

## 📊 Monitoring

### Recommended Tools

- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com) (free)
- **Error Tracking**: [Sentry](https://sentry.io) (free tier)
- **Analytics**: Built-in visitor tracking in admin panel

## 🔄 Continuous Deployment

Most platforms auto-deploy on git push:

1. **Connect GitHub Repository**
2. **Set Environment Variables**
3. **Push to main branch**
4. **Platform auto-deploys**

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Check connection string format
- Verify network access settings
- Check database user credentials

### Email Not Sending
- Verify email credentials
- Check spam folder
- Test with different email service
- Check platform logs for errors

### API Errors
- Check environment variables
- Verify MongoDB connection
- Check rate limiting settings
- Review server logs

### Build Failures
- Ensure Node.js version matches (18+)
- Check `package.json` dependencies
- Review build logs

## 📝 Post-Deployment

1. **Update DNS** (if using custom domain)
2. **Test all features**
3. **Set up monitoring**
4. **Backup database** (MongoDB Atlas has automatic backups)
5. **Share your portfolio!** 🎉

