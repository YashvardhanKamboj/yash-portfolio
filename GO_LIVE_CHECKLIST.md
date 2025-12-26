# 🚀 Go Live Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Checklist

### 1. Code Ready
- [x] Backend server configured
- [x] Frontend integrated with API
- [x] Security middleware in place
- [x] Error handling implemented
- [x] Environment variables configured

### 2. Database Setup (REQUIRED)
- [ ] **MongoDB Atlas account created** (free tier available)
  - Go to: https://www.mongodb.com/cloud/atlas
  - Create free account
  - Create cluster (M0 free tier)
  - Create database user
  - Whitelist IP: `0.0.0.0/0` (or specific IPs)
  - Get connection string

### 3. Environment Variables (REQUIRED)
Set these in your hosting platform:

**Minimum Required:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
FRONTEND_URL=https://your-domain.com
```

**Recommended:**
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
FRONTEND_URL=https://your-domain.com
CONTACT_EMAIL=your-email@example.com
```

**Email (Optional but Recommended):**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Yash Portfolio <your-email@gmail.com>"
```

### 4. Security (IMPORTANT)
- [ ] Change `JWT_SECRET` to a strong random string (if using admin auth)
- [ ] Set `NODE_ENV=production`
- [ ] Review CORS settings (set `FRONTEND_URL` to your domain)
- [ ] Verify rate limiting is active

### 5. Testing
- [ ] Test contact form locally
- [ ] Test API endpoints
- [ ] Verify MongoDB connection
- [ ] Check error handling

### 6. Deployment Platform
Choose one:
- [ ] **Vercel** (Recommended - Easiest)
- [ ] Railway
- [ ] Render
- [ ] Heroku
- [ ] DigitalOcean

---

## 🚀 Quick Deploy Steps

### Option 1: Vercel (5 minutes)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow prompts. For production:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from checklist above

5. **Done!** Your site is live at `https://your-project.vercel.app`

### Option 2: Railway (5 minutes)

1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Select your repository

2. **Add MongoDB**
   - Click "+ New" → Database → MongoDB
   - Railway provides connection string automatically

3. **Set Environment Variables**
   - Variables tab → Add variables
   - Railway auto-sets `MONGODB_URI` from MongoDB service

4. **Deploy**
   - Auto-deploys on push to main branch

### Option 3: Render (5 minutes)

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repository

2. **Configure**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node

3. **Add MongoDB**
   - New → MongoDB
   - Copy connection string

4. **Set Environment Variables**
   - Environment tab → Add variables

---

## 📧 Email Setup (Optional)

### Gmail Setup (5 minutes)

1. **Enable 2-Step Verification**
   - Google Account → Security → 2-Step Verification

2. **Generate App Password**
   - Google Account → Security → App Passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Add to Environment Variables**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_FROM="Yash Portfolio <your-email@gmail.com>"
   CONTACT_EMAIL=your-email@gmail.com
   ```

**Note:** Contact form works without email, but you won't receive notifications.

---

## 🧪 Post-Deployment Testing

After deploying, test:

1. **Health Check**
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Visit Site**
   - Open your live URL
   - Check all sections load

3. **Test Contact Form**
   - Fill out and submit
   - Check for success message
   - Verify in MongoDB (if email not set up)

4. **Test Admin Panel**
   - Press `⌘+Shift+Y` (Mac) or `Ctrl+Shift+Y` (Windows)
   - Check if stats load

5. **Check Logs**
   - Review platform logs for errors
   - Fix any issues

---

## ⚠️ Common Issues

### MongoDB Connection Fails
- Check connection string format
- Verify database user credentials
- Check network access (IP whitelist)
- Ensure cluster is running

### Contact Form Not Working
- Check browser console for errors
- Verify API endpoint is accessible
- Check rate limiting (might be blocked)
- Review server logs

### Email Not Sending
- Verify email credentials
- Check spam folder
- Test with different email service
- Check server logs for errors

### CORS Errors
- Set `FRONTEND_URL` to your exact domain
- Include protocol: `https://your-domain.com`
- No trailing slash

---

## ✅ Ready to Deploy?

If you've completed:
- [x] MongoDB Atlas set up
- [x] Environment variables ready
- [x] Chosen deployment platform
- [x] Tested locally

**You're ready to go live!** 🎉

Follow the deployment steps above for your chosen platform.

---

## 📞 Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review [QUICKSTART.md](./QUICKSTART.md) for local setup
- See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details

