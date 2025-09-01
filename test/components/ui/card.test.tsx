import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../client/src/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render with default props', () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText('Card content').closest('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
    });

    it('should render with custom className', () => {
      render(<Card className="custom-card">Custom Card</Card>);
      const card = screen.getByText('Custom Card').closest('div');
      expect(card).toHaveClass('custom-card');
    });

    it('should forward ref correctly', () => {
      const ref = { current: null };
      render(<Card ref={ref}>Ref Card</Card>);
      expect(ref.current).toBeDefined();
    });
  });

  describe('CardHeader', () => {
    it('should render with default props', () => {
      render(<CardHeader>Header content</CardHeader>);
      const header = screen.getByText('Header content').closest('div');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('should render with custom className', () => {
      render(<CardHeader className="custom-header">Custom Header</CardHeader>);
      const header = screen.getByText('Custom Header').closest('div');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('should render with default props', () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText('Card Title').closest('div');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    });

    it('should render with custom className', () => {
      render(<CardTitle className="custom-title">Custom Title</CardTitle>);
      const title = screen.getByText('Custom Title').closest('div');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('CardDescription', () => {
    it('should render with default props', () => {
      render(<CardDescription>Card Description</CardDescription>);
      const description = screen.getByText('Card Description').closest('div');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('should render with custom className', () => {
      render(<CardDescription className="custom-description">Custom Description</CardDescription>);
      const description = screen.getByText('Custom Description').closest('div');
      expect(description).toHaveClass('custom-description');
    });
  });

  describe('CardContent', () => {
    it('should render with default props', () => {
      render(<CardContent>Card content</CardContent>);
      const content = screen.getByText('Card content').closest('div');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('should render with custom className', () => {
      render(<CardContent className="custom-content">Custom Content</CardContent>);
      const content = screen.getByText('Custom Content').closest('div');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    it('should render with default props', () => {
      render(<CardFooter>Footer content</CardFooter>);
      const footer = screen.getByText('Footer content').closest('div');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });

    it('should render with custom className', () => {
      render(<CardFooter className="custom-footer">Custom Footer</CardFooter>);
      const footer = screen.getByText('Custom Footer').closest('div');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Card Composition', () => {
    it('should render complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('should handle nested content correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Nested Title</CardTitle>
          </CardHeader>
          <CardContent>
            <div data-testid="nested-content">
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
          </CardContent>
        </Card>
      );

      const nestedContent = screen.getByTestId('nested-content');
      expect(nestedContent).toBeInTheDocument();
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('should maintain proper spacing between sections', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Spacing Test</CardTitle>
          </CardHeader>
          <CardContent>Content with spacing</CardContent>
          <CardFooter>Footer with spacing</CardFooter>
        </Card>
      );

      // Find the header div that contains the title
      const title = screen.getByText('Spacing Test');
      const header = title.parentElement;
      const content = screen.getByText('Content with spacing').closest('div');
      const footer = screen.getByText('Footer with spacing').closest('div');

      expect(header).toHaveClass('p-6');
      expect(content).toHaveClass('p-6', 'pt-0');
      expect(footer).toHaveClass('p-6', 'pt-0');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Title</CardTitle>
          </CardHeader>
          <CardContent>Accessible content</CardContent>
        </Card>
      );

      // Card should be a div (default semantic element)
      const card = screen.getByText('Accessible content').closest('div');
      expect(card).toBeInTheDocument();
    });

    it('should handle custom as prop for semantic elements', () => {
      render(
        <Card asChild>
          <article>
            <CardHeader>
              <CardTitle>Article Title</CardTitle>
            </CardHeader>
            <CardContent>Article content</CardContent>
          </article>
        </Card>
      );

      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      expect(article).toHaveTextContent('Article Title');
      expect(article).toHaveTextContent('Article content');
    });
  });
});
