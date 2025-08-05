import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryCourseDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtrar por categoria',
    example: 'Frontend',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Buscar por nome ou descrição',
    example: 'Angular',
  })
  @IsOptional()
  @IsString()
  search?: string;
} 