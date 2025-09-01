import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '../../client/src/components/navigation';

// Mock the useIsMobile hook
vi.mock('../../client/src/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

// Mock the ThemeToggle component
vi.mock('../../client/src/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="button-theme-toggle">Theme Toggle</div>,
}));

// Mock wouter
vi.mock('wouter', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props} data-testid="nav-link">
      {children}
    </a>
  ),
  useLocation: () => ['/'],
}));

describe('Navigation Component', () => {
  it('should render navigation', () => {
    render(<Navigation />);
    
    // Check for the first nav-link (home link)
    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks[0]).toBeInTheDocument();
    expect(screen.getByTestId('button-mobile-menu')).toBeInTheDocument();
  });

  it('should render brand logo and name', () => {
    render(<Navigation />);
    
    // Check for the first nav-link (home link)
    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks[0]).toBeInTheDocument();
    expect(screen.getByText(/Ahmet Doğan/i)).toBeInTheDocument();
  });

  it('should render navigation menu items', () => {
    render(<Navigation />);
    
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Career/i)).toBeInTheDocument();
    expect(screen.getByText(/Credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/Organizations/i)).toBeInTheDocument();
  });

  it('should render theme toggle', () => {
    render(<Navigation />);
    
    expect(screen.getByTestId('button-theme-toggle')).toBeInTheDocument();
  });

  it('should render contact button', () => {
    render(<Navigation />);
    
    // The contact button is inside a nav-link, so check for the text
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
