import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log das variáveis de ambiente (apenas em desenvolvimento)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔍 Variáveis de ambiente:');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurada' : '❌ Não configurada');
    console.log('DIRECT_URL:', process.env.DIRECT_URL ? '✅ Configurada' : '❌ Não configurada');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Configurada' : '❌ Não configurada');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
  }

  // Configuração do CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  });

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Catálogo de Cursos API')
    .setDescription('API REST para gerenciamento de cursos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Prefixo global da API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Aplicação rodando na porta ${port}`);
  console.log(`📚 Documentação disponível em: http://localhost:${port}/api/docs`);
}

bootstrap(); 