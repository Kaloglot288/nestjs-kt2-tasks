import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Сдать КТ 2 по NestJS',
    description: 'Название задачи (минимум 3 символа)',
  })
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
  title: string;

  @ApiProperty({
    example: 'Подключить ValidationPipe, ConfigModule и Swagger UI',
    description: 'Подробное описание задачи',
  })
  @IsString({ message: 'Описание задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Описание задачи не может быть пустым' })
  description: string;
}
