import { HttpException, Injectable } from '@nestjs/common';
import { Courses } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Courses[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso de NestJS',
      tags: ['Node', 'Backend', 'Typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new HttpException(`Course ID ${id} not found nao encontrado`, 404);
    }

    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: number, updateCourseDto: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDto,
      };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}