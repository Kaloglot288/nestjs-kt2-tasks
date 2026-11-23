import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Глобальный ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Настройка Swagger по адресу /api
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('APP_TITLE') || 'Tasks REST API')
    .setDescription(
      configService.get<string>('APP_DESCRIPTION') ||
        'Документация REST API для управления задачами',
    )
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(`Server started: http://localhost:${port}`);
  console.log(`Swagger docs:   http://localhost:${port}/api`);
}
bootstrap();
