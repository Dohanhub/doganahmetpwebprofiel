import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Mock scrollIntoView for JSDOM
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock framer-motion
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef((props: any, ref: any) => {
        // Filter out framer-motion specific props
        const { 
          initial, animate, exit, transition, whileHover, whileTap, 
          ...domProps 
        } = props;
        return React.createElement('div', { ...domProps, ref }, props.children);
      })
    },
    AnimatePresence: ({ children }: any) => children
  };
});

// Mock Web Speech API
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    continuous: false,
    interimResults: false,
    lang: 'en-US',
    start: vi.fn(),
    stop: vi.fn(),
    onresult: null,
    onerror: null
  }))
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    continuous: false,
    interimResults: false,
    lang: 'en-US',
    start: vi.fn(),
    stop: vi.fn(),
    onresult: null,
    onerror: null
  }))
});

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = vi.fn().mockImplementation(() => ({
  rate: 1,
  pitch: 1,
  volume: 1,
  onstart: null,
  onend: null
}));

Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn()
  }
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock console methods in tests to reduce noise
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
  
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalConsoleWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
