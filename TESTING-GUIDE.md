# Testing Guide for DoganAhmet Project

## Overview
This project uses **Vitest** as the primary testing framework with **React Testing Library** for component testing and **Supertest** for API testing.

## Testing Structure

```
test/
├── setup.ts              # Main test setup
├── api-setup.ts          # API test setup
├── client-setup.ts       # Client test setup
├── api/                  # API endpoint tests
│   └── contact.test.ts   # Contact API tests
├── components/           # React component tests
│   └── contact-form.test.tsx
└── utils/                # Test utilities
    └── test-utils.tsx    # Custom render and mock utilities
```

## Available Test Scripts

### Run All Tests
```bash
npm test
```

### Development Testing (Watch Mode)
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Specific Test Suites
```bash
# API tests only
npm run test:api

# Client tests only
npm run test:client
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## Test Configuration

### Main Configuration (`vitest.config.ts`)
- **Environment**: jsdom for React components
- **Coverage**: V8 provider with HTML, JSON, and text reports
- **Setup**: Global test setup file

### API Configuration (`vitest.api.config.ts`)
- **Environment**: Node.js
- **Focus**: Server-side code and API endpoints
- **Excludes**: Client-side code

### Client Configuration (`vitest.client.config.ts`)
- **Environment**: jsdom
- **Focus**: React components and client-side logic
- **Excludes**: Server-side code

## Writing Tests

### API Tests
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../../server/routes';

describe('API Endpoint', () => {
  let app: express.Application;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  it('should handle request correctly', async () => {
    const response = await request(app)
      .post('/api/endpoint')
      .send({ data: 'test' })
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});
```

### Component Tests
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { ComponentName } from '../../client/src/components/component-name';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Test Utilities

### Custom Render Function
The `test-utils.tsx` provides a custom render function that includes:
- React Query provider
- Custom test data generators
- Mock API response helpers

### Mock Data
```typescript
import { createMockContact, createMockUser } from '../utils/test-utils';

const mockContact = createMockContact({ firstName: 'Custom Name' });
const mockUser = createMockUser({ username: 'customuser' });
```

## Coverage Configuration

Coverage reports exclude:
- `node_modules/`
- `dist/` (build output)
- Configuration files
- Test files themselves

Coverage is generated in multiple formats:
- **Text**: Console output
- **JSON**: Machine-readable format
- **HTML**: Browser-viewable report

## Environment Variables

Test environment uses:
- **NODE_ENV**: `test`
- **PORT**: `5001` (different from dev/prod)
- **DATABASE_URL**: Test database connection
- **LOG_LEVEL**: `error` (minimal logging)

## Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert

### 2. Mocking
- Mock external dependencies
- Use consistent mock data
- Avoid testing implementation details

### 3. Assertions
- Test behavior, not implementation
- Use specific assertions
- Test error conditions

### 4. Setup/Teardown
- Use beforeEach/afterEach for common setup
- Clean up test data
- Reset mocks between tests

## Running Tests Before Deployment

### Pre-deployment Checklist
1. **Run all tests**: `npm test`
2. **Check coverage**: `npm run test:coverage`
3. **Type checking**: `npm run type-check`
4. **Linting**: `npm run lint`
5. **Build verification**: `npm run build`

### CI/CD Integration
```yaml
# Example GitHub Actions step
- name: Run Tests
  run: |
    npm ci
    npm run test:coverage
    npm run type-check
    npm run lint
    npm run build
```

## Troubleshooting

### Common Issues

1. **Test Environment Not Loading**
   - Check `test.env` file exists
   - Verify environment variables are set

2. **Component Tests Failing**
   - Ensure jsdom environment is configured
   - Check for missing browser APIs

3. **API Tests Failing**
   - Verify server routes are properly mocked
   - Check for database connection issues

4. **Coverage Not Generating**
   - Ensure `@vitest/coverage-v8` is installed
   - Check coverage configuration in vitest config

### Debug Mode
Run tests with verbose output:
```bash
npm run test -- --reporter=verbose
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
