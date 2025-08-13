const API_BASE_URL = 'http://localhost:3000';

// --- DOM Elements ---
const songList = document.getElementById('song-list');
const playlistList = document.getElementById('playlist-list');
const audioPlayer = document.getElementById('audio-player');
const playerCover = document.getElementById('player-cover');
const playerSongTitle = document.getElementById('player-song-title');
const playerSongArtist = document.getElementById('player-song-artist');
const lyricsDisplay = document.getElementById('lyrics-display');

// --- Functions ---

/**
 * Creates an HTML element for a single song in the list.
 * @param {object} song - The song object from the API.
 * @returns {HTMLElement} - The created article element.
 */
function createSongListItem(song) {
    const article = document.createElement('article');
    article.innerHTML = `
        <h4 class="song-title">${song.title}</h4>
        <p class="song-artist">${song.artist}</p>
    `;
    article.dataset.songId = song.id;
    article.style.cursor = 'pointer';
    return article;
}

/**
 * Fetches a single song's details and updates the player.
 * @param {number} songId - The ID of the song to play.
 */
async function playSong(songId) {
    try {
        const response = await fetch(`${API_BASE_URL}/songs/${songId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const song = await response.json();

        // Update player UI
        playerSongTitle.textContent = song.title;
        playerSongArtist.textContent = song.artist;

        if (song.coverPath) {
            playerCover.src = `${API_BASE_URL}/uploads/${song.coverPath}`;
            playerCover.style.display = 'inline';
        } else {
            playerCover.style.display = 'none';
        }

        // Update lyrics
        lyricsDisplay.textContent = song.lyrics_fa || song.lyrics_en || 'No lyrics available.';

        // Update audio source and play
        audioPlayer.src = `${API_BASE_URL}/uploads/${song.audioPath}`;
        audioPlayer.play();

    } catch (error) {
        console.error(`Failed to play song #${songId}:`, error);
        playerSongTitle.textContent = 'Error loading song.';
        playerSongArtist.textContent = '';
    }
}

/**
 * Fetches all songs from the API and displays them in the list.
 */
async function fetchAndDisplaySongs() {
    try {
        const response = await fetch(`${API_BASE_URL}/songs`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const songs = await response.json();

        songList.innerHTML = ''; // Clear existing list
        songs.forEach(song => {
            const songItem = createSongListItem(song);
            songList.appendChild(songItem);
        });
    } catch (error) {
        console.error('Failed to fetch songs:', error);
        songList.innerHTML = '<p>Error loading songs. Is the backend running?</p>';
    }
}

/**
 * Fetches all playlists from the API and displays them in the list.
 */
async function fetchAndDisplayPlaylists() {
    try {
        const response = await fetch(`${API_BASE_URL}/playlists`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const playlists = await response.json();

        playlistList.innerHTML = ''; // Clear existing list
        playlists.forEach(playlist => {
            const playlistItem = document.createElement('article');
            playlistItem.innerHTML = `<h4>${playlist.title}</h4>`;
            playlistList.appendChild(playlistItem);
        });
    } catch (error) {
        console.error('Failed to fetch playlists:', error);
        playlistList.innerHTML = '<p>Error loading playlists.</p>';
    }
}


// --- Event Listeners ---

// Listen for clicks on the song list and delegate to individual songs.
songList.addEventListener('click', (event) => {
    const songItem = event.target.closest('article[data-song-id]');
    if (songItem) {
        const songId = songItem.dataset.songId;
        playSong(songId);
    }
});

// Load initial data when the application starts.
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplaySongs();
    fetchAndDisplayPlaylists();
});
