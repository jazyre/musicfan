import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { DataSource } from 'typeorm';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import AdminJSExpress from '@adminjs/express';
import { User } from './users/entities/user.entity.js';
import { Song } from './songs/entities/song.entity.js';
import { Playlist } from './playlists/entities/playlist.entity.js';
import { componentLoader } from './admin/component-loader.js';
import uploadFeature from '@adminjs/upload';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

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
  
  // ثبت آداپتور TypeORM
  AdminJS.registerAdapter({ Database, Resource });

  // دریافت DataSource و ConfigService از اپلیکیشن NestJS پس از راه‌اندازی
  const dataSource = app.get(DataSource);
  const configService = app.get(ConfigService);
  
  // ایجاد نمونه AdminJS
  const admin = new AdminJS({
    branding: {
      companyName: 'Music Management System',
    },
    rootPath: '/admin',
    resources: [
      { resource: User, options: { listProperties: ['id', 'username'] } },
      {
        resource: Song,
        options: {
          properties: {
            lyrics_en: { type: 'textarea' },
            lyrics_fa: { type: 'textarea' },
          },
        },
        features: [
          uploadFeature({
            componentLoader,
            provider: { local: { bucket: 'uploads/audio', opts: { baseUrl: '/uploads/audio' } } },
            uploadPath: (record, filename) => `${record.id()}-${filename}`,
            properties: {
              key: 'audioPath',
              file: 'uploadAudio',
              filePath: 'audioPath',
              filesToDelete: 'audioPath',
            },
          }),
          uploadFeature({
            componentLoader,
            provider: { local: { bucket: 'uploads/covers', opts: { baseUrl: '/uploads/covers' } } },
            uploadPath: (record, filename) => `${record.id()}-cover-${filename}`,
            properties: {
              key: 'coverPath',
              file: 'uploadCover',
              filePath: 'coverPath',
              filesToDelete: 'coverPath',
            },
          }),
        ],
      },
      { resource: Playlist },
    ],
  });
  
  // ساخت روتر AdminJS با تنظیمات احراز هویت
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        const userRepo = dataSource.getRepository(User);
        const user = await userRepo.findOneBy({ username: email });
        if (user) {
          const matched = await bcrypt.compare(password, user.password);
          if (matched) {
            return user;
          }
        }
        return null;
      },
      cookieName: 'admin-session',
      cookiePassword: configService.get('ADMIN_COOKIE_PASSWORD', 'a-secret-password'),
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: configService.get('ADMIN_SESSION_SECRET', 'a-super-secret'),
    }
  );

  // اتصال روتر به اپلیکیشن
  app.use(admin.options.rootPath, adminRouter);
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`);
}

bootstrap();