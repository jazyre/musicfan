import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';
import { SongsModule } from './songs/songs.module.js';
import { PlaylistsModule } from './playlists/playlists.module.js';
import { AdminModule } from './admin/admin.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { User } from './users/entities/user.entity.js';
import { Song } from './songs/entities/song.entity.js';
import { Playlist } from './playlists/entities/playlist.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Song, Playlist],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SongsModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}