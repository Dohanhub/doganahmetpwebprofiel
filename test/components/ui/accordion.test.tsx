import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../client/src/components/ui/accordion';

describe('Accordion Component', () => {
  it('should render accordion with items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('should expand and collapse accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Section 1');
    expect(screen.queryByText('Content 1')).not.toBeVisible();

    fireEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeVisible();

    fireEvent.click(trigger);
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('should handle multiple accordion type', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText('Section 1');
    const trigger2 = screen.getByText('Section 2');

    fireEvent.click(trigger1);
    fireEvent.click(trigger2);

    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('should handle disabled accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled Section</AccordionTrigger>
          <AccordionContent>Disabled Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Disabled Section');
    expect(trigger).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const accordion = screen.getByRole('region');
    expect(accordion).toHaveClass('custom-accordion');
  });
});
