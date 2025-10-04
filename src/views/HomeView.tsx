import PlaylistCard from '../components/PlaylistCard';
import ArtistCard from '../components/ArtistCard';
import { Playlist, Artist } from '../types';

interface HomeViewProps {
  playlists: Playlist[];
  artists: Artist[];
  onPlaylistClick: (playlist: Playlist) => void;
}

export default function HomeView({ playlists, artists, onPlaylistClick }: HomeViewProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{getGreeting()}</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => onPlaylistClick(playlist)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Popular Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onClick={() => {}}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
