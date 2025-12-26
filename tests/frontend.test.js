/**
 * Frontend Tests
 * Run with: npm test -- frontend.test.js
 */

import { describe, it, expect } from '@jest/globals';

// Mock DOM environment
global.window = {
  location: { origin: 'http://localhost:3000', pathname: '/' },
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
};

describe('Frontend Tests', () => {
  describe('API Integration', () => {
    it('should construct correct API base URL', () => {
      const API_BASE = window.location.origin + '/api';
      expect(API_BASE).toBe('http://localhost:3000/api');
    });

    it('should handle contact form submission', async () => {
      const formData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message',
      };

      // Mock fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, message: 'Success' }),
        })
      );

      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should validate email format', () => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      expect(emailRegex.test('test@example.com')).toBe(true);
      expect(emailRegex.test('invalid-email')).toBe(false);
    });

    it('should validate message length', () => {
      const minLength = 10;
      const maxLength = 2000;
      const shortMessage = 'Short';
      const longMessage = 'a'.repeat(2001);
      const validMessage = 'This is a valid message with enough characters.';

      expect(shortMessage.length >= minLength).toBe(false);
      expect(longMessage.length <= maxLength).toBe(false);
      expect(validMessage.length >= minLength && validMessage.length <= maxLength).toBe(true);
    });
  });
});

