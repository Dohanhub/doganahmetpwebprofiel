import { vi } from 'vitest';

// Mock environment variables for API testing
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Mock console methods to reduce noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suppress console output during tests unless explicitly needed
  console.log = vi.fn();
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Global test timeout
vi.setConfig({ testTimeout: 10000 });
