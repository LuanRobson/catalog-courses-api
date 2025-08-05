const { Client } = require('pg');

async function testSupabaseConnection() {
  const connectionString = 'postgresql://postgres:Luan5050%23@db.hjqipqsorkciwifuasoj.supabase.co:5432/postgres';
  
  console.log('🔗 Testando conexão direta com Supabase...');
  console.log('URL:', connectionString);
  
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Conexão direta bem-sucedida!');
    
    // Testar uma query simples
    const result = await client.query('SELECT COUNT(*) FROM "Category"');
    console.log(`📊 Total de categorias: ${result.rows[0].count}`);
    
    await client.end();
    console.log('✅ Teste concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro na conexão direta:', error.message);
    console.error('Detalhes:', error);
  }
}

testSupabaseConnection(); 