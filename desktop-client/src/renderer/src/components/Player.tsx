import React, { useState, useEffect, useRef } from 'react';
import usePlayerStore from '../store/playerStore';

const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume
  } = usePlayerStore();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Update time when audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleError = () => {
      setError('Error playing audio. Please check the file and try again.');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('error', handleError);
    };
  }, [setCurrentTime, setDuration, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error('Error playing audio:', err);
        setError('Error playing audio. Please check the file and try again.');
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    setVolume(vol);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleRetry = () => {
    setError(null);
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="player-container">
      <audio ref={audioRef} />
      
      {error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : currentSong ? (
        <div className="song-info">
          <p className="song-title">{currentSong.title}</p>
          <p className="song-artist">{currentSong.artist}</p>
        </div>
      ) : (
        <div className="song-info">
          <p className="song-title">No song selected</p>
          <p className="song-artist">Select a song to play</p>
        </div>
      )}
      
      <div className="player-controls">
        <button onClick={togglePlay} disabled={!currentSong || !!error}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar"
          disabled={!currentSong || !!error}
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{duration ? formatTime(duration) : '0:00'}</span>
        </div>
      </div>
      
      <div className="volume-container">
        <span>Volume:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          disabled={!currentSong || !!error}
        />
      </div>
    </div>
  );
};

export default Player;