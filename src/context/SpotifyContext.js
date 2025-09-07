import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockCurrentTrack, mockPlaylists, mockTrendingSongs } from '../data/mock';

const SpotifyContext = createContext();

const initialState = {
  currentTrack: mockCurrentTrack,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  shuffle: false,
  repeat: 'off', // 'off', 'track', 'playlist'
  playlists: mockPlaylists,
  currentPlaylist: null,
  queue: [],
  recentlyPlayed: [],
  user: {
    id: '1',
    name: 'John Doe',
    image: 'https://i.scdn.co/image/ab67616100005174a048415db06a5b6fa7f8e5a1',
    isPremium: false
  },
  searchQuery: '',
  searchResults: null,
  currentView: 'home' // 'home', 'search', 'library', 'playlist'
};

function spotifyReducer(state, action) {
  switch (action.type) {
    case 'PLAY_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true
      };
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
        volume: state.isMuted ? 0.7 : 0
      };
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        shuffle: !state.shuffle
      };
    case 'SET_REPEAT':
      const modes = ['off', 'playlist', 'track'];
      const currentIndex = modes.indexOf(state.repeat);
      const nextIndex = (currentIndex + 1) % modes.length;
      return {
        ...state,
        repeat: modes[nextIndex]
      };
    case 'LIKE_TRACK':
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          isLiked: !state.currentTrack.isLiked
        }
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload
      };
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload]
      };
    case 'CREATE_PLAYLIST':
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload.name,
        description: action.payload.description || '',
        image: null,
        tracks: 0,
        duration: '0 min',
        isOwned: true
      };
      return {
        ...state,
        playlists: [...state.playlists, newPlaylist]
      };
    default:
      return state;
  }
}

export const SpotifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spotifyReducer, initialState);

  // Mock audio progress
  useEffect(() => {
    let interval;
    if (state.isPlaying) {
      interval = setInterval(() => {
        if (state.currentTrack.currentTime < state.currentTrack.duration) {
          dispatch({
            type: 'PLAY_TRACK',
            payload: {
              ...state.currentTrack,
              currentTime: state.currentTrack.currentTime + 1
            }
          });
        } else {
          dispatch({ type: 'TOGGLE_PLAY' });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.currentTrack.currentTime]);

  const value = {
    ...state,
    dispatch,
    playTrack: (track) => dispatch({ type: 'PLAY_TRACK', payload: track }),
    togglePlay: () => dispatch({ type: 'TOGGLE_PLAY' }),
    setVolume: (volume) => dispatch({ type: 'SET_VOLUME', payload: volume }),
    toggleMute: () => dispatch({ type: 'TOGGLE_MUTE' }),
    toggleShuffle: () => dispatch({ type: 'TOGGLE_SHUFFLE' }),
    setRepeat: () => dispatch({ type: 'SET_REPEAT' }),
    likeTrack: () => dispatch({ type: 'LIKE_TRACK' }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setSearchResults: (results) => dispatch({ type: 'SET_SEARCH_RESULTS', payload: results }),
    setCurrentView: (view) => dispatch({ type: 'SET_CURRENT_VIEW', payload: view }),
    addToQueue: (track) => dispatch({ type: 'ADD_TO_QUEUE', payload: track }),
    createPlaylist: (playlist) => dispatch({ type: 'CREATE_PLAYLIST', payload: playlist })
  };

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};