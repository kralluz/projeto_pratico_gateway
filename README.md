# 🚀 Projeto Gateway Microserviços

> **Arquitetura moderna de microserviços com API Gateway, TypeScript, Fastify, Prisma e SQLite**

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)]()
[![Fastify](https://img.shields.io/badge/Fastify-5.x-black.svg)]()
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748.svg)]()

---

## 👥 **Equipe de Desenvolvimento**

| Nome                      | Função Técnica Principal             | Funções Complementares                     | Nível de Atuação               |
| ------------------------- | ------------------------------------ | ------------------------------------------ | ------------------------------ |
| **Luiz Felipe**           | ⚙️ DevOps & Infraestrutura           | Deploy · Observabilidade · Segurança       | Estratégico / Operacional      |
| **Carlos Henrique**       | 🧠 Tech Lead (Arquitetura & Backend) | CI/CD · Documentação · Mentoria · Infra    | Estratégico / Hands-on         |
| **Vitor Santos**          | 🔄 Full Stack (Backend + Frontend)   | Integração de domínios · Interface Técnica | Operacional / Técnico-Avançado |
| **Felipe Gomes (Cirilo)** | 🧑‍🎨 Frontend Developer (Trainee)   | QA Visual · Componentização · Aprendizado  | Operacional / treinee          |


---

## 🎯 **Visão Geral**

Este projeto implementa uma **arquitetura completa de microserviços** com 3 serviços independentes:
- **API Gateway** (roteamento e proxy)
- **Auth Service** (autenticação e usuários)  
- **App Service** (lógica principal da aplicação)

### ✅ **Status Atual: FUNCIONANDO**
- [x] 3 microserviços rodando simultaneamente
- [x] Banco SQLite configurado e migrado
- [x] Documentação Swagger interativa
- [x] Health checks implementados
- [x] Hot-reload development pronto

---

## 🏗️ **Arquitetura**

```
Cliente → API Gateway (3000) → Auth Service (3001) → SQLite Database
                             → App Service (3002)  ↗
```

### � **Serviços**

