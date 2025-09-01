import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { storage, MemStorage } from '../../server/storage';
import type { InsertContact, InsertUser } from '@shared/schema';

describe('Storage System', () => {
  let testStorage: MemStorage;

  beforeEach(() => {
    testStorage = new MemStorage();
  });

  afterEach(() => {
    // Clean up test data
    testStorage = new MemStorage();
  });

  describe('User Management', () => {
    it('should create a new user successfully', async () => {
      const userData: InsertUser = {
        username: 'testuser',
        password: 'hashedpassword123'
      };

      const user = await testStorage.createUser(userData);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.username).toBe('testuser');
      expect(user.password).toBe('hashedpassword123');
      expect(typeof user.id).toBe('number');
      expect(user.id).toBeGreaterThan(0);
    });

    it('should retrieve user by ID', async () => {
      const userData: InsertUser = {
        username: 'testuser',
        password: 'hashedpassword123'
      };

      const createdUser = await testStorage.createUser(userData);
      const retrievedUser = await testStorage.getUser(createdUser.id);

      expect(retrievedUser).toBeDefined();
      expect(retrievedUser).toEqual(createdUser);
    });

    it('should retrieve user by username', async () => {
      const userData: InsertUser = {
        username: 'testuser',
        password: 'hashedpassword123'
      };

      await testStorage.createUser(userData);
      const retrievedUser = await testStorage.getUserByUsername('testuser');

      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?.username).toBe('testuser');
      expect(retrievedUser?.password).toBe('hashedpassword123');
    });

    it('should return undefined for non-existent user ID', async () => {
      const user = await testStorage.getUser(999999);
      expect(user).toBeUndefined();
    });

    it('should return undefined for non-existent username', async () => {
      const user = await testStorage.getUserByUsername('non-existent-username');
      expect(user).toBeUndefined();
    });

    it('should handle multiple users correctly', async () => {
      const user1: InsertUser = { username: 'user1', password: 'pass1' };
      const user2: InsertUser = { username: 'user2', password: 'pass2' };

      const createdUser1 = await testStorage.createUser(user1);
      const createdUser2 = await testStorage.createUser(user2);

      expect(createdUser1.id).not.toBe(createdUser2.id);
      expect(createdUser1.username).toBe('user1');
      expect(createdUser2.username).toBe('user2');
    });
  });

  describe('Contact Management', () => {
    it('should create a new contact successfully', async () => {
      const contactData: InsertContact = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        organization: 'Test Corp',
        service: 'Consulting',
        message: 'This is a test message'
      };

      const contact = await testStorage.createContact(contactData);

      expect(contact).toBeDefined();
      expect(contact.id).toBeDefined();
      expect(contact.firstName).toBe('John');
      expect(contact.lastName).toBe('Doe');
      expect(contact.email).toBe('john.doe@example.com');
      expect(contact.organization).toBe('Test Corp');
      expect(contact.service).toBe('Consulting');
      expect(contact.message).toBe('This is a test message');
      expect(contact.createdAt).toBeInstanceOf(Date);
      expect(typeof contact.id).toBe('number');
      expect(contact.id).toBeGreaterThan(0);
    });

    it('should handle contact with optional fields', async () => {
      const contactData: InsertContact = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        message: 'Required message only'
      };

      const contact = await testStorage.createContact(contactData);

      expect(contact.organization).toBeNull();
      expect(contact.service).toBeNull();
      expect(contact.firstName).toBe('Jane');
      expect(contact.lastName).toBe('Smith');
      expect(contact.email).toBe('jane.smith@example.com');
      expect(contact.message).toBe('Required message only');
    });

    it('should retrieve all contacts in correct order', async () => {
      const contact1: InsertContact = {
        firstName: 'First',
        lastName: 'User',
        email: 'first@example.com',
        message: 'First message'
      };

      const contact2: InsertContact = {
        firstName: 'Second',
        lastName: 'User',
        email: 'second@example.com',
        message: 'Second message'
      };

      await testStorage.createContact(contact1);
      // Add a small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10));
      await testStorage.createContact(contact2);

      const contacts = await testStorage.getContacts();

      expect(contacts).toHaveLength(2);
      expect(contacts[0].firstName).toBe('Second'); // Most recent first
      expect(contacts[1].firstName).toBe('First');
      expect(contacts[0].createdAt.getTime()).toBeGreaterThan(contacts[1].createdAt.getTime());
    });

    it('should return empty array when no contacts exist', async () => {
      const contacts = await testStorage.getContacts();
      expect(contacts).toEqual([]);
    });

    it('should handle multiple contacts correctly', async () => {
      const contactsData: InsertContact[] = [
        {
          firstName: 'User1',
          lastName: 'Last1',
          email: 'user1@example.com',
          message: 'Message 1'
        },
        {
          firstName: 'User2',
          lastName: 'Last2',
          email: 'user2@example.com',
          message: 'Message 2'
        },
        {
          firstName: 'User3',
          lastName: 'Last3',
          email: 'user3@example.com',
          message: 'Message 3'
        }
      ];

      for (const contactData of contactsData) {
        await testStorage.createContact(contactData);
      }

      const contacts = await testStorage.getContacts();
      expect(contacts).toHaveLength(3);
      
      // Check that all contacts have unique IDs
      const ids = contacts.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);
    });
  });

  describe('Data Persistence', () => {
    it('should maintain data between operations', async () => {
      const userData: InsertUser = {
        username: 'persistentuser',
        password: 'persistentpass'
      };

      const contactData: InsertContact = {
        firstName: 'Persistent',
        lastName: 'Contact',
        email: 'persistent@example.com',
        message: 'Persistent message'
      };

      // Create data
      const user = await testStorage.createUser(userData);
      const contact = await testStorage.createContact(contactData);

      // Retrieve data
      const retrievedUser = await testStorage.getUser(user.id);
      const retrievedContact = await testStorage.getContacts();

      expect(retrievedUser).toEqual(user);
      expect(retrievedContact).toHaveLength(1);
      expect(retrievedContact[0]).toEqual(contact);
    });

    it('should handle concurrent operations', async () => {
      const promises = [];
      
      // Create 10 users concurrently
      for (let i = 0; i < 10; i++) {
        promises.push(
          testStorage.createUser({
            username: `user${i}`,
            password: `pass${i}`
          })
        );
      }

      const users = await Promise.all(promises);
      
      // Verify all users were created with unique IDs
      const ids = users.map(u => u.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(10);

      // Verify all users can be retrieved
      for (const user of users) {
        const retrieved = await testStorage.getUser(user.id);
        expect(retrieved).toEqual(user);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings in contact fields', async () => {
      const contactData: InsertContact = {
        firstName: '',
        lastName: '',
        email: 'test@example.com',
        message: ''
      };

      const contact = await testStorage.createContact(contactData);
      
      expect(contact.firstName).toBe('');
      expect(contact.lastName).toBe('');
      expect(contact.message).toBe('');
      expect(contact.email).toBe('test@example.com');
    });

    it('should handle very long strings', async () => {
      const longString = 'a'.repeat(1000);
      const contactData: InsertContact = {
        firstName: longString,
        lastName: longString,
        email: 'test@example.com',
        message: longString
      };

      const contact = await testStorage.createContact(contactData);
      
      expect(contact.firstName).toBe(longString);
      expect(contact.lastName).toBe(longString);
      expect(contact.message).toBe(longString);
    });

    it('should handle special characters in strings', async () => {
      const specialString = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const contactData: InsertContact = {
        firstName: specialString,
        lastName: specialString,
        email: 'test@example.com',
        message: specialString
      };

      const contact = await testStorage.createContact(contactData);
      
      expect(contact.firstName).toBe(specialString);
      expect(contact.lastName).toBe(specialString);
      expect(contact.message).toBe(specialString);
    });
  });
});
