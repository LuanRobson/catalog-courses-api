# 🚀 Guia de Deploy no Render

## 📋 Pré-requisitos

1. ✅ Conta no Supabase configurada
2. ✅ Projeto no GitHub com o código
3. ✅ Conta no Render

## 🔧 Configuração no Render

### 1. Criar Novo Serviço Web

1. Acesse [render.com](https://render.com)
2. Clique em **New +** → **Web Service**
3. Conecte seu repositório GitHub
4. Selecione o repositório `catalog-courses-api`

### 2. Configurar Build Settings

- **Name**: `catalog-cursos-api`
- **Environment**: `Node`
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm run start:prod`

### 3. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis no painel do Render:

#### 🔐 Variáveis Obrigatórias

```env
# Database - Supabase
DATABASE_URL=postgresql://postgres:Luan5050%23@db.hjqipqsorkciwifuasoj.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Luan5050%23@db.hjqipqsorkciwifuasoj.supabase.co:5432/postgres

# JWT
JWT_SECRET=sua-chave-super-secreta-aqui-mude-em-producao
JWT_EXPIRES_IN=7d

# Server
NODE_ENV=production
PORT=10000

# CORS
CORS_ORIGIN=https://seu-frontend.vercel.app
```

#### 📝 Como Adicionar no Render

1. Vá para **Environment** no painel do serviço
2. Clique em **Add Environment Variable**
3. Adicione cada variável uma por vez

### 4. Configurar Health Check

- **Health Check Path**: `/api/v1/categories`
- **Health Check Timeout**: `100`

## 🧪 Testando o Deploy

### 1. Verificar Build

Após o deploy, verifique se o build foi bem-sucedido nos logs.

### 2. Testar Conexão

Execute o script de verificação:

```bash
npm run verify:deploy
```

### 3. Testar Endpoints

```bash
# Health check
curl https://seu-app.onrender.com/api/v1/categories

# Login
curl -X POST https://seu-app.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Cursos
curl https://seu-app.onrender.com/api/v1/courses
```

## 🔍 Troubleshooting

### ❌ Erro: "Can't reach database server"

**Causa**: Variáveis de ambiente não configuradas

**Solução**:
1. Verifique se `DATABASE_URL` e `DIRECT_URL` estão configuradas
2. Teste a conexão localmente primeiro
3. Verifique se o Supabase está ativo

### ❌ Erro: "JWT_SECRET not configured"

**Solução**: Adicione a variável `JWT_SECRET` no Render

### ❌ Erro: "CORS error"

**Solução**: Configure `CORS_ORIGIN` com a URL do seu frontend

### ❌ Erro: "Health check failed"

**Solução**: 
1. Verifique se o banco está populado
2. Execute o seed: `npm run db:seed`
3. Verifique se a rota `/api/v1/categories` está funcionando

## 📊 Monitoramento

### Logs do Render

Acesse **Logs** no painel do Render para ver:
- Build logs
- Runtime logs
- Error logs

### Métricas

- **Uptime**: Monitorado automaticamente
- **Response Time**: Disponível nos logs
- **Error Rate**: Verificado via health check

## 🔄 Atualizações

Para atualizar o deploy:

1. Faça push para o GitHub
2. O Render fará deploy automático
3. Verifique os logs para confirmar sucesso

## 🎯 URLs Importantes

- **API**: `https://seu-app.onrender.com`
- **Health Check**: `https://seu-app.onrender.com/api/v1/categories`
- **Supabase Dashboard**: https://supabase.com/dashboard

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no Render
2. Teste localmente primeiro
3. Verifique as variáveis de ambiente
4. Execute `npm run verify:deploy`

---

**🎉 Seu deploy está pronto quando:**
- ✅ Build bem-sucedido
- ✅ Health check passando
- ✅ Endpoints respondendo
- ✅ Logs sem erros 