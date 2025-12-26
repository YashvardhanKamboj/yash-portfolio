# CORS Error Fix

## What the Error Means

**"Cross-origin script load denied by Cross-Origin Resource Sharing policy"** means:

1. Your browser is trying to load a script from a different domain
2. The server's security policy is blocking it
3. This can happen with:
   - External CDN scripts (Tailwind, Bootstrap)
   - API calls from frontend to backend
   - Fonts from Google Fonts

## What I Fixed

1. **Updated CORS configuration** - Now allows all origins in development
2. **Fixed Content Security Policy** - Added proper script sources
3. **Disabled cross-origin embedder policy** - Allows external scripts

## If You Still See the Error

### Option 1: Restart the Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Option 2: Clear Browser Cache
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or clear browser cache completely

### Option 3: Check Browser Console
Open browser DevTools (F12) and check:
- Console tab for specific error
- Network tab to see which request is failing

### Option 4: Disable CSP Temporarily (Development Only)
If still having issues, you can temporarily disable CSP in `server.js`:

```javascript
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));
```

**⚠️ Only do this in development!**

## Common Causes

1. **Server not running** - Make sure `npm run dev` is active
2. **Wrong port** - Check if server is on port 3000
3. **Browser cache** - Clear cache and hard refresh
4. **Mixed content** - If using HTTPS, all resources must be HTTPS

## Testing

After the fix, test:
1. Open browser console (F12)
2. Check for CORS errors
3. Try the contact form
4. Check if API calls work

If errors persist, share the exact error message from the browser console!

