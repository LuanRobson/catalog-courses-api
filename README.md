# 🎓 API de Catálogo de Cursos

API REST desenvolvida com NestJS para gerenciamento de cursos e categorias.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

### Opção 1: Setup Automático
```bash
git clone <url-do-repositorio>
cd catalog-cursos-api
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Opção 2: Setup Manual

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd catalog-cursos-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Para desenvolvimento local
DATABASE_URL="postgresql://user:password@localhost:5432/catalog_cursos"

# Para Supabase (recomendado)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="http://localhost:4200"
```

4. **Configure o banco de dados**
```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# Popular banco com dados iniciais
npm run db:seed
```

5. **Inicie a aplicação**
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 Endpoints da API

### Autenticação
- `POST /api/v1/auth/login` - Fazer login
- `POST /api/v1/auth/register` - Registrar usuário

### Cursos
- `GET /api/v1/courses` - Listar cursos (com paginação e filtros)
- `GET /api/v1/courses/:id` - Buscar curso específico
- `POST /api/v1/courses` - Criar curso (requer autenticação)
- `PATCH /api/v1/courses/:id` - Atualizar curso (requer autenticação)
- `DELETE /api/v1/courses/:id` - Remover curso (requer autenticação)

### Categorias
- `GET /api/v1/categories` - Listar categorias

## 🔐 Autenticação

A API usa JWT para autenticação. Para endpoints protegidos, inclua o header:
```
Authorization: Bearer <seu-token-jwt>
```

### Usuário Admin Padrão
- **Email**: admin@example.com
- **Senha**: admin123

## 📖 Documentação

A documentação interativa está disponível em:
```
http://localhost:3000/api/docs
```

## 🧪 Testes

```bash
# Executar testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov
```

## 🛠️ Scripts Disponíveis

- `npm run start:dev` - Iniciar em modo desenvolvimento
- `npm run build` - Compilar para produção
- `npm run start:prod` - Iniciar em modo produção
- `npm run db:migrate` - Executar migrações
- `npm run db:seed` - Popular banco com dados iniciais
- `npm run db:studio` - Abrir Prisma Studio
- `npm run test` - Executar testes
- `npm run lint` - Verificar código com ESLint

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Autenticação e autorização
├── categories/           # Módulo de categorias
├── courses/             # Módulo de cursos
├── common/              # DTOs e utilitários compartilhados
├── prisma/              # Configuração do Prisma
└── main.ts              # Arquivo principal
```

## 🔄 Integração com Frontend Angular

Para integrar com o frontend Angular, atualize o `CourseService`:

```typescript
// src/app/services/course.service.ts
private apiUrl = 'http://localhost:3000/api/v1/courses';

private getHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

getCourses(): Observable<Course[]> {
  return this.http.get<{data: Course[]}>(this.apiUrl, {
    headers: this.getHeaders()
  }).pipe(
    map(response => response.data)
  );
}
```

## 🗄️ Banco de Dados Gratuito (Supabase)

### 1. Criar projeto no Supabase
- Acesse: https://supabase.com
- Faça login com GitHub
- Clique em "New Project"
- Configure o projeto e anote a senha do banco

### 2. Obter URL de conexão
- Vá em **Settings** → **Database**
- Copie a **Connection string**
- Substitua `[YOUR-PASSWORD]` pela senha do projeto

### 3. Configurar variáveis
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## 🚀 Deploy Gratuito

### Opção 1: Railway (Recomendado)
1. Acesse: https://railway.app
2. Faça login com GitHub
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Selecione seu repositório
5. Configure as variáveis de ambiente:
   - `DATABASE_URL`: URL do Supabase
   - `JWT_SECRET`: Chave secreta para JWT
   - `NODE_ENV`: production
   - `CORS_ORIGIN`: URL do seu frontend

### Opção 2: Render
1. Acesse: https://render.com
2. Faça login com GitHub
3. Clique em "New" → "Web Service"
4. Conecte seu repositório
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment Variables**: Configure as mesmas variáveis do Railway

## 🐳 Docker

```bash
# Construir imagem
docker build -t catalog-cursos-api .

# Executar container
docker run -p 3000:3000 catalog-cursos-api
```

## 📝 Licença

MIT 