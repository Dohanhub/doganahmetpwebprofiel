import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Home from '../../client/src/pages/home';

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

// Mock the ChatAgent component
vi.mock('@/components/chat-agent', () => ({
  default: () => <div data-testid="chat-agent">ChatAgent</div>
}));

describe('Home Page', () => {
  it('should render navigation', () => {
    render(<Home />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('should render hero section with title', () => {
    render(<Home />);
    expect(screen.getByTestId('text-hero-title')).toHaveTextContent('Ahmet Doğan');
  });

  it('should render hero section with subtitle', () => {
    render(<Home />);
    expect(screen.getByText(/Elite ICT Executive & Digital Transformation Leader/)).toBeInTheDocument();
  });

  it('should render qualifications section', () => {
    render(<Home />);
    expect(screen.getByText(/Doctor of Business Administration Candidate/)).toBeInTheDocument();
    expect(screen.getByText(/Saudi Premium Residency/)).toBeInTheDocument();
  });

  it('should render accreditation tagline in hero section', () => {
    render(<Home />);
    // Use the specific hero section text, not the duplicate in the accreditation section
    const heroSection = screen.getByTestId('text-hero-title').closest('section');
    const tagline = heroSection?.querySelector('p');
    expect(tagline).toHaveTextContent(/Accreditation Beyond Boundaries/);
  });

  it('should render CTA buttons', () => {
    render(<Home />);
    expect(screen.getByTestId('button-linkedin-cta')).toBeInTheDocument();
    expect(screen.getByTestId('button-schedule-cta')).toBeInTheDocument();
  });

  it('should render accreditation section', () => {
    render(<Home />);
    expect(screen.getByTestId('text-accreditation-title')).toHaveTextContent('Accreditation Beyond Boundaries');
    expect(screen.getByTestId('achievement-1')).toBeInTheDocument();
    expect(screen.getByTestId('achievement-2')).toBeInTheDocument();
    expect(screen.getByTestId('achievement-3')).toBeInTheDocument();
  });

  it('should render core expertise section', () => {
    render(<Home />);
    expect(screen.getByTestId('text-expertise-title')).toHaveTextContent('Core Expertise & Featured Projects');
    expect(screen.getByTestId('text-profile-title')).toHaveTextContent('Visionary ICT Leader');
    expect(screen.getByTestId('text-profile-description-1')).toBeInTheDocument();
    expect(screen.getByTestId('text-profile-description-2')).toBeInTheDocument();
  });

  it('should render expertise badges', () => {
    render(<Home />);
    expect(screen.getByTestId('badge-neom-leader')).toBeInTheDocument();
    expect(screen.getByTestId('badge-vision-2030')).toBeInTheDocument();
    expect(screen.getByTestId('badge-pgmp-certified')).toBeInTheDocument();
    expect(screen.getByTestId('badge-premium-residency')).toBeInTheDocument();
  });

  it('should render featured projects', () => {
    render(<Home />);
    expect(screen.getByText(/NEOM Telco Park Data Center/)).toBeInTheDocument();
    expect(screen.getByText(/Regional Digital Transformation/)).toBeInTheDocument();
  });

  it('should render executive recommendations section', () => {
    render(<Home />);
    expect(screen.getByTestId('text-recommendations-title')).toHaveTextContent('Executive Recommendations');
    // Use the specific subtitle text instead of the generic number
    expect(screen.getByTestId('text-recommendations-subtitle')).toHaveTextContent(/18 senior executives/);
    expect(screen.getByText(/Executive Recommendations/)).toBeInTheDocument();
    expect(screen.getByText(/Countries/)).toBeInTheDocument();
  });

  it('should render LinkedIn recommendations CTA', () => {
    render(<Home />);
    expect(screen.getByTestId('button-linkedin-recommendations')).toBeInTheDocument();
  });

  it('should render elite credentials section', () => {
    render(<Home />);
    expect(screen.getByTestId('text-credentials-title')).toHaveTextContent('Elite Professional Credentials');
    expect(screen.getByText(/global top 0.001%/)).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(<Home />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render chat agent', () => {
    render(<Home />);
    expect(screen.getByTestId('chat-agent')).toBeInTheDocument();
  });

  it('should render page structure correctly', () => {
    render(<Home />);
    
    // Check for main sections
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render responsive design elements', () => {
    render(<Home />);
    
    // Check for responsive classes
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('min-h-screen');
  });

  it('should render accessibility features', () => {
    render(<Home />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });
});
