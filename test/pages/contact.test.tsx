import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Contact from '../../client/src/pages/contact';

// Mock wouter components
vi.mock('wouter', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Contact Page', () => {
  it('should render contact page with main heading', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Contact Me/i)).toBeInTheDocument();
  });

  it('should render contact form', () => {
    render(<Contact />);
    
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render name input field', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it('should render email input field', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('should render message textarea', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<Contact />);
    
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('should render contact information section', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Contact Information/i)).toBeInTheDocument();
  });

  it('should render phone number', () => {
    render(<Contact />);
    
    expect(screen.getByText(/\+966-500-666-084/i)).toBeInTheDocument();
  });

  it('should render email address', () => {
    render(<Contact />);
    
    expect(screen.getByText(/ahmet\.dogan@stc\.com\.sa/i)).toBeInTheDocument();
  });

  it('should render LinkedIn profile', () => {
    render(<Contact />);
    
    expect(screen.getByText(/LinkedIn Profile/i)).toBeInTheDocument();
  });

  it('should render location information', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
  });

  it('should render availability information', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Availability/i)).toBeInTheDocument();
  });

  it('should render response time information', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Response Time/i)).toBeInTheDocument();
  });

  it('should render form validation', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('should render form accessibility features', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    
    expect(nameInput).toHaveAttribute('id');
    expect(emailInput).toHaveAttribute('id');
    expect(messageInput).toHaveAttribute('id');
  });

  it('should render page structure correctly', () => {
    render(<Contact />);
    
    // Check for main sections
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render responsive design elements', () => {
    render(<Contact />);
    
    // Check for responsive classes
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('min-h-screen');
  });

  it('should render accessibility features', () => {
    render(<Contact />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Contact />);
    
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Career Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
  });

  it('should render contact form with proper labels', () => {
    render(<Contact />);
    
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Message/i)).toBeInTheDocument();
  });

  it('should render contact form with proper placeholders', () => {
    render(<Contact />);
    
    const nameInput = screen.getByPlaceholderText(/Enter your full name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    const messageInput = screen.getByPlaceholderText(/Enter your message/i);
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
  });
});
