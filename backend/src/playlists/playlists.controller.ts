import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PlaylistsService } from './playlists.service.js';
import { Playlist } from './entities/playlist.entity.js';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  findAll(): Promise<Playlist[]> {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Playlist> {
    const playlist = await this.playlistsService.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID #${id} not found`);
    }
    return playlist;
  }
}