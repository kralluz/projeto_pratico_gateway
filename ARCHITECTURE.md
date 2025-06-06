# 🏗️ Arquitetura do Projeto - Microserviços Gateway

## 📋 Visão Geral

Este projeto implementa uma **arquitetura de microserviços** usando **Node.js**, **TypeScript**, **Fastify** e **Prisma ORM**, com um **API Gateway** centralizando o acesso aos serviços.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway   │────│  Auth Service    │    │   App Service   │
│  Port: 3000     │    │  Port: 3001      │    │  Port: 3002     │
│                 │    │  + JWT Auth      │    │  + Adsense CRUD │
│  + Routing      │    │  + User Mgmt     │    │  + Image Upload │
│  + Load Balance │    │  + Swagger Docs  │    │  + Swagger Docs │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                └────────┬───────────────┘
                                         │
                              ┌──────────▼──────────┐
                              │   SQLite Database   │
                              │     (dev.db)        │
                              │  + User table       │
                              │  + Adsense table    │
                              │  + Image table      │
                              └─────────────────────┘
```

---

## 📁 Estrutura do Projeto

```
projeto_pratico_gateway/
├── 📁 api-gateway/           # Gateway de entrada
├── 📁 auth-service/          # Serviço de autenticação
├── 📁 app-service/           # Serviço principal da aplicação
├── 🗄️ dev.db                # Banco SQLite compartilhado
├── 📄 package.json          # Scripts globais e workspaces
├── 📄 yarn.lock             # Lock de dependências
├── 📄 .gitignore            # Arquivos ignorados pelo Git
└── 📄 README.md             # Documentação do projeto
```

---

## 🔧 Serviços Implementados

### 1. 🚪 **API Gateway** (Port: 3000)

**Responsabilidade**: Ponto de entrada único para todos os serviços

#### 📂 Estrutura:
```
api-gateway/
├── 📄 package.json          # Dependências do gateway
├── 📄 tsconfig.json         # Configuração TypeScript
├── 📄 .env                  # Variáveis de ambiente
├── 📄 Dockerfile            # Container Docker
└── 📁 src/
    ├── 📄 index.ts          # Servidor principal
    ├── 📁 config/           # Configurações
    ├── 📁 middlewares/      # Middlewares globais
    ├── 📁 plugins/          # Plugins Fastify
    ├── 📁 routes/           # Roteamento
    └── 📁 utils/            # Utilitários
```

#### 🛠️ **Tecnologias**:
- **Fastify 5.x** - Framework web
- **@fastify/http-proxy** - Proxy reverso
- **TypeScript** - Tipagem estática
- **tsx** - Executor TypeScript

#### ⚙️ **Scripts Disponíveis**:
```bash
yarn dev     # Desenvolvimento com hot-reload
yarn build   # Build para produção
yarn start   # Executar em produção
```

---

### 2. 🔐 **Auth Service** (Port: 3001)

**Responsabilidade**: Autenticação, autorização e gerenciamento de usuários

#### 📂 Estrutura:
```
auth-service/
├── 📄 package.json          # Dependências do serviço
├── 📄 tsconfig.json         # Configuração TypeScript
├── 📄 .env                  # Variáveis de ambiente
├── 📁 prisma/
│   ├── 📄 schema.prisma     # Schema do banco (User)
│   └── 📁 migrations/       # Migrações do banco
└── 📁 src/
    ├── 📄 index.ts          # Servidor + Swagger
    ├── 📄 test-prisma.ts    # Teste de conexão Prisma
    ├── 📁 routes/
    │   └── 📄 auth.ts       # Rotas de autenticação
    ├── 📁 controllers/      # Controladores
    ├── 📁 services/         # Lógica de negócio
    ├── 📁 models/           # Models do Prisma
    ├── 📁 middlewares/      # Middlewares específicos
    ├── 📁 plugins/          # Plugins Fastify
    ├── 📁 config/           # Configurações
    └── 📁 utils/            # Utilitários
