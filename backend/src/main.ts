import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { mkdir } from 'fs/promises';
import { join } from 'path';

// تابعی برای اطمینان از وجود پوشه‌های آپلود
async function ensureUploadsDirectoriesExist() {
  try {
    // مسیرها باید نسبت به ریشه پروژه باشند
    await mkdir(join(process.cwd(), 'uploads', 'audio'), { recursive: true });
    await mkdir(join(process.cwd(), 'uploads', 'covers'), { recursive: true });
    console.log('Upload directories are ready.');
  } catch (error) {
    console.error('Error creating upload directories:', error);
    // در صورت بروز خطا، برنامه را متوقف می‌کنیم
    process.exit(1);
  }
}

async function bootstrap() {
  // قبل از اجرای برنامه، از وجود پوشه‌ها اطمینان حاصل می‌کنیم
  await ensureUploadsDirectoriesExist();

  const app = await NestFactory.create(AppModule);

  // فعال کردن CORS برای ارتباط کلاینت دسکتاپ با سرور
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();