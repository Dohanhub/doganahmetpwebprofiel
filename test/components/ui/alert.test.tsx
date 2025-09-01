import { render, screen } from '@testing-library/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { CircleAlert, AlertCircle } from 'lucide-react';

describe('Alert Component', () => {
  it('should render basic alert', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>
    );

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert description')).toBeInTheDocument();
  });

  it('should apply destructive variant styles', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-destructive/50');
  });

  it('should render with icon', () => {
    render(
      <Alert>
        <CircleAlert className="h-4 w-4" data-testid="circle-alert-icon" />
        <AlertTitle>Icon Alert</AlertTitle>
        <AlertDescription>With icon</AlertDescription>
      </Alert>
    );

    const icon = screen.getByTestId('circle-alert-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle different icon types', () => {
    const { rerender } = render(
      <Alert>
        <CircleAlert className="h-4 w-4" data-testid="circle-alert-icon" />
        <AlertTitle>Circle Icon</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('circle-alert-icon')).toBeInTheDocument();

    rerender(
      <Alert>
        <AlertCircle className="h-4 w-4" data-testid="alert-circle-icon" />
        <AlertTitle>Alert Circle Icon</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
  });
});
