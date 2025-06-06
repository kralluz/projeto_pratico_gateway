import { FastifyPluginAsync } from 'fastify';

// Exemplo de como criar rotas documentadas para futuras implementações
const adsenseRoutes: FastifyPluginAsync = async (fastify, opts) => {
  
  // Exemplo de rota para listar adsense (para implementação futura)
  fastify.get('/adsense', {
    schema: {
      description: 'Get all adsense entries',
      tags: ['Adsense'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  userId: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                limit: { type: 'integer' },
                total: { type: 'integer' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Implementar lógica de listagem
    reply.status(501).send({ error: 'Not implemented yet' });
  });

  // Exemplo de rota para criar adsense (para implementação futura)
  fastify.post('/adsense', {
    schema: {
      description: 'Create new adsense entry',
      tags: ['Adsense'],
      body: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            userId: { type: 'string' },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Implementar lógica de criação
    reply.status(501).send({ error: 'Not implemented yet' });
  });

};

export default adsenseRoutes;
