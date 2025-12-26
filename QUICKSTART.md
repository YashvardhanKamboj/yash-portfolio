# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Local Development Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and set at minimum:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

### Step 3: Start MongoDB
**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (free M0 tier)
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

### Step 4: Run the Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📧 Email Setup (Optional)

For contact form to send emails:

### Gmail
1. Enable 2-Step Verification in Google Account
2. Generate App Password
3. Add to `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

### Skip Email (Development)
Contact form will still work, but emails won't send. Check console for logs.

## 🧪 Test the Backend

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Test Contact Form
1. Go to http://localhost:3000
2. Scroll to "Summon Me" section
3. Fill out and submit contact form
4. Check MongoDB for stored contact

### Test Analytics
1. Visit the site
2. Press `⌘+Shift+Y` (Mac) or `Ctrl+Shift+Y` (Windows)
3. View admin dashboard with visitor stats

## 🚢 Deploy to Production

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

Then set environment variables in Vercel dashboard.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 Add Your First Project

### Via API
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Project",
    "description": "A cool project I built",
    "tags": ["React", "Node.js"],
    "technologies": ["JavaScript"],
    "githubUrl": "https://github.com/username/project",
    "status": "published"
  }'
```

### Via MongoDB
```javascript
// In MongoDB shell or Compass
db.projects.insertOne({
  title: "My Project",
  description: "Project description",
  tags: ["React"],
  technologies: ["JavaScript"],
  status: "published",
  featured: true
})
```

## 🎯 Next Steps

1. ✅ Customize content in `index.html`
2. ✅ Add your projects via API
3. ✅ Set up email service
4. ✅ Deploy to production
5. ✅ Share your portfolio!

## 🆘 Troubleshooting

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check network access settings

**Port Already in Use**
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:3000 | xargs kill`

**Module Not Found**
- Run `npm install` again
- Check Node.js version (18+)

**Contact Form Not Working**
- Check browser console for errors
- Verify API endpoint: `/api/contact`
- Check server logs

## 📚 Documentation

- [Full README](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./README.md#-api-endpoints)

---

Happy coding! 🎉

