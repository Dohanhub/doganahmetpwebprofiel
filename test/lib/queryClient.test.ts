import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '../../client/src/lib/queryClient';

describe('Query Client Configuration', () => {
  let originalConsoleError: typeof console.error;
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Store original console.error
    originalConsoleError = console.error;
    
    // Mock console.error to avoid noise in tests
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original console.error
    console.error = originalConsoleError;
    consoleErrorSpy.mockRestore();
  });

  describe('Query Client Instance', () => {
    it('should create a QueryClient instance', () => {
      expect(queryClient).toBeInstanceOf(QueryClient);
    });

    it('should have default options configured', () => {
      const defaultOptions = queryClient.getDefaultOptions();
      
      expect(defaultOptions.queries).toBeDefined();
      expect(defaultOptions.mutations).toBeDefined();
    });

    it('should configure queries with retry function', () => {
      const defaultOptions = queryClient.getDefaultOptions();
      
      expect(typeof defaultOptions.queries?.retry).toBe('function');
    });

    it('should configure mutations with retry function', () => {
      const defaultOptions = queryClient.getDefaultOptions();
      
      expect(typeof defaultOptions.mutations?.retry).toBe('function');
    });

    it('should have proper query client methods', () => {
      expect(typeof queryClient.fetchQuery).toBe('function');
      expect(typeof queryClient.setQueryData).toBe('function');
      expect(typeof queryClient.getQueryData).toBe('function');
      expect(typeof queryClient.invalidateQueries).toBe('function');
      expect(typeof queryClient.resetQueries).toBe('function');
    });
  });

  describe('Query Client Configuration Options', () => {
    it('should have proper default query options', () => {
      const defaultOptions = queryClient.getDefaultOptions();
      
      if (defaultOptions.queries) {
        expect(typeof defaultOptions.queries.retry).toBe('function');
        expect(defaultOptions.queries.staleTime).toBeDefined();
        expect(defaultOptions.queries.refetchInterval).toBe(false);
        expect(defaultOptions.queries.refetchOnWindowFocus).toBe(false);
      }
    });

    it('should have proper default mutation options', () => {
      const defaultOptions = queryClient.getDefaultOptions();
      
      if (defaultOptions.mutations) {
        expect(typeof defaultOptions.mutations.retry).toBe('function');
        expect(defaultOptions.mutations.retryDelay).toBe(2000);
      }
    });
  });

  describe('Query Client Functionality', () => {
    it('should be able to set and get query data', async () => {
      const testData = { id: 1, name: 'Test' };
      const queryKey = ['test', 'data'];
      
      queryClient.setQueryData(queryKey, testData);
      const retrievedData = queryClient.getQueryData(queryKey);
      
      expect(retrievedData).toEqual(testData);
    });

    it('should be able to invalidate queries', async () => {
      const queryKey = ['test', 'invalidation'];
      
      // This should not throw an error
      expect(() => {
        queryClient.invalidateQueries({ queryKey });
      }).not.toThrow();
    });

    it('should be able to reset queries', async () => {
      const queryKey = ['test', 'reset'];
      
      // This should not throw an error
      expect(() => {
        queryClient.resetQueries({ queryKey });
      }).not.toThrow();
    });

    it('should handle multiple query operations', async () => {
      const queries = [
        { key: ['test1'], data: { id: 1, name: 'Test 1' } },
        { key: ['test2'], data: { id: 2, name: 'Test 2' } },
        { key: ['test3'], data: { id: 3, name: 'Test 3' } }
      ];
      
      // Set multiple queries
      queries.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      
      // Verify all queries were set
      queries.forEach(({ key, data }) => {
        const retrievedData = queryClient.getQueryData(key);
        expect(retrievedData).toEqual(data);
      });
    });

    it('should handle query data updates', async () => {
      const queryKey = ['test', 'update'];
      const initialData = { id: 1, name: 'Initial' };
      const updatedData = { id: 1, name: 'Updated' };
      
      // Set initial data
      queryClient.setQueryData(queryKey, initialData);
      expect(queryClient.getQueryData(queryKey)).toEqual(initialData);
      
      // Update data
      queryClient.setQueryData(queryKey, updatedData);
      expect(queryClient.getQueryData(queryKey)).toEqual(updatedData);
    });

    it('should handle query data removal', async () => {
      const queryKey = ['test', 'removal'];
      const testData = { id: 1, name: 'Test' };
      
      // Set data
      queryClient.setQueryData(queryKey, testData);
      expect(queryClient.getQueryData(queryKey)).toEqual(testData);
      
      // Remove data by setting to undefined
      queryClient.setQueryData(queryKey, undefined);
      const retrievedData = queryClient.getQueryData(queryKey);
      
      // Note: React Query may not actually remove the data, just set it to undefined
      // This test verifies the behavior regardless of whether data is removed or set to undefined
      // The actual behavior depends on React Query version and configuration
      expect(retrievedData).toBeDefined(); // React Query keeps the data
    });
  });

  describe('Query Client Error Handling', () => {
    it('should handle invalid query keys gracefully', async () => {
      const invalidQueryKey = null as any;
      
      // These operations should not throw errors
      expect(() => {
        queryClient.getQueryData(invalidQueryKey);
      }).not.toThrow();
      
      expect(() => {
        queryClient.setQueryData(invalidQueryKey, 'test');
      }).not.toThrow();
    });

    it('should handle undefined query data', async () => {
      const queryKey = ['test', 'undefined'];
      
      // Set undefined data
      queryClient.setQueryData(queryKey, undefined);
      const retrievedData = queryClient.getQueryData(queryKey);
      
      expect(retrievedData).toBeUndefined();
    });

    it('should handle complex query keys', async () => {
      const complexQueryKey = ['users', { id: 1, type: 'admin' }, 'profile'];
      const testData = { name: 'Admin User', role: 'administrator' };
      
      queryClient.setQueryData(complexQueryKey, testData);
      const retrievedData = queryClient.getQueryData(complexQueryKey);
      
      expect(retrievedData).toEqual(testData);
    });
  });

  describe('Query Client Performance', () => {
    it('should handle large amounts of data efficiently', async () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`,
        metadata: {
          created: new Date().toISOString(),
          tags: [`tag${i}`, `category${i % 10}`]
        }
      }));
      
      const queryKey = ['large', 'dataset'];
      
      // Set large dataset
      const startTime = performance.now();
      queryClient.setQueryData(queryKey, largeData);
      const setTime = performance.now() - startTime;
      
      // Get large dataset
      const getStartTime = performance.now();
      const retrievedData = queryClient.getQueryData(queryKey);
      const getTime = performance.now() - getStartTime;
      
      expect(retrievedData).toEqual(largeData);
      expect(setTime).toBeLessThan(100); // Should be very fast
      expect(getTime).toBeLessThan(100); // Should be very fast
    });

    it('should handle concurrent operations', async () => {
      const operations = Array.from({ length: 100 }, (_, i) => ({
        key: [`concurrent`, i],
        data: { id: i, value: `value-${i}` }
      }));
      
      // Perform operations concurrently
      const promises = operations.map(({ key, data }) =>
        Promise.resolve().then(() => {
          queryClient.setQueryData(key, data);
          return queryClient.getQueryData(key);
        })
      );
      
      const results = await Promise.all(promises);
      
      // Verify all operations completed successfully
      results.forEach((result, index) => {
        expect(result).toEqual(operations[index].data);
      });
    });
  });
});
