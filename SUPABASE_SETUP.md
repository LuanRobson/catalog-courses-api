# 🗄️ Guia Visual - Configurar Supabase

## 📋 Passo a Passo

### 1. **Criar Conta no Supabase**
- Acesse: https://supabase.com
- Clique em "Start your project"
- Faça login com GitHub

### 2. **Criar Novo Projeto**
- Clique em "New Project"
- Preencha:
  - **Nome**: `catalog-cursos-api`
  - **Database Password**: `MinhaSenha123!` (ou sua senha)
  - **Region**: São Paulo
- Clique em "Create new project"

### 3. **Obter URL de Conexão**
- Vá em **Settings** (ícone de engrenagem)
- Clique em **Database**
- Copie a **Connection string**
- Exemplo: `postgresql://postgres:MinhaSenha123!@db.abcdefghijklmnop.supabase.co:5432/postgres`

### 4. **Configurar Localmente**

#### Opção A: Script Automático
```bash
chmod +x scripts/setup-supabase.sh
./scripts/setup-supabase.sh
```

#### Opção B: Manual
1. **Criar arquivo .env**:
```env
# Database - Supabase
DATABASE_URL="postgresql://postgres:MinhaSenha123!@db.abcdefghijklmnop.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:MinhaSenha123!@db.abcdefghijklmnop.supabase.co:5432/postgres"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:4200"
```

2. **Executar comandos**:
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev --name init

# Popular banco
npm run db:seed

# Testar
npm run start:dev
```

### 5. **Verificar Configuração**

Teste os endpoints:
```bash
# Categorias
curl http://localhost:3000/api/v1/categories

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Cursos
curl http://localhost:3000/api/v1/courses
```

## 🔧 Troubleshooting

### Problema: Erro de conexão
**Solução**: Verifique se a URL do Supabase está correta

### Problema: Erro de migração
**Solução**: Execute `npx prisma migrate reset` e depois `npx prisma migrate dev`

### Problema: Erro de CORS
**Solução**: Verifique se `CORS_ORIGIN` está configurado corretamente

## 📊 Benefícios do Supabase

- ✅ **Gratuito** até 500MB
- ✅ **PostgreSQL** completo
- ✅ **Backup automático**
- ✅ **Interface web** para gerenciar dados
- ✅ **APIs REST** automáticas
- ✅ **Autenticação** integrada
- ✅ **Real-time** subscriptions

## 🚀 Próximo Passo

Após configurar o Supabase, você pode fazer o deploy da API no Railway ou Render! 