import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/api-setup.ts'],
    include: [
      'test/api/**/*.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        'test/components/',
        'test/pages/',
        'test/hooks/',
        'test/lib/',
      'client/',
      'attached_assets/'
      ]
    }
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
