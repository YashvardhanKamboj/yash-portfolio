# API Documentation

Complete API reference for the Portfolio backend.

## Base URL

```
http://localhost:3000/api (development)
https://your-domain.com/api (production)
```

## Authentication

Currently, admin endpoints are open. In production, add authentication middleware.

## Endpoints

### Health Check

#### GET /api/health

Check server status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "environment": "development"
}
```

---

### Contact

#### POST /api/contact

Submit contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "id": "507f1f77bcf86cd799439011"
}
```

**Rate Limit:** 10 requests per hour per IP

---

#### GET /api/contact

Get all contact submissions (admin).

**Query Parameters:**
- `status` (optional): Filter by status (pending, read, replied, archived)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Hello",
      "message": "Message text",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

#### PATCH /api/contact/:id

Update contact status (admin).

**Request Body:**
```json
{
  "status": "read",
  "repliedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated contact */ }
}
```

---

### Analytics

#### POST /api/analytics/track

Track visitor.

**Request Body:**
```json
{
  "referrer": "https://google.com",
  "page": "/",
  "sessionId": "session_123",
  "duration": 30
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_123"
}
```

---

#### GET /api/analytics/summary

Get analytics summary (admin).

**Query Parameters:**
- `startDate` (optional): Start date (ISO string)
- `endDate` (optional): End date (ISO string)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalVisitors": 1000,
      "uniqueVisitors": 500,
      "returningVisitors": 300,
      "newVisitors": 200
    },
    "devices": [
      { "_id": "desktop", "count": 600 },
      { "_id": "mobile", "count": 400 }
    ],
    "browsers": [
      { "_id": "Chrome", "count": 700 },
      { "_id": "Firefox", "count": 300 }
    ],
    "operatingSystems": [
      { "_id": "Windows", "count": 500 },
      { "_id": "macOS", "count": 300 }
    ],
    "topPages": [
      { "_id": "/", "count": 800 },
      { "_id": "/projects", "count": 200 }
    ],
    "recentVisitors": [ /* ... */ ]
  }
}
```

---

#### GET /api/analytics/stats

Get visitor stats by date range.

**Query Parameters:**
- `days` (optional): Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-01",
      "visits": 50,
      "uniqueVisitors": 30
    }
  ]
}
```

---

### Projects

#### GET /api/projects

Get all published projects.

**Query Parameters:**
- `featured` (optional): Filter featured projects (true/false)
- `status` (optional): Filter by status (default: published)
- `limit` (optional): Limit results

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My Project",
      "description": "Project description",
      "tags": ["React", "Node.js"],
      "technologies": ["JavaScript"],
      "githubUrl": "https://github.com/...",
      "liveUrl": "https://example.com",
      "views": 100,
      "likes": 50,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 10
}
```

---

#### GET /api/projects/:id

Get single project by ID.

**Response:**
```json
{
  "success": true,
  "data": { /* project object */ }
}
```

**Note:** Increments view count automatically.

---

#### POST /api/projects

Create project (admin).

**Request Body:**
```json
{
  "title": "My Project",
  "description": "Short description",
  "longDescription": "Long description",
  "tags": ["React", "Node.js"],
  "technologies": ["JavaScript"],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://example.com",
  "status": "published",
  "featured": true
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* created project */ }
}
```

---

#### PATCH /api/projects/:id

Update project (admin).

**Request Body:**
```json
{
  "title": "Updated Title",
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated project */ }
}
```

---

#### DELETE /api/projects/:id

Delete project (admin).

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

#### POST /api/projects/:id/like

Like a project.

**Response:**
```json
{
  "success": true,
  "data": { /* project with incremented likes */ }
}
```

---

### Blog

#### GET /api/blog

Get all published blog posts.

**Query Parameters:**
- `status` (optional): Filter by status (default: published)
- `page` (optional): Page number
- `limit` (optional): Items per page
- `tag` (optional): Filter by tag
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My Blog Post",
      "slug": "my-blog-post",
      "excerpt": "Post excerpt",
      "tags": ["JavaScript", "React"],
      "category": "tutorial",
      "views": 100,
      "readTime": 5,
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

---

#### GET /api/blog/:slug

Get single blog post by slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "content": "Full post content...",
    "tags": ["JavaScript"],
    "views": 100
  }
}
```

**Note:** Increments view count automatically.

---

#### POST /api/blog

Create blog post (admin).

**Request Body:**
```json
{
  "title": "My Blog Post",
  "excerpt": "Post excerpt",
  "content": "Full post content...",
  "tags": ["JavaScript", "React"],
  "category": "tutorial",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* created post */ }
}
```

---

#### PATCH /api/blog/:id

Update blog post (admin).

**Request Body:**
```json
{
  "title": "Updated Title",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated post */ }
}
```

---

#### DELETE /api/blog/:id

Delete blog post (admin).

**Response:**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

---

#### GET /api/blog/tags/list

Get all blog tags.

**Response:**
```json
{
  "success": true,
  "data": ["JavaScript", "React", "Node.js"]
}
```

---

### Admin

#### GET /api/admin/dashboard

Get dashboard statistics (admin).

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "contacts": {
        "total": 100,
        "pending": 10
      },
      "visitors": {
        "total": 5000,
        "unique": 2000
      },
      "projects": {
        "total": 20,
        "published": 15
      },
      "blog": {
        "total": 30,
        "published": 25
      }
    },
    "recent": {
      "contacts": [ /* ... */ ],
      "visitors": [ /* ... */ ]
    }
  }
}
```

---

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [ /* validation errors */ ]
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

---

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Contact Form: 10 requests per hour per IP
- Admin Endpoints: 10 requests per hour per IP

---

## CORS

CORS is enabled for all origins in development. Configure `FRONTEND_URL` in production.

---

## Security

- All inputs are validated and sanitized
- XSS protection enabled
- MongoDB injection prevention
- Rate limiting on all endpoints
- Security headers via Helmet.js

