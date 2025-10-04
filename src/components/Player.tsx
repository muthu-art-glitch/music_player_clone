import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Song } from '../types';
import { formatDuration } from '../utils/formatTime';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }: PlayerProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= currentSong.duration) {
            onNext();
            return 0;
          }
          setProgress((newTime / currentSong.duration) * 100);
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong, onNext]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSong) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(percent);
    setCurrentTime((percent / 100) * currentSong.duration);
  };

  if (!currentSong) {
    return (
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center text-gray-500">
        Select a song to start playing
      </div>
    );
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-14 h-14 rounded"
        />
        <div className="min-w-0">
          <h4 className="text-white font-semibold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={20} />
          </button>
          <button
            onClick={onPrevious}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={onPlayPause}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}
          </button>
          <button
            onClick={onNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <div
            onClick={handleProgressClick}
            className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span>{formatDuration(currentSong.duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <Volume2 size={20} className="text-gray-400" />
        <div className="w-24 h-1 bg-gray-700 rounded-full">
          <div className="w-3/4 h-full bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
