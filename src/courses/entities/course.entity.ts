import { ApiProperty } from '@nestjs/swagger';

export class Course {
  @ApiProperty({
    description: 'ID único do curso',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do curso',
    example: 'Angular para Iniciantes',
  })
  name: string;

  @ApiProperty({
    description: 'Categoria do curso',
    example: 'Frontend',
  })
  category: string;

  @ApiProperty({
    description: 'Descrição do curso',
    example: 'Aprenda os fundamentos do Angular...',
  })
  description: string;

  @ApiProperty({
    description: 'Carga horária em horas',
    example: 40,
  })
  workload: number;

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