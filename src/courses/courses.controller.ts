import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTo } from './dto/create-courses.dto';
import { UpdateCourseDTo } from './dto/update-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDTo) {
    return this.coursesService.create(createCourseDTO);
  }
  @Put(':id')
  updade(@Param('id') id: number, @Body() updateCouseDTO: UpdateCourseDTo) {
    return this.coursesService.update(id, updateCouseDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }
}
