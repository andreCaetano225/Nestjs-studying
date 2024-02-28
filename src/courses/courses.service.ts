import { HttpException, Injectable } from '@nestjs/common';
import { Courses } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { CreateCourseDTo } from './dto/create-courses.dto';
import { UpdateCourseDTo } from './dto/update-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private readonly coursesRepository: Repository<Courses>,

    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  async findAll() {
    return this.coursesRepository.find();
  }

  async findOne(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new HttpException(`Course ID ${id} not found nao encontrado`, 404);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDTo) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagsByName(name)),
    );
    const course = this.coursesRepository.create({
      ...createCourseDto,
      tags,
    });
    return this.coursesRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDTo) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagsByName(name)),
      ));

    const course = await this.coursesRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });
    if (!course) {
      throw new HttpException(`Course ID ${id} not found nao encontrado`, 404);
    }
    return this.coursesRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new HttpException(`Course ID ${id} not found nao encontrado`, 404);
    }
    return this.coursesRepository.remove(course);
  }

  private async preloadTagsByName(name: string): Promise<Tags> {
    const tags = await this.tagsRepository.findOne({
      where: { name },
    });
    if (tags) {
      return tags;
    }
    return this.tagsRepository.create({ name });
  }
}
