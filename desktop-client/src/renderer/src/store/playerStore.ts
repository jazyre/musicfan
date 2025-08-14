import { create } from 'zustand';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioPath: string;
  coverPath: string;
  lyrics_en?: string;
  lyrics_fa?: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: [],
  
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  addToQueue: (song) => set((state) => ({ queue: [...state.queue, song] })),
  removeFromQueue: (index) => set((state) => {
    const newQueue = [...state.queue];
    newQueue.splice(index, 1);
    return { queue: newQueue };
  }),
  playNext: () => {
    const state = get();
    if (state.queue.length > 0) {
      set({
        currentSong: state.queue[0],
        queue: state.queue.slice(1)
      });
    }
  },
  playPrevious: () => {
    // Implementation for playing previous song
    // This would require more complex state management
  }
}));

export default usePlayerStore;