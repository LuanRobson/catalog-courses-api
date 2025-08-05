const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

// Ler o arquivo .env atual
let envContent = fs.readFileSync(envPath, 'utf8');

// Substituir as URLs com # por %23
envContent = envContent.replace(
  /DATABASE_URL=postgresql:\/\/postgres:Luan5050#@db\.hjqipqsorkciwifuasoj\.supabase\.co:5432\/postgres/g,
  'DATABASE_URL=postgresql://postgres:Luan5050%23@db.hjqipqsorkciwifuasoj.supabase.co:5432/postgres'
);

envContent = envContent.replace(
  /DIRECT_URL=postgresql:\/\/postgres:Luan5050#@db\.hjqipqsorkciwifuasoj\.supabase\.co:5432\/postgres/g,
  'DIRECT_URL=postgresql://postgres:Luan5050%23@db.hjqipqsorkciwifuasoj.supabase.co:5432/postgres'
);

// Escrever o arquivo atualizado
fs.writeFileSync(envPath, envContent);

console.log('✅ Arquivo .env atualizado com sucesso!');
console.log('📝 URLs corrigidas: # → %23'); 