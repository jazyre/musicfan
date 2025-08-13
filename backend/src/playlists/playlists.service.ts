import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity.js';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,
  ) {}

  findAll(): Promise<Playlist[]> {
    return this.playlistsRepository.find({ relations: ['songs'] });
  }

  findOne(id: number): Promise<Playlist | null> {
    return this.playlistsRepository.findOne({
      where: { id },
      relations: ['songs'],
    });
  }
}