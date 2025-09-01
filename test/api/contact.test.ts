import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import routes from '../../server/routes.js';

describe('Contact API Endpoints', () => {
  let app: express.Application;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    app.use('/api', routes);
  });

  afterEach(() => {
    // Clean up any test data if needed
  });

  describe('POST /api/contact', () => {
    it('should create a new contact successfully', async () => {
      const contactData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        organization: 'Test Corp',
        service: 'Consulting',
        message: 'This is a test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contactData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.id).toBeDefined();
    });

    it('should handle Zod validation errors', async () => {
      const malformedData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 123 // This should fail Zod validation
      };

      const response = await request(app)
        .post('/api/contact')
        .send(malformedData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Validation/i);
      expect(response.body.details).toBeDefined();
    });
  });

  describe('GET /api/contacts', () => {
    it('should return all contacts', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.contacts)).toBe(true);
    });
  });
});
