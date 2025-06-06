import Fastify from 'fastify';
import adsenseRoutes from './routes/adsense';
import imageRoutes from './routes/images';

const fastify = Fastify({
  logger: true
});

// Register Swagger
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'App Service API',
      description: 'Serviço principal de aplicação para gerenciamento de Adsense e Imagens',
      version: '1.0.0'
    },
    host: 'localhost:3002',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Adsense', description: 'Adsense management endpoints' },
      { name: 'Images', description: 'Image management endpoints' }
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
fastify.register(adsenseRoutes, { prefix: '/api' });
fastify.register(imageRoutes, { prefix: '/api' });

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
    service: 'app-service',
    timestamp: new Date().toISOString()
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3002, host: '0.0.0.0' });
    console.log('App service running on http://localhost:3002');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
