// Auth Service - Authentication and Authorization microservice
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginBody {
  username: string;
  password: string;
}

interface VerifyBody {
  token: string;
}

interface JWTPayload {
  id: number;
  username: string;
  role: string;
}

const app: FastifyInstance = Fastify({ 
  logger: true 
});

// JWT Secret (In production, use environment variables)
const JWT_SECRET: string = process.env.JWT_SECRET || 'your-super-secret-key';

// Mock users database (In production, use a real database)
const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$rOgvUfxw5V5d5W5d5W5d5O5d5W5d5W5d5W5d5W5d5W5d5W5d5W5d5', // password: admin123
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: '$2a$10$rOgvUfxw5V5d5W5d5W5d5O5d5W5d5W5d5W5d5W5d5W5d5W5d5W5d5', // password: user123
    role: 'user'
  }
];

// Health check
app.get('/auth/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    status: 'OK', 
    service: 'Auth Service', 
    timestamp: new Date().toISOString() 
  };
});

// Login endpoint
app.post<{ Body: LoginBody }>('/auth/login', async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return reply.status(400).send({
      error: 'Bad Request',
      message: 'Username and password are required'
    });
  }

  // Find user
  const user: User | undefined = users.find(u => u.username === username || u.email === username);
  
  if (!user) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid username or password'
    });
  }

  // Check password
  const isMatch: boolean = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid username or password'
    });
  }

  // Generate JWT
  const payload: JWTPayload = { id: user.id, username: user.username, role: user.role };
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return { token };
});

// Token verification endpoint
app.post<{ Body: VerifyBody }>('/auth/verify', async (request: FastifyRequest<{ Body: VerifyBody }>, reply: FastifyReply) => {
  const { token } = request.body;
  if (!token) {
    return reply.status(400).send({ error: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return { valid: true, user: decoded };
  } catch (err) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
});

// Start server
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    app.log.info('🔐 Auth Service is running on port 3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
