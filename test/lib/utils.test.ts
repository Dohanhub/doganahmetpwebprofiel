import { describe, it, expect } from 'vitest';
import { cn } from '../../client/src/lib/utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('should combine class names correctly', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'unused-class');
      expect(result).toBe('base-class conditional-class');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class');
      expect(result).toBe('base-class valid-class');
    });

    it('should handle empty strings', () => {
      const result = cn('base-class', '', 'valid-class', '');
      expect(result).toBe('base-class valid-class');
    });

    it('should handle arrays of classes', () => {
      const result = cn('base-class', ['array-class1', 'array-class2'], 'single-class');
      expect(result).toBe('base-class array-class1 array-class2 single-class');
    });

    it('should handle nested arrays', () => {
      const result = cn('base', [['nested1', 'nested2'], 'middle'], 'end');
      expect(result).toBe('base nested1 nested2 middle end');
    });

    it('should handle objects with boolean values', () => {
      const result = cn('base', {
        'conditional-true': true,
        'conditional-false': false,
        'conditional-undefined': undefined,
        'conditional-null': null
      });
      expect(result).toBe('base conditional-true');
    });

    it('should handle mixed input types', () => {
      const result = cn(
        'base-class',
        'string-class',
        ['array-class1', 'array-class2'],
        {
          'obj-true': true,
          'obj-false': false
        },
        undefined,
        null,
        ''
      );
      expect(result).toBe('base-class string-class array-class1 array-class2 obj-true');
    });

    it('should handle no input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('should handle complex conditional logic', () => {
      const isActive = true;
      const isDisabled = false;
      const size = 'large';
      
      const result = cn(
        'button',
        'base-button',
        {
          'button--active': isActive,
          'button--disabled': isDisabled,
          'button--small': size === 'small',
          'button--large': size === 'large'
        }
      );
      
      expect(result).toBe('button base-button button--active button--large');
    });

    it('should handle falsy values correctly', () => {
      const result = cn(
        'base',
        0,
        false,
        null,
        undefined,
        NaN,
        ''
      );
      expect(result).toBe('base');
    });

    it('should preserve order of classes', () => {
      const result = cn('first', 'second', 'third');
      expect(result).toBe('first second third');
    });

    it('should handle whitespace in class names', () => {
      const result = cn('  class1  ', '  class2  ', '  class3  ');
      // The cn function trims whitespace, so we expect trimmed results
      expect(result).toBe('class1 class2 class3');
    });
  });
});
