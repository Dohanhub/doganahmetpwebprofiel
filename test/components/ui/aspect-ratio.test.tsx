import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { AspectRatio } from '../../../client/src/components/ui/aspect-ratio';

describe('AspectRatio Component', () => {
  it('should render with default props', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="default-aspect-ratio">
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('default-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with custom ratio', () => {
    render(
      <AspectRatio ratio={4 / 3} data-testid="custom-ratio-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('custom-ratio-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with square ratio', () => {
    render(
      <AspectRatio ratio={1} data-testid="square-aspect-ratio">
        <div>Square content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('square-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with portrait ratio', () => {
    render(
      <AspectRatio ratio={3 / 4} data-testid="portrait-aspect-ratio">
        <div>Portrait content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('portrait-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with landscape ratio', () => {
    render(
      <AspectRatio ratio={21 / 9} data-testid="landscape-aspect-ratio">
        <div>Landscape content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('landscape-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with image content', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="image-aspect-ratio">
        <img src="hero.jpg" alt="Hero image" />
      </AspectRatio>
    );
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'hero.jpg');
    expect(image).toHaveAttribute('alt', 'Hero image');
  });

  it('should render with video content', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="video-aspect-ratio">
        <video src="video.mp4" controls />
      </AspectRatio>
    );
    
    const video = screen.getByTestId('video-aspect-ratio').querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'video.mp4');
    expect(video).toHaveAttribute('controls');
  });

  it('should render with iframe content', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="iframe-aspect-ratio">
        <iframe src="https://example.com" title="Example iframe" />
      </AspectRatio>
    );
    
    const iframe = screen.getByTitle('Example iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com');
  });

  it('should render with complex content', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="complex-aspect-ratio">
        <div className="complex-content">
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      </AspectRatio>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <AspectRatio ratio={16 / 9} className="custom-aspect-ratio" data-testid="custom-class-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('custom-class-aspect-ratio');
    expect(aspectRatio).toHaveClass('custom-aspect-ratio');
  });

  it('should render with data attributes', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="test-aspect-ratio" data-custom="value">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('test-aspect-ratio');
    expect(aspectRatio).toHaveAttribute('data-custom', 'value');
  });

  it('should render with aria attributes', () => {
    render(
      <AspectRatio ratio={16 / 9} aria-label="Aspect ratio container" aria-describedby="description" data-testid="aria-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('aria-aspect-ratio');
    expect(aspectRatio).toHaveAttribute('aria-label', 'Aspect ratio container');
    expect(aspectRatio).toHaveAttribute('aria-describedby', 'description');
  });

  it('should render with style attributes', () => {
    render(
      <AspectRatio ratio={16 / 9} style={{ border: '1px solid red' }} data-testid="style-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('style-aspect-ratio');
    expect(aspectRatio).toHaveStyle({ border: '1px solid red' });
  });

  it('should render with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <AspectRatio ratio={16 / 9} ref={ref} data-testid="ref-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    expect(ref.current).toBeInTheDocument();
  });

  it('should render with event handlers', () => {
    const handleClick = vi.fn();
    render(
      <AspectRatio ratio={16 / 9} onClick={handleClick} data-testid="event-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('event-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with multiple children', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="multiple-children-aspect-ratio">
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </AspectRatio>
    );
    
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('should render with conditional children', () => {
    const showContent = true;
    render(
      <AspectRatio ratio={16 / 9} data-testid="conditional-aspect-ratio">
        {showContent && <div>Conditional content</div>}
      </AspectRatio>
    );
    
    expect(screen.getByText('Conditional content')).toBeInTheDocument();
  });

  it('should render with dynamic ratio', () => {
    const dynamicRatio = 2.35; // CinemaScope ratio
    render(
      <AspectRatio ratio={dynamicRatio} data-testid="dynamic-ratio-aspect-ratio">
        <div>Cinema content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('dynamic-ratio-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with very wide ratio', () => {
    render(
      <AspectRatio ratio={32 / 9} data-testid="ultra-wide-aspect-ratio">
        <div>Ultra-wide content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('ultra-wide-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('should render with very tall ratio', () => {
    render(
      <AspectRatio ratio={9 / 16} data-testid="mobile-aspect-ratio">
        <div>Mobile content</div>
      </AspectRatio>
    );
    
    const aspectRatio = screen.getByTestId('mobile-aspect-ratio');
    expect(aspectRatio).toBeInTheDocument();
  });
});
