# Guia de Testes - Esqueleto Gradativo

## Estrutura de Testes Implementada

Este projeto possui uma estrutura completa de testes automatizados usando Jest e Supertest, configurada em todos os três microserviços:

- **api-gateway**: Testes E2E básicos
- **auth-service**: Testes E2E com Swagger
- **app-service**: Testes E2E com Swagger

## Scripts de Teste Disponíveis

### Scripts Globais (na raiz do projeto)
```bash
# Executar todos os testes de todos os serviços
yarn test

# Executar testes em modo watch (desenvolvimento)
yarn test:watch

# Executar testes com cobertura de código
yarn test:coverage

# Executar apenas testes E2E
yarn test:e2e

# Executar testes de serviços específicos
yarn test:api-gateway
yarn test:auth-service
yarn test:app-service
```

### Scripts por Serviço
```bash
# Dentro de cada pasta de serviço (api-gateway, auth-service, app-service):
yarn test              # Executa todos os testes
yarn test:watch        # Executa em modo watch
yarn test:coverage     # Executa com cobertura
yarn test:e2e          # Executa apenas testes E2E
```

## Estrutura de Pastas de Teste

```
api-gateway/
├── tests/
│   ├── setup.ts           # Configuração global dos testes
│   ├── test-helper.ts     # Funções auxiliares para testes
│   └── e2e/
│       └── health.test.ts # Testes E2E da rota /health
├── jest.config.js         # Configuração do Jest
└── package.json

auth-service/
├── tests/
│   ├── setup.ts           # Configuração global dos testes
│   ├── test-helper.ts     # Funções auxiliares para testes  
│   └── e2e/
│       └── health.test.ts # Testes E2E da rota /health + Swagger
├── jest.config.js         # Configuração do Jest
└── package.json

app-service/
├── tests/
│   ├── setup.ts           # Configuração global dos testes
│   ├── test-helper.ts     # Funções auxiliares para testes
│   └── e2e/
│       └── health.test.ts # Testes E2E da rota /health + Swagger
├── jest.config.js         # Configuração do Jest
└── package.json
```

## Como Expandir os Testes Gradativamente

### 1. Testes Unitários

Crie testes para funções individuais:

```typescript
// auth-service/tests/unit/auth.service.test.ts
import { AuthService } from '../../src/services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('validatePassword', () => {
    it('should return true for valid password', () => {
      const result = authService.validatePassword('validPassword');
      expect(result).toBe(true);
    });

    it('should return false for invalid password', () => {
      const result = authService.validatePassword('123');
      expect(result).toBe(false);
    });
  });
});
```

### 2. Testes de Integração

Teste a integração entre componentes:

```typescript
// auth-service/tests/integration/auth.controller.test.ts
import { initTestApp, closeTestApp } from '../test-helper';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

describe('Auth Controller Integration', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app.server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'validPassword'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      await request(app.server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword'
        })
        .expect(401);
    });
  });
});
```

### 3. Testes de Database (Prisma)

Teste operações do banco:

```typescript
// auth-service/tests/database/user.model.test.ts
import { PrismaClient } from '@prisma/client';
import { UserService } from '../../src/services/user.service';

describe('User Database Operations', () => {
  let prisma: PrismaClient;
  let userService: UserService;

  beforeAll(async () => {
    // Usar banco de teste ou mock
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: 'file:./test.db'
        }
      }
    });
    userService = new UserService(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Limpar dados de teste
    await prisma.user.deleteMany();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'hashedPassword'
      };

      const user = await userService.createUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });
  });
});
```

### 4. Testes de Middleware

Teste middlewares personalizados:

```typescript
// api-gateway/tests/middleware/auth.middleware.test.ts
import { authMiddleware } from '../../src/middlewares/auth.middleware';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('Auth Middleware', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  it('should pass with valid token', async () => {
    mockRequest.headers = {
      authorization: 'Bearer validToken'
    };

    await expect(authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply))
      .resolves.not.toThrow();
  });

  it('should reject without token', async () => {
    await authMiddleware(mockRequest as FastifyRequest, mockReply as FastifyReply);
    
    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });
});
```

### 5. Mocks e Stubs

Use mocks para dependências externas:

```typescript
// app-service/tests/mocks/external-api.mock.ts
export class MockExternalAPI {
  static mockResponse = { success: true };

  static async fetchData() {
    return this.mockResponse;
  }

  static setMockResponse(response: any) {
    this.mockResponse = response;
  }
}

// No teste:
jest.mock('../../src/services/external-api.service', () => ({
  ExternalAPIService: MockExternalAPI
}));
```

## Configuração de Ambiente de Teste

### Variáveis de Ambiente
Os arquivos `tests/setup.ts` já configuram:
- `NODE_ENV=test`
- Portas específicas para cada serviço
- URLs de banco de dados para teste

### Banco de Dados de Teste
Para testes com Prisma, considere:
- Usar SQLite em memória: `file::memory:`
- Usar banco separado: `file:./test.db`
- Resetar dados entre testes

## Executando Testes Durante Desenvolvimento

```bash
# Modo watch para desenvolvimento ativo
yarn test:watch

# Cobertura de código para verificar qualidade
yarn test:coverage

# Apenas testes E2E para validação rápida
yarn test:e2e
```

## Boas Práticas

1. **Isolamento**: Cada teste deve ser independente
2. **Setup/Teardown**: Use `beforeEach`/`afterEach` para limpeza
3. **Nomes Descritivos**: Descreva claramente o comportamento testado
4. **Arrange-Act-Assert**: Organize seus testes em seções claras
5. **Mocks**: Use mocks para dependências externas
6. **Cobertura**: Mantenha cobertura acima de 80%

## Próximos Passos Sugeridos

1. Implementar testes unitários para services
2. Adicionar testes de integração para controllers
3. Criar testes específicos para operações Prisma
4. Implementar testes de middleware
5. Adicionar testes de performance
6. Configurar CI/CD com execução automática de testes
