import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User.model';
import { SharedTask } from './SharedTask.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: false })
  @Field()
  completed: boolean;

  @Column({ default: Date() })
  @Field()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @Field((type) => User, { nullable: true })
  author?: User;

  @OneToMany(() => SharedTask, (taskShare) => taskShare.task)
  @Field((type) => [SharedTask], { nullable: true })
  sharedWithUsers?: SharedTask[];
}
