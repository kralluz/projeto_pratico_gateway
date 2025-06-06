import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// Health check route
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'ok', 
    service: 'api-gateway',
    timestamp: new Date().toISOString()
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('API Gateway running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
