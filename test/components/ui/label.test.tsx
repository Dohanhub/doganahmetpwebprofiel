import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Label } from '../../../client/src/components/ui/label';

describe('Label Component', () => {
  it('should render label with text content', () => {
    render(<Label>Username</Label>);
    
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('should render label with custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
  });

  it('should render label with htmlFor attribute', () => {
    render(<Label htmlFor="username-input">Username</Label>);
    
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-input');
  });

  it('should render label with custom id', () => {
    render(<Label id="custom-label-id">Custom ID Label</Label>);
    
    const label = screen.getByText('Custom ID Label');
    expect(label).toHaveAttribute('id', 'custom-label-id');
  });

  it('should render label with aria-label', () => {
    render(<Label aria-label="Screen reader label">Visible Label</Label>);
    
    const label = screen.getByText('Visible Label');
    expect(label).toHaveAttribute('aria-label', 'Screen reader label');
  });

  it('should render label with aria-describedby', () => {
    render(<Label aria-describedby="help-text">Label with Help</Label>);
    
    const label = screen.getByText('Label with Help');
    expect(label).toHaveAttribute('aria-describedby', 'help-text');
  });

  it('should render label with aria-required', () => {
    render(<Label aria-required="true">Required Label</Label>);
    
    const label = screen.getByText('Required Label');
    expect(label).toHaveAttribute('aria-required', 'true');
  });

  it('should render label with data attributes', () => {
    render(
      <Label data-testid="test-label" data-custom="value">
        Data Label
      </Label>
    );
    
    const label = screen.getByTestId('test-label');
    expect(label).toHaveAttribute('data-custom', 'value');
  });

  it('should render label with custom styles', () => {
    render(
      <Label style={{ color: 'red', fontWeight: 'bold' }}>
        Styled Label
      </Label>
    );
    
    const label = screen.getByText('Styled Label');
    expect(label).toHaveStyle('color: red');
    expect(label).toHaveStyle('font-weight: bold');
  });

  it('should render label with children elements', () => {
    render(
      <Label>
        <span>Icon</span>
        <strong>Bold Text</strong>
        Regular Text
      </Label>
    );
    
    const label = screen.getByText('Regular Text');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Bold Text')).toBeInTheDocument();
  });

  it('should render label with complex content', () => {
    render(
      <Label>
        <div>
          <span>First</span>
          <span>Second</span>
        </div>
        <p>Paragraph</p>
      </Label>
    );
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('should handle empty label content', () => {
    render(<Label></Label>);
    
    const label = screen.getByRole('generic');
    expect(label).toBeInTheDocument();
  });

  it('should handle label with only whitespace', () => {
    render(<Label>   </Label>);
    
    const label = screen.getByRole('generic');
    expect(label).toBeInTheDocument();
  });

  it('should handle label with numeric content', () => {
    render(<Label>123</Label>);
    
    const label = screen.getByText('123');
    expect(label).toBeInTheDocument();
  });

  it('should handle label with special characters', () => {
    render(<Label>@#$%^&*()</Label>);
    
    const label = screen.getByText('@#$%^&*()');
    expect(label).toBeInTheDocument();
  });

  it('should handle label with HTML entities', () => {
    render(<Label>&lt;script&gt;alert("XSS")&lt;/script&gt;</Label>);
    
    const label = screen.getByText('<script>alert("XSS")</script>');
    expect(label).toBeInTheDocument();
  });

  it('should handle label with long text', () => {
    const longText = 'This is a very long label text that exceeds normal length and should be handled properly by the component';
    render(<Label>{longText}</Label>);
    
    const label = screen.getByText(longText);
    expect(label).toBeInTheDocument();
  });

  it('should handle multiple labels', () => {
    render(
      <div>
        <Label>First Label</Label>
        <Label>Second Label</Label>
        <Label>Third Label</Label>
      </div>
    );
    
    expect(screen.getByText('First Label')).toBeInTheDocument();
    expect(screen.getByText('Second Label')).toBeInTheDocument();
    expect(screen.getByText('Third Label')).toBeInTheDocument();
  });

  it('should handle label with form control', () => {
    render(
      <div>
        <Label htmlFor="email">Email Address</Label>
        <input id="email" type="email" />
      </div>
    );
    
    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('should handle label with checkbox', () => {
    render(
      <div>
        <Label htmlFor="agree">
          <input id="agree" type="checkbox" />
          I agree to the terms
        </Label>
      </div>
    );
    
    const label = screen.getByText('I agree to the terms');
    const checkbox = screen.getByRole('checkbox');
    
    expect(label).toHaveAttribute('for', 'agree');
    expect(checkbox).toHaveAttribute('id', 'agree');
  });

  it('should handle label with radio button', () => {
    render(
      <div>
        <Label htmlFor="male">
          <input id="male" type="radio" name="gender" value="male" />
          Male
        </Label>
        <Label htmlFor="female">
          <input id="female" type="radio" name="gender" value="female" />
          Female
        </Label>
      </div>
    );
    
    expect(screen.getByText('Male')).toHaveAttribute('for', 'male');
    expect(screen.getByText('Female')).toHaveAttribute('for', 'female');
  });

  it('should handle label with select dropdown', () => {
    render(
      <div>
        <Label htmlFor="country">Country</Label>
        <select id="country">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </select>
      </div>
    );
    
    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');
    
    expect(label).toHaveAttribute('for', 'country');
    expect(select).toHaveAttribute('id', 'country');
  });

  it('should handle label with textarea', () => {
    render(
      <div>
        <Label htmlFor="message">Message</Label>
        <textarea id="message" />
      </div>
    );
    
    const label = screen.getByText('Message');
    const textarea = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'message');
    expect(textarea).toHaveAttribute('id', 'message');
  });

  it('should handle label with required indicator', () => {
    render(
      <Label>
        Username
        <span aria-label="required" className="required-indicator">*</span>
      </Label>
    );
    
    const label = screen.getByText('Username');
    const requiredIndicator = screen.getByText('*');
    
    expect(label).toBeInTheDocument();
    expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
  });

  it('should handle label with help text', () => {
    render(
      <div>
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" />
        <div id="password-help">Must be at least 8 characters</div>
      </div>
    );
    
    const label = screen.getByText('Password');
    const helpText = screen.getByText('Must be at least 8 characters');
    
    expect(label).toHaveAttribute('for', 'password');
    expect(helpText).toHaveAttribute('id', 'password-help');
  });

  it('should handle label with error state', () => {
    render(
      <div>
        <Label htmlFor="email" aria-invalid="true">
          Email Address
        </Label>
        <input id="email" type="email" aria-invalid="true" />
        <div role="alert">Invalid email format</div>
      </div>
    );
    
    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByRole('alert');
    
    expect(label).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(errorMessage).toHaveTextContent('Invalid email format');
  });

  it('should handle label with success state', () => {
    render(
      <div>
        <Label htmlFor="username" aria-invalid="false">
          Username
        </Label>
        <input id="username" aria-invalid="false" />
        <div role="status">Username is available</div>
      </div>
    );
    
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    const statusMessage = screen.getByRole('status');
    
    expect(label).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(statusMessage).toHaveTextContent('Username is available');
  });

  it('should handle label with custom attributes', () => {
    render(
      <Label
        htmlFor="custom-input"
        id="custom-label"
        className="custom-label-class"
        style={{ color: 'blue' }}
        data-testid="custom-label"
        aria-label="Custom accessible label"
        aria-describedby="custom-help"
        aria-required="true"
        tabIndex={0}
      >
        Custom Label
      </Label>
    );
    
    const label = screen.getByTestId('custom-label');
    
    expect(label).toHaveAttribute('for', 'custom-input');
    expect(label).toHaveAttribute('id', 'custom-label');
    expect(label).toHaveClass('custom-label-class');
    expect(label).toHaveStyle('color: blue');
    expect(label).toHaveAttribute('aria-label', 'Custom accessible label');
    expect(label).toHaveAttribute('aria-describedby', 'custom-help');
    expect(label).toHaveAttribute('aria-required', 'true');
    expect(label).toHaveAttribute('tabIndex', '0');
  });
});
