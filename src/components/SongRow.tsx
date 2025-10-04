import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../types';
import { formatDuration } from '../utils/formatTime';

interface SongRowProps {
  song: Song;
  index: number;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: () => void;
  showAlbum?: boolean;
}

export default function SongRow({ song, index, isPlaying, isCurrentSong, onPlay, showAlbum = true }: SongRowProps) {
  return (
    <div
      className="group grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 rounded hover:bg-white/5 transition-colors items-center cursor-pointer"
      onClick={onPlay}
    >
      <div className="w-10 flex items-center justify-center">
        {isCurrentSong && isPlaying ? (
          <button className="text-green-500">
            <Pause size={16} fill="currentColor" />
          </button>
        ) : isCurrentSong ? (
          <button className="text-green-500">
            <Play size={16} fill="currentColor" />
          </button>
        ) : (
          <>
            <span className="group-hover:hidden text-gray-400">{index + 1}</span>
            <Play size={16} className="hidden group-hover:block text-white" fill="white" />
          </>
        )}
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-10 h-10 rounded"
        />
        <div className="min-w-0">
          <h4 className={`font-semibold truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
            {song.title}
          </h4>
          <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
      </div>

      {showAlbum && (
        <div className="text-sm text-gray-400 truncate">
          {song.album}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all"
        >
          <Heart size={16} />
        </button>
        <span className="text-sm text-gray-400 w-12 text-right">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}
