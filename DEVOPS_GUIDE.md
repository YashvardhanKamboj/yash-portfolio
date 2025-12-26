# 🚀 Complete DevOps Guide

## Table of Contents
1. [CI/CD Pipeline](#cicd-pipeline)
2. [Docker Deployment](#docker-deployment)
3. [Monitoring & Logging](#monitoring--logging)
4. [Performance Testing](#performance-testing)
5. [Security Scanning](#security-scanning)
6. [Backup & Recovery](#backup--recovery)
7. [Scaling](#scaling)

## CI/CD Pipeline

### GitHub Actions (Already Set Up)

**Workflow Files:**
- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/lighthouse.yml` - Performance testing

**Features:**
- ✅ Automated testing on push/PR
- ✅ Security audits
- ✅ Automatic deployment to Vercel
- ✅ Lighthouse performance checks

### Setup GitHub Actions Secrets

1. Go to: GitHub Repo → Settings → Secrets → Actions
2. Add:
   - `VERCEL_TOKEN` - From Vercel dashboard
   - `VERCEL_ORG_ID` - From Vercel dashboard
   - `VERCEL_PROJECT_ID` - From Vercel dashboard

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Docker Deployment

### Build Docker Image

```bash
# Build
docker build -t portfolio:latest .

# Run
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongo:27017/portfolio \
  -e NODE_ENV=production \
  portfolio:latest
```

### Docker Compose (Full Stack)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Docker

```bash
# Build for production
docker build -t portfolio:prod .

# Run with environment variables
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e NODE_ENV=production \
  portfolio:prod
```

## Monitoring & Logging

### Application Monitoring

**Option 1: PM2 (Process Manager)**
```bash
# Install PM2
npm i -g pm2

# Start app
pm2 start server.js --name portfolio

# Monitor
pm2 monit

# Logs
pm2 logs portfolio

# Auto-restart on crash
pm2 startup
pm2 save
```

**Option 2: Sentry (Error Tracking)**
```bash
npm install @sentry/node @sentry/integrations
```

Add to `server.js`:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**Option 3: New Relic**
```bash
npm install newrelic
```

### Logging

**Winston Logger** (Recommended)
```bash
npm install winston
```

Create `backend/utils/logger.js`:
```javascript
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Health Checks

**Built-in Health Endpoint:**
```bash
curl http://localhost:3000/api/health
```

**Uptime Monitoring:**
- UptimeRobot (free): https://uptimerobot.com
- Pingdom
- StatusCake

## Performance Testing

### Load Testing

**Artillery**
```bash
npm install -g artillery

# Create test file: load-test.yml
artillery run load-test.yml
```

**Example `load-test.yml`:**
```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Health Check"
    flow:
      - get:
          url: "/api/health"
  - name: "Contact Form"
    flow:
      - post:
          url: "/api/contact"
          json:
            name: "Load Test"
            email: "test@example.com"
            subject: "Test"
            message: "Load testing message"
```

### Lighthouse CI

Already configured in `.github/workflows/lighthouse.yml`

**Run Locally:**
```bash
npm install -g @lhci/cli
lhci autorun
```

### Performance Metrics

**Key Metrics to Monitor:**
- Response time (API)
- Page load time
- Time to First Byte (TTFB)
- Database query time
- Memory usage
- CPU usage

## Security Scanning

### npm Audit

```bash
# Check vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Fix with breaking changes
npm audit fix --force
```

### Snyk

```bash
npm install -g snyk
snyk test
snyk monitor
```

### OWASP ZAP

```bash
# Docker scan
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t http://localhost:3000
```

### Security Headers

Already configured with Helmet.js:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

## Backup & Recovery

### MongoDB Backup

**Automated Backup Script:**
```bash
#!/bin/bash
# backup-mongo.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# MongoDB Atlas backup (automatic)
# Or manual backup:
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/backup_$DATE"

# Compress
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$BACKUP_DIR/backup_$DATE"

# Upload to S3 (optional)
# aws s3 cp "$BACKUP_DIR/backup_$DATE.tar.gz" s3://your-bucket/backups/
```

### Database Restore

```bash
mongorestore --uri="$MONGODB_URI" ./backup_20241118_120000
```

### Automated Backups

**Cron Job (Linux/Mac):**
```bash
# Add to crontab
0 2 * * * /path/to/backup-mongo.sh
```

## Scaling

### Horizontal Scaling

**Load Balancer Setup:**
```nginx
# nginx.conf
upstream portfolio {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    listen 80;
    server_name yashkamboj.com;
    
    location / {
        proxy_pass http://portfolio;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Vertical Scaling

**PM2 Cluster Mode:**
```bash
pm2 start server.js -i max
```

### Database Scaling

**MongoDB Atlas:**
- Auto-scaling enabled
- Read replicas
- Sharding for large datasets

### CDN Setup

**Cloudflare:**
1. Add domain to Cloudflare
2. Update DNS
3. Enable caching
4. Configure SSL

## Environment Management

### Environment Variables

**Production:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://yashkamboj.com
EMAIL_SERVICE=gmail
EMAIL_USER=...
```

**Staging:**
```env
NODE_ENV=staging
MONGODB_URI=mongodb+srv://...-staging
FRONTEND_URL=https://staging.yashkamboj.com
```

## Deployment Checklist

- [ ] All tests passing
- [ ] Security audit clean
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Logging configured
- [ ] Health checks working
- [ ] SSL certificate valid
- [ ] CDN configured
- [ ] Backup strategy in place

## Useful Commands

```bash
# View logs
pm2 logs portfolio
docker-compose logs -f

# Restart services
pm2 restart portfolio
docker-compose restart

# Check status
pm2 status
docker-compose ps

# Monitor resources
pm2 monit
docker stats

# Database connection
mongosh "$MONGODB_URI"

# Health check
curl http://localhost:3000/api/health
```

---

**Need help?** Check:
- [CI/CD Setup](./.github/workflows/ci.yml)
- [Docker Setup](./Dockerfile)
- [Deployment Guide](./DEPLOYMENT.md)

