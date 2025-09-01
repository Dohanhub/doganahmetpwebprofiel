import { describe, it, expect } from 'vitest';

describe('Simple Test Suite', () => {
  it('should pass basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const message = 'Hello, Testing!';
    expect(message).toContain('Testing');
    expect(message.length).toBeGreaterThan(10);
  });

  it('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
    expect(numbers.reduce((a, b) => a + b, 0)).toBe(15);
  });

  it('should work with objects', () => {
    const user = { name: 'John', age: 30, active: true };
    expect(user).toHaveProperty('name');
    expect(user.age).toBe(30);
    expect(user.active).toBeTruthy();
  });
});
