# 📊 Analytics & Website Traffic Guide

## How to Check Website Footfall/Traffic

### Method 1: Admin Dashboard (Built-in)

1. **Open your website** in browser
2. **Press the hotkey**: `⌘+Shift+Y` (Mac) or `Ctrl+Shift+Y` (Windows)
3. **View real-time stats**:
   - Total visitors
   - Unique visitors
   - Returning visitors
   - Device breakdown
   - Browser statistics
   - Operating system stats
   - Top pages

### Method 2: API Endpoint

**Get Analytics Summary:**
```bash
curl http://localhost:3000/api/analytics/summary
```

**Get Daily Stats:**
```bash
curl http://localhost:3000/api/analytics/stats?days=30
```

### Method 3: MongoDB Queries

Connect to MongoDB and run:
```javascript
// Total visitors
db.visitors.countDocuments()

// Unique visitors
db.visitors.distinct("ipAddress").length

// Visitors by date
db.visitors.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: -1 } }
])

// Top pages
db.visitors.aggregate([
  { $group: { _id: "$page", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])
```

## What Gets Tracked

- **Page views** - Every page visit
- **Unique visitors** - Based on IP address
- **Returning visitors** - Visitors who come back
- **Device type** - Desktop, mobile, tablet
- **Browser** - Chrome, Firefox, Safari, etc.
- **Operating System** - Windows, macOS, Linux, iOS, Android
- **Referrer** - Where visitors came from
- **Session duration** - How long visitors stay
- **Geographic data** - Country, city (if IP geolocation enabled)

## Setting Up Advanced Analytics

### Option 1: Google Analytics

Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Option 2: Plausible Analytics (Privacy-friendly)

Add to `index.html`:
```html
<script defer data-domain="yashkamboj.com" src="https://plausible.io/js/script.js"></script>
```

### Option 3: Custom Dashboard

Create a custom analytics dashboard page:
1. Add route: `/analytics-dashboard`
2. Fetch data from `/api/analytics/summary`
3. Display charts using Chart.js or similar

## Real-time Monitoring

### Server Logs
```bash
# View server logs
npm run dev

# Or in production
pm2 logs portfolio
```

### Health Monitoring
```bash
# Check server health
curl http://localhost:3000/api/health

# Monitor continuously
watch -n 5 'curl -s http://localhost:3000/api/health'
```

## Analytics Features

### Visitor Tracking
- Automatic tracking on page load
- Session management
- Device detection
- Browser fingerprinting

### Contact Form Analytics
- Total submissions
- Pending responses
- Response rate
- Average response time

### Project Analytics
- Most viewed projects
- Project likes
- Click-through rates

## Exporting Data

### Export to CSV
```javascript
// In MongoDB shell
db.visitors.find().forEach(function(doc) {
  print(doc.ipAddress + "," + doc.device + "," + doc.createdAt);
});
```

### Export via API
Create endpoint to export analytics data:
```javascript
// GET /api/analytics/export?format=csv
```

## Privacy Considerations

- **GDPR Compliance**: Consider adding cookie consent
- **IP Anonymization**: Hash IP addresses for privacy
- **Data Retention**: Set up automatic cleanup of old data
- **Opt-out**: Allow visitors to opt out of tracking

## Dashboard Access

**Admin Panel Hotkey**: `⌘+Shift+Y` or `Ctrl+Shift+Y`

Shows:
- 📊 Overview statistics
- 👥 Visitor metrics
- 📧 Contact form stats
- 🚀 Project statistics
- 📝 Blog post stats
- 📈 Recent activity

---

**Need more analytics?** Consider integrating:
- Google Analytics 4
- Plausible Analytics
- Mixpanel
- Amplitude
- Custom dashboards

