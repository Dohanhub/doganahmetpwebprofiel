import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ServiceCard from '../../client/src/components/service-card';

// Mock the UI components
vi.mock('../../client/src/components/ui/button', () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props} data-testid="service-button">
      {children}
    </button>
  ),
}));

vi.mock('lucide-react', () => ({
  ChevronRight: ({ className, ...props }: any) => (
    <div data-testid="chevron-right" className={className} {...props} />
  ),
}));

vi.mock('wouter', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props} data-testid="service-link">
      {children}
    </a>
  ),
}));

describe('ServiceCard Component', () => {
  const mockService = {
    title: 'Digital Transformation Leadership',
    subtitle: 'Strategic guidance for digital transformation initiatives',
    description: 'Comprehensive digital transformation strategy development and implementation guidance.',
    image: '/test-image.jpg',
    href: '/services/digital-transformation',
    testId: 'digital-transformation',
  };

  it('should render service card with all information', () => {
    render(<ServiceCard {...mockService} />);
    
    expect(screen.getByText(/Digital Transformation Leadership/i)).toBeInTheDocument();
    expect(screen.getByText(/Strategic guidance for digital transformation initiatives/i)).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive digital transformation strategy development and implementation guidance/i)).toBeInTheDocument();
  });

  it('should render service image when provided', () => {
    render(<ServiceCard {...mockService} />);
    
    const image = screen.getByAltText(/Digital Transformation Leadership/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render title with proper styling', () => {
    render(<ServiceCard {...mockService} />);
    
    const title = screen.getByText(/Digital Transformation Leadership/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl', 'font-bold', 'text-primary-900', 'mb-4');
  });

  it('should render subtitle with proper styling', () => {
    render(<ServiceCard {...mockService} />);
    
    const subtitle = screen.getByText(/Strategic guidance for digital transformation initiatives/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-sm', 'font-semibold', 'text-accent', 'mb-4', 'italic');
  });

  it('should render description with proper styling', () => {
    render(<ServiceCard {...mockService} />);
    
    const description = screen.getByText(/Comprehensive digital transformation strategy development and implementation guidance/i);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-600', 'mb-6', 'leading-relaxed');
  });

  it('should render button with proper styling', () => {
    render(<ServiceCard {...mockService} />);
    const button = screen.getByTestId('service-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600', 'hover:bg-primary-700', 'text-white');
  });

  it('should render chevron right icon', () => {
    render(<ServiceCard {...mockService} />);
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });

  it('should have proper link attributes', () => {
    render(<ServiceCard {...mockService} />);
    const link = screen.getByTestId('service-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/services/digital-transformation');
  });

  it('should have proper test IDs for content elements', () => {
    render(<ServiceCard {...mockService} />);
    
    expect(screen.getByTestId('text-digital-transformation-title')).toBeInTheDocument();
    expect(screen.getByTestId('text-digital-transformation-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('text-digital-transformation-description')).toBeInTheDocument();
  });

  it('should handle missing image gracefully', () => {
    const serviceWithoutImage = { ...mockService, image: undefined };
    render(<ServiceCard {...serviceWithoutImage} />);
    
    // Should still render all other content
    expect(screen.getByText(/Digital Transformation Leadership/i)).toBeInTheDocument();
    expect(screen.getByTestId('service-button')).toBeInTheDocument();
  });

  it('should apply proper CSS classes for styling', () => {
    render(<ServiceCard {...mockService} />);
    
    const card = screen.getByText(/Digital Transformation Leadership/i).closest('div');
    expect(card).toHaveClass('bg-gray-50', 'rounded-2xl', 'p-8', 'hover:shadow-xl');
  });
});
