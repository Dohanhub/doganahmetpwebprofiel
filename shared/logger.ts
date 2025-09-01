import { config } from './config.js';

// Log levels
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// Log level hierarchy
const logLevels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Current log level
const currentLogLevel = logLevels[config.LOG_LEVEL];

// Log formatting function
function formatLog(level: LogLevel, message: string, meta?: any): string {
  const timestamp = new Date().toISOString();
  const levelUpper = level.toUpperCase().padEnd(5);
  
  if (meta) {
    return `[${timestamp}] ${levelUpper} ${message} ${JSON.stringify(meta)}`;
  }
  
  return `[${timestamp}] ${levelUpper} ${message}`;
}

// Logger class
class Logger {
  private shouldLog(level: LogLevel): boolean {
    return logLevels[level] <= currentLogLevel;
  }

  error(message: string, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(formatLog('error', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(formatLog('warn', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.info(formatLog('info', message, meta));
    }
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(formatLog('debug', message, meta));
    }
  }

  // Special logging for API requests
  api(method: string, path: string, statusCode: number, duration: number, responseData?: any): void {
    if (this.shouldLog('info')) {
      const logMessage = `${method} ${path} ${statusCode} in ${duration}ms`;
      this.info(logMessage, { responseData });
    }
  }

  // Database operation logging
  db(operation: string, table: string, duration: number, meta?: any): void {
    if (this.shouldLog('debug')) {
      const logMessage = `DB ${operation} on ${table} in ${duration}ms`;
      this.debug(logMessage, meta);
    }
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Convenience functions for common logging patterns
export const log = {
  error: (message: string, meta?: any) => logger.error(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  debug: (message: string, meta?: any) => logger.debug(message, meta),
  api: (method: string, path: string, statusCode: number, duration: number, responseData?: any) => 
    logger.api(method, path, statusCode, duration, responseData),
  db: (operation: string, table: string, duration: number, meta?: any) => 
    logger.db(operation, table, duration, meta),
};
