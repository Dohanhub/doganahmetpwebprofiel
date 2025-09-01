import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { contactSchema } from '../../shared/schema';

// Mock the storage module
vi.mock('../storage', () => ({
  saveContact: vi.fn(),
}));

// Mock the schema
vi.mock('../../shared/schema', () => ({
  contactSchema: {
    parse: vi.fn(),
  },
}));

// Create a test app
const createTestApp = () => {
  const app = express();
  app.use(express.json());
  
  // Mock rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);
  
  // Mock routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      // Mock successful save
      res.status(201).json({ 
        message: 'Contact saved successfully',
        data: validatedData 
      });
    } catch (error) {
      res.status(400).json({ 
        error: 'Validation failed',
        details: error 
      });
    }
  });
  
  return app;
};

describe('Server Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
    vi.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    it('should handle valid contact submission', async () => {
      const validContact = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(validContact)
        .expect(201);

      expect(response.body.message).toBe('Contact saved successfully');
      expect(response.body.data).toEqual(validContact);
    });

    it('should handle invalid email format', async () => {
      const invalidContact = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidContact)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle missing required fields', async () => {
      const incompleteContact = {
        name: 'John Doe',
        // email missing
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(incompleteContact)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle empty message', async () => {
      const emptyMessageContact = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: ''
      };

      const response = await request(app)
        .post('/api/contact')
        .send(emptyMessageContact)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle very long message', async () => {
      const longMessage = 'A'.repeat(10001); // Exceeds max length
      const longMessageContact = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: longMessage
      };

      const response = await request(app)
        .post('/api/contact')
        .send(longMessageContact)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle special characters in name', async () => {
      const specialCharContact = {
        name: 'José María O\'Connor-Smith',
        email: 'jose@example.com',
        message: 'Test message with special characters'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(specialCharContact)
        .expect(201);

      expect(response.body.data.name).toBe('José María O\'Connor-Smith');
    });

    it('should handle numeric input in string fields', async () => {
      const numericContact = {
        name: 123, // Should be string
        email: 'test@example.com',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(numericContact)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle rate limiting', async () => {
      // Make multiple requests to trigger rate limiting
      const contact = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      };

      // Make 101 requests (exceeding the limit of 100)
      for (let i = 0; i < 101; i++) {
        const response = await request(app)
          .post('/api/contact')
          .send(contact);
        
        if (i < 100) {
          expect(response.status).toBe(201);
        } else {
          expect(response.status).toBe(429); // Too Many Requests
        }
      }
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('should handle missing content-type header', async () => {
      const contact = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contact)
        .expect(201);

      expect(response.body.message).toBe('Contact saved successfully');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to API routes', async () => {
      const app = express();
      app.use(express.json());
      
      const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5, // Very low limit for testing
      });
      
      app.use('/api/', limiter);
      
      app.post('/api/contact', (req, res) => {
        res.status(200).json({ message: 'Success' });
      });

      // Make requests up to the limit
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/contact')
          .send({})
          .expect(200);
      }

      // Next request should be rate limited
      await request(app)
        .post('/api/contact')
        .send({})
        .expect(429);
    });
  });

  describe('Error Handling', () => {
    it('should handle server errors gracefully', async () => {
      const app = express();
      app.use(express.json());
      
      // Mock a route that throws an error
      app.post('/api/contact', (req, res) => {
        throw new Error('Internal server error');
      });
      
      // Add error handling middleware
      app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Internal server error' });
      });

      const response = await request(app)
        .post('/api/contact')
        .send({})
        .expect(500);

      expect(response.body.error).toBe('Internal server error');
    });
  });
});
