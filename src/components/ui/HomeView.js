import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { mockTrendingSongs, mockArtists, mockRecentlyPlayed } from '../../data/mock';
import { Button } from './button';
import { Card, CardContent } from './card';

const HomeView = () => {
  const { playTrack, playlists } = useSpotify();

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const PlayButton = ({ track, size = 'sm' }) => (
    <Button
      variant="ghost"
      size={size}
      onClick={() => playTrack(track)}
      className={`${size === 'lg' ? 'w-14 h-14' : 'w-12 h-12'} p-0 bg-green-500 hover:bg-green-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105`}
    >
      <Play size={size === 'lg' ? 20 : 16} className="text-black ml-0.5" />
    </Button>
  );

  const SectionCard = ({ item, onClick, showPlayButton = true }) => (
    <Card 
      className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-all duration-200 group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={item.image}
            alt={item.title || item.name}
            className="w-full aspect-square object-cover rounded-md shadow-lg"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKZqjwvdGV4dD4KPC9zdmc+Cg==';
            }}
          />
          {showPlayButton && (
            <div className="absolute bottom-2 right-2">
              <PlayButton track={item} />
            </div>
          )}
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 truncate">
          {item.title || item.name}
        </h3>
        <p className="text-gray-400 text-xs truncate">
          {item.artist || item.description || `${item.tracks} songs`}
        </p>
      </CardContent>
    </Card>
  );

  const QuickPlayCard = ({ playlist, index }) => (
    <Card className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-all duration-200 group overflow-hidden">
      <CardContent className="p-0 flex items-center">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-20 h-20 object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0OCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imKo8L3RleHQ+Cjwvc3ZnPgo=';
          }}
        />
        <div className="flex-1 px-4 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{playlist.name}</h3>
        </div>
        <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayButton track={playlist} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="p-6">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">{greetingMessage()}</h1>
          
          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {playlists.slice(0, 6).map((playlist, index) => (
              <QuickPlayCard key={playlist.id} playlist={playlist} index={index} />
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recently played</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockRecentlyPlayed.map((item) => (
              <SectionCard
                key={item.id}
                item={item}
                onClick={() => playTrack(item)}
              />
            ))}
          </div>
        </section>

        {/* Made For You */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Made for you</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {playlists.slice(1, 7).map((playlist) => (
              <SectionCard
                key={playlist.id}
                item={playlist}
                onClick={() => {}}
              />
            ))}
          </div>
        </section>

        {/* Trending Songs */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Trending songs</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockTrendingSongs.map((song) => (
              <SectionCard
                key={song.id}
                item={song}
                onClick={() => playTrack(song)}
              />
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Popular artists</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockArtists.map((artist) => (
              <Card 
                key={artist.id}
                className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-all duration-200 group"
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full shadow-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKZqjwvdGV4dD4KPC9zdmc+Cg==';
                      }}
                    />
                    <div className="absolute bottom-2 right-2">
                      <PlayButton track={artist} />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 truncate text-center">
                    {artist.name}
                  </h3>
                  <p className="text-gray-400 text-xs truncate text-center">
                    Artist
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeView;
