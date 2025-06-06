import Fastify, { FastifyInstance } from 'fastify';

/**
 * Cria uma instância de teste do Auth Service
 * @returns Promise<FastifyInstance>
 */
export async function createTestApp(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: false // Desabilita logs durante os testes
  });

  // Register Swagger (simplified for tests)
  await fastify.register(require('@fastify/swagger'), {
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
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true
  });

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

  return fastify;
}

/**
 * Helper para inicializar o app de teste
 */
export async function initTestApp(): Promise<FastifyInstance> {
  const app = await createTestApp();
  await app.ready();
  return app;
}

/**
 * Helper para fechar o app de teste
 */
export async function closeTestApp(app: FastifyInstance): Promise<void> {
  await app.close();
}
