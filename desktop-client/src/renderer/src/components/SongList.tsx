import React, { useState, useEffect } from 'react';
import usePlayerStore from '../store/playerStore';
import api from '../services/api';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioPath: string;
  coverPath: string;
  lyrics_en?: string;
  lyrics_fa?: string;
}

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentSong, setIsPlaying } = usePlayerStore();

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getSongs();
        setSongs(data);
      } catch (err) {
        setError('Failed to fetch songs. Please check your connection and try again.');
        console.error('Failed to fetch songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div id="song-list">
      {songs.map((song) => (
        <div 
          key={song.id} 
          className="song-item"
          onClick={() => handleSongSelect(song)}
        >
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default SongList;