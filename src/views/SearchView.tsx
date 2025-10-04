import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SongRow from '../components/SongRow';
import PlaylistCard from '../components/PlaylistCard';
import ArtistCard from '../components/ArtistCard';
import { Song, Playlist, Artist } from '../types';

interface SearchViewProps {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongPlay: (song: Song) => void;
  onPlaylistClick: (playlist: Playlist) => void;
}

export default function SearchView({
  songs,
  playlists,
  artists,
  currentSong,
  isPlaying,
  onSongPlay,
  onPlaylistClick,
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'playlists' | 'artists'>('all');

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'songs' as const, label: 'Songs' },
    { id: 'playlists' as const, label: 'Playlists' },
    { id: 'artists' as const, label: 'Artists' },
  ];

  const showSongs = activeFilter === 'all' || activeFilter === 'songs';
  const showPlaylists = activeFilter === 'all' || activeFilter === 'playlists';
  const showArtists = activeFilter === 'all' || activeFilter === 'artists';

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="p-8">
        <div className="mb-8">
          <div className="relative max-w-xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-full text-sm font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        {searchQuery && (
          <div className="flex gap-2 mb-6">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {!searchQuery ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'].map(
                (genre) => (
                  <div
                    key={genre}
                    className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 flex items-end cursor-pointer hover:scale-105 transition-transform"
                  >
                    <h3 className="text-2xl font-bold text-white">{genre}</h3>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {showSongs && filteredSongs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                <div className="space-y-1">
                  {filteredSongs.map((song, index) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={index}
                      isPlaying={isPlaying}
                      isCurrentSong={currentSong?.id === song.id}
                      onPlay={() => onSongPlay(song)}
                    />
                  ))}
                </div>
              </section>
            )}

            {showPlaylists && filteredPlaylists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredPlaylists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      playlist={playlist}
                      onClick={() => onPlaylistClick(playlist)}
                    />
                  ))}
                </div>
              </section>
            )}

            {showArtists && filteredArtists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} onClick={() => {}} />
                  ))}
                </div>
              </section>
            )}

            {filteredSongs.length === 0 &&
              filteredPlaylists.length === 0 &&
              filteredArtists.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