```

#### 🛠️ **Tecnologias**:
- **Fastify 5.x** - Framework web
- **Prisma ORM** - Acesso ao banco de dados
- **SQLite** - Banco de dados
- **@fastify/swagger** - Documentação automática
- **@fastify/swagger-ui** - Interface de documentação
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - JWT tokens
- **TypeScript** - Tipagem estática

#### 📊 **Modelo de Dados**:
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  role      UserRole  @default(user)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}

enum UserRole {
  user
  admin
}
```

#### ⚙️ **Scripts Disponíveis**:
```bash
yarn dev              # Desenvolvimento com hot-reload
yarn build            # Build para produção
yarn start            # Executar em produção
yarn test:prisma      # Testar conexão Prisma
yarn prisma:generate  # Gerar cliente Prisma
yarn prisma:migrate   # Executar migrações
```

#### 🌐 **Endpoints Implementados**:
```
GET  /health           # Health check
POST /api/login        # Login (501 - Not Implemented)
POST /api/register     # Registro (501 - Not Implemented)
GET  /docs             # Swagger UI
GET  /docs/json        # Schema JSON
```

---

### 3. 📱 **App Service** (Port: 3002)

**Responsabilidade**: Lógica principal da aplicação (Adsense e Imagens)

#### 📂 Estrutura:
```
app-service/
├── 📄 package.json          # Dependências do serviço
├── 📄 tsconfig.json         # Configuração TypeScript
├── 📄 .env                  # Variáveis de ambiente
├── 📁 prisma/
│   ├── 📄 schema.prisma     # Schema do banco (Adsense, Image)
│   └── 📁 migrations/       # Migrações do banco
└── 📁 src/
    ├── 📄 index.ts          # Servidor + Swagger
    ├── 📄 test-prisma.ts    # Teste de conexão Prisma
    ├── 📁 routes/
    │   ├── 📄 adsense.ts    # Rotas de Adsense
    │   └── 📄 images.ts     # Rotas de Imagens
    ├── 📁 controllers/      # Controladores
    ├── 📁 services/         # Lógica de negócio
    ├── 📁 models/           # Models do Prisma
    ├── 📁 middlewares/      # Middlewares específicos
    ├── 📁 plugins/          # Plugins Fastify
    ├── 📁 config/           # Configurações
    └── 📁 utils/            # Utilitários
```

#### 🛠️ **Tecnologias**:
- **Fastify 5.x** - Framework web
- **Prisma ORM** - Acesso ao banco de dados
- **SQLite** - Banco de dados
- **@fastify/swagger** - Documentação automática
- **@fastify/swagger-ui** - Interface de documentação
- **axios** - Cliente HTTP
- **TypeScript** - Tipagem estática

#### 📊 **Modelo de Dados**:
```prisma
model Adsense {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  price       String    # Valores monetários como String
  userId      Int       # FK bruta para User (auth-service)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  images      Image[]   # Relação com imagens
}

model Image {
  id         Int      @id @default(autoincrement())
  url        String
  adsenseId  Int      # FK para Adsense
  adsense    Adsense  @relation(fields: [adsenseId], references: [id])
  createdAt  DateTime @default(now())
}
```

#### ⚙️ **Scripts Disponíveis**:
```bash
yarn dev              # Desenvolvimento com hot-reload
yarn build            # Build para produção
yarn start            # Executar em produção
yarn test:prisma      # Testar conexão Prisma
yarn prisma:generate  # Gerar cliente Prisma
yarn prisma:migrate   # Executar migrações
```

#### 🌐 **Endpoints Implementados**:
```
GET  /health              # Health check
GET  /api/adsense         # Listar adsense (501 - Not Implemented)
POST /api/adsense         # Criar adsense (501 - Not Implemented)
GET  /api/images          # Listar imagens (501 - Not Implemented)
POST /api/images          # Upload imagem (501 - Not Implemented)
GET  /docs                # Swagger UI
GET  /docs/json           # Schema JSON
```

---

## 💾 Banco de Dados

### 📋 **Configuração**:
- **Tipo**: SQLite
- **Arquivo**: `dev.db` (na raiz do projeto)
- **ORM**: Prisma
- **Isolamento**: Cada serviço tem seu próprio schema, mas compartilha o mesmo arquivo

