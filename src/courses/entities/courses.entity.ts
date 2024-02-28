import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity('courses')
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Tags, (tags) => tags.courses, {
    cascade: true,
  })
  tags: Tags[];
}
