import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Пример задачи',
      description: 'Тестовая задача по умолчанию',
      status: TaskStatus.OPEN,
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(status?: TaskStatus): Task[] {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID "${id}" не найдена`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: string): { deleted: boolean; id: string } {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Задача с ID "${id}" не найдена`);
    }
    this.tasks.splice(index, 1);
    return { deleted: true, id };
  }
}
