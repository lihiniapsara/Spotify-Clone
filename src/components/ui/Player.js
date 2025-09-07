import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Heart, 
  Volume2, 
  VolumeX,
  Maximize2,
  List
} from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { Button } from './button';
import { Slider } from './slider';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    shuffle,
    repeat,
    togglePlay,
    setVolume,
    toggleMute,
    toggleShuffle,
    setRepeat,
    likeTrack
  } = useSpotify();

  const [currentTime, setCurrentTime] = useState(currentTrack.currentTime);

  useEffect(() => {
    setCurrentTime(currentTrack.currentTime);
  }, [currentTrack.currentTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value) => {
    setCurrentTime(value[0]);
    // In a real app, you'd seek to this position
  };

  const handleVolumeChange = (value) => {
    setVolume(value[0] / 100);
  };

  const getRepeatIcon = () => {
    if (repeat === 'track') {
      return <Repeat size={16} className="text-green-500" />;
    }
    return <Repeat size={16} className={repeat === 'playlist' ? 'text-green-500' : 'text-gray-400'} />;
  };

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4">
      {/* Left Section - Current Track Info */}
      <div className="flex items-center space-x-3 w-80">
        <div className="w-14 h-14 bg-gray-700 rounded overflow-hidden flex-shrink-0">
          <img 
            src={currentTrack.image} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjI4IiB5PSIzNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imKo8L3RleHQ+Cjwvc3ZnPgo=';
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={likeTrack}
          className="w-8 h-8 p-0 text-gray-400 hover:text-white"
        >
          <Heart 
            size={16} 
            className={currentTrack.isLiked ? 'text-green-500 fill-green-500' : 'text-gray-400'} 
          />
        </Button>
      </div>

      {/* Center Section - Player Controls */}
      <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
        {/* Control Buttons */}
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleShuffle}
            className="w-8 h-8 p-0"
          >
            <Shuffle size={16} className={shuffle ? 'text-green-500' : 'text-gray-400'} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-gray-400 hover:text-white"
          >
            <SkipBack size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="w-10 h-10 p-0 bg-white hover:bg-gray-200 rounded-full"
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" />
            ) : (
              <Play size={16} className="text-black ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-gray-400 hover:text-white"
          >
            <SkipForward size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={setRepeat}
            className="w-8 h-8 p-0"
          >
            {getRepeatIcon()}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={currentTrack.duration}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Right Section - Volume & Extra Controls */}
      <div className="flex items-center space-x-3 w-80 justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 text-gray-400 hover:text-white"
        >
          <List size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 text-gray-400 hover:text-white"
        >
          <Maximize2 size={16} />
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="w-8 h-8 p-0 text-gray-400 hover:text-white"
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
