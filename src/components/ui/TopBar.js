import React from 'react';
import { ChevronLeft, ChevronRight, Search, Bell, User } from 'lucide-react';
import { useSpotify } from '../../context/SpotifyContext';
import { Input } from "./input";
import { Button } from "./button";

import {  Avatar,AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

const TopBar = () => {
  const { user, searchQuery, setSearchQuery, currentView, setCurrentView } = useSpotify();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query && currentView !== 'search') {
      setCurrentView('search');
    }
  };

  return (
    <div className="h-16 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left Section - Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 bg-black bg-opacity-70 hover:bg-opacity-100 rounded-full"
          >
            <ChevronLeft size={16} className="text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 bg-black bg-opacity-70 hover:bg-opacity-100 rounded-full"
          >
            <ChevronRight size={16} className="text-white" />
          </Button>
        </div>

        {/* Search Bar */}
        {currentView === 'search' && (
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 bg-white text-black border-none rounded-full h-10 focus:ring-2 focus:ring-white"
            />
          </div>
        )}
      </div>

      {/* Right Section - User Menu */}
      <div className="flex items-center space-x-4">
        {!user.isPremium && (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full px-6"
          >
            Upgrade
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 text-gray-400 hover:text-white"
        >
          <Bell size={16} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-gray-600 text-white">
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-800 border-zinc-700" align="end">
            <DropdownMenuItem className="text-white hover:bg-zinc-700">
              Account
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-zinc-700">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-zinc-700">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem className="text-white hover:bg-zinc-700">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;