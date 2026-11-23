import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Сдать КТ 2 по NestJS на 10 баллов',
    description: 'Новое название задачи',
  })
  @IsOptional()
  @IsString({ message: 'Название задачи должно быть строкой' })
  @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
  title?: string;

  @ApiPropertyOptional({
    example: 'Проверить все эндпоинты в Swagger по адресу /api',
    description: 'Новое описание задачи',
  })
  @IsOptional()
  @IsString({ message: 'Описание задачи должно быть строкой' })
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Новый статус задачи (OPEN, IN_PROGRESS, DONE)',
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Статус должен быть одним из значений: OPEN, IN_PROGRESS, DONE',
  })
  status?: TaskStatus;
}
