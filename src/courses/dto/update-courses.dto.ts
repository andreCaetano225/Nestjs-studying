import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDTo } from './create-courses.dto';

export class UpdateCourseDTo extends PartialType(CreateCourseDTo) {}
