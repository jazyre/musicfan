import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { mkdir } from 'fs/promises';
import { join } from 'path';

// تابع ایجاد پوشه‌ها بدون تغییر باقی می‌ماند
async function ensureUploadsDirectoriesExist() {
  try {
    await mkdir(join(process.cwd(), 'uploads', 'audio'), { recursive: true });
    await mkdir(join(process.cwd(), 'uploads', 'covers'), { recursive: true });
    console.log('Upload directories are ready.');
  } catch (error) {
    console.error('Error creating upload directories:', error);
    process.exit(1);
  }
}

async function bootstrap() {
  await ensureUploadsDirectoriesExist();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server started on http://0.0.0.0:${port}`);
  console.log(`Admin panel available at http://0.0.0.0:${port}/admin`);
  console.log(`Hello endpoint available at http://0.0.0.0:${port}/hello`);
}

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED_REJECTION', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT_EXCEPTION', error);
  process.exit(1);
});

bootstrap().catch((error) => {
  console.error('BOOTSTRAP_ERROR', error);
  process.exit(1);
});