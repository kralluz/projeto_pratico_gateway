# 🔄 Fluxo de Dados e Arquitetura Técnica

## 📊 Diagrama de Arquitetura Detalhado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT APPLICATIONS                             │
│                     (Web App, Mobile App, API Clients)                     │
└─────────────────────────────┬───────────────────────────────────────────────┘
                              │ HTTP/HTTPS Requests
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY (Port 3000)                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────────────┐ │
│  │   Rate Limiting │ │   Load Balancer │ │        Authentication           │ │
│  │                 │ │                 │ │         Middleware              │ │
│  └─────────────────┘ └─────────────────┘ └─────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         Routing Engine                                  │ │
│  │  /auth/* ──► Auth Service    /api/* ──► App Service                    │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────┬───────────────────────────────────┘
                      │                   │
              ┌───────▼───────┐   ┌───────▼───────┐
              │               │   │               │
              ▼               ▼   ▼               ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│      AUTH SERVICE           │   │        APP SERVICE          │
│      (Port 3001)            │   │       (Port 3002)           │
│                             │   │                             │
│ ┌─────────────────────────┐ │   │ ┌─────────────────────────┐ │
│ │      Fastify Server     │ │   │ │      Fastify Server     │ │
│ │    + Swagger Docs       │ │   │ │    + Swagger Docs       │ │
│ └─────────────────────────┘ │   │ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │   │ ┌─────────────────────────┐ │
│ │    Authentication       │ │   │ │     Adsense CRUD        │ │
│ │      Controllers        │ │   │ │     Image Upload        │ │
│ └─────────────────────────┘ │   │ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │   │ ┌─────────────────────────┐ │
│ │      JWT Services       │ │   │ │    Business Logic       │ │
│ │      User Services      │ │   │ │     Validators          │ │
│ └─────────────────────────┘ │   │ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │   │ ┌─────────────────────────┐ │
│ │     Prisma Client       │ │   │ │     Prisma Client       │ │
│ │      (User Model)       │ │   │ │ (Adsense & Image Models)│ │
│ └─────────────────────────┘ │   │ └─────────────────────────┘ │
└─────────────┬───────────────┘   └─────────────┬───────────────┘
              │                                 │
              └─────────────┬───────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │      SQLite Database        │
              │         (dev.db)            │
              │                             │
              │ ┌─────────────────────────┐ │
              │ │       User Table        │ │
              │ │   id, name, email,      │ │
              │ │   password, role        │ │
              │ └─────────────────────────┘ │
              │ ┌─────────────────────────┐ │
              │ │     Adsense Table       │ │
              │ │  id, title, description,│ │
              │ │   price, userId         │ │
              │ └─────────────────────────┘ │
              │ ┌─────────────────────────┐ │
              │ │      Image Table        │ │
              │ │   id, url, adsenseId    │ │
              │ └─────────────────────────┘ │
              └─────────────────────────────┘
```

## 🔄 Fluxos de Dados Principais

### 1. 🔐 **Fluxo de Autenticação**

```
1. Client ──POST /auth/login──► API Gateway
2. API Gateway ──Forward──► Auth Service (3001)
3. Auth Service ──Query──► SQLite (User table)
4. SQLite ──User Data──► Auth Service
5. Auth Service ──Validate Password──► bcryptjs
6. Auth Service ──Generate JWT──► jsonwebtoken
7. Auth Service ──Response {token}──► API Gateway
8. API Gateway ──Response {token}──► Client
```

### 2. 📱 **Fluxo de Operações da Aplicação**

```
1. Client ──POST /api/adsense + JWT──► API Gateway
2. API Gateway ──Validate JWT──► Auth Service
3. Auth Service ──JWT Valid──► API Gateway
4. API Gateway ──Forward + userId──► App Service (3002)
5. App Service ──Create Adsense──► SQLite (Adsense table)
6. SQLite ──Adsense Created──► App Service
7. App Service ──Response {adsense}──► API Gateway
8. API Gateway ──Response {adsense}──► Client
```

### 3. 🖼️ **Fluxo de Upload de Imagens**

```
1. Client ──POST /api/images + File──► API Gateway
2. API Gateway ──Forward multipart──► App Service
3. App Service ──Process File──► File System/Cloud Storage
4. File System ──File URL──► App Service
5. App Service ──Save Image record──► SQLite (Image table)
6. SQLite ──Image Created──► App Service
7. App Service ──Response {image}──► API Gateway
8. API Gateway ──Response {image}──► Client
```

## 🛠️ Stack Tecnológico Detalhado

### 🌐 **Runtime & Language**
- **Node.js 20+** - Runtime JavaScript
- **TypeScript 5.x** - Linguagem com tipagem estática
- **tsx** - Executor TypeScript para desenvolvimento

### 🚀 **Web Framework**
- **Fastify 5.x** - Framework web performático
- **@fastify/swagger** - Geração automática de documentação
- **@fastify/swagger-ui** - Interface de documentação
- **@fastify/http-proxy** - Proxy reverso para o gateway

### 💾 **Banco de Dados**
- **SQLite** - Banco de dados embarcado
- **Prisma ORM** - Object-Relational Mapping
- **@prisma/client** - Cliente gerado automaticamente

### 🔐 **Segurança**
- **jsonwebtoken** - Geração e validação de JWT
- **bcryptjs** - Hash de senhas
- **Fastify validation** - Validação automática de schemas

### 📦 **Gerenciamento de Dependências**
- **Yarn Workspaces** - Monorepo management
- **package.json** - Configuração de scripts
- **TypeScript configs** - Configuração por serviço

### 🔧 **Desenvolvimento**
- **concurrently** - Execução simultânea de serviços
- **nodemon/tsx watch** - Hot-reload development
- **Git** - Controle de versão

## 📊 Modelo de Dados Relacional

```sql
-- Tabela gerenciada pelo AUTH-SERVICE
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

-- Tabelas gerenciadas pelo APP-SERVICE  
CREATE TABLE Adsense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    user_id INTEGER NOT NULL, -- FK bruta para User
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Image (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    adsense_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adsense_id) REFERENCES Adsense(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_adsense_user_id ON Adsense(user_id);
CREATE INDEX idx_images_adsense_id ON Image(adsense_id);
```

## 🔒 Estratégia de Segurança

### 🛡️ **Autenticação e Autorização**
- **JWT stateless** para escalabilidade
- **Role-based access control** (user/admin)
- **Password hashing** com bcrypt + salt
- **Token expiration** configurável

### 🔐 **Isolamento de Serviços**
- **Processo separado** por serviço
- **Porta específica** por serviço
- **Schema isolado** no banco (por convenção)
- **Logs independentes** por serviço

### 🚨 **Validação e Sanitização**
- **Schema validation** automática (Fastify)
- **Type safety** (TypeScript)
- **SQL injection protection** (Prisma ORM)
- **Input sanitization** nos controllers

## 📈 Métricas e Monitoramento

### 📊 **Health Checks Implementados**
```javascript
// Disponível em todos os serviços
GET /health -> {
  status: "ok",
  service: "service-name", 
  timestamp: "2025-06-06T22:58:29.580Z"
}
```

### 🔍 **Logging Strategy**
- **Fastify logger** integrado
- **Structured logs** (JSON)
- **Log levels** configuráveis
- **Request/Response tracking**

### 📈 **Planejado para Implementação**
- **Prometheus metrics**
- **Request timing**
- **Error tracking**
- **Performance monitoring**

## 🚀 Escalabilidade e Deploy

### 📦 **Containerização (Planejado)**
```dockerfile
# Cada serviço terá seu próprio Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY dist/ ./dist/
EXPOSE 300X
CMD ["node", "dist/index.js"]
```

### 🐳 **Docker Compose (Planejado)**
```yaml
services:
  api-gateway:
    build: ./api-gateway
    ports: ["3000:3000"]
  
  auth-service:
    build: ./auth-service  
    ports: ["3001:3001"]
    
  app-service:
    build: ./app-service
    ports: ["3002:3002"]
```

### ⚖️ **Load Balancing (Futuro)**
- **Multiple instances** por serviço
- **Health check routing**
- **Circuit breaker pattern**
- **Rate limiting**

---

**🏗️ Arquitetura preparada para crescimento e alta disponibilidade!**
