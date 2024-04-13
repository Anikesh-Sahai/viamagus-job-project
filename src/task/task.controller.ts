import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async findAllTask(): Promise<Task[]> {
    return this.taskService.findAllTask();
  }

  @Post()
  // @UseGuards(AuthGuard())
  async createtask(
    @Body()
    task,
  ): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get(':id')
  async getTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }

    return this.taskService.findTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id')
    id: string,
    @Body()
    task,
  ): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }
    return this.taskService.UpdateTaskById(id, task);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }
    return this.taskService.deleteTaskById(id);
  }

  @Get('/assignee/:id')
  async getTaskByAssignee(
    @Param('id')
    id: string,
  ): Promise<Task[]> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }

    return this.taskService.findTaskByAssignee(id);
  }
}
