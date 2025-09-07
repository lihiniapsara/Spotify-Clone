import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

const Sidebar = () => {
  const { currentView, setCurrentView, playlists, createPlaylist } = useSpotify();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist({
        name: newPlaylistName.trim(),
        description: newPlaylistDescription.trim()
      });
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setIsDialogOpen(false);
    }
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', active: currentView === 'home' },
    { id: 'search', icon: Search, label: 'Search', active: currentView === 'search' },
    { id: 'library', icon: Library, label: 'Your Library', active: currentView === 'library' }
  ];

  return (
    <div className="w-64 h-full bg-black text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">♪</span>
          </div>
          <span className="text-xl font-bold">Spotify</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 mb-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center space-x-4 py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-800 ${
                  item.active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Create Playlist */}
      <div className="px-6 mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-full flex items-center space-x-4 py-2 px-3 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <Plus size={20} />
              <span>Create Playlist</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 text-white border-zinc-700">
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Name</label>
                <Input
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="My Playlist #1"
                  className="bg-zinc-800 border-zinc-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Description</label>
                <Textarea
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  placeholder="Add an optional description"
                  className="bg-zinc-800 border-zinc-600 text-white resize-none"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-zinc-600 text-white hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylistName.trim()}
                  className="bg-green-500 hover:bg-green-600 text-black font-medium"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <button className="w-full flex items-center space-x-4 py-2 px-3 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mt-2">
          <Heart size={20} />
          <span>Liked Songs</span>
        </button>
      </div>

      {/* Library Section */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Playlists</h3>
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <button className="w-full text-left py-1 px-2 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors truncate">
                  {playlist.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-4 py-2 px-3 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <Download size={16} />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;