### 🔗 **Estratégia de Relacionamentos**:
- **Isolamento por serviço**: Cada serviço gerencia suas próprias tabelas
- **Foreign Keys brutas**: Para relacionamentos entre serviços (userId como Int)
- **Sem @relation entre serviços**: Evita acoplamento forte

---

## 📚 Documentação das APIs

### 🌐 **Swagger UI Disponível**:
- **Auth Service**: http://localhost:3001/docs
- **App Service**: http://localhost:3002/docs

### 📄 **Recursos de Documentação**:
- **Schemas automáticos** para request/response
- **Validação automática** de entrada
- **Interface interativa** para testes
- **Agrupamento por tags** (Health, Auth, Adsense, Images)
- **Exemplos detalhados** de uso

---

## 🚀 Comandos de Desenvolvimento

### 📦 **Instalação**:
```bash
# Instalar todas as dependências
yarn install:all

# Instalar individualmente
yarn install:api-gateway
yarn install:auth-service  
yarn install:app-service
```

### 🔄 **Desenvolvimento**:
```bash
# Executar todos os serviços
yarn dev

# Executar individualmente
yarn dev:gateway    # API Gateway (3000)
yarn dev:auth       # Auth Service (3001)
yarn dev:app        # App Service (3002)
```

### 🏭 **Produção**:
```bash
# Build todos os serviços
cd api-gateway && yarn build
cd auth-service && yarn build
cd app-service && yarn build

# Executar todos em produção
yarn start:all
```

### 🗄️ **Banco de Dados**:
```bash
# Gerar cliente Prisma (auth)
cd auth-service && yarn prisma:generate

# Executar migrações (app)
cd app-service && yarn prisma:migrate

# Testar conexões
cd auth-service && yarn test:prisma
cd app-service && yarn test:prisma
```

---

## 🌐 Portas e Endpoints

### 🔌 **Serviços**:
| Serviço | Porta | Health Check | Swagger |
|---------|-------|--------------|---------|
| API Gateway | 3000 | `/health` | ❌ |
| Auth Service | 3001 | `/health` | `/docs` |
| App Service | 3002 | `/health` | `/docs` |

### 🧪 **Health Checks**:
```bash
curl http://localhost:3000/health  # API Gateway
curl http://localhost:3001/health  # Auth Service
curl http://localhost:3002/health  # App Service
```

---

## 🛡️ Segurança e Autenticação

### 🔐 **Estratégia de Autenticação**:
- **JWT tokens** para autenticação stateless
- **bcryptjs** para hash de senhas
- **Roles de usuário** (user, admin)
- **Middleware de autenticação** (a implementar)

### 🔒 **Isolamento de Serviços**:
- Cada serviço tem seu próprio processo
- Comunicação via HTTP/REST
- Banco de dados compartilhado com isolamento lógico

---

## 📈 Status de Implementação

### ✅ **Implementado**:
- [x] Estrutura de microserviços
- [x] API Gateway básico
- [x] Auth Service com Prisma
- [x] App Service com Prisma
- [x] Swagger Documentation
- [x] Health checks
- [x] Scripts de desenvolvimento
- [x] Modelos de banco de dados
- [x] Migrações Prisma
- [x] Hot-reload development

### 🔄 **Em Implementação**:
- [ ] Rotas de autenticação (login/register)
- [ ] CRUD de Adsense
- [ ] Upload de imagens
- [ ] Middleware de autenticação JWT
- [ ] Proxy no API Gateway

### 📋 **Planejado**:
- [ ] Testes automatizados
- [ ] Docker compose
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Logs centralizados
- [ ] Monitoring e métricas

---

## 🎯 Próximos Passos

1. **Implementar autenticação JWT** no auth-service
2. **Implementar CRUD completo** no app-service
3. **Configurar proxy** no API Gateway
4. **Adicionar middleware de auth** nos endpoints protegidos
5. **Implementar testes automatizados**
6. **Configurar Docker** para deploy

---

**🏗️ Arquitetura robusta e escalável pronta para desenvolvimento!**
