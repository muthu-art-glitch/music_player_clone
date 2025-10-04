import { Artist } from '../types';
import { formatNumber } from '../utils/formatTime';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

export default function ArtistCard({ artist, onClick }: ArtistCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800/40 p-4 rounded-lg hover:bg-gray-800/60 transition-all cursor-pointer group"
    >
      <div className="relative mb-4">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full shadow-lg"
        />
      </div>
      <h3 className="font-bold text-white mb-1 truncate">{artist.name}</h3>
      <p className="text-sm text-gray-400">{formatNumber(artist.followers)} followers</p>
    </div>
  );
}
