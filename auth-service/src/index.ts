import Fastify from 'fastify';
import authRoutes from './routes/auth';

const fastify = Fastify({
  logger: true
});

// Register Swagger
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'Auth Service API',
      description: 'Serviço de autenticação e autorização',
      version: '1.0.0'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Auth', description: 'Authentication endpoints' }
    ]
  }
});

// Register Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true
});

// Register routes
fastify.register(authRoutes, { prefix: '/api' });

// Health check route
fastify.get('/health', {
  schema: {
    description: 'Health check endpoint',
    tags: ['Health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          service: { type: 'string' },
          timestamp: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  return { 
    status: 'ok', 
    service: 'auth-service',
    timestamp: new Date().toISOString()
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Auth service running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
