import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Footer from '../../client/src/components/footer';

// Mock wouter components
vi.mock('wouter', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer Component', () => {
  it('should render footer', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).to.exist;
  });

  it('should render copyright information', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 DoganConsult\. All rights reserved\./i)).to.exist;
  });

  it('should render brand name and description', () => {
    render(<Footer />);
    expect(screen.getByText(/Ahmet Doğan/i)).to.exist;
    expect(screen.getByText(/Elite ICT Executive & Digital Transformation Leader/i)).to.exist;
  });

  it('should render navigation links', () => {
    render(<Footer />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Career Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).to.exist;
    expect(screen.getByText(/Professional Organizations/i)).to.exist;
    expect(screen.getByText(/Contact/i)).to.exist;
  });

  it('should render social media links', () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId('link-linkedin');
    expect(linkedinLink).to.exist;
    expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/ahmet-dogan-ict/');
  });

  it('should render contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/\+966-500-666-084/i)).toBeInTheDocument();
  });

  it('should render section headings', () => {
    render(<Footer />);
    expect(screen.getByText(/Expertise/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
    image.png
  });

  it('should have proper test IDs for navigation links', () => {
    render(<Footer />);
    expect(screen.getByTestId('link-footer-about')).toBeInTheDocument();
    expect(screen.getByTestId('link-footer-career')).toBeInTheDocument();
    expect(screen.getByTestId('link-footer-certifications')).toBeInTheDocument();
    expect(screen.getByTestId('link-footer-organizations')).toBeInTheDocument();
    expect(screen.getByTestId('link-footer-contact')).toBeInTheDocument();
    expect(screen.getByTestId('link-footer-phone')).toBeInTheDocument();
  });
});
