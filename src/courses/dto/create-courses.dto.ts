import { IsString } from 'class-validator';

export class CreateCourseDTo {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString({ each: true })
  readonly tags: string[];
}
