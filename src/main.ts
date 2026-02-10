import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const port = process.env.PORT || 3000;

  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    logger.log('Database connected successfully');
  } else {
    logger.error('Database connection failed');
  }

  await app.listen(port);

  logger.log(`Application running on port: ${port}`);
}
bootstrap();
