import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedTask } from 'src/models/SharedTask.model';
import { Task } from 'src/models/Task.model';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(SharedTask)
    private sharedTaskRepository: Repository<SharedTask>,
    private userService: UsersService,
  ) {}

  async findAll() {
    return await this.taskRepository.find();
  }

  async findById(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User Not Found!');
    }
    return await this.taskRepository.find({ where: { author: user } });
  }

  async createTask(title: string, description: string, authorId: number) {
    const author = await this.userService.findById(authorId);
    if (!author) {
      throw new Error('User Not Found!');
    }
    const newTask = this.taskRepository.create({ title, description, author });
    return await this.taskRepository.save(newTask);
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ) {
    const taskToUpdate = await this.taskRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!taskToUpdate) {
      throw new Error('Task Not Found!');
    }
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.completed = completed;
    return await this.taskRepository.save(taskToUpdate);
  }

  async createSharedTask(sharedWithUserEmail: string, taskId: number) {
    const sharedWithUser = await this.userService.findByEmail(sharedWithUserEmail);
    if (!sharedWithUser) {
      throw new Error('Shared With User Not Found!');
    }
    const task = await this.findById(taskId);
    if (!task) {
      throw new Error('Task Not Found!');
    }
    const newSharedTask = this.sharedTaskRepository.create({
      sharedUser: sharedWithUser,
      task,
    });
    return await this.sharedTaskRepository.save(newSharedTask);
  }

  async deleteSharedTaskByUserIdAndTaskId(userId: number, taskId: number) {
    const sharedTaskToDelete = await this.sharedTaskRepository.findOne({
      where: {
        sharedUser: { id: userId },
        task: { id: taskId },
      },
    });
    if (!sharedTaskToDelete) {
      throw new Error('Shared Task Not Found!');
    }
    await this.sharedTaskRepository.remove(sharedTaskToDelete);
    return true;
  }
}
