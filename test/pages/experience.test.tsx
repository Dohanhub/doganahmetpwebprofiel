import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Experience from '../../client/src/pages/experience';

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
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Experience Page', () => {
  it('should render experience page with main heading', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Career Experience/i)).toBeInTheDocument();
  });

  it('should render professional summary', () => {
    render(<Experience />);
    
    expect(screen.getByText(/25\+ years of experience/i)).toBeInTheDocument();
  });

  it('should render current position', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Chief Information Officer/i)).toBeInTheDocument();
  });

  it('should render company information', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Saudi Telecom Company/i)).toBeInTheDocument();
  });

  it('should render experience timeline', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Experience Timeline/i)).toBeInTheDocument();
  });

  it('should render key responsibilities', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Key Responsibilities/i)).toBeInTheDocument();
  });

  it('should render achievements section', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Key Achievements/i)).toBeInTheDocument();
  });

  it('should render skills section', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Core Skills/i)).toBeInTheDocument();
  });

  it('should render technical expertise', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Technical Expertise/i)).toBeInTheDocument();
  });

  it('should render leadership skills', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Leadership Skills/i)).toBeInTheDocument();
  });

  it('should render strategic planning', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Strategic Planning/i)).toBeInTheDocument();
  });

  it('should render digital transformation', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Digital Transformation/i)).toBeInTheDocument();
  });

  it('should render cybersecurity governance', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Cybersecurity Governance/i)).toBeInTheDocument();
  });

  it('should render project management', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Project Management/i)).toBeInTheDocument();
  });

  it('should render team leadership', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Team Leadership/i)).toBeInTheDocument();
  });

  it('should render stakeholder management', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Stakeholder Management/i)).toBeInTheDocument();
  });

  it('should render change management', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Change Management/i)).toBeInTheDocument();
  });

  it('should render innovation focus', () => {
    render(<Experience />);
    
    expect(screen.getByText(/Innovation/i)).toBeInTheDocument();
  });

  it('should render page structure correctly', () => {
    render(<Experience />);
    
    // Check for main sections
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render responsive design elements', () => {
    render(<Experience />);
    
    // Check for responsive classes
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('min-h-screen');
  });

  it('should render accessibility features', () => {
    render(<Experience />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('should render experience details', () => {
    render(<Experience />);
    
    // Check for experience details
    expect(screen.getByText(/Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Experience />);
    
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
