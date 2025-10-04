import { Play } from 'lucide-react';
import { Playlist } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
}

export default function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800/40 p-4 rounded-lg hover:bg-gray-800/60 transition-all cursor-pointer group"
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105 hover:bg-green-400"
        >
          <Play size={20} fill="black" className="text-black ml-0.5" />
        </button>
      </div>
      <h3 className="font-bold text-white mb-1 truncate">{playlist.name}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
    </div>
  );
}
