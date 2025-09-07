import React, { useState, useEffect } from 'react';
import { Play, Clock } from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { mockSearchResults, mockTrendingSongs } from '../../data/mock';
import { Button } from './button';
import {CardContent } from './card';
import { Card } from './card';

const SearchView = () => {
  const { searchQuery, searchResults, setSearchResults, playTrack } = useSpotify();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        setSearchResults(mockSearchResults);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, setSearchResults]);

  const browseCategoriesMock = [
    { id: '1', name: 'Pop', color: 'bg-pink-500', image: null },
    { id: '2', name: 'Hip-Hop', color: 'bg-orange-500', image: null },
    { id: '3', name: 'Rock', color: 'bg-red-500', image: null },
    { id: '4', name: 'Latin', color: 'bg-yellow-500', image: null },
    { id: '5', name: 'Electronic', color: 'bg-purple-500', image: null },
    { id: '6', name: 'Jazz', color: 'bg-blue-500', image: null },
    { id: '7', name: 'Country', color: 'bg-green-500', image: null },
    { id: '8', name: 'R&B', color: 'bg-indigo-500', image: null }
  ];

  const TrackRow = ({ track, index }) => (
    <div 
      className="grid grid-cols-12 gap-4 px-4 py-2 hover:bg-zinc-800 rounded group cursor-pointer"
      onClick={() => playTrack(track)}
    >
      <div className="col-span-6 flex items-center space-x-3">
        <div className="w-10 text-gray-400 text-sm flex-shrink-0">
          <span className="group-hover:hidden">{index + 1}</span>
          <Play size={16} className="hidden group-hover:block text-white" />
        </div>
        <img
          src={track.image}
          alt={track.title}
          className="w-10 h-10 rounded"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjIwIiB5PSIyNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imKo8L3RleHQ+Cjwvc3ZnPgo=';
          }}
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{track.title}</p>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
        </div>
      </div>
      <div className="col-span-4 flex items-center">
        <p className="text-gray-400 text-sm truncate">{track.album}</p>
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <p className="text-gray-400 text-sm">{track.duration}</p>
      </div>
    </div>
  );

  if (!searchQuery) {
    return (
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {browseCategoriesMock.map((category) => (
              <Card 
                key={category.id}
                className={`${category.color} border-none cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden h-32`}
              >
                <CardContent className="p-4 h-full relative">
                  <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-black bg-opacity-20 rounded transform rotate-12 translate-x-2 translate-y-2 shadow-lg flex items-center justify-center">
                    <span className="text-white text-2xl">♪</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Search results for "{searchQuery}"</h1>

        {/* Top Result */}
        {searchResults?.tracks?.[0] && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Top result</h2>
            <Card className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-colors w-96 group">
              <CardContent className="p-6">
                <img
                  src={searchResults.tracks[0].image}
                  alt={searchResults.tracks[0].title}
                  className="w-24 h-24 rounded-lg mb-4"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjQ4IiB5PSI1NiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imKo8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
                <h3 className="text-white font-bold text-2xl mb-2">{searchResults.tracks[0].title}</h3>
                <p className="text-gray-400 mb-4">Song • {searchResults.tracks[0].artist}</p>
                <Button
                  size="lg"
                  onClick={() => playTrack(searchResults.tracks[0])}
                  className="bg-green-500 hover:bg-green-400 text-black font-medium rounded-full w-14 h-14 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={20} className="ml-0.5" />
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Songs */}
        {searchResults?.tracks && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
            <div className="bg-zinc-900 bg-opacity-30 rounded-lg">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800">
                <div className="col-span-6 text-gray-400 text-sm">#</div>
                <div className="col-span-4 text-gray-400 text-sm">ALBUM</div>
                <div className="col-span-2 flex justify-end">
                  <Clock size={16} className="text-gray-400" />
                </div>
              </div>
              
              {/* Track List */}
              {searchResults.tracks.map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Artists */}
        {searchResults?.artists && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {searchResults.artists.map((artist) => (
                <Card 
                  key={artist.id}
                  className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-colors group"
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
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 w-12 h-12 p-0 bg-green-500 hover:bg-green-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
                      >
                        <Play size={16} className="text-black ml-0.5" />
                      </Button>
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
        )}

        {/* Albums */}
        {searchResults?.albums && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {searchResults.albums.map((album) => (
                <Card 
                  key={album.id}
                  className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-colors group"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full aspect-square object-cover rounded shadow-lg"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKZqjwvdGV4dD4KPC9zdmc+Cg==';
                        }}
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 w-12 h-12 p-0 bg-green-500 hover:bg-green-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
                      >
                        <Play size={16} className="text-black ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1 truncate">
                      {album.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {album.year} • {album.artist}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchView;
