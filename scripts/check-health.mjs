// Simple script to start the compiled server and check /health
process.env.NODE_ENV = 'production';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'prod_session_secret_abcdefghijklmnopqrstuvwxyz0123456789';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'prod_jwt_secret_abcdefghijklmnopqrstuvwxyz0123456789';

// Dynamically import server (starts listening)
import('../dist/server/index.js').catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Wait briefly for server to start, then request /health
const http = await import('node:http');

setTimeout(() => {
  const req = http.get('http://127.0.0.1:5000/health', (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      console.log('HEALTH STATUS:', res.statusCode);
      console.log('HEALTH BODY:', data);
      process.exit(0);
    });
  });
  req.on('error', (e) => {
    console.error('HEALTH REQUEST ERROR:', e.message);
    process.exit(1);
  });
}, 800);
