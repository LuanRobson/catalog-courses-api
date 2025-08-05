#!/bin/bash

echo "🚀 Configurando API de Catálogo de Cursos..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js 18+"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm"
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo "🔧 Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Arquivo .env criado. Por favor, configure as variáveis de ambiente."
else
    echo "✅ Arquivo .env já existe."
fi

echo "🗄️ Configurando banco de dados..."
echo "📝 Gerando cliente Prisma..."
npm run db:generate

echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o arquivo .env com suas variáveis de ambiente"
echo "2. Execute: npm run db:migrate"
echo "3. Execute: npm run db:seed"
echo "4. Execute: npm run start:dev"
echo ""
echo "🌐 Documentação: http://localhost:3000/api/docs" 