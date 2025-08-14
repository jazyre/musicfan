import { fetchWithRetry } from '../utils/retry';

const API_BASE_URL = 'http://localhost:3000';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioPath: string;
  coverPath: string;
  lyrics_en?: string;
  lyrics_fa?: string;
}

interface Playlist {
  id: number;
  title: string;
  description?: string;
}

class MusicApi {
  // Fetch all songs
  async getSongs(): Promise<Song[]> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/songs`, undefined, {
        maxRetries: 3,
        delay: 1000,
        exponentialBackoff: true
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch songs:', error);
      throw new Error('Failed to fetch songs after multiple attempts. Please check your connection and try again.');
    }
  }

  // Fetch a single song by ID
  async getSong(id: number): Promise<Song> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/songs/${id}`, undefined, {
        maxRetries: 3,
        delay: 1000,
        exponentialBackoff: true
      });
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch song #${id}:`, error);
      throw new Error(`Failed to fetch song after multiple attempts. Please check your connection and try again.`);
    }
  }

  // Fetch all playlists
  async getPlaylists(): Promise<Playlist[]> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/playlists`, undefined, {
        maxRetries: 3,
        delay: 1000,
        exponentialBackoff: true
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
      throw new Error('Failed to fetch playlists after multiple attempts. Please check your connection and try again.');
    }
  }

  // Fetch a single playlist by ID
  async getPlaylist(id: number): Promise<Playlist> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/playlists/${id}`, undefined, {
        maxRetries: 3,
        delay: 1000,
        exponentialBackoff: true
      });
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch playlist #${id}:`, error);
      throw new Error(`Failed to fetch playlist after multiple attempts. Please check your connection and try again.`);
    }
  }
}

export default new MusicApi();