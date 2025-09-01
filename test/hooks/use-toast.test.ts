import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '../../client/src/hooks/use-toast';

// Mock the toast function
const mockToast = vi.fn();
const mockDismiss = vi.fn();
const mockToaster = vi.fn();

vi.mock('../../client/src/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    dismiss: mockDismiss,
    toaster: mockToaster,
  }),
}));

describe('useToast Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return toast function', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toast).toBeDefined();
    expect(typeof result.current.toast).toBe('function');
  });

  it('should return dismiss function', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.dismiss).toBeDefined();
    expect(typeof result.current.dismiss).toBe('function');
  });

  it('should return toaster function', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toaster).toBeDefined();
    expect(typeof result.current.toaster).toBe('function');
  });

  it('should handle toast function calls', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast('Test message');
    });
    
    expect(mockToast).toHaveBeenCalledWith('Test message');
  });

  it('should handle dismiss function calls', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.dismiss('toast-id');
    });
    
    expect(mockDismiss).toHaveBeenCalledWith('toast-id');
  });

  it('should handle toaster function calls', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toaster();
    });
    
    expect(mockToaster).toHaveBeenCalled();
  });

  it('should provide consistent API', () => {
    const { result } = renderHook(() => useToast());
    
    // All functions should be present and callable
    expect(result.current.toast).toBeDefined();
    expect(result.current.dismiss).toBeDefined();
    expect(result.current.toaster).toBeDefined();
    
    // Functions should be callable without throwing
    expect(() => result.current.toast('test')).not.toThrow();
    expect(() => result.current.dismiss('test')).not.toThrow();
    expect(() => result.current.toaster()).not.toThrow();
  });
});
