import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import LibraryView from './views/LibraryView';
import PlaylistView from './views/PlaylistView';
import { mockSongs, mockPlaylists, mockArtists } from './data/mockData';
import { Song, Playlist } from './types';

type View = 'home' | 'search' | 'library' | 'playlist';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setQueue([song, ...mockSongs.filter((s) => s.id !== song.id)]);
      setCurrentIndex(0);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0]);
      setIsPlaying(true);
      setQueue(playlist.songs);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (queue.length > 0) {
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (queue.length > 0) {
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlist');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
    if (view !== 'playlist') {
      setSelectedPlaylist(null);
    }
  };

  const handleBackFromPlaylist = () => {
    setCurrentView('home');
    setSelectedPlaylist(null);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />

        {currentView === 'home' && (
          <HomeView
            playlists={mockPlaylists}
            artists={mockArtists}
            onPlaylistClick={handlePlaylistClick}
          />
        )}

        {currentView === 'search' && (
          <SearchView
            songs={mockSongs}
            playlists={mockPlaylists}
            artists={mockArtists}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongPlay={handlePlaySong}
            onPlaylistClick={handlePlaylistClick}
          />
        )}

        {currentView === 'library' && (
          <LibraryView playlists={mockPlaylists} onPlaylistClick={handlePlaylistClick} />
        )}

        {currentView === 'playlist' && selectedPlaylist && (
          <PlaylistView
            playlist={selectedPlaylist}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSongPlay={handlePlaySong}
            onPlayAll={() => handlePlayPlaylist(selectedPlaylist)}
            onBack={handleBackFromPlaylist}
          />
        )}
      </div>

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;
