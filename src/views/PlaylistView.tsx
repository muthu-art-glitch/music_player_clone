import { Play, Clock, ArrowLeft } from 'lucide-react';
import SongRow from '../components/SongRow';
import { Playlist, Song } from '../types';
import { formatDuration } from '../utils/formatTime';

interface PlaylistViewProps {
  playlist: Playlist;
  currentSong: Song | null;
  isPlaying: boolean;
  onSongPlay: (song: Song) => void;
  onPlayAll: () => void;
  onBack: () => void;
}

export default function PlaylistView({
  playlist,
  currentSong,
  isPlaying,
  onSongPlay,
  onPlayAll,
  onBack,
}: PlaylistViewProps) {
  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-10 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="h-80 bg-gradient-to-b from-blue-900/40 to-transparent p-8 flex items-end gap-6">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-56 h-56 rounded shadow-2xl"
        />
        <div className="flex-1 pb-4">
          <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
          <h1 className="text-6xl font-bold text-white mb-6">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-semibold">{playlist.songs.length} songs</span>
            <span>•</span>
            <span>{totalMinutes} min</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <button
            onClick={onPlayAll}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all shadow-lg"
          >
            <Play size={24} fill="black" className="text-black ml-1" />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 pb-2 border-b border-gray-800">
          <div className="w-10 text-center text-gray-400 text-sm">#</div>
          <div className="text-gray-400 text-sm font-semibold">TITLE</div>
          <div className="text-gray-400 text-sm font-semibold">ALBUM</div>
          <div className="flex items-center justify-end gap-4">
            <Clock size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
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
      </div>
    </div>
  );
}
