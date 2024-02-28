import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Courses } from './courses.entity';

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Courses, (courses) => courses.tags)
  courses: Courses[];
}
