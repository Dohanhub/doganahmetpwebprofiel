import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';

describe('AlertDialog Component', () => {
  it('should open and close dialog', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
            <AlertDialogDescription>Dialog description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByText('Open Dialog');
    fireEvent.click(trigger);

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog description')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    });
  });

  it('should handle custom className on content', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent className="custom-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByText('Open Dialog');
    fireEvent.click(trigger);

    const content = screen.getByRole('alertdialog');
    expect(content).toHaveClass('custom-dialog');
  });
});
