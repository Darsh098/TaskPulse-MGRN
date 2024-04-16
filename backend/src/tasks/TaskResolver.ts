import { Resolver, Query, Args, Context, Int, Mutation } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from 'src/models/Task.model';
import { SharedTask } from 'src/models/SharedTask.model';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query((returns) => [Task])
  async getAllTasks() {
    return await this.taskService.findAll();
  }

  @Query((returns) => Task)
  async getTaskById(@Args('id', { type: () => Int }) id: number) {
    return await this.taskService.findById(id);
  }

  @Query((returns) => [Task])
  async getTasksByUser(@Args('userId', { type: () => Int }) userId: number) {
    return await this.taskService.findByUserId(userId);
  }

  @Mutation((returns) => Task)
  async createTask(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('authorId', { type: () => Int }) authorId: number,
  ) {
    return await this.taskService.createTask(title, description, authorId);
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    return await this.taskService.updateTask(id, title, description);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('taskId', { type: () => Int }) taskId: number) {
    return this.taskService.deleteTask(taskId);
  }

  @Mutation((returns) => SharedTask)
  async createSharedTask(
    @Args('sharedWithUserEmail') sharedWithUserEmail: string,
    @Args('taskId', { type: () => Int }) taskId: number,
  ) {
    return await this.taskService.createSharedTask(sharedWithUserEmail, taskId);
  }

  @Mutation((returns) => Boolean)
  async deleteSharedTaskByUserIdAndTaskId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('taskId', { type: () => Int }) taskId: number,
  ) {
    return await this.taskService.deleteSharedTaskByUserIdAndTaskId(
      userId,
      taskId,
    );
  }

  @Mutation((returns) => Task)
  async markTaskAsComplete(
    @Args('taskId', { type: () => Int }) taskId: number,
  ) {
    return await this.taskService.markTaskAsComplete(taskId);
  }

  @Query(() => [Task])
  async sharedTasksByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.taskService.findSharedTasksByUserId(userId);
  }
}
