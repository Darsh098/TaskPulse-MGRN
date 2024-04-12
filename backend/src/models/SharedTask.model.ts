import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';
import { Task } from './Task.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class SharedTask {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.sharedTasks)
  @Field((type) => User)
  sharedUser: User;

  @ManyToOne(() => Task, (task) => task.sharedWithUsers)
  @Field((type) => Task)
  task: Task;
}
