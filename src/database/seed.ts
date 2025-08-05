import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar categorias
  const categories = [
    {
      name: 'Frontend',
      description: 'Desenvolvimento frontend',
    },
    {
      name: 'Backend',
      description: 'Desenvolvimento backend',
    },
    {
      name: 'Mobile',
      description: 'Desenvolvimento mobile',
    },
    {
      name: 'DevOps',
      description: 'DevOps e infraestrutura',
    },
    {
      name: 'Data Science',
      description: 'Ciência de dados e IA',
    },
  ];

  console.log('📂 Criando categorias...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Criar usuário admin
  console.log('👤 Criando usuário admin...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Criar cursos de exemplo
  const courses = [
    {
      name: 'Angular para Iniciantes',
      category: 'Frontend',
      description: 'Aprenda os fundamentos do Angular, incluindo componentes, serviços, roteamento e muito mais. Este curso é perfeito para quem está começando com Angular.',
      workload: 40,
    },
    {
      name: 'React Avançado',
      category: 'Frontend',
      description: 'Técnicas avançadas de React incluindo hooks personalizados, context API, performance optimization e padrões de projeto.',
      workload: 60,
    },
    {
      name: 'Node.js e Express',
      category: 'Backend',
      description: 'Desenvolva APIs RESTful com Node.js e Express. Aprenda sobre middleware, autenticação, validação e boas práticas.',
      workload: 50,
    },
    {
      name: 'Python para Data Science',
      category: 'Data Science',
      description: 'Introdução à ciência de dados com Python. Aprenda pandas, numpy, matplotlib e scikit-learn.',
      workload: 80,
    },
    {
      name: 'Docker e Kubernetes',
      category: 'DevOps',
      description: 'Containerização e orquestração com Docker e Kubernetes. Deploy de aplicações em containers.',
      workload: 45,
    },
    {
      name: 'React Native',
      category: 'Mobile',
      description: 'Desenvolva aplicações mobile multiplataforma com React Native. Aprenda sobre navegação, APIs nativas e publicação.',
      workload: 70,
    },
  ];

  console.log('📚 Criando cursos...');
  for (const course of courses) {
    await prisma.course.create({
      data: course,
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log('');
  console.log('📋 Dados criados:');
  console.log(`- ${categories.length} categorias`);
  console.log(`- 1 usuário admin (admin@example.com / admin123)`);
  console.log(`- ${courses.length} cursos`);
  console.log('');
  console.log('🔑 Credenciais do admin:');
  console.log('Email: admin@example.com');
  console.log('Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 