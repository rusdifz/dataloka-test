import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ResponseErrorGlobal } from './middleware/interceptor/response/error'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ResponseErrorGlobal());
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
