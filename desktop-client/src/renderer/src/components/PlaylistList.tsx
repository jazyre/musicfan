import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Playlist {
  id: number;
  title: string;
  description?: string;
}

const PlaylistList: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch playlists from API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getPlaylists();
        setPlaylists(data);
      } catch (err) {
        setError('Failed to fetch playlists. Please check your connection and try again.');
        console.error('Failed to fetch playlists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistSelect = (playlist: Playlist) => {
    // In a real app, this would load the playlist songs
    console.log('Selected playlist:', playlist);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading playlists...</p>
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
    <div id="playlist-list">
      {playlists.map((playlist) => (
        <div 
          key={playlist.id} 
          className="playlist-item"
          onClick={() => handlePlaylistSelect(playlist)}
        >
          <h4>{playlist.title}</h4>
          {playlist.description && <p>{playlist.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;