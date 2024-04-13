import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async findAllTask(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async createTask(task: Task): Promise<Task> {
    const res = await this.taskModel.create(task);
    return res;
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  async UpdateTaskById(id: string, task: Task): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTaskById(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async findTaskByAssignee(id: string): Promise<Task[]> {
    const task = await this.taskModel.find({ assignee: id });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }
}
