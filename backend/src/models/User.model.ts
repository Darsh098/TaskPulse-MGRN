import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task.model';
import { SharedTask } from './SharedTask.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  googleId: string;

  @Column()
  @Field()
  displayName: string;

  @Column({unique:true})
  @Field()
  email: string;

  @OneToMany(() => Task, (task) => task.author)
  @Field((type) => [Task], { nullable: true })
  tasks?: Task[];

  @OneToMany(() => SharedTask, (taskShare) => taskShare.sharedUser)
  @Field((type) => [SharedTask], { nullable: true })
  sharedTasks?: SharedTask[];
}