| Serviço | Porta | Status | Swagger | Responsabilidade |
|---------|-------|--------|---------|------------------|
| **API Gateway** | 3000 | ✅ | ❌ | Roteamento, Proxy, Load Balancing |
| **Auth Service** | 3001 | ✅ | [📖](http://localhost:3001/docs) | JWT Auth, User Management |
| **App Service** | 3002 | ✅ | [📖](http://localhost:3002/docs) | Adsense CRUD, Image Upload |

### 🗄️ **Banco de Dados**
- **SQLite** compartilhado (`dev.db`)
- **Prisma ORM** com type safety
- **3 tabelas**: User, Adsense, Image
- **Isolamento por serviço** sem acoplamento

---

## 🚀 **Quick Start**

### 📦 **Instalação**
```bash
# Clonar o repositório
git clone https://github.com/kralluz/projeto_pratico_gateway.git
cd projeto_pratico_gateway

# Instalar todas as dependências
yarn install:all
```

### 🔄 **Desenvolvimento**
```bash
# Executar todos os serviços com hot-reload
yarn dev

# Os serviços estarão disponíveis em:
# API Gateway: http://localhost:3000
# Auth Service: http://localhost:3001 
# App Service:  http://localhost:3002
```

### 🧪 **Testar**
```bash
# Health checks
curl http://localhost:3000/health
curl http://localhost:3001/health  
curl http://localhost:3002/health

# Documentação Swagger
open http://localhost:3001/docs  # Auth Service
open http://localhost:3002/docs  # App Service
```

---

## 📚 **Documentação Completa**

| Documento | Descrição |
|-----------|-----------|
| [📋 **PROJECT_SUMMARY.md**](./PROJECT_SUMMARY.md) | Resumo executivo e status |
| [�️ **ARCHITECTURE.md**](./ARCHITECTURE.md) | Arquitetura detalhada dos serviços |
| [🔧 **TECHNICAL_ARCHITECTURE.md**](./TECHNICAL_ARCHITECTURE.md) | Fluxos técnicos e diagramas |
| [📖 **SWAGGER_DOCS.md**](./SWAGGER_DOCS.md) | Guia de uso do Swagger |
| [💡 **SWAGGER_EXAMPLE.md**](./SWAGGER_EXAMPLE.md) | Exemplos avançados de implementação |

---

## 🛠️ **Stack Tecnológico**

### 🔧 **Core**
- **Node.js 20+** - Runtime JavaScript
- **TypeScript 5.x** - Tipagem estática
- **Fastify 5.x** - Framework web performático
- **Prisma ORM** - Type-safe database access
- **SQLite** - Banco de dados embarcado

### 📚 **Documentação**
- **@fastify/swagger** - Geração automática de docs
- **Swagger UI** - Interface interativa de testes

### 🔐 **Segurança**
- **JWT** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **Role-based access** - Controle de acesso

### 🔧 **Development**
- **Yarn Workspaces** - Monorepo management
- **tsx** - Hot-reload TypeScript
- **concurrently** - Execução simultânea

---

## 📁 **Estrutura do Projeto**

```
projeto_pratico_gateway/
├── 📁 api-gateway/              # API Gateway (Port 3000)
│   ├── 📄 package.json          # Dependências + scripts
│   ├── 📄 tsconfig.json         # Config TypeScript
│   └── 📁 src/
│       ├── 📄 index.ts          # Servidor principal
│       ├── 📁 routes/           # Roteamento
│       ├── 📁 middlewares/      # Middlewares
│       └── 📁 config/           # Configurações
│
├── � auth-service/             # Auth Service (Port 3001)
│   ├── 📄 package.json          # Deps: fastify, prisma, jwt, bcrypt
│   ├── 📄 .env                  # DATABASE_URL
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma     # User model
│   │   └── 📁 migrations/       # DB migrations
│   └── 📁 src/
│       ├── 📄 index.ts          # Servidor + Swagger
│       ├── 📁 routes/           # Auth routes (/api/login, /register)
│       ├── 📁 controllers/      # Auth controllers
│       └── 📁 services/         # Business logic
│
├── 📁 app-service/              # App Service (Port 3002)
│   ├── 📄 package.json          # Deps: fastify, prisma, axios
│   ├── 📄 .env                  # DATABASE_URL
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma     # Adsense + Image models
│   │   └── � migrations/       # DB migrations
│   └── 📁 src/
│       ├── 📄 index.ts          # Servidor + Swagger
│       ├── 📁 routes/           # App routes (/api/adsense, /images)
│       ├── 📁 controllers/      # CRUD controllers
│       └── 📁 services/         # Business logic
│
├── 🗄️ dev.db                   # SQLite database compartilhado
├── 📄 package.json             # Scripts globais + workspaces
├── 📄 TESTING_GUIDE.md         # Guia completo de testes
├── 📄 TEST_EXAMPLES.md         # Exemplos de teste para expansão
└── 📄 yarn.lock                # Lock de dependências
```

---

## 🎮 **Scripts Disponíveis**

### 📦 **Instalação**
```bash
yarn install:all           # Instalar todas as dependências
yarn install:api-gateway   # Instalar só o gateway
yarn install:auth-service  # Instalar só o auth
yarn install:app-service   # Instalar só o app
```

### 🔄 **Desenvolvimento**
```bash
yarn dev                   # Todos os serviços com hot-reload
yarn dev:gateway           # Só o API Gateway
yarn dev:auth              # Só o Auth Service  
yarn dev:app               # Só o App Service
```

### 🏭 **Produção**
```bash
yarn start:all             # Todos os serviços em produção
yarn start:gateway         # Só o gateway
yarn start:auth            # Só o auth
yarn start:app             # Só o app
```

### 🗄️ **Banco de Dados**
```bash
# Auth Service
cd auth-service
yarn prisma:generate       # Gerar cliente Prisma
yarn prisma:migrate        # Executar migrações
yarn test:prisma          # Testar conexão

# App Service
cd app-service
yarn prisma:generate       # Gerar cliente Prisma
yarn prisma:migrate        # Executar migrações
yarn test:prisma          # Testar conexão
```

### 🧪 **Testes Automatizados**
```bash
# Executar todos os testes
yarn test                  # Todos os serviços
yarn test:e2e              # Apenas testes E2E
yarn test:coverage         # Com cobertura de código

# Testes em modo watch (desenvolvimento)
yarn test:watch            # Modo watch para todos os serviços

# Testes por serviço específico
yarn test:api-gateway      # Apenas API Gateway
yarn test:auth-service     # Apenas Auth Service
yarn test:app-service      # Apenas App Service

# Dentro de cada serviço
cd api-gateway
yarn test                  # Executar testes do gateway
yarn test:watch            # Modo watch
yarn test:coverage         # Com cobertura

cd auth-service
yarn test                  # Executar testes do auth
yarn test:e2e              # Apenas E2E
yarn test:coverage         # Com cobertura

cd app-service
yarn test                  # Executar testes do app
yarn test:e2e              # Apenas E2E
yarn test:coverage         # Com cobertura
```

---

## 🌐 **APIs e Endpoints**

### 🔗 **Health Checks**
```bash
GET http://localhost:3000/health  # API Gateway
GET http://localhost:3001/health  # Auth Service
GET http://localhost:3002/health  # App Service
```

### 🔐 **Auth Service** (localhost:3001)
```bash
POST /api/login            # Login (501 - Not Implemented)
POST /api/register         # Register (501 - Not Implemented)  
GET  /docs                 # Swagger UI
GET  /docs/json           # OpenAPI Schema
```

### 📱 **App Service** (localhost:3002)
```bash
GET  /api/adsense         # List adsense (501 - Not Implemented)
POST /api/adsense         # Create adsense (501 - Not Implemented)
GET  /api/images          # List images (501 - Not Implemented) 
POST /api/images          # Upload image (501 - Not Implemented)
GET  /docs                # Swagger UI
GET  /docs/json          # OpenAPI Schema
```

---

## 🔄 **Status de Implementação**

### ✅ **Implementado e Funcionando**
- [x] Estrutura completa de microserviços
- [x] API Gateway básico com health check
- [x] Auth Service com Prisma e Swagger
- [x] App Service com Prisma e Swagger  
- [x] Banco SQLite configurado e migrado
- [x] Documentação Swagger interativa
- [x] Scripts de desenvolvimento e produção
- [x] Hot-reload em todos os serviços
- [x] Type safety completa com TypeScript

### 🔄 **Em Implementação**
- [ ] Rotas de autenticação JWT (login/register)
- [ ] CRUD completo de Adsense
- [ ] Upload e gerenciamento de imagens
- [ ] Proxy e roteamento no API Gateway
- [ ] Middleware de autenticação

### 📋 **Roadmap**
- [ ] Testes automatizados (Jest)
- [ ] Docker compose para deploy
- [ ] CI/CD pipeline
- [ ] Rate limiting e throttling
- [ ] Logs centralizados
- [ ] Monitoring e métricas
- [ ] Cache Redis
- [ ] Database clustering

---

## 🤝 **Contribuindo**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 **Licença**

Este projeto está licenciado sob a Licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🎯 **Próximos Passos**

1. **Implementar autenticação JWT** no auth-service
2. **Implementar CRUD Adsense** no app-service  
3. **Configurar proxy** no API Gateway
4. **Adicionar middleware de auth** em rotas protegidas
5. **Implementar testes automatizados**

---

**🚀 Projeto pronto para desenvolvimento produtivo de funcionalidades!**

**✨ Todos os serviços funcionando | ✨ Documentação completa | ✨ Hot-reload habilitado**

# Rodar todos os serviços simultaneamente com nodemon
yarn dev

# Ou rodar serviços individualmente
yarn dev:gateway    # API Gateway (porta 3000)
yarn dev:auth      # Auth Service (porta 3001)
yarn dev:app       # App Service (porta 3002)
```

### Produção

```bash
# Rodar todos os serviços em produção
yarn start:all

# Ou rodar serviços individualmente
yarn start:gateway
yarn start:auth
yarn start:app
```

### Outros comandos

```bash
# Parar todos os processos
yarn stop

# Limpar todas as node_modules
yarn clean

# Reinstalar tudo
yarn clean && yarn install:all
```

## 🛠️ Tecnologias

- **Framework**: Fastify
- **Proxy**: @fastify/http-proxy
- **Auth**: JWT + bcryptjs
- **Dev Tools**: Nodemon + Concurrently
- **Package Manager**: Yarn

## 📊 Portas dos Serviços

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| API Gateway | 3000 | Ponto de entrada principal |
| Auth Service | 3001 | Autenticação e autorização |
| App Service | 3002 | Lógica de negócio principal |

## 🔥 Features

- ✅ **Auto-refresh** com nodemon
- ✅ **Logs coloridos** por serviço  
- ✅ **Fácil desenvolvimento** com concurrently
- ✅ **Arquitetura de microserviços**
- ✅ **Zero vulnerabilidades**

## 📝 Logs

Quando rodar `yarn dev`, você verá logs coloridos:

- 🔵 **AUTH** - Serviço de autenticação
- 🟢 **APP** - Serviço principal  
- 🟡 **GATEWAY** - API Gateway

Qualquer mudança nos arquivos `.js` ou `.json` reiniciará automaticamente o serviço correspondente! 🔄
└── app-service/     # Serviço principal da aplicação - Porta 3002
```

## 🚀 Como executar

### 1. Instalar dependências em cada serviço:

```bash
# API Gateway
cd backend/api-gateway
yarn install

# Auth Service
cd ../auth-service
yarn install

# App Service
cd ../app-service
yarn install
```

### 2. Executar os serviços (em terminais separados):

```bash
# Terminal 1 - Auth Service
cd backend/auth-service
yarn start

# Terminal 2 - App Service
cd backend/app-service  
yarn start

# Terminal 3 - API Gateway
cd backend/api-gateway
yarn start
```

## 📋 Endpoints

### Através do API Gateway (porta 3000):

#### Autenticação:
- `POST /auth/login` - Login do usuário
- `POST /auth/verify` - Verificar token
- `POST /auth/refresh` - Renovar token

#### Aplicação:
- `GET /app/public/info` - Informações públicas (sem auth)
- `GET /app/users` - Listar usuários (requer auth)
- `GET /app/users/:id` - Buscar usuário por ID (requer auth)
- `GET /app/posts` - Listar posts (requer auth)
- `POST /app/posts` - Criar post (requer auth)
- `GET /app/profile` - Perfil do usuário (requer auth)

## 🔐 Autenticação

### Usuários de teste:
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### Exemplo de uso:

```bash
# 1. Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# 2. Usar o token retornado nas requisições
curl -X GET http://localhost:3000/app/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🛠️ Desenvolvimento

Para executar em modo desenvolvimento (com auto-reload):

```bash
# Em cada serviço
yarn dev
```

## 📊 Health Checks

- API Gateway: `GET http://localhost:3000/health`
- Auth Service: `GET http://localhost:3001/auth/health`
- App Service: `GET http://localhost:3002/app/health`

---

## 🎓 **Conceitos e Tecnologias Aplicadas**

### 👨‍💻 **BACKEND** (Carlos Henrique e Vitor Santos)

#### 🔷 **Fundamentos Intermediários**
- **REST APIs** com Fastify
- **Modularização** por domínio
- **Middlewares** e lifecycle hooks
- **JWT** (access + refresh tokens)
- **Criptografia** de senhas com bcrypt
- **Validação** com Zod
- **Tipagem forte** com TypeScript

#### 🔷 **Prisma ORM** (Avançado)
- **Modelagem relacional** com Foreign Keys
- **Migrations isoladas** por microserviço
- **Integração** de múltiplos schemas no mesmo banco
- **Seed, transactions** e soft delete
- **Type safety** automático

#### 🔷 **Arquitetura de Microserviços**
- **Gateway de API** com reverse proxy
- **Isolamento de responsabilidades** (auth/app)
- **Autenticação distribuída**
- **Serviços independentes** com CI/CD separado
- **Comunicação inter-serviços**

#### 🔷 **Testes e Segurança**
- **Testes unitários** com Jest
- **Testes de integração** via HTTP
- **Rate limiting**, CORS, Helmet
- **Tratamento global** de erros e logging
- **Validação** de entrada robusta

#### 🔷 **Documentação e Padronização**
- **Swagger** com Fastify
- **Enumeração** de códigos de erro
- **DTOs** e interfaces compartilhadas
- **Geração de tipos** via zod-to-openapi
- **API-first development**

### 🧑‍💻 **FRONTEND** (Vitor Santos e Felipe Gomes)

#### 🔷 **Fundamentos Práticos**
- **React** com Vite
- **Roteamento** com react-router-dom
- **Hooks**: useState, useEffect, useContext
- **Consumo de APIs** REST com axios/fetch
- **Gerenciamento de estado** moderno

#### 🔷 **Fluxo de Autenticação**
- **Login, registro** e logout
- **Armazenamento** de token (localStorage)
- **Redirecionamento condicional** com rotas privadas
- **Proteção de rotas** baseada em auth

#### 🔷 **UX e Navegação**
- **Feedback** de erros de API
- **Feedback** de carregamento (spinners, toasts)
- **Formulários** com validação (React Hook Form + Zod)
- **Interface responsiva** e acessível

#### 🔷 **Organização e Arquitetura**
- **Separação** por pastas: pages, components, services, context
- **Reutilização** de componentes
- **Design system** simples com estilização flexível
- **Padrões** de desenvolvimento consistentes

### 🧠 **INFRAESTRUTURA** (Carlos Henrique e Luiz Felipe)

#### 🔷 **Provisionamento e Servidores**
- **VPS local** com IP fixo
- **Gerenciamento** com Docker e Docker Compose
- **Infraestrutura como código** com Terraform
- **Configuração automatizada** com Ansible
- **Ambientes isolados** (dev/staging/prod)

#### 🔷 **Deploy e Orquestração**
- **GitHub Actions** para CI/CD
- **Deploy remoto** via SSH + Terraform
- **Tagging, rollback** e override para containers
- **Gerenciamento** de múltiplos ambientes
- **Kubernetes** (Minikube/K3s) para escalabilidade

#### 🔷 **Observabilidade**
- **Grafana** para dashboards visuais
- **Prometheus** para métricas (Node Exporter, cAdvisor)
- **Loki + Promtail** para logs centralizados
- **Alertas automatizados** com Bot do Telegram
- **Monitoramento proativo** de performance

#### 🔷 **Segurança**
- **Certificados SSL** com Let's Encrypt
- **HTTPS** via Apache proxy reverso
- **Firewall** com iptables
- **Proteção** contra brute-force com Fail2Ban
- **Gerenciamento** de segredos via .env e GitHub Secrets

#### 🔷 **Backup e Resiliência**
- **Backup** de banco com pg_dump + agendamento via cron
- **Backup** de volumes com Duplicati
- **Política** de retenção e testes mensais de restauração
- **Scripts** de recovery completos
- **Disaster recovery** planejado

---

## 📚 **Documentação Adicional**

- [📖 **Arquitetura Técnica**](./TECHNICAL_ARCHITECTURE.md) - Detalhes técnicos aprofundados
- [🏗️ **Visão Arquitetural**](./ARCHITECTURE.md) - Visão geral da arquitetura
- [🧪 **Guia de Testes**](./TESTING_GUIDE.md) - Como expandir testes gradativamente
- [📝 **Exemplos de Teste**](./TEST_EXAMPLES.md) - Templates para novos testes
- [📊 **Resumo Executivo**](./PROJECT_SUMMARY.md) - Overview do projeto
- [📋 **Swagger Guide**](./SWAGGER_DOCS.md) - Como usar e expandir documentação

---

## 🤝 **Contribuição**

Este projeto foi desenvolvido como template universal para microserviços Node.js. 

### Como contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões do projeto:
- **Commits semânticos** (feat, fix, docs, etc.)
- **TypeScript** obrigatório
- **Testes** para novas funcionalidades
- **Documentação** atualizada

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ pela equipe Carlos Henrique, Vitor Santos, Felipe Gomes e Luiz Felipe**
