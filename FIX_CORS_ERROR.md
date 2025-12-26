# Fix CORS/CSP Error - Step by Step

## The Error
"Cross-origin script load denied by Cross-Origin Resource Sharing policy"

**This is actually a Content Security Policy (CSP) error, not CORS!**

## Quick Fix

### Step 1: Make sure server is running
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📊 Environment: development
✅ MongoDB Connected: ...
```

### Step 2: Clear browser cache
- **Chrome/Edge:** `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- **Or:** Open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

### Step 3: Check browser console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for the exact error message
4. Check Network tab to see which script is failing

## What I Fixed

1. **Disabled CSP in development** - Content Security Policy is now disabled when `NODE_ENV !== 'production'`
2. **Added `crossOriginResourcePolicy`** - Allows cross-origin resources
3. **Added `'unsafe-eval'`** - Needed for Tailwind config
4. **Relaxed CORS** - Allows all origins in development

## If Still Not Working

### Option 1: Completely disable CSP (Development Only)
Edit `server.js` and change:
```javascript
app.use(helmet({
  contentSecurityPolicy: false, // Completely disable
  // ... rest
}));
```

### Option 2: Check if server is actually running
```bash
# Check if port 3000 is in use
lsof -i :3000

# If nothing shows, start server:
npm run dev
```

### Option 3: Try different browser
- Sometimes browser extensions cause issues
- Try incognito/private mode
- Try a different browser

### Option 4: Check the exact error
1. Open DevTools (F12)
2. Console tab
3. Copy the exact error message
4. Check which script is failing (Network tab)

## Common Issues

### Issue: "Refused to load script"
**Solution:** CSP is blocking it. The fix above should resolve this.

### Issue: "CORS policy blocked"
**Solution:** This is different - check CORS settings. The fix above should handle this too.

### Issue: Script loads but doesn't execute
**Solution:** Check browser console for JavaScript errors.

## Testing

After applying the fix:
1. Restart server: `npm run dev`
2. Hard refresh browser: `Cmd+Shift+R`
3. Check console - should be no errors
4. Test contact form
5. Test API calls

## Production Note

In production, CSP will be enabled with proper security settings. The current fix only affects development mode.

---

**Still having issues?** Share:
1. The exact error from browser console
2. Which script is failing (from Network tab)
3. Whether server is running
4. Browser and version

