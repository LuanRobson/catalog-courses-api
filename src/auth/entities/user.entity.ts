import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Role do usuário',
    example: 'user',
  })
  role: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T00:00:00.000Z',
  })
  updatedAt: Date;
} 