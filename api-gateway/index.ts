// API Gateway - Centralized entry point for all microservices
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import proxy from '@fastify/http-proxy';

const app: FastifyInstance = Fastify({ 
  logger: true 
});

// Health check endpoint
app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    status: 'OK', 
    service: 'API Gateway', 
    timestamp: new Date().toISOString() 
  };
});

// Proxy for auth-service
app.register(proxy, {
  upstream: 'http://localhost:3001',
  prefix: '/auth',
  rewritePrefix: '/auth',
  http2: false,
});

// Proxy for app-service (users, etc.)
app.register(proxy, {
  upstream: 'http://localhost:3002',
  prefix: '/app',
  rewritePrefix: '/app',
  http2: false,
});

// Error handler
app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
  app.log.error(error);
  reply.status(500).send({ 
    error: 'Internal Server Error',
    message: 'Something went wrong in the API Gateway'
  });
});

// Start server
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    app.log.info('🚀 API Gateway is running on port 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
