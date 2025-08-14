import { Module } from '@nestjs/common';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { User } from '../users/entities/user.entity.js';
import { Song } from '../songs/entities/song.entity.js';
import { Playlist } from '../playlists/entities/playlist.entity.js';
import { componentLoader } from './component-loader.js';

// Register the TypeORM adapter
import AdminJS from 'adminjs';
AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    NestAdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          branding: {
            companyName: 'Music Management System',
          },
          rootPath: '/admin',
          resources: [
            User,
            Song,
            Playlist,
          ],
          componentLoader,
        },
        auth: {
          authenticate: async (email: string, password: string) => {
            // For development, always authenticate
            if (email === 'admin' && password === 'password') {
              return { email };
            }
            return null;
          },
          cookieName: 'adminjs',
          cookiePassword: 'admin-secret-password',
        },
      }),
    }),
  ],
  exports: [NestAdminModule],
})
export class AdminModule {}