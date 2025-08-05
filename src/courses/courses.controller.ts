import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
import { Course } from './entities/course.entity';
import { PaginationResponseDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Cursos')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Criar um novo curso' })
  @ApiResponse({
    status: 201,
    description: 'Curso criado com sucesso',
    type: Course,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cursos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Lista de cursos retornada com sucesso',
    type: PaginationResponseDto<Course>,
  })
  findAll(@Query() query: QueryCourseDto): Promise<PaginationResponseDto<Course>> {
    return this.coursesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um curso específico' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado com sucesso',
    type: Course,
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Atualizar um curso' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiResponse({
    status: 200,
    description: 'Curso atualizado com sucesso',
    type: Course,
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um curso' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiResponse({
    status: 204,
    description: 'Curso removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso não encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.coursesService.remove(id);
  }
} 