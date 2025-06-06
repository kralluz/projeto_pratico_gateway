import Fastify, { FastifyInstance } from 'fastify';

/**
 * Cria uma instância de teste do API Gateway
 * @returns Promise<FastifyInstance>
 */
export async function createTestApp(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: false // Desabilita logs durante os testes
  });

  // Health check route
  fastify.get('/health', async (request, reply) => {
    return { 
      status: 'ok', 
      service: 'api-gateway',
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
