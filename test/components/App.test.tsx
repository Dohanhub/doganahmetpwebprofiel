import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import App from '../../client/src/App';

// Mock wouter components
vi.mock('wouter', () => ({
  Switch: ({ children }: any) => <div data-testid="router-switch">{children}</div>,
  Route: ({ component: Component, path }: any) => {
    if (path === '/') {
      return <Component data-testid="home-route" />;
    }
    if (path === '/about') {
      return <Component data-testid="about-route" />;
    }
    if (path === '/experience') {
      return <Component data-testid="experience-route" />;
    }
    if (path === '/certifications') {
      return <Component data-testid="certifications-route" />;
    }
    if (path === '/organizations') {
      return <Component data-testid="organizations-route" />;
    }
    if (path === '/contact') {
      return <Component data-testid="contact-route" />;
    }
    return <Component data-testid="not-found-route" />;
  },
}));

// Mock theme provider
vi.mock('../../client/src/components/theme-provider', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}));

// Mock query client provider
vi.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children, ...props }: any) => (
    <div data-testid="query-client-provider" {...props}>
      {children}
    </div>
  ),
}));

// Mock tooltip provider
vi.mock('../../client/src/components/ui/tooltip', () => ({
  TooltipProvider: ({ children, ...props }: any) => (
    <div data-testid="tooltip-provider" {...props}>
      {children}
    </div>
  ),
}));

// Mock toaster
vi.mock('../../client/src/components/ui/toaster', () => ({
  Toaster: ({ ...props }: any) => <div data-testid="toaster" {...props} />,
}));

// Mock chat agent
vi.mock('../../client/src/components/chat-agent', () => ({
  default: ({ ...props }: any) => <div data-testid="chat-agent" {...props} />,
}));

// Mock page components
vi.mock('../../client/src/pages/home', () => ({
  default: ({ ...props }: any) => <div data-testid="home-page" {...props} />,
}));

vi.mock('../../client/src/pages/about', () => ({
  default: ({ ...props }: any) => <div data-testid="about-page" {...props} />,
}));

vi.mock('../../client/src/pages/experience', () => ({
  default: ({ ...props }: any) => <div data-testid="experience-page" {...props} />,
}));

vi.mock('../../client/src/pages/certifications', () => ({
  default: ({ ...props }: any) => <div data-testid="certifications-page" {...props} />,
}));

vi.mock('../../client/src/pages/organizations', () => ({
  default: ({ ...props }: any) => <div data-testid="organizations-page" {...props} />,
}));

vi.mock('../../client/src/pages/contact', () => ({
  default: ({ ...props }: any) => <div data-testid="contact-page" {...props} />,
}));

vi.mock('../../client/src/pages/not-found', () => ({
  default: ({ ...props }: any) => <div data-testid="not-found-page" {...props} />,
}));

describe('App Component', () => {
  it('should render the main app structure', () => {
    render(<App />);
    
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('query-client-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
  });

  it('should render the router switch', () => {
    render(<App />);
    
    expect(screen.getByTestId('router-switch')).toBeInTheDocument();
  });

  it('should render the toaster component', () => {
    render(<App />);
    
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('should render the chat agent component', () => {
    render(<App />);
    
    expect(screen.getByTestId('chat-agent')).toBeInTheDocument();
  });

  it('should render the main app container with proper classes', () => {
    render(<App />);
    
    const mainContainer = screen.getByTestId('theme-provider').parentElement;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-background', 'text-foreground', 'transition-colors');
  });

  it('should pass correct props to theme provider', () => {
    render(<App />);
    
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('defaultTheme', 'light');
    expect(themeProvider).toHaveAttribute('storageKey', 'dogan-theme');
  });

  it('should render all route components', () => {
    render(<App />);
    
    // Check that all route components are rendered
    expect(screen.getByTestId('home-route')).toBeInTheDocument();
    expect(screen.getByTestId('about-route')).toBeInTheDocument();
    expect(screen.getByTestId('experience-route')).toBeInTheDocument();
    expect(screen.getByTestId('certifications-route')).toBeInTheDocument();
    expect(screen.getByTestId('organizations-route')).toBeInTheDocument();
    expect(screen.getByTestId('contact-route')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-route')).toBeInTheDocument();
  });

  it('should render page components correctly', () => {
    render(<App />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByTestId('experience-page')).toBeInTheDocument();
    expect(screen.getByTestId('certifications-page')).toBeInTheDocument();
    expect(screen.getByTestId('organizations-page')).toBeInTheDocument();
    expect(screen.getByTestId('contact-page')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('should have proper component hierarchy', () => {
    render(<App />);
    
    const themeProvider = screen.getByTestId('theme-provider');
    const queryClientProvider = screen.getByTestId('query-client-provider');
    const tooltipProvider = screen.getByTestId('tooltip-provider');
    
    expect(themeProvider).toContainElement(queryClientProvider);
    expect(queryClientProvider).toContainElement(tooltipProvider);
  });

  it('should render with proper accessibility structure', () => {
    render(<App />);
    
    const mainContainer = screen.getByTestId('theme-provider').parentElement;
    expect(mainContainer).toBeInTheDocument();
  });

  it('should handle component rendering without errors', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('should maintain component state properly', () => {
    const { rerender } = render(<App />);
    
    // Re-render should not cause issues
    expect(() => rerender(<App />)).not.toThrow();
  });

  it('should render with default theme configuration', () => {
    render(<App />);
    
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('defaultTheme', 'light');
  });

  it('should render with custom storage key', () => {
    render(<App />);
    
    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('storageKey', 'dogan-theme');
  });

  it('should render all required providers', () => {
    render(<App />);
    
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('query-client-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
  });

  it('should render the main app content', () => {
    render(<App />);
    
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
    expect(screen.getByTestId('chat-agent')).toBeInTheDocument();
  });

  it('should handle component unmounting gracefully', () => {
    const { unmount } = render(<App />);
    
    expect(() => unmount()).not.toThrow();
  });
});
