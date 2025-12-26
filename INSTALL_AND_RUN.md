# Install Node.js and Run Server

## Node.js is Not Installed

I couldn't find Node.js/npm on your system. Here's how to install it and run the server:

## Quick Install (Choose One)

### Option 1: Download Installer (Easiest)
1. Go to: https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. Restart Terminal
5. Run: `npm --version` to verify

### Option 2: Homebrew (If you have it)
```bash
brew install node
```

### Option 3: Using nvm (Node Version Manager)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install --lts
nvm use --lts
```

## After Installing Node.js

1. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Should show version numbers (Node 18+ recommended)

2. **Navigate to Project**
   ```bash
   cd ~/Desktop/Projects/Portfolio
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   This will take 1-2 minutes

4. **Start Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   ```
   http://localhost:3000
   ```

## Quick Start Script

After Node.js is installed, you can use:
```bash
./START_SERVER.sh
```

## What You'll See

When server starts successfully:
```
🚀 Server running on port 3000
📊 Environment: development
✅ MongoDB Connected: ... (or error if not set up - that's OK!)
```

Then open http://localhost:3000 in your browser!

## Troubleshooting

### "command not found: npm"
- Node.js isn't installed or not in PATH
- Restart Terminal after installing
- Or run: `source ~/.zshrc` or `source ~/.bash_profile`

### "Port 3000 already in use"
```bash
lsof -i :3000
kill -9 <PID>
```

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Once Node.js is installed, I can help you start the server!**

