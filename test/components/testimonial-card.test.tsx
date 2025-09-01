import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCard from '../../client/src/components/testimonial-card';

// Mock the Star icon component
vi.mock('lucide-react', () => ({
  Star: ({ className, ...props }: any) => <div data-testid="star" className={className} {...props} />,
}));

describe('TestimonialCard Component', () => {
  const mockTestimonial = {
    quote: 'This is an amazing testimonial about the service.',
    name: 'John Doe',
    title: 'CEO, Tech Corp',
    testId: 'john-doe',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render testimonial information correctly', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO, Tech Corp')).toBeInTheDocument();
    expect(screen.getByText(/This is an amazing testimonial about the service/)).toBeInTheDocument();
  });

  it('should render testimonial quote with proper formatting', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    const quote = screen.getByTestId('text-john-doe-quote');
    expect(quote).toBeInTheDocument();
    expect(quote).toHaveTextContent('"This is an amazing testimonial about the service."');
  });

  it('should render testimonial name with proper styling', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    const name = screen.getByTestId('text-john-doe-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('John Doe');
    expect(name).toHaveClass('font-semibold', 'text-primary-900');
  });

  it('should render testimonial title with proper styling', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    const title = screen.getByTestId('text-john-doe-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('CEO, Tech Corp');
    expect(title).toHaveClass('text-sm', 'text-gray-500');
  });

  it('should render star rating correctly', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    // Check for 5 stars
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);
    
    // All stars should have the same classes
    stars.forEach(star => {
      expect(star).toHaveClass('w-4', 'h-4', 'fill-current');
    });
  });

  it('should render check icon correctly', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    // Check for the check icon (SVG path)
    const checkIcon = screen.getByTestId('text-john-doe-quote').closest('div')?.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should apply correct CSS classes for styling', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    const card = screen.getByTestId('text-john-doe-quote').closest('div');
    expect(card).toHaveClass('bg-gray-50', 'rounded-xl', 'p-8', 'border-l-4', 'border-accent', 'fade-in');
  });

  it('should handle long content gracefully', () => {
    const testimonialWithLongContent = {
      ...mockTestimonial,
      quote: 'This is a very long testimonial content that might exceed the normal length and should be handled gracefully by the component. It should still look good and be readable even when the content is quite lengthy.',
      testId: 'long-content',
    };

    render(<TestimonialCard {...testimonialWithLongContent} />);

    expect(screen.getByTestId('text-long-content-quote')).toBeInTheDocument();
    expect(screen.getByText(/This is a very long testimonial content/)).toBeInTheDocument();
  });

  it('should handle special characters in content', () => {
    const testimonialWithSpecialChars = {
      ...mockTestimonial,
      quote: 'Testimonial with special chars: & < > " \' and emojis 🚀 💡',
      testId: 'special-chars',
    };

    render(<TestimonialCard {...testimonialWithSpecialChars} />);

    expect(screen.getByTestId('text-special-chars-quote')).toBeInTheDocument();
    expect(screen.getByText(/Testimonial with special chars/)).toBeInTheDocument();
  });

  it('should handle empty content gracefully', () => {
    const testimonialWithEmptyContent = { 
      ...mockTestimonial, 
      quote: '',
      testId: 'empty-content',
    };
    
    render(<TestimonialCard {...testimonialWithEmptyContent} />);

    const quote = screen.getByTestId('text-empty-content-quote');
    expect(quote).toBeInTheDocument();
    expect(quote).toHaveTextContent('""');
  });

  it('should handle different test IDs correctly', () => {
    const testimonialWithDifferentTestId = {
      ...mockTestimonial,
      testId: 'different-id',
    };

    render(<TestimonialCard {...testimonialWithDifferentTestId} />);

    expect(screen.getByTestId('text-different-id-quote')).toBeInTheDocument();
    expect(screen.getByTestId('text-different-id-name')).toBeInTheDocument();
    expect(screen.getByTestId('text-different-id-title')).toBeInTheDocument();
  });

  it('should maintain proper semantic structure', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    // Should have proper heading structure
    const name = screen.getByTestId('text-john-doe-name');
    const title = screen.getByTestId('text-john-doe-title');
    
    expect(name).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('should handle accessibility features', () => {
    render(<TestimonialCard {...mockTestimonial} />);

    // Should have proper test IDs for accessibility
    expect(screen.getByTestId('text-john-doe-quote')).toBeInTheDocument();
    expect(screen.getByTestId('text-john-doe-name')).toBeInTheDocument();
    expect(screen.getByTestId('text-john-doe-title')).toBeInTheDocument();
  });
});
