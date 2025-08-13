import { Song } from '../../songs/entities/song.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Song, (song) => song.playlists, { cascade: true })
  @JoinTable({
    name: 'playlist_songs_song', // table name for the junction table
    joinColumn: {
      name: 'playlist',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'song',
      referencedColumnName: 'id',
    },
  })
  songs: Song[];
}
