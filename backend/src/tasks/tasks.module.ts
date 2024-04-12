import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedTask } from 'src/models/SharedTask.model';
import { Task } from 'src/models/Task.model';
import { User } from 'src/models/User.model';
import { TasksService } from './tasks.service';
import { UsersService } from 'src/users/users.service';
import { TaskResolver } from './TaskResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, SharedTask])],
  providers: [TasksService, UsersService, TaskResolver],
})
export class TasksModule {}
