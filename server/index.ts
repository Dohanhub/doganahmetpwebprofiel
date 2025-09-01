import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { setupVite, serveStatic } from "./vite.js";
import routes from "./routes.js";
import { config, allowedOrigins } from "../shared/config.js";
import { log } from "../shared/logger.js";
import { checkDatabaseConnection, closeDatabaseConnection } from "./db.js";

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log.api(req.method, path, res.statusCode, duration, capturedJsonResponse);
    }
  });

  next();
});

(async () => {
  // Use the routes
  app.use('/api', routes);

  // Health check endpoint for Azure
  app.get('/health', async (_req, res) => {
    try {
      const dbHealthy = await checkDatabaseConnection();
      res.status(200).json({ 
        status: dbHealthy ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        database: dbHealthy ? 'connected' : 'disconnected'
      });
    } catch (error) {
      res.status(503).json({ 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error('Error:', err);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, undefined as any);
  } else {
    serveStatic(app);
  }

  // Start server on configured port and bind to 0.0.0.0 for Replit
  const httpServer = app.listen(config.PORT, '0.0.0.0', () => {
    log.info(`Server running on port ${config.PORT} in ${config.NODE_ENV} mode`);
  });

  // Graceful shutdown for Azure
  process.on('SIGTERM', async () => {
    log.info('SIGTERM received, shutting down gracefully');
    await closeDatabaseConnection();
    httpServer.close(() => {
      log.info('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    log.info('SIGINT received, shutting down gracefully');
    await closeDatabaseConnection();
    httpServer.close(() => {
      log.info('Process terminated');
      process.exit(0);
    });
  });
})();
