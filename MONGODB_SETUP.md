# MongoDB Setup Guide

## Quick Start

### Step 1: Start MongoDB

**Option A: Using Homebrew (macOS)**
```bash
brew services start mongodb-community
```

**Option B: Manual Start**
```bash
mongod --dbpath ~/data/db
```
(Leave this terminal open)

**Option C: Check if already running**
```bash
ps aux | grep mongod
```
If you see a process, MongoDB is already running!

### Step 2: Verify MongoDB is Running

```bash
# Test connection
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 7.x.x
```

Type `exit` to leave MongoDB shell.

### Step 3: Configure Your Website

**Create/Update `.env` file:**
```bash
cd ~/Desktop/Projects/Portfolio
```

Create `.env` file with:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:3000
CONTACT_EMAIL=contact@yashkamboj.com
```

### Step 4: Start Your Website

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost:27017
🚀 Server running on port 3000
```

---

## Using MongoDB

### View Your Data

**Open MongoDB Shell:**
```bash
mongosh
```

**Switch to your database:**
```javascript
use portfolio
```

**View collections (tables):**
```javascript
show collections
```

**View contacts:**
```javascript
db.contacts.find().pretty()
```

**View visitors:**
```javascript
db.visitors.find().pretty()
```

**View projects:**
```javascript
db.projects.find().pretty()
```

**Count documents:**
```javascript
db.contacts.countDocuments()
db.visitors.countDocuments()
```

### Useful Commands

**Find recent contacts:**
```javascript
db.contacts.find().sort({createdAt: -1}).limit(5).pretty()
```

**Find pending contacts:**
```javascript
db.contacts.find({status: "pending"}).pretty()
```

**Delete all test data:**
```javascript
db.contacts.deleteMany({})
db.visitors.deleteMany({})
```

**Exit MongoDB shell:**
```javascript
exit
```

---

## MongoDB GUI Tools (Optional)

### MongoDB Compass (Recommended)
1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017`
4. Browse your data visually

### Studio 3T (Alternative)
- Download: https://studio3t.com/
- Free version available

---

## Common Issues

### "MongoDB connection error"
**Solution:**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# If not running, start it
brew services start mongodb-community
```

### "Port 27017 already in use"
**Solution:**
```bash
# Find what's using the port
lsof -i :27017

# Kill the process (if needed)
kill -9 <PID>
```

### "Permission denied"
**Solution:**
```bash
# Create data directory
mkdir -p ~/data/db

# Give permissions
chmod 755 ~/data/db
```

---

## Production: MongoDB Atlas (Cloud)

For production, use MongoDB Atlas (free tier):

1. **Sign up:** https://www.mongodb.com/cloud/atlas
2. **Create cluster** (free M0 tier)
3. **Create database user**
4. **Whitelist IP:** `0.0.0.0/0` (or your server IP)
5. **Get connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```
6. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

---

## Next Steps

1. ✅ Start MongoDB: `brew services start mongodb-community`
2. ✅ Start website: `npm run dev`
3. ✅ Test contact form - data will save to MongoDB
4. ✅ View data: `mongosh` → `use portfolio` → `db.contacts.find()`

---

**Need help?** Check MongoDB logs:
```bash
tail -f /usr/local/var/log/mongodb/mongo.log
```

