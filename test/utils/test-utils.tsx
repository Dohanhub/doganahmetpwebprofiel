import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Mock data generators
export const createMockContact = (overrides = {}) => ({
  id: 'test-id-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  organization: 'Test Corp',
  service: 'Consulting',
  message: 'This is a test message',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 'user-id-123',
  username: 'testuser',
  password: 'hashedpassword',
  ...overrides,
});

// Mock API responses
export const mockApiResponses = {
  success: (data: any) => ({
    success: true,
    ...data,
  }),
  error: (message: string, details?: any) => ({
    success: false,
    error: message,
    ...(details && { details }),
  }),
};

// Wait for a condition to be true
export const waitForCondition = (condition: () => boolean, timeout = 5000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Condition timeout'));
      } else {
        setTimeout(checkCondition, 100);
      }
    };
    
    checkCondition();
  });
};
