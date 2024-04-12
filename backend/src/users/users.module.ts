import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedTask } from 'src/models/SharedTask.model';
import { Task } from 'src/models/Task.model';
import { User } from 'src/models/User.model';
import { UsersService } from './users.service';
import { UserResolver } from './UserResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, SharedTask])],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
