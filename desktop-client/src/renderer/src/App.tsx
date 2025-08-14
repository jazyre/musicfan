import React, { Component, ReactNode } from 'react';
import './App.css';
import Player from './components/Player';
import SongList from './components/SongList';
import PlaylistList from './components/PlaylistList';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header">
          <h1>Music Player</h1>
        </header>
        
        <main className="main-content">
          <div className="grid">
            <section className="playlists-section">
              <h2>Playlists</h2>
              <PlaylistList />
            </section>
            
            <section className="songs-section">
              <h2>Songs</h2>
              <SongList />
            </section>
          </div>
        </main>
        
        <footer className="player-footer">
          <Player />
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;