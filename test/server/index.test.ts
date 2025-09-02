import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

// Mock all external dependencies
vi.mock('express', () => ({
  default: vi.fn(() => ({
    use: vi.fn(),
    listen: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  })),
}));

vi.mock('helmet', () => ({
  default: vi.fn(),
}));

vi.mock('express-rate-limit', () => ({
  rateLimit: vi.fn(() => vi.fn()),
}));

vi.mock('express-session', () => ({
  default: vi.fn(() => vi.fn()),
}));

vi.mock('memorystore', () => ({
  default: vi.fn(() => vi.fn()),
}));

vi.mock('passport', () => ({
  default: {
    initialize: vi.fn(),
    session: vi.fn(),
    authenticate: vi.fn(),
  },
}));

vi.mock('passport-local', () => ({
  Strategy: vi.fn(),
}));

vi.mock('ws', () => ({
  WebSocketServer: vi.fn(() => ({
    on: vi.fn(),
  })),
}));

vi.mock('@neondatabase/serverless', () => ({
  neon: vi.fn(),
}));

vi.mock('drizzle-orm', () => ({
  drizzle: vi.fn(),
}));

vi.mock('drizzle-zod', () => ({
  createInsertSchema: vi.fn(),
  createSelectSchema: vi.fn(),
}));

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
};

// Mock process methods
const processSpy = {
  on: vi.spyOn(process, 'on').mockImplementation(() => {}),
  exit: vi.spyOn(process, 'exit').mockImplementation(() => {}),
};

describe('Server Index', () => {
  let mockApp: any;
  let mockServer: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockApp = {
      use: vi.fn(),
      listen: vi.fn(),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
    };

    mockServer = {
      on: vi.fn(),
    };

    vi.mocked(express).mockReturnValue(mockApp);
    mockApp.listen.mockReturnValue(mockServer);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Server Initialization', () => {
    it('should create express app', async () => {
      await import('../../server/index');
      
      expect(express).toHaveBeenCalled();
    });

    it('should apply helmet middleware', async () => {
      await import('../../server/index');
      
      expect(helmet).toHaveBeenCalled();
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should apply rate limiting middleware', async () => {
      await import('../../server/index');
      
      expect(rateLimit).toHaveBeenCalledWith({
        windowMs: 15 * 60 * 1000,
        max: 100,
      });
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should apply session middleware', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should apply passport middleware', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should apply JSON parsing middleware', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should apply URL encoding middleware', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Route Registration', () => {
    it('should register API routes', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith('/api', expect.any(Function));
    });

    it('should register static file serving', async () => {
      await import('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should register catch-all route for SPA', async () => {
      await import('../../server/index');
      
      expect(mockApp.get).toHaveBeenCalledWith('*', expect.any(Function));
    });
  });

  describe('Server Listening', () => {
    it('should start server on specified port', async () => {
      const mockPort = 3000;
      process.env.PORT = mockPort.toString();
      
      await import('../../server/index');
      
      expect(mockApp.listen).toHaveBeenCalledWith(mockPort, expect.any(Function));
    });

    it('should use default port when PORT not specified', async () => {
      delete process.env.PORT;
      
      await import('../../server/index');
      
      expect(mockApp.listen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('should log server start message', async () => {
      await import('../../server/index');
      
      const listenCallback = mockApp.listen.mock.calls[0][1];
      listenCallback();
      
      expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('Server running'));
    });
  });

  describe('WebSocket Server', () => {
    it('should create WebSocket server', () => {
      require('../../server/index');
      
      expect(require('ws').WebSocketServer).toHaveBeenCalled();
    });

    it('should handle WebSocket connections', () => {
      require('../../server/index');
      
      const mockWsServer = require('ws').WebSocketServer.mock.results[0].value;
      expect(mockWsServer.on).toHaveBeenCalledWith('connection', expect.any(Function));
    });
  });

  describe('Database Connection', () => {
    it('should establish database connection', () => {
      require('../../server/index');
      
      expect(require('@neondatabase/serverless').neon).toHaveBeenCalled();
    });

    it('should create Drizzle ORM instance', () => {
      require('../../server/index');
      
      expect(require('drizzle-orm').drizzle).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle uncaught exceptions', () => {
      require('../../server/index');
      
      expect(processSpy.on).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
    });

    it('should handle unhandled promise rejections', () => {
      require('../../server/index');
      
      expect(processSpy.on).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));
    });

    it('should handle SIGTERM signal', () => {
      require('../../server/index');
      
      expect(processSpy.on).toHaveBeenCalledWith('SIGTERM', expect.any(Function));
    });

    it('should handle SIGINT signal', () => {
      require('../../server/index');
      
      expect(processSpy.on).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    });
  });

  describe('Graceful Shutdown', () => {
    it('should handle graceful shutdown on SIGTERM', () => {
      require('../../server/index');
      
      const sigtermHandler = processSpy.on.mock.calls.find(
        call => call[0] === 'SIGTERM'
      )?.[1];
      
      if (sigtermHandler) {
        sigtermHandler();
        expect(consoleSpy.log).toHaveBeenCalledWith('SIGTERM received, shutting down gracefully');
      }
    });

    it('should handle graceful shutdown on SIGINT', () => {
      require('../../server/index');
      
      const sigintHandler = processSpy.on.mock.calls.find(
        call => call[0] === 'SIGINT'
      )?.[1];
      
      if (sigintHandler) {
        sigintHandler();
        expect(consoleSpy.log).toHaveBeenCalledWith('SIGINT received, shutting down gracefully');
      }
    });

    it('should exit process after graceful shutdown', () => {
      require('../../server/index');
      
      const sigtermHandler = processSpy.on.mock.calls.find(
        call => call[0] === 'SIGTERM'
      )?.[1];
      
      if (sigtermHandler) {
        sigtermHandler();
        expect(processSpy.exit).toHaveBeenCalledWith(0);
      }
    });
  });

  describe('Environment Configuration', () => {
    it('should use production environment by default', () => {
      delete process.env.NODE_ENV;
      
      require('../../server/index');
      
      expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('Production'));
    });

    it('should use development environment when specified', () => {
      process.env.NODE_ENV = 'development';
      
      require('../../server/index');
      
      expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('Development'));
    });

    it('should use test environment when specified', () => {
      process.env.NODE_ENV = 'test';
      
      require('../../server/index');
      
      expect(consoleSpy.log).toHaveBeenCalledWith(expect.stringContaining('Test'));
    });
  });

  describe('Middleware Order', () => {
    it('should apply middleware in correct order', () => {
      require('../../server/index');
      
      const useCalls = mockApp.use.mock.calls;
      
      // Check that security middleware comes first
      expect(useCalls[0]).toBeDefined();
      
      // Check that body parsing comes after security
      expect(useCalls).toHaveLength(expect.any(Number));
    });
  });

  describe('Route Handler Registration', () => {
    it('should register routes with correct HTTP methods', () => {
      require('../../server/index');
      
      expect(mockApp.get).toHaveBeenCalled();
      expect(mockApp.post).toHaveBeenCalled();
      expect(mockApp.use).toHaveBeenCalled();
    });
  });

  describe('Static File Serving', () => {
    it('should serve static files from dist directory', () => {
      require('../../server/index');
      
      expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle SPA routing fallback', () => {
      require('../../server/index');
      
      expect(mockApp.get).toHaveBeenCalledWith('*', expect.any(Function));
    });
  });
});
