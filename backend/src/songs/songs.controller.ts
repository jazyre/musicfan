import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { SongsService } from './songs.service.js';
import { Song } from './entities/song.entity.js';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    const song = await this.songsService.findOne(id);
    if (!song) {
      throw new NotFoundException(`Song with ID #${id} not found`);
    }
    return song;
  }
}