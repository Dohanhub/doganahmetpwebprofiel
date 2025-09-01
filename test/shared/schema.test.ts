import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { 
  insertUserSchema, 
  insertContactSchema,
  users,
  contacts 
} from '../../shared/schema';

describe('Schema Validation', () => {
  describe('User Schema', () => {
    it('should validate valid user data', () => {
      const validUserData = {
        username: 'testuser',
        password: 'securepassword123'
      };

      const result = insertUserSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.username).toBe('testuser');
        expect(result.data.password).toBe('securepassword123');
      }
    });

    it('should reject user data without username', () => {
      const invalidUserData = {
        password: 'securepassword123'
      };

      const result = insertUserSchema.safeParse(invalidUserData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['username']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject user data without password', () => {
      const invalidUserData = {
        username: 'testuser'
      };

      const result = insertUserSchema.safeParse(invalidUserData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['password']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should accept user data with empty strings (Zod allows this)', () => {
      const userDataWithEmptyStrings = {
        username: '',
        password: ''
      };

      const result = insertUserSchema.safeParse(userDataWithEmptyStrings);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.username).toBe('');
        expect(result.data.password).toBe('');
      }
    });

    it('should reject user data with non-string username', () => {
      const invalidUserData = {
        username: 123,
        password: 'securepassword123'
      };

      const result = insertUserSchema.safeParse(invalidUserData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[0].received).toBe('number');
      }
    });

    it('should reject user data with non-string password', () => {
      const invalidUserData = {
        username: 'testuser',
        password: 123
      };

      const result = insertUserSchema.safeParse(invalidUserData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[0].received).toBe('number');
      }
    });
  });

  describe('Contact Schema', () => {
    it('should validate valid contact data with all fields', () => {
      const validContactData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        organization: 'Test Corp',
        service: 'Consulting',
        message: 'This is a test message'
      };

      const result = insertContactSchema.safeParse(validContactData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.firstName).toBe('John');
        expect(result.data.lastName).toBe('Doe');
        expect(result.data.email).toBe('john.doe@example.com');
        expect(result.data.organization).toBe('Test Corp');
        expect(result.data.service).toBe('Consulting');
        expect(result.data.message).toBe('This is a test message');
      }
    });

    it('should validate valid contact data with required fields only', () => {
      const validContactData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        message: 'Required message only'
      };

      const result = insertContactSchema.safeParse(validContactData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.firstName).toBe('Jane');
        expect(result.data.lastName).toBe('Smith');
        expect(result.data.email).toBe('jane.smith@example.com');
        expect(result.data.message).toBe('Required message only');
        expect(result.data.organization).toBeUndefined();
        expect(result.data.service).toBeUndefined();
      }
    });

    it('should reject contact data without firstName', () => {
      const invalidContactData = {
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Test message'
      };

      const result = insertContactSchema.safeParse(invalidContactData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['firstName']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject contact data without lastName', () => {
      const invalidContactData = {
        firstName: 'John',
        email: 'john.doe@example.com',
        message: 'Test message'
      };

      const result = insertContactSchema.safeParse(invalidContactData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['lastName']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject contact data without email', () => {
      const invalidContactData = {
        firstName: 'John',
        lastName: 'Doe',
        message: 'Test message'
      };

      const result = insertContactSchema.safeParse(invalidContactData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['email']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject contact data without message', () => {
      const invalidContactData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      const result = insertContactSchema.safeParse(invalidContactData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['message']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should accept contact data with empty strings (Zod allows this)', () => {
      const contactDataWithEmptyStrings = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      };

      const result = insertContactSchema.safeParse(contactDataWithEmptyStrings);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.firstName).toBe('');
        expect(result.data.lastName).toBe('');
        expect(result.data.email).toBe('');
        expect(result.data.message).toBe('');
      }
    });

    it('should accept contact data with any email format (Zod doesn\'t validate email format)', () => {
      const contactDataWithInvalidEmail = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email-format',
        message: 'Test message'
      };

      const result = insertContactSchema.safeParse(contactDataWithInvalidEmail);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe('invalid-email-format');
      }
    });

    it('should accept contact data with valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com'
      ];

      for (const email of validEmails) {
        const validContactData = {
          firstName: 'John',
          lastName: 'Doe',
          email,
          message: 'Test message'
        };

        const result = insertContactSchema.safeParse(validContactData);
        expect(result.success).toBe(true);
      }
    });

    it('should handle optional fields correctly', () => {
      const contactDataWithOptionals = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        organization: 'Optional Corp',
        service: 'Optional Service',
        message: 'Test message'
      };

      const result = insertContactSchema.safeParse(contactDataWithOptionals);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.organization).toBe('Optional Corp');
        expect(result.data.service).toBe('Optional Service');
      }
    });

    it('should reject contact data with non-string fields', () => {
      const invalidContactData = {
        firstName: 123,
        lastName: true,
        email: 'john.doe@example.com',
        message: 456
      };

      const result = insertContactSchema.safeParse(invalidContactData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        const hasTypeErrors = result.error.issues.some(issue => issue.code === 'invalid_type');
        expect(hasTypeErrors).toBe(true);
      }
    });
  });

  describe('Database Table Schemas', () => {
    it('should have correct users table structure', () => {
      expect(users.id).toBeDefined();
      expect(users.username).toBeDefined();
      expect(users.password).toBeDefined();
      
      // Check that required fields exist
      expect(users.username).toBeDefined();
      expect(users.password).toBeDefined();
    });

    it('should have correct contacts table structure', () => {
      expect(contacts.id).toBeDefined();
      expect(contacts.firstName).toBeDefined();
      expect(contacts.lastName).toBeDefined();
      expect(contacts.email).toBeDefined();
      expect(contacts.message).toBeDefined();
      expect(contacts.createdAt).toBeDefined();
      
      // Check that required fields exist
      expect(contacts.firstName).toBeDefined();
      expect(contacts.lastName).toBeDefined();
      expect(contacts.email).toBeDefined();
      expect(contacts.message).toBeDefined();
      expect(contacts.createdAt).toBeDefined();
      
      // Check that optional fields exist
      expect(contacts.organization).toBeDefined();
      expect(contacts.service).toBeDefined();
    });
  });

  describe('Schema Integration', () => {
    it('should work with Zod validation and database schema', () => {
      const validContactData = {
        firstName: 'Integration',
        lastName: 'Test',
        email: 'integration@test.com',
        message: 'Integration test message'
      };

      // Validate with Zod schema
      const zodResult = insertContactSchema.safeParse(validContactData);
      expect(zodResult.success).toBe(true);
      
      if (zodResult.success) {
        // Check that validated data matches expected structure
        expect(zodResult.data).toHaveProperty('firstName');
        expect(zodResult.data).toHaveProperty('lastName');
        expect(zodResult.data).toHaveProperty('email');
        expect(zodResult.data).toHaveProperty('message');
        
        // Check that optional fields are undefined when not provided
        expect(zodResult.data.organization).toBeUndefined();
        expect(zodResult.data.service).toBeUndefined();
      }
    });

    it('should handle edge cases consistently', () => {
      const edgeCaseData = {
        firstName: '   Edge   ',
        lastName: '   Case   ',
        email: '   edge@case.com   ',
        message: '   Edge case message   '
      };

      const result = insertContactSchema.safeParse(edgeCaseData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        // Check that whitespace is preserved (validation doesn't trim)
        expect(result.data.firstName).toBe('   Edge   ');
        expect(result.data.lastName).toBe('   Case   ');
        expect(result.data.email).toBe('   edge@case.com   ');
        expect(result.data.message).toBe('   Edge case message   ');
      }
    });
  });
});
