import request from 'supertest';
import { initTestApp, closeTestApp } from '../test-helper';
import { FastifyInstance } from 'fastify';

describe('Auth Service - Health Check', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app.server)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        service: 'auth-service',
        timestamp: expect.any(String)
      });

      // Verifica se o timestamp é uma data válida
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });

    it('should return correct content type', async () => {
      const response = await request(app.server)
        .get('/health')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body.status).toBe('ok');
    });

    it('should respond quickly', async () => {
      const startTime = Date.now();
      
      await request(app.server)
        .get('/health')
        .expect(200);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Deve responder em menos de 1 segundo
      expect(responseTime).toBeLessThan(1000);
    });

    it('should have swagger documentation available', async () => {
      // Testa se a documentação Swagger está disponível
      await request(app.server)
        .get('/docs')
        .expect(200);
    });

    it('should include service name in response', async () => {
      const response = await request(app.server)
        .get('/health')
        .expect(200);

      expect(response.body.service).toBe('auth-service');
    });
  });
});
