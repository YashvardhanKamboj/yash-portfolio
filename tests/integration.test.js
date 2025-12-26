import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

describe('Integration Tests', () => {
  describe('End-to-End Contact Flow', () => {
    it('should complete full contact form flow', async () => {
      // 1. Submit contact form
      const contactResponse = await request(app)
        .post('/api/contact')
        .send({
          name: 'Integration Test User',
          email: 'integration@test.com',
          subject: 'Integration Test',
          message: 'This is an integration test message.',
        })
        .expect(201);

      expect(contactResponse.body.success).toBe(true);

      // 2. Verify contact was saved (if MongoDB available)
      const contactsResponse = await request(app)
        .get('/api/contact')
        .expect(200);

      expect(contactsResponse.body.success).toBe(true);
    });
  });

  describe('Analytics Integration', () => {
    it('should track visitor and show in analytics', async () => {
      // Track visitor
      await request(app)
        .post('/api/analytics/track')
        .send({
          page: '/',
          sessionId: 'test-integration-session',
        })
        .expect(200);

      // Get analytics summary
      const summaryResponse = await request(app)
        .get('/api/analytics/summary')
        .expect(200);

      expect(summaryResponse.body.success).toBe(true);
      expect(summaryResponse.body.data.overview).toHaveProperty('totalVisitors');
    });
  });

  describe('Project Management Flow', () => {
    it('should create, read, update, and delete project', async () => {
      // Create project
      const createResponse = await request(app)
        .post('/api/projects')
        .send({
          title: 'Test Project',
          description: 'Test description',
          tags: ['Test'],
          status: 'published',
        })
        .expect(201);

      const projectId = createResponse.body.data._id;

      // Read project
      const readResponse = await request(app)
        .get(`/api/projects/${projectId}`)
        .expect(200);

      expect(readResponse.body.data.title).toBe('Test Project');

      // Update project
      const updateResponse = await request(app)
        .patch(`/api/projects/${projectId}`)
        .send({ title: 'Updated Project' })
        .expect(200);

      expect(updateResponse.body.data.title).toBe('Updated Project');

      // Delete project
      await request(app)
        .delete(`/api/projects/${projectId}`)
        .expect(200);
    });
  });
});

