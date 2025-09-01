import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactForm from '../../client/src/components/contact-form';

// Mock the useToast hook
const mockToast = vi.fn();
vi.mock('../../client/src/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock the useIsMobile hook
vi.mock('../../client/src/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

// Mock the useMutation hook
const mockMutate = vi.fn();
const mockIsPending = vi.fn(() => false);
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: () => ({
      mutate: mockMutate,
      isPending: mockIsPending(),
    }),
  };
});

// Create a test wrapper with QueryClient
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('ContactForm Component', () => {
  const TestWrapper = createTestWrapper();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    mockIsPending.mockReturnValue(false);
  });

  it('should render contact form', () => {
    render(
      <TestWrapper>
        <ContactForm />
      </TestWrapper>
    );

    expect(screen.getByText(/Schedule a Consultation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('should call mutation with form data on valid submission', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ContactForm />
      </TestWrapper>
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        organization: '',
        service: '',
        message: 'Test message',
      });
    });
  });

  it('should handle form submission with all fields', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ContactForm />
      </TestWrapper>
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const organizationInput = screen.getByLabelText(/Organization/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    await user.type(firstNameInput, 'Jane');
    await user.type(lastNameInput, 'Smith');
    await user.type(emailInput, 'jane@example.com');
    await user.type(organizationInput, 'Test Company');
    await user.type(messageInput, 'Test message with organization');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        organization: 'Test Company',
        service: '',
        message: 'Test message with organization',
      });
    });
  });

  it('should show loading state during submission', async () => {
    mockIsPending.mockReturnValue(true);

    render(
      <TestWrapper>
        <ContactForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /Sending.../i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });

  it('should render service selection field', () => {
    render(
      <TestWrapper>
        <ContactForm />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/Service Interest/i)).toBeInTheDocument();
  });
});
