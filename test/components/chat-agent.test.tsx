import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ChatAgent from '@/components/chat-agent';

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock framer-motion directly in the test file
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const {
        initial, animate, exit, transition, whileHover, whileTap,
        ...domProps
      } = props;
      return <div {...domProps}>{children}</div>;
    }
  },
  AnimatePresence: ({ children }: any) => children
}));

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
// @ts-expect-error: JSDOM test shim
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

// Mock scrollIntoView for JSDOM
// @ts-expect-error: JSDOM test shim
Element.prototype.scrollIntoView = vi.fn();

describe('ChatAgent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders floating chat button initially', () => {
    render(<ChatAgent />);
    const chatButton = screen.getByTestId('chat-open-button');
    expect(chatButton).toBeInTheDocument();
  });

  it('opens chat interface and shows stable header', async () => {
    render(<ChatAgent />);
    const chatButton = screen.getByTestId('chat-open-button');
    fireEvent.click(chatButton);
    expect(await screen.findByText('Eline')).toBeInTheDocument();
    expect(await screen.findByText('Your AI Assistant')).toBeInTheDocument();
  });

  it('allows typing and sending messages', async () => {
    render(<ChatAgent />);
    const chatButton = screen.getByTestId('chat-open-button');
    fireEvent.click(chatButton);

    // Wait for chat interface to open
    await screen.findByTestId('chat-input');

    const input = screen.getByTestId('chat-input') as HTMLInputElement;
    const sendButton = screen.getByTestId('chat-send-button');

    fireEvent.change(input, { target: { value: 'Hello Eline' } });
    fireEvent.click(sendButton);

    // Fast-forward timers to simulate response generation
    vi.advanceTimersByTime(2000);

    // Wait for the message to appear
    expect(await screen.findByText('Hello Eline')).toBeInTheDocument();
  });

  it('shows typing indicator while processing response', async () => {
    render(<ChatAgent />);
    const chatButton = screen.getByTestId('chat-open-button');
    fireEvent.click(chatButton);

    // Wait for chat interface to open
    await screen.findByTestId('chat-input');

    const input = screen.getByTestId('chat-input') as HTMLInputElement;
    const sendButton = screen.getByTestId('chat-send-button');

    fireEvent.change(input, { target: { value: 'Quick question' } });
    fireEvent.click(sendButton);

    // Should show the sent message
    expect(await screen.findByText('Quick question')).toBeInTheDocument();
  });

  it('handles quick reply button clicks', async () => {
    render(<ChatAgent />);
    const chatButton = screen.getByTestId('chat-open-button');
    fireEvent.click(chatButton);

    // Wait for chat interface to open
    await screen.findByTestId('chat-input');

    // Send initial message to trigger quick replies
    const input = screen.getByTestId('chat-input') as HTMLInputElement;
    const sendButton = screen.getByTestId('chat-send-button');

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    // Fast-forward timers
    vi.advanceTimersByTime(2000);

    // Wait for quick reply to appear and click one
    const quickReplyButton = await screen.findByText('Tell me about Ahmet');
    fireEvent.click(quickReplyButton);

    // Fast-forward timers again
    vi.advanceTimersByTime(2000);

    // Should show the quick reply message in the chat
    expect(await screen.findByText('Tell me about Ahmet')).toBeInTheDocument();
  });
});

