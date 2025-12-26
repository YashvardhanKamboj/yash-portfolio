# Yash Kamboj - Portfolio Website

A modern, full-stack portfolio website with a robust backend API showcasing projects, skills, and blog posts.

## 🚀 Features

### Frontend
- Modern, responsive design with hacker/cyberpunk aesthetic
- Interactive animations and effects
- Matrix background animation
- Project showcase with modals
- Skills display with 3D tilt effects
- Spellbook (command snippets) with copy functionality
- Contact form integration
- Command palette (⌘K)
- Admin panel (⌘+Shift+Y)

### Backend API
- **Contact Form API** - Secure contact form with email notifications
- **Analytics System** - Visitor tracking and analytics
- **Project Management** - CRUD operations for projects
- **Blog System** - Full blog post management
- **Admin Dashboard** - Comprehensive admin panel with statistics
- **Security Features**:
  - Rate limiting
  - Input validation and sanitization
  - XSS protection
  - MongoDB injection prevention
  - CORS configuration
  - Helmet.js security headers

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - MongoDB connection string
   - Email service credentials (optional for development)
   - JWT secret for admin authentication

4. **Start MongoDB**
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string in `.env`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── models/          # MongoDB models
│   │   ├── Contact.js
│   │   ├── Visitor.js
│   │   ├── Project.js
│   │   └── BlogPost.js
│   ├── routes/          # API routes
│   │   ├── contactRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── blogRoutes.js
│   │   └── adminRoutes.js
│   └── utils/           # Utility functions
│       └── emailService.js
├── assets/              # Static assets
├── images/              # Images
├── index.html           # Main HTML file
├── script.js            # Frontend JavaScript
├── style.css            # Styles
├── server.js            # Express server
├── package.json         # Dependencies
└── .env                 # Environment variables (not in git)
```

## 🔌 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PATCH /api/contact/:id` - Update contact status (admin)

### Analytics
- `POST /api/analytics/track` - Track visitor
- `GET /api/analytics/summary` - Get analytics summary (admin)
- `GET /api/analytics/stats` - Get visitor stats by date range

### Projects
- `GET /api/projects` - Get all published projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PATCH /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `POST /api/projects/:id/like` - Like a project

### Blog
- `GET /api/blog` - Get all published posts
- `GET /api/blog/:slug` - Get single post by slug
- `POST /api/blog` - Create post (admin)
- `PATCH /api/blog/:id` - Update post (admin)
- `DELETE /api/blog/:id` - Delete post (admin)
- `GET /api/blog/tags/list` - Get all tags

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics

### Health
- `GET /api/health` - Health check endpoint

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

4. **For MongoDB**, use MongoDB Atlas (free tier available)

### Other Platforms

The app can be deployed to:
- **Heroku** - Add `Procfile` with `web: node server.js`
- **Railway** - Connect GitHub repo
- **Render** - Connect GitHub repo
- **DigitalOcean App Platform** - Connect GitHub repo

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `MONGODB_URI`
- `EMAIL_USER` / `SMTP_*` variables
- `JWT_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL` (your domain)

## 🔒 Security Features

- Rate limiting on all API endpoints
- Strict rate limiting on contact form (10/hour)
- Input validation and sanitization
- XSS protection
- MongoDB injection prevention
- CORS configuration
- Security headers (Helmet.js)
- Environment variable protection

## 📊 Database Models

### Contact
- Stores contact form submissions
- Tracks IP address and user agent
- Status tracking (pending, read, replied, archived)

### Visitor
- Tracks website visitors
- Device, browser, OS detection
- Session tracking
- Returning visitor detection

### Project
- Project information
- Tags and technologies
- GitHub and live URLs
- View and like counters

### BlogPost
- Blog post content
- SEO metadata
- Tag system
- View tracking

## 🎨 Customization

### Update Contact Email
Edit `.env`:
```
CONTACT_EMAIL=your-email@example.com
```

### Add Projects via API
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "tags": ["React", "Node.js"],
    "technologies": ["JavaScript"],
    "status": "published"
  }'
```

## 📝 License

MIT License - feel free to use this portfolio as a template!

## 👤 Author

**Yash Kamboj**
- Portfolio: [yashkamboj.com](https://yashkamboj.com)
- GitHub: [@YashvardhanKamboj](https://github.com/YashvardhanKamboj)
- LinkedIn: [yashvardhankamboj](https://www.linkedin.com/in/yashvardhankamboj)

---

Built with ❤️ using Express.js, MongoDB, and modern web technologies.

