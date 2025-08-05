import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    description: 'ID único da categoria',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Frontend',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Desenvolvimento frontend',
    required: false,
  })
  description?: string;

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