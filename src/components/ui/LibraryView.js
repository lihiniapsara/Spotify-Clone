import React, { useState } from 'react';
import { LayoutGrid, List, Search, SortAsc, Play } from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { Button } from './button';
import { Input } from './input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Card, CardContent } from './card';

const LibraryView = () => {
  const { playlists, playTrack } = useSpotify();
  const [viewMode, setViewMode] = useState('grid');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const PlaylistCard = ({ playlist }) => (
    <Card className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer transition-all duration-200 group">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-full aspect-square object-cover rounded shadow-lg"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKZqjwvdGV4dD4KPC9zdmc+Cg==';
            }}
          />
          <Button
            size="sm"
            onClick={() => {}}
            className="absolute bottom-2 right-2 w-12 h-12 p-0 bg-green-500 hover:bg-green-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
          >
            <Play size={16} className="text-black ml-0.5" />
          </Button>
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 truncate">
          {playlist.name}
        </h3>
        <p className="text-gray-400 text-xs truncate">
          {playlist.description || `${playlist.tracks} songs`}
        </p>
      </CardContent>
    </Card>
  );

  const PlaylistRow = ({ playlist }) => (
    <div className="flex items-center space-x-4 p-2 hover:bg-zinc-800 rounded group cursor-pointer">
      <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjI0IiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imKo8L3RleHQ+Cjwvc3ZnPgo=';
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm truncate">{playlist.name}</h3>
        <p className="text-gray-400 text-xs truncate">
          Playlist • {playlist.tracks} songs
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          className="w-10 h-10 p-0 bg-green-500 hover:bg-green-400 rounded-full"
        >
          <Play size={14} className="text-black ml-0.5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Your Library</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-8 h-8 p-0 text-gray-400 hover:text-white"
            >
              {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-gray-400 hover:text-white"
            >
              <SortAsc size={16} />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search in Your Library"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
              All
            </TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Playlists
            </TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Artists
            </TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Albums
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistRow key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistRow key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="artists" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No artists in your library yet</p>
              <p className="text-gray-500 text-sm mt-2">Follow your first artist to see them here</p>
            </div>
          </TabsContent>

          <TabsContent value="albums" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No albums saved yet</p>
              <p className="text-gray-500 text-sm mt-2">Save your first album to see it here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredPlaylists.length === 0 && searchFilter && (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found for "{searchFilter}"</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
