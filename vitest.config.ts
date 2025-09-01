import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'client/src/**/*.{ts,tsx}',
        'server/**/*.{ts,tsx}',
        'shared/**/*.{ts,tsx}'
      ],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        'test/',
        'attached_assets/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },
});
