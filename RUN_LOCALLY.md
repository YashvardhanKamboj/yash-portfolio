# Running the Server Locally

## Quick Start

### Option 1: Use the Script (Easiest)
```bash
./START_SERVER.sh
```

### Option 2: Manual Steps

1. **Install Dependencies** (First time only)
   ```bash
   npm install
   ```

2. **Create .env file** (if not exists)
   ```bash
   # Copy the example or create manually
   # The server will work without it, but MongoDB connection will fail
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

## Prerequisites

### Required
- **Node.js 18+** - [Download](https://nodejs.org/) or `brew install node`

### Optional (for full functionality)
- **MongoDB** - For database features
  - Local: `brew install mongodb-community` (macOS)
  - Or use MongoDB Atlas (cloud, free tier)

## What Happens

1. Server starts on `http://localhost:3000`
2. Frontend loads from `index.html`
3. API endpoints available at `/api/*`
4. MongoDB connection attempted (will fail gracefully if not available)

## MongoDB Setup (Optional)

### Option 1: Local MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Then in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Or use Homebrew: `brew install node`

### "Port 3000 already in use"
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### "MongoDB connection error"
- This is OK! The server will still run
- Frontend will work, but API features won't save data
- Set up MongoDB to enable full functionality

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Testing

Once server is running:

1. **Health Check**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Visit Site**
   - Open http://localhost:3000
   - Check browser console (F12) for errors

3. **Test Contact Form**
   - Scroll to "Summon Me" section
   - Fill out and submit form
   - Check for success message

## Server Output

You should see:
```
🚀 Server running on port 3000
📊 Environment: development
✅ MongoDB Connected: ... (or error if not configured)
```

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

---

**Ready to go live?** See `GO_LIVE_CHECKLIST.md` for deployment steps!

