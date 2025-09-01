import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from '../../../client/src/components/ui/avatar';

describe('Avatar Component', () => {
  it('should render avatar with image', () => {
    render(
      <Avatar>
        <AvatarImage src="/test-image.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const image = screen.getByAltText('Test User');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render fallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="/invalid-image.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('should render only fallback when no image provided', () => {
    render(
      <Avatar>
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('should render only image when no fallback provided', () => {
    render(
      <Avatar>
        <AvatarImage src="/test-image.jpg" alt="Test User" />
      </Avatar>
    );

    const image = screen.getByAltText('Test User');
    expect(image).toBeInTheDocument();
  });

  it('should apply custom className to avatar', () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('TU').closest('div');
    expect(avatar).toHaveClass('custom-avatar');
  });

  it('should apply custom className to fallback', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback">TU</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('TU');
    expect(fallback).toHaveClass('custom-fallback');
  });

  it('should apply custom className to image', () => {
    render(
      <Avatar>
        <AvatarImage src="/test-image.jpg" alt="Test User" className="custom-image" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const image = screen.getByAltText('Test User');
    expect(image).toHaveClass('custom-image');
  });

  it('should handle empty fallback', () => {
    render(
      <Avatar>
        <AvatarFallback></AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toBeInTheDocument();
  });

  it('should handle image with no alt text', () => {
    render(
      <Avatar>
        <AvatarImage src="/test-image.jpg" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveAttribute('alt');
  });

  it('should handle multiple avatars', () => {
    render(
      <div>
        <Avatar>
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    );

    expect(screen.getByText('TU')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should handle avatar with long fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>Very Long Name</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('Very Long Name')).toBeInTheDocument();
  });

  it('should handle avatar with special characters in fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>@#$%</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('@#$%')).toBeInTheDocument();
  });
});
