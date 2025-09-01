import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Separator } from '../../../client/src/components/ui/separator';

describe('Separator Component', () => {
  it('should render with default props', () => {
    render(<Separator data-testid="default-separator" />);
    
    const separator = screen.getByTestId('default-separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('shrink-0', 'bg-border', 'h-[1px]', 'w-full');
  });

  it('should render with horizontal orientation', () => {
    render(<Separator orientation="horizontal" data-testid="horizontal-separator" />);
    
    const separator = screen.getByTestId('horizontal-separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('should render with vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="vertical-separator" />);
    
    const separator = screen.getByTestId('vertical-separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
  });

  it('should render with decorative prop true', () => {
    render(<Separator decorative={true} data-testid="decorative-separator" />);
    
    const separator = screen.getByTestId('decorative-separator');
    expect(separator).toBeInTheDocument();
  });

  it('should render with decorative prop false', () => {
    render(<Separator decorative={false} data-testid="non-decorative-separator" />);
    
    const separator = screen.getByTestId('non-decorative-separator');
    expect(separator).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(<Separator className="custom-separator" data-testid="custom-separator" />);
    
    const separator = screen.getByTestId('custom-separator');
    expect(separator).toHaveClass('custom-separator', 'shrink-0', 'bg-border');
  });

  it('should render with custom styling', () => {
    render(<Separator className="bg-red-500 h-2 w-32" data-testid="styling-separator" />);
    
    const separator = screen.getByTestId('styling-separator');
    expect(separator).toHaveClass('bg-red-500', 'h-2', 'w-32');
  });

  it('should render with data attributes', () => {
    render(<Separator data-testid="test-separator" data-custom="value" />);
    
    const separator = screen.getByTestId('test-separator');
    expect(separator).toHaveAttribute('data-custom', 'value');
  });

  it('should render with aria attributes', () => {
    render(<Separator aria-label="Section separator" aria-describedby="description" data-testid="aria-separator" />);
    
    const separator = screen.getByTestId('aria-separator');
    expect(separator).toHaveAttribute('aria-label', 'Section separator');
    expect(separator).toHaveAttribute('aria-describedby', 'description');
  });

  it('should render with style attributes', () => {
    render(<Separator style={{ border: '2px solid blue' }} data-testid="style-separator" />);
    
    const separator = screen.getByTestId('style-separator');
    expect(separator).toHaveStyle({ border: '2px solid blue' });
  });

  it('should render with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} data-testid="ref-separator" />);
    
    expect(ref.current).toBeInTheDocument();
  });

  it('should render with event handlers', () => {
    const handleClick = vi.fn();
    render(<Separator onClick={handleClick} data-testid="event-separator" />);
    
    const separator = screen.getByTestId('event-separator');
    expect(separator).toBeInTheDocument();
  });

  it('should render with children', () => {
    render(<Separator data-testid="children-separator">Custom separator</Separator>);
    
    expect(screen.getByText('Custom separator')).toBeInTheDocument();
  });

  it('should render with complex children', () => {
    render(
      <Separator data-testid="complex-separator">
        <div className="separator-content">
          <span>Text</span>
          <div className="icon">•</div>
        </div>
      </Separator>
    );
    
    const separator = screen.getByTestId('complex-separator');
    expect(separator).toBeInTheDocument();
    expect(separator.querySelector('.separator-content')).toBeInTheDocument();
    expect(separator.querySelector('.icon')).toBeInTheDocument();
  });

  it('should render with conditional children', () => {
    const showContent = true;
    render(
      <Separator data-testid="conditional-separator">
        {showContent && <div>Conditional separator content</div>}
      </Separator>
    );
    
    expect(screen.getByText('Conditional separator content')).toBeInTheDocument();
  });

  it('should render multiple separators', () => {
    render(
      <div>
        <Separator data-testid="separator-1" />
        <Separator data-testid="separator-2" />
        <Separator data-testid="separator-3" />
      </div>
    );
    
    expect(screen.getByTestId('separator-1')).toBeInTheDocument();
    expect(screen.getByTestId('separator-2')).toBeInTheDocument();
    expect(screen.getByTestId('separator-3')).toBeInTheDocument();
  });

  it('should render with different orientations', () => {
    render(
      <div>
        <Separator orientation="horizontal" data-testid="horizontal-separator" />
        <Separator orientation="vertical" data-testid="vertical-separator" />
      </div>
    );
    
    const horizontal = screen.getByTestId('horizontal-separator');
    const vertical = screen.getByTestId('vertical-separator');
    
    expect(horizontal).toHaveAttribute('data-orientation', 'horizontal');
    expect(vertical).toHaveAttribute('data-orientation', 'vertical');
  });

  it('should render with different decorative states', () => {
    render(
      <div>
        <Separator decorative={true} data-testid="decorative-separator" />
        <Separator decorative={false} data-testid="non-decorative-separator" />
      </div>
    );
    
    const decorative = screen.getByTestId('decorative-separator');
    const nonDecorative = screen.getByTestId('non-decorative-separator');
    
    expect(decorative).toBeInTheDocument();
    expect(nonDecorative).toBeInTheDocument();
  });

  it('should render with different colors', () => {
    render(
      <div>
        <Separator className="bg-gray-300" data-testid="gray-separator" />
        <Separator className="bg-blue-300" data-testid="blue-separator" />
        <Separator className="bg-green-300" data-testid="green-separator" />
      </div>
    );
    
    expect(screen.getByTestId('gray-separator')).toHaveClass('bg-gray-300');
    expect(screen.getByTestId('blue-separator')).toHaveClass('bg-blue-300');
    expect(screen.getByTestId('green-separator')).toHaveClass('bg-green-300');
  });

  it('should render with different thicknesses', () => {
    render(
      <div>
        <Separator className="h-px" data-testid="thin-separator" />
        <Separator className="h-1" data-testid="medium-separator" />
        <Separator className="h-2" data-testid="thick-separator" />
      </div>
    );
    
    expect(screen.getByTestId('thin-separator')).toHaveClass('h-px');
    expect(screen.getByTestId('medium-separator')).toHaveClass('h-1');
    expect(screen.getByTestId('thick-separator')).toHaveClass('h-2');
  });

  it('should render with different widths', () => {
    render(
      <div>
        <Separator className="w-16" data-testid="narrow-separator" />
        <Separator className="w-32" data-testid="medium-separator" />
        <Separator className="w-full" data-testid="wide-separator" />
      </div>
    );
    
    expect(screen.getByTestId('narrow-separator')).toHaveClass('w-16');
    expect(screen.getByTestId('medium-separator')).toHaveClass('w-32');
    expect(screen.getByTestId('wide-separator')).toHaveClass('w-full');
  });

  it('should render with rounded corners', () => {
    render(
      <div>
        <Separator className="rounded-full" data-testid="rounded-separator" />
        <Separator className="rounded-lg" data-testid="rounded-lg-separator" />
        <Separator className="rounded-none" data-testid="no-rounded-separator" />
      </div>
    );
    
    expect(screen.getByTestId('rounded-separator')).toHaveClass('rounded-full');
    expect(screen.getByTestId('rounded-lg-separator')).toHaveClass('rounded-lg');
    expect(screen.getByTestId('no-rounded-separator')).toHaveClass('rounded-none');
  });

  it('should render with shadows', () => {
    render(
      <div>
        <Separator className="shadow-sm" data-testid="shadow-sm-separator" />
        <Separator className="shadow-md" data-testid="shadow-md-separator" />
        <Separator className="shadow-lg" data-testid="shadow-lg-separator" />
      </div>
    );
    
    expect(screen.getByTestId('shadow-sm-separator')).toHaveClass('shadow-sm');
    expect(screen.getByTestId('shadow-md-separator')).toHaveClass('shadow-md');
    expect(screen.getByTestId('shadow-lg-separator')).toHaveClass('shadow-lg');
  });

  it('should render with opacity', () => {
    render(
      <div>
        <Separator className="opacity-50" data-testid="opacity-50-separator" />
        <Separator className="opacity-75" data-testid="opacity-75-separator" />
        <Separator className="opacity-100" data-testid="opacity-100-separator" />
      </div>
    );
    
    expect(screen.getByTestId('opacity-50-separator')).toHaveClass('opacity-50');
    expect(screen.getByTestId('opacity-75-separator')).toHaveClass('opacity-75');
    expect(screen.getByTestId('opacity-100-separator')).toHaveClass('opacity-100');
  });

  it('should render with margins', () => {
    render(
      <div>
        <Separator className="my-2" data-testid="my-2-separator" />
        <Separator className="mx-4" data-testid="mx-4-separator" />
        <Separator className="m-6" data-testid="m-6-separator" />
      </div>
    );
    
    expect(screen.getByTestId('my-2-separator')).toHaveClass('my-2');
    expect(screen.getByTestId('mx-4-separator')).toHaveClass('mx-4');
    expect(screen.getByTestId('m-6-separator')).toHaveClass('m-6');
  });

  it('should render with padding', () => {
    render(
      <div>
        <Separator className="py-1" data-testid="py-1-separator" />
        <Separator className="px-3" data-testid="px-3-separator" />
        <Separator className="p-5" data-testid="p-5-separator" />
      </div>
    );
    
    expect(screen.getByTestId('py-1-separator')).toHaveClass('py-1');
    expect(screen.getByTestId('px-3-separator')).toHaveClass('px-3');
    expect(screen.getByTestId('p-5-separator')).toHaveClass('p-5');
  });

  it('should render with responsive classes', () => {
    render(<Separator className="w-full md:w-1/2 lg:w-1/3" data-testid="responsive-separator" />);
    
    const separator = screen.getByTestId('responsive-separator');
    expect(separator).toHaveClass('w-full', 'md:w-1/2', 'lg:w-1/3');
  });

  it('should render with dark mode classes', () => {
    render(<Separator className="dark:bg-gray-600" data-testid="dark-separator" />);
    
    const separator = screen.getByTestId('dark-separator');
    expect(separator).toHaveClass('dark:bg-gray-600');
  });

  it('should render with hover states', () => {
    render(<Separator className="hover:bg-gray-400" data-testid="hover-separator" />);
    
    const separator = screen.getByTestId('hover-separator');
    expect(separator).toHaveClass('hover:bg-gray-400');
  });

  it('should render with focus states', () => {
    render(<Separator className="focus:bg-gray-400" tabIndex={0} data-testid="focus-separator" />);
    
    const separator = screen.getByTestId('focus-separator');
    expect(separator).toHaveClass('focus:bg-gray-400');
  });

  it('should render with transition classes', () => {
    render(<Separator className="transition-all duration-300" data-testid="transition-separator" />);
    
    const separator = screen.getByTestId('transition-separator');
    expect(separator).toHaveClass('transition-all', 'duration-300');
  });
});
