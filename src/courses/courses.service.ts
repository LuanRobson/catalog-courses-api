import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
import { Course } from './entities/course.entity';
import { PaginationResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll(query: QueryCourseDto): Promise<PaginationResponseDto<Course>> {
    const { page = 1, limit = 10, category, search } = query;
    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Buscar cursos com paginação
    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      data: courses,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    };
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // Verificar se o curso existe
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number): Promise<void> {
    // Verificar se o curso existe
    await this.findOne(id);

    await this.prisma.course.delete({
      where: { id },
    });
  }
} 