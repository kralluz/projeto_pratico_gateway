// Exemplo de como criar um controlador com documentação Swagger completa
// auth-service/src/controllers/AuthController.ts

import { FastifyRequest, FastifyReply } from 'fastify';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class AuthController {
  
  // Schema para documentação da rota de login
  static loginSchema = {
    description: 'Authenticate user with email and password',
    tags: ['Auth'],
    summary: 'User Login',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { 
          type: 'string', 
          format: 'email',
          description: 'User email address',
          example: 'user@example.com'
        },
        password: { 
          type: 'string', 
          minLength: 6,
          description: 'User password (minimum 6 characters)',
          example: 'mypassword123'
        }
      }
    },
    response: {
      200: {
        description: 'Successful authentication',
        type: 'object',
        properties: {
          token: { 
            type: 'string',
            description: 'JWT authentication token',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          user: {
            type: 'object',
            properties: {
              id: { 
                type: 'string',
                description: 'User unique identifier',
                example: '12345'
              },
              email: { 
                type: 'string',
                description: 'User email address',
                example: 'user@example.com'
              },
              name: { 
                type: 'string',
                description: 'User full name',
                example: 'John Doe'
              }
            }
          }
        }
      },
      401: {
        description: 'Authentication failed',
        type: 'object',
        properties: {
          error: { 
            type: 'string',
            description: 'Error message',
            example: 'Invalid credentials'
          }
        }
      },
      400: {
        description: 'Bad request - validation error',
        type: 'object',
        properties: {
          error: { 
            type: 'string',
            description: 'Validation error message',
            example: 'Invalid email format'
          }
        }
      }
    }
  };

  static async login(request: FastifyRequest<{ Body: LoginRequest }>, reply: FastifyReply) {
    const { email, password } = request.body;
    
    // TODO: Implementar validação com banco de dados
    // TODO: Verificar senha hash
    // TODO: Gerar JWT token
    
    // Exemplo de resposta para teste
    reply.status(501).send({ 
      error: 'Authentication not implemented yet',
      received: { email, password: '***' }
    });
  }

  // Schema para documentação da rota de registro
  static registerSchema = {
    description: 'Register a new user account',
    tags: ['Auth'],
    summary: 'User Registration',
    body: {
      type: 'object',
      required: ['email', 'password', 'name'],
      properties: {
        email: { 
          type: 'string', 
          format: 'email',
          description: 'User email address',
          example: 'newuser@example.com'
        },
        password: { 
          type: 'string', 
          minLength: 6,
          description: 'User password (minimum 6 characters)',
          example: 'mypassword123'
        },
        name: { 
          type: 'string', 
          minLength: 2,
          description: 'User full name',
          example: 'Jane Smith'
        }
      }
    },
    response: {
      201: {
        description: 'User created successfully',
        type: 'object',
        properties: {
          message: { 
            type: 'string',
            description: 'Success message',
            example: 'User created successfully'
          },
          userId: { 
            type: 'string',
            description: 'Created user ID',
            example: '12345'
          }
        }
      },
      400: {
        description: 'Bad request - validation error or user already exists',
        type: 'object',
        properties: {
          error: { 
            type: 'string',
            description: 'Error message',
            example: 'Email already registered'
          }
        }
      }
    }
  };

  static async register(request: FastifyRequest<{ Body: RegisterRequest }>, reply: FastifyReply) {
    const { email, password, name } = request.body;
    
    // TODO: Verificar se email já existe
    // TODO: Hash da senha
    // TODO: Salvar no banco de dados
    
    // Exemplo de resposta para teste
    reply.status(501).send({ 
      error: 'Registration not implemented yet',
      received: { email, name, password: '***' }
    });
  }
}

// Como usar no routes/auth.ts:
/*
import { FastifyPluginAsync } from 'fastify';
import { AuthController } from '../controllers/AuthController';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
  
  fastify.post('/login', {
    schema: AuthController.loginSchema
  }, AuthController.login);

  fastify.post('/register', {
    schema: AuthController.registerSchema
  }, AuthController.register);

};

export default authRoutes;
*/
