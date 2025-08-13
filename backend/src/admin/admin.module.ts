import { Module } from '@nestjs/common';
import AdminJS, { AdminJSOptions, buildFeature, CurrentAdmin } from 'adminjs';
import { AdminModule as AdminJSModule, AdminModuleOptions } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { User } from '../users/entities/user.entity';
import { Song } from '../songs/entities/song.entity';
import { Playlist } from '../playlists/entities/playlist.entity';
import { componentLoader } from './component-loader';

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
                buildFeature({
                  componentLoader,
                  provider: { local: { bucket: 'uploads/audio', opts: { baseUrl: '/uploads/audio' } } },
                  uploadPath: 'uploads/audio',
                }),
                buildFeature({
                  componentLoader,
                  provider: { local: { bucket: 'uploads/covers', opts: { baseUrl: '/uploads/covers' } } },
                  uploadPath: 'uploads/covers',
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
