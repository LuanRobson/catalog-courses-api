const { PrismaClient } = require('@prisma/client');

async function verifyDeploy() {
  console.log('🔍 Verificando configuração do deploy...');
  
  // Verificar variáveis de ambiente
  const requiredEnvVars = [
    'DATABASE_URL',
    'DIRECT_URL',
    'JWT_SECRET',
    'NODE_ENV',
    'PORT'
  ];
  
  console.log('\n📋 Variáveis de ambiente:');
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName.includes('SECRET') ? '***' : value.substring(0, 50)}...`);
    } else {
      console.log(`❌ ${varName}: NÃO CONFIGURADA`);
    }
  });
  
  // Testar conexão com banco
  if (process.env.DATABASE_URL) {
    console.log('\n🔗 Testando conexão com banco de dados...');
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      console.log('✅ Conexão com banco estabelecida!');
      
      // Testar query simples
      const categoriesCount = await prisma.category.count();
      console.log(`📊 Total de categorias: ${categoriesCount}`);
      
      await prisma.$disconnect();
      console.log('✅ Teste de banco concluído!');
    } catch (error) {
      console.error('❌ Erro na conexão com banco:', error.message);
    }
  } else {
    console.log('❌ DATABASE_URL não configurada');
  }
  
  console.log('\n🎯 Status do deploy:');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`PORT: ${process.env.PORT}`);
  console.log(`CORS_ORIGIN: ${process.env.CORS_ORIGIN || 'Não configurado'}`);
}

verifyDeploy().catch(console.error); 