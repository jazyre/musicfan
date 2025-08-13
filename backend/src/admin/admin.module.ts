import { Module } from '@nestjs/common';
import AdminJS, { AdminJSOptions, CurrentAdmin } from 'adminjs';
import { AdminModule as AdminJSModule, AdminModuleOptions } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import uploadFeature from '@adminjs/upload';

import { User } from '../users/entities/user.entity.js';
import { Song } from '../songs/entities/song.entity.js';
import { Playlist } from '../playlists/entities/playlist.entity.js';
import { componentLoader } from './component-loader.js';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      imports: [],
      inject: [DataSource, ConfigService],
      useFactory: (dataSource: DataSource, configService: ConfigService): AdminModuleOptions => ({
        adminJsOptions: {
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
                  uploadPath: (record, filename) => `${record.get('id')}-${filename}`,
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
                  uploadPath: (record, filename) => `${record.get('id')}-cover-${filename}`,
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
          branding: {
            companyName: 'Music Management System',
          },
        },
        auth: {
          authenticate: async (email, password): Promise<CurrentAdmin | null> => {
            const userRepo = dataSource.getRepository(User);
            const user = await userRepo.findOneBy({ username: email });
            if (user) {
              const matched = await bcrypt.compare(password, user.password);
              if (matched) {
                return {
                  ...user,
                  id: user.id.toString(),
                  email: user.username,
                  title: user.username,
                };
              }
            }
            return null;
          },
          cookieName: 'admin-session',
          cookiePassword: configService.get('ADMIN_COOKIE_PASSWORD', 'a-secret-password'),
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: configService.get('ADMIN_SESSION_SECRET', 'a-super-secret'),
        },
      }),
    }),
  ],
})
export class AdminModule {}