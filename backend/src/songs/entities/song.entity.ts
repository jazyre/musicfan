import { Playlist } from '../../playlists/entities/playlist.entity.js';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  audioPath: string;

  @Column()
  coverPath: string;

  @Column({ type: 'text', nullable: true })
  lyrics_en: string;

  @Column({ type: 'text', nullable: true })
  lyrics_fa: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  playlists: Playlist[];
}