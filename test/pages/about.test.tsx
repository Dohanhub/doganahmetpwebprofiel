import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import About from '../../client/src/pages/about';

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
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('About Page', () => {
  it('should render about page with main heading', () => {
    render(<About />);
    
    expect(screen.getByText(/About Ahmet Doğan/i)).toBeInTheDocument();
  });

  it('should render professional title', () => {
    render(<About />);
    
    expect(screen.getByText(/Elite ICT Executive & Digital Transformation Leader/i)).toBeInTheDocument();
  });

  it('should render experience summary', () => {
    render(<About />);
    
    expect(screen.getByText(/25\+ years of experience/i)).toBeInTheDocument();
  });

  it('should render expertise areas', () => {
    render(<About />);
    
    expect(screen.getByText(/Strategic Leadership/i)).toBeInTheDocument();
    expect(screen.getByText(/Cybersecurity Governance/i)).toBeInTheDocument();
    expect(screen.getByText(/Digital Transformation/i)).toBeInTheDocument();
  });

  it('should render Vision 2030 alignment', () => {
    render(<About />);
    
    expect(screen.getByText(/Vision 2030/i)).toBeInTheDocument();
  });

  it('should render professional achievements', () => {
    render(<About />);
    
    expect(screen.getByText(/Professional Achievements/i)).toBeInTheDocument();
  });

  it('should render education section', () => {
    render(<About />);
    
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it('should render certifications section', () => {
    render(<About />);
    
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
  });

  it('should render professional organizations', () => {
    render(<About />);
    
    expect(screen.getByText(/Professional Organizations/i)).toBeInTheDocument();
  });

  it('should render contact information', () => {
    render(<About />);
    
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<About />);
    
    expect(screen.getByText(/Career Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Organizations/i)).toBeInTheDocument();
  });

  it('should render professional summary', () => {
    render(<About />);
    
    expect(screen.getByText(/professional journey/i)).toBeInTheDocument();
  });

  it('should render strategic focus areas', () => {
    render(<About />);
    
    expect(screen.getByText(/strategic focus/i)).toBeInTheDocument();
  });

  it('should render leadership philosophy', () => {
    render(<About />);
    
    expect(screen.getByText(/leadership philosophy/i)).toBeInTheDocument();
  });

  it('should render industry expertise', () => {
    render(<About />);
    
    expect(screen.getByText(/industry expertise/i)).toBeInTheDocument();
  });

  it('should render transformation approach', () => {
    render(<About />);
    
    expect(screen.getByText(/transformation approach/i)).toBeInTheDocument();
  });

  it('should render call to action', () => {
    render(<About />);
    
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('should render page structure correctly', () => {
    render(<About />);
    
    // Check for main sections
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render responsive design elements', () => {
    render(<About />);
    
    // Check for responsive classes
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('min-h-screen');
  });

  it('should render accessibility features', () => {
    render(<About />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });
});
