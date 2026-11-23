import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.interface';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех задач' })
  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    required: false,
    description: 'Фильтрация задач по статусу',
  })
  @ApiResponse({ status: 200, description: 'Список задач успешно получен' })
  findAll(@Query('status') status?: TaskStatus): Task[] {
    return this.tasksService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiParam({ name: 'id', example: '1', description: 'Идентификатор задачи' })
  @ApiResponse({ status: 200, description: 'Задача найдена' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiResponse({ status: 201, description: 'Задача успешно создана' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации входных данных' })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить существующую задачу' })
  @ApiParam({ name: 'id', example: '1', description: 'Идентификатор задачи' })
  @ApiResponse({ status: 200, description: 'Задача успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации входных данных' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiParam({ name: 'id', example: '1', description: 'Идентификатор задачи' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  remove(@Param('id') id: string): { deleted: boolean; id: string } {
    return this.tasksService.remove(id);
  }
}
