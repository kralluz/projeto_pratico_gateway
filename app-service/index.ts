// App Service - Main application business logic microservice
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface AuthUser {
  id: number;
  username: string;
  role: string;
}

interface AuthenticatedRequest extends FastifyRequest {
  user?: AuthUser;
}

const app: FastifyInstance = Fastify({ 
  logger: true 
});

// Mock data
const users: User[] = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'admin' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'user' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'user' }
];

const posts: Post[] = [
  { id: 1, title: 'Welcome to our platform', content: 'This is the first post', userId: 1 },
  { id: 2, title: 'Getting started guide', content: 'Learn how to use our services', userId: 1 },
  { id: 3, title: 'My first experience', content: 'Sharing my thoughts...', userId: 2 }
];

// Middleware to verify JWT token
async function verifyToken(request: AuthenticatedRequest, reply: FastifyReply): Promise<void> {
  const authorization = request.headers.authorization;
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Token is required'
    });
  }

  const token = authorization.split(' ')[1];
  
  try {
    // Verify token with auth service
    const response = await axios.post('http://localhost:3001/auth/verify', { token });
    request.user = response.data.user;
  } catch (error) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid token'
    });
  }
}

// Health check
app.get('/app/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    status: 'OK', 
    service: 'App Service', 
    timestamp: new Date().toISOString() 
  };
});

// Example: Get all users (protected)
app.get('/app/users', { preHandler: verifyToken }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
  return users;
});

// Example: Get all posts (protected)
app.get('/app/posts', { preHandler: verifyToken }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
  return posts;
});

// Start server
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: 3002, host: '0.0.0.0' });
    app.log.info('📦 App Service is running on port 3002');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
