import { Music } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import { Playlist } from '../types';

interface LibraryViewProps {
  playlists: Playlist[];
  onPlaylistClick: (playlist: Playlist) => void;
}

export default function LibraryView({ playlists, onPlaylistClick }: LibraryViewProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Your Library</h1>

        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            Playlists
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors">
            Artists
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors">
            Albums
          </button>
        </div>

        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => onPlaylistClick(playlist)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Music size={64} className="text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your library is empty</h2>
            <p className="text-gray-400">Start by creating a playlist or saving some songs</p>
          </div>
        )}
      </div>
    </div>
  );
}
