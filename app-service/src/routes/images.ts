import { FastifyPluginAsync } from 'fastify';

// Exemplo de como criar rotas documentadas para futuras implementações
const imageRoutes: FastifyPluginAsync = async (fastify, opts) => {
  
  // Exemplo de rota para listar imagens (para implementação futura)
  fastify.get('/images', {
    schema: {
      description: 'Get all images',
      tags: ['Images'],
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
                  url: { type: 'string' },
                  alt: { type: 'string' },
                  width: { type: 'string' },
                  height: { type: 'string' },
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

  // Exemplo de rota para upload de imagem (para implementação futura)
  fastify.post('/images', {
    schema: {
      description: 'Upload new image',
      tags: ['Images'],
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: ['file'],
        properties: {
          file: { 
            type: 'string',
            format: 'binary',
            description: 'Image file to upload'
          },
          alt: { 
            type: 'string',
            description: 'Alt text for the image'
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            url: { type: 'string' },
            alt: { type: 'string' },
            width: { type: 'string' },
            height: { type: 'string' },
            userId: { type: 'string' },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Implementar lógica de upload
    reply.status(501).send({ error: 'Not implemented yet' });
  });

};

export default imageRoutes;
