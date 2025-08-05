#!/bin/bash

echo "🗄️ Configurando Supabase para API de Cursos..."
echo ""

echo "📋 Instruções:"
echo "1. Acesse: https://supabase.com"
echo "2. Faça login com GitHub"
echo "3. Clique em 'New Project'"
echo "4. Configure:"
echo "   - Nome: catalog-cursos-api"
echo "   - Database Password: (crie uma senha forte)"
echo "   - Region: São Paulo"
echo "5. Clique em 'Create new project'"
echo ""

echo "🔗 Após criar o projeto:"
echo "1. Vá em Settings → Database"
echo "2. Copie a 'Connection string'"
echo "3. Cole abaixo:"
echo ""

read -p "Cole a URL do Supabase aqui: " SUPABASE_URL

if [ -z "$SUPABASE_URL" ]; then
    echo "❌ URL não fornecida. Saindo..."
    exit 1
fi

echo ""
echo "🔧 Configurando arquivo .env..."

# Criar arquivo .env
cat > .env << EOF
# Database - Supabase
DATABASE_URL="$SUPABASE_URL"
DIRECT_URL="$SUPABASE_URL"

# JWT
JWT_SECRET="$(openssl rand -base64 32)"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:4200"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

echo "✅ Arquivo .env configurado!"
echo ""

echo "🗄️ Configurando banco de dados..."
echo "📝 Gerando cliente Prisma..."
npx prisma generate

echo "🔄 Executando migrações..."
npx prisma migrate dev --name init

echo "🌱 Populando banco com dados..."
npm run db:seed

echo ""
echo "🎉 Configuração do Supabase concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Teste localmente: npm run start:dev"
echo "2. Faça commit: git add . && git commit -m 'Configurar Supabase'"
echo "3. Deploy: Configure Railway ou Render"
echo ""
echo "🌐 URLs:"
echo "- Local: http://localhost:3000/api/v1"
echo "- Docs: http://localhost:3000/api/docs" 