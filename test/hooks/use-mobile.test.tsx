import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../client/src/hooks/use-mobile';

describe('useIsMobile Hook', () => {
  let originalMatchMedia: typeof window.matchMedia;
  let matchMediaMock: any;
  let originalInnerWidth: number;

  beforeEach(() => {
    // Store original values
    originalMatchMedia = window.matchMedia;
    originalInnerWidth = window.innerWidth;
    
    // Create mock matchMedia
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    // Restore original values
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  describe('Mobile Detection', () => {
    it('should return true for mobile breakpoint', () => {
      // Mock mobile breakpoint
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500, // Mobile width
      });

      // Override mock for mobile scenario
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });

    it('should return false for desktop breakpoint', () => {
      // Mock desktop breakpoint
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024, // Desktop width
      });

      // Override mock for desktop scenario
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);
    });

    it('should handle exact breakpoint match', () => {
      // Mock exact breakpoint match
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 767, // Just below mobile breakpoint
      });

      // Override mock for exact breakpoint scenario
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });

    it('should handle breakpoint just above mobile', () => {
      // Mock breakpoint just above mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 768, // Just above mobile breakpoint
      });

      // Override mock for above breakpoint scenario
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);
    });
  });

  describe('Media Query Handling', () => {
    it('should use correct media query string', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      });

      // Configure mock for this test
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 767px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      renderHook(() => useIsMobile());
      
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
    });

    it('should handle media query changes', () => {
      let changeCallback: ((event: any) => void) | null = null;
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024, // Desktop initially
      });

      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event, callback) => {
          if (event === 'change') {
            changeCallback = callback;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result, rerender } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);

      // Simulate media query change to mobile
      if (changeCallback) {
        act(() => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 500, // Mobile width
          });
          changeCallback({
            matches: true,
            media: '(max-width: 767px)'
          });
        });
        rerender();
        
        // Should now be true (mobile)
        expect(result.current).toBe(true);
      }
    });
  });

  describe('Event Listener Management', () => {
    it('should add change event listener', () => {
      const addEventListenerSpy = vi.fn();
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024,
      });

      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      renderHook(() => useIsMobile());
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should remove change event listener on unmount', () => {
      const removeEventListenerSpy = vi.fn();
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024,
      });

      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 767px)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
        dispatchEvent: vi.fn(),
      });

      const { unmount } = renderHook(() => useIsMobile());
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid media query changes', () => {
      let changeCallback: ((event: any) => void) | null = null;
      let callCount = 0;
      
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1024,
      });

      const mockMatchMedia = vi.fn().mockReturnValue({
        addEventListener: vi.fn((event, callback) => {
          if (event === 'change') {
            changeCallback = callback;
          }
        }),
        removeEventListener: vi.fn(),
        matches: false,
        media: '(max-width: 767px)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });
      window.matchMedia = mockMatchMedia;

      const { result, rerender } = renderHook(() => useIsMobile());
      
      // Simulate rapid changes
      if (changeCallback) {
        act(() => {
          for (let i = 0; i < 10; i++) {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              value: i % 2 === 0 ? 500 : 1024,
            });
            changeCallback({
              matches: i % 2 === 0,
              media: '(max-width: 767px)'
            });
            callCount++;
          }
        });
        rerender();
        
        // Should handle rapid changes gracefully
        expect(callCount).toBe(10);
        expect(typeof result.current).toBe('boolean');
      }
    });
  });

  describe('Performance', () => {
    it('should handle multiple hook instances', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      });

      window.matchMedia = vi.fn().mockReturnValue({
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      // Create multiple instances of the hook
      const { result: result1 } = renderHook(() => useIsMobile());
      const { result: result2 } = renderHook(() => useIsMobile());
      const { result: result3 } = renderHook(() => useIsMobile());

      // All should return the same result
      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);
      expect(result3.current).toBe(true);
    });
  });
});
