# API Documentation with Swagger

Este projeto utiliza Fastify Swagger para documentação automática das APIs dos microserviços.

## Acessando a Documentação

### Auth Service
- **Swagger UI**: http://localhost:3001/docs
- **JSON Schema**: http://localhost:3001/docs/json

### App Service  
- **Swagger UI**: http://localhost:3002/docs
- **JSON Schema**: http://localhost:3002/docs/json

### API Gateway
- **Health Check**: http://localhost:3000/health

## Como Documentar Novas Rotas

Para adicionar documentação a uma nova rota, use o campo `schema` no registro da rota:

```typescript
fastify.post('/example', {
  schema: {
    description: 'Descrição da rota',
    tags: ['TagName'],
    body: {
      type: 'object',
      required: ['campo1'],
      properties: {
        campo1: { type: 'string' },
        campo2: { type: 'number', minimum: 0 }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          message: { type: 'string' }
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
  // Implementação da rota
});
```

## Estrutura das Tags

### Auth Service
- `Health`: Endpoints de health check
- `Auth`: Endpoints de autenticação e autorização

### App Service
- `Health`: Endpoints de health check  
- `Adsense`: Endpoints para gerenciamento de Adsense
- `Images`: Endpoints para gerenciamento de imagens

## Exemplos de Rotas Implementadas

### Auth Service (/api)
- `POST /api/login` - Autenticação de usuário (501 - Not Implemented)
- `POST /api/register` - Registro de novo usuário (501 - Not Implemented)

### App Service (/api)
- `GET /api/adsense` - Listar entradas de adsense (501 - Not Implemented)
- `POST /api/adsense` - Criar nova entrada de adsense (501 - Not Implemented)
- `GET /api/images` - Listar imagens (501 - Not Implemented)
- `POST /api/images` - Upload de nova imagem (501 - Not Implemented)

## Iniciando os Serviços

Para testar a documentação, inicie todos os serviços:

```bash
# Instalar dependências
yarn install:all

# Executar todos os serviços
yarn dev
```

Ou individualmente:

```bash
# Auth Service
cd auth-service && yarn dev

# App Service  
cd app-service && yarn dev

# API Gateway
cd api-gateway && yarn dev
```

## Validação de Schema

O Fastify automaticamente valida:
- **Request body** contra o schema definido
- **Query parameters** contra o schema definido  
- **Response** contra o schema definido (em desenvolvimento)

Erros de validação retornam status 400 com detalhes do erro.

## Próximos Passos

1. Implementar as rotas marcadas como "Not Implemented"
2. Adicionar autenticação JWT nas rotas protegidas
3. Implementar middlewares de validação customizados
4. Adicionar testes automatizados das rotas documentadas
