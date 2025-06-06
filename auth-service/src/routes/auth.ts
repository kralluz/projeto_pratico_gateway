import { FastifyPluginAsync } from 'fastify';

// Exemplo de como criar rotas documentadas para futuras implementações
const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
  
  // Exemplo de rota de login (para implementação futura)
  fastify.post('/login', {
    schema: {
      description: 'Authenticate user',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Implementar lógica de autenticação
    reply.status(501).send({ error: 'Not implemented yet' });
  });

  // Exemplo de rota de registro (para implementação futura)
  fastify.post('/register', {
    schema: {
      description: 'Register new user',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          name: { type: 'string', minLength: 2 }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            userId: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Implementar lógica de registro
    reply.status(501).send({ error: 'Not implemented yet' });
  });

};

export default authRoutes;
