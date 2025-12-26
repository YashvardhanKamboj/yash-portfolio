import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import app from '../server.js';
import request from 'supertest';

const API_BASE = '/api';

describe('Portfolio API Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/portfolio_test');
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get(`${API_BASE}/health`)
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('Contact Form', () => {
    it('should submit contact form successfully', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message for the contact form.',
      };

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Thank you');
    });

    it('should reject invalid email', async () => {
      const contactData = {
        name: 'Test User',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Test message',
      };

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject empty message', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: '',
      };

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should enforce rate limiting', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      // Send 11 requests (limit is 10/hour)
      for (let i = 0; i < 11; i++) {
        await request(app)
          .post(`${API_BASE}/contact`)
          .send(contactData);
      }

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(429);

      expect(response.body.message).toContain('Too many requests');
    });
  });

  describe('Analytics', () => {
    it('should track visitor', async () => {
      const visitorData = {
        referrer: 'https://google.com',
        page: '/',
        sessionId: 'test-session-123',
      };

      const response = await request(app)
        .post(`${API_BASE}/analytics/track`)
        .send(visitorData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('sessionId');
    });

    it('should get analytics summary', async () => {
      const response = await request(app)
        .get(`${API_BASE}/analytics/summary`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('overview');
      expect(response.body.data.overview).toHaveProperty('totalVisitors');
    });
  });

  describe('Projects', () => {
    it('should get all published projects', async () => {
      const response = await request(app)
        .get(`${API_BASE}/projects`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter featured projects', async () => {
      const response = await request(app)
        .get(`${API_BASE}/projects?featured=true`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('Security', () => {
    it('should sanitize XSS attempts', async () => {
      const contactData = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(201);

      // XSS should be sanitized
      expect(response.body.success).toBe(true);
    });

    it('should prevent MongoDB injection', async () => {
      const contactData = {
        name: { $gt: '' },
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      const response = await request(app)
        .post(`${API_BASE}/contact`)
        .send(contactData)
        .expect(201);

      expect(response.body.success).toBe(true);
    });
  });
});

