import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Badge } from '../../../client/src/components/ui/badge';

describe('Badge Component', () => {
  it('should render badge with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex');
  });

  it('should render badge with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
  });

  it('should render badge with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive');
  });

  it('should render badge with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border');
  });

  it('should apply custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('should handle empty content', () => {
    render(<Badge></Badge>);
    
    const badge = screen.getByRole('generic');
    expect(badge).toBeInTheDocument();
  });

  it('should handle numeric content', () => {
    render(<Badge>42</Badge>);
    
    const badge = screen.getByText('42');
    expect(badge).toBeInTheDocument();
  });

  it('should handle special characters', () => {
    render(<Badge>@#$%</Badge>);
    
    const badge = screen.getByText('@#$%');
    expect(badge).toBeInTheDocument();
  });

  it('should handle long text', () => {
    render(<Badge>Very Long Badge Text That Exceeds Normal Length</Badge>);
    
    const badge = screen.getByText('Very Long Badge Text That Exceeds Normal Length');
    expect(badge).toBeInTheDocument();
  });

  it('should handle multiple badges', () => {
    render(
      <div>
        <Badge>Badge 1</Badge>
        <Badge variant="secondary">Badge 2</Badge>
        <Badge variant="destructive">Badge 3</Badge>
      </div>
    );
    
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.getByText('Badge 3')).toBeInTheDocument();
  });

  it('should handle badge with icon', () => {
    render(
      <Badge>
        <span>🚀</span> Badge with Icon
      </Badge>
    );
    
    const badge = screen.getByText('🚀 Badge with Icon');
    expect(badge).toBeInTheDocument();
  });

  it('should handle badge with HTML content', () => {
    render(
      <Badge>
        <strong>Bold</strong> Badge
      </Badge>
    );
    
    const badge = screen.getByText('Bold Badge');
    expect(badge).toBeInTheDocument();
    expect(screen.getByText('Bold')).toHaveStyle('font-weight: bold');
  });

  it('should handle all variant combinations', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'];
    
    variants.forEach(variant => {
      const { unmount } = render(
        <Badge variant={variant as any}>Badge {variant}</Badge>
      );
      
      const badge = screen.getByText(`Badge ${variant}`);
      expect(badge).toBeInTheDocument();
      
      unmount();
    });
  });

  it('should handle badge with custom styles', () => {
    render(
      <Badge style={{ backgroundColor: 'red', color: 'white' }}>
        Styled Badge
      </Badge>
    );
    
    const badge = screen.getByText('Styled Badge');
    expect(badge).toHaveStyle('background-color: red');
    expect(badge).toHaveStyle('color: white');
  });
});
