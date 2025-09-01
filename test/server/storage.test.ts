import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { saveContact, getContacts, deleteContact, updateContact } from '../../server/storage';

// Mock the database connection
vi.mock('@neondatabase/serverless', () => ({
  neon: vi.fn(() => ({
    sql: vi.fn(),
  })),
}));

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Server Storage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('saveContact', () => {
    it('should save contact successfully', async () => {
      const mockContact = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Test message'
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...mockContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(mockContact);

      expect(result).toEqual({ id: 1, ...mockContact });
      expect(mockSql).toHaveBeenCalledWith(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [mockContact.name, mockContact.email, mockContact.message]
      );
    });

    it('should handle database errors', async () => {
      const mockContact = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Test message'
      };

      const mockSql = vi.fn().mockRejectedValue(new Error('Database connection failed'));
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      await expect(saveContact(mockContact)).rejects.toThrow('Database connection failed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should handle empty contact data', async () => {
      const mockContact = {
        name: '',
        email: '',
        message: ''
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...mockContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(mockContact);

      expect(result).toEqual({ id: 1, ...mockContact });
    });

    it('should handle special characters in contact data', async () => {
      const mockContact = {
        name: 'José María O\'Connor-Smith',
        email: 'jose@example.com',
        message: 'Message with special chars: @#$%^&*()'
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...mockContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(mockContact);

      expect(result).toEqual({ id: 1, ...mockContact });
    });

    it('should handle very long contact data', async () => {
      const longName = 'A'.repeat(1000);
      const longMessage = 'B'.repeat(10000);
      
      const mockContact = {
        name: longName,
        email: 'test@example.com',
        message: longMessage
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...mockContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(mockContact);

      expect(result).toEqual({ id: 1, ...mockContact });
    });
  });

  describe('getContacts', () => {
    it('should retrieve all contacts successfully', async () => {
      const mockContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Message 1' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Message 2' }
      ];

      const mockSql = vi.fn().mockResolvedValue({ rows: mockContacts });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await getContacts();

      expect(result).toEqual(mockContacts);
      expect(mockSql).toHaveBeenCalledWith('SELECT * FROM contacts ORDER BY created_at DESC');
    });

    it('should handle empty contacts list', async () => {
      const mockSql = vi.fn().mockResolvedValue({ rows: [] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await getContacts();

      expect(result).toEqual([]);
    });

    it('should handle database errors when retrieving contacts', async () => {
      const mockSql = vi.fn().mockRejectedValue(new Error('Query failed'));
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      await expect(getContacts()).rejects.toThrow('Query failed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('deleteContact', () => {
    it('should delete contact successfully', async () => {
      const contactId = 1;
      const mockSql = vi.fn().mockResolvedValue({ rowCount: 1 });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await deleteContact(contactId);

      expect(result).toBe(true);
      expect(mockSql).toHaveBeenCalledWith(
        'DELETE FROM contacts WHERE id = $1',
        [contactId]
      );
    });

    it('should handle non-existent contact deletion', async () => {
      const contactId = 999;
      const mockSql = vi.fn().mockResolvedValue({ rowCount: 0 });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await deleteContact(contactId);

      expect(result).toBe(false);
    });

    it('should handle database errors when deleting contact', async () => {
      const contactId = 1;
      const mockSql = vi.fn().mockRejectedValue(new Error('Delete failed'));
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      await expect(deleteContact(contactId)).rejects.toThrow('Delete failed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should handle invalid contact ID', async () => {
      const contactId = -1;
      const mockSql = vi.fn().mockResolvedValue({ rowCount: 0 });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await deleteContact(contactId);

      expect(result).toBe(false);
    });
  });

  describe('updateContact', () => {
    it('should update contact successfully', async () => {
      const contactId = 1;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        message: 'Updated message'
      };

      const mockSql = vi.fn().mockResolvedValue({ 
        rows: [{ id: contactId, ...updateData }] 
      });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await updateContact(contactId, updateData);

      expect(result).toEqual({ id: contactId, ...updateData });
      expect(mockSql).toHaveBeenCalledWith(
        'UPDATE contacts SET name = $1, email = $2, message = $3 WHERE id = $4 RETURNING *',
        [updateData.name, updateData.email, updateData.message, contactId]
      );
    });

    it('should handle partial contact updates', async () => {
      const contactId = 1;
      const updateData = {
        name: 'Updated Name Only'
        // email and message not provided
      };

      const mockSql = vi.fn().mockResolvedValue({ 
        rows: [{ id: contactId, name: updateData.name, email: 'original@example.com', message: 'Original message' }] 
      });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await updateContact(contactId, updateData);

      expect(result.name).toBe(updateData.name);
    });

    it('should handle non-existent contact update', async () => {
      const contactId = 999;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        message: 'Updated message'
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await updateContact(contactId, updateData);

      expect(result).toBeNull();
    });

    it('should handle database errors when updating contact', async () => {
      const contactId = 1;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        message: 'Updated message'
      };

      const mockSql = vi.fn().mockRejectedValue(new Error('Update failed'));
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      await expect(updateContact(contactId, updateData)).rejects.toThrow('Update failed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should handle invalid update data', async () => {
      const contactId = 1;
      const updateData = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email
        message: 'Valid message'
      };

      const mockSql = vi.fn().mockResolvedValue({ 
        rows: [{ id: contactId, ...updateData }] 
      });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await updateContact(contactId, updateData);

      expect(result).toEqual({ id: contactId, ...updateData });
    });
  });

  describe('Database Connection', () => {
    it('should handle connection failures gracefully', async () => {
      vi.mocked(require('@neondatabase/serverless').neon).mockImplementation(() => {
        throw new Error('Connection failed');
      });

      const mockContact = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await expect(saveContact(mockContact)).rejects.toThrow('Connection failed');
    });

    it('should handle connection timeouts', async () => {
      const mockSql = vi.fn().mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timeout')), 100);
        });
      });

      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const mockContact = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      };

      await expect(saveContact(mockContact)).rejects.toThrow('Connection timeout');
    });
  });

  describe('Data Validation', () => {
    it('should handle SQL injection attempts', async () => {
      const maliciousContact = {
        name: "'; DROP TABLE contacts; --",
        email: 'test@example.com',
        message: 'Malicious message'
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...maliciousContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(maliciousContact);

      expect(result).toEqual({ id: 1, ...maliciousContact });
      // The SQL injection attempt should be safely parameterized
      expect(mockSql).toHaveBeenCalledWith(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [maliciousContact.name, maliciousContact.email, maliciousContact.message]
      );
    });

    it('should handle XSS attempts in message content', async () => {
      const xssContact = {
        name: 'Test User',
        email: 'test@example.com',
        message: '<script>alert("XSS")</script>'
      };

      const mockSql = vi.fn().mockResolvedValue({ rows: [{ id: 1, ...xssContact }] });
      vi.mocked(require('@neondatabase/serverless').neon).mockReturnValue({
        sql: mockSql,
      });

      const result = await saveContact(xssContact);

      expect(result).toEqual({ id: 1, ...xssContact });
    });
  });
});
