import { z } from 'zod';

// Environment variable schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL').optional(),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters').default('dev-session-secret-change-in-production-very-long-key-for-security'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default('dev-jwt-secret-change-in-production-very-long-key-for-security'),
  OPENAI_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5000'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  MAX_FILE_SIZE: z.string().transform(Number).default('10485760'),
  UPLOAD_DIR: z.string().default('./uploads'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  AZURE_STORAGE_CONNECTION_STRING: z.string().optional(),
  AZURE_STORAGE_CONTAINER_NAME: z.string().optional(),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
};

// Export validated configuration
export const config = parseEnv();

// Helper functions
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';

// Parse allowed origins
export const allowedOrigins = config.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());

// Validate configuration on import
if (isProduction) {
  if (!config.SESSION_SECRET || config.SESSION_SECRET === 'dev-session-secret-change-in-production') {
    throw new Error('SESSION_SECRET must be set to a secure value in production');
  }
  if (!config.JWT_SECRET || config.JWT_SECRET === 'dev-jwt-secret-change-in-production') {
    throw new Error('JWT_SECRET must be set to a secure value in production');
  }
}

