// Mock data for Spotify clone
export const mockPlaylists = [
  {
    id: '1',
    name: 'Liked Songs',
    description: 'Songs you liked',
    image: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
    tracks: 147,
    duration: '8 hr 52 min',
    isLiked: true
  },
  {
    id: '2',
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://seed-mix-image.spotifycdn.com/v6/img/discover_weekly/default',
    tracks: 30,
    duration: '2 hr 10 min'
  },
  {
    id: '3',
    name: 'Release Radar',
    description: 'New music from artists you follow',
    image: 'https://seed-mix-image.spotifycdn.com/v6/img/release_radar/default',
    tracks: 22,
    duration: '1 hr 25 min'
  },
  {
    id: '4',
    name: 'Daily Mix 1',
    description: 'The Weeknd, Drake, Post Malone and more',
    image: 'https://dailymix-images.scdn.co/v2/img/default',
    tracks: 50,
    duration: '3 hr 15 min'
  }
];

export const mockTrendingSongs = [
  {
    id: '1',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: '3:20',
    image: 'https://i.scdn.co/image/ab67616d0000b273f4d5c3bb9a5d3b6f1c1b4e8a',
    explicit: false
  },
  {
    id: '2',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: '2:47',
    image: 'https://i.scdn.co/image/ab67616d0000b273be841ba4bc24f7a8c2f0b8d1',
    explicit: false
  },
  {
    id: '3',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: '3:20',
    image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    explicit: false
  },
  {
    id: '4',
    title: 'Unholy',
    artist: 'Sam Smith feat. Kim Petras',
    album: 'Gloria',
    duration: '2:36',
    image: 'https://i.scdn.co/image/ab67616d0000b273cd222052a2594be29a6616b5',
    explicit: true
  },
  {
    id: '5',
    title: 'Bad Habit',
    artist: 'Steve Lacy',
    album: 'Gemini Rights',
    duration: '3:52',
    image: 'https://i.scdn.co/image/ab67616d0000b2735448a26e0bf09e3b4aa1e111',
    explicit: false
  }
];

export const mockArtists = [
  {
    id: '1',
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab67616100005174a048415db06a5b6fa7f8e5a1',
    followers: '85.2M',
    verified: true
  },
  {
    id: '2',
    name: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab67616100005174bb54dde68cd23e2a268ae0f5',
    followers: '82.4M',
    verified: true
  },
  {
    id: '3',
    name: 'Drake',
    image: 'https://i.scdn.co/image/ab67616100005174cd222052a2594be29a6616b5',
    followers: '78.9M',
    verified: true
  },
  {
    id: '4',
    name: 'Ariana Grande',
    image: 'https://i.scdn.co/image/ab67616100005174be841ba4bc24f7a8c2f0b8d1',
    followers: '67.5M',
    verified: true
  }
];

export const mockRecentlyPlayed = [
  {
    id: '1',
    title: 'Calm Down',
    artist: 'Rema & Selena Gomez',
    image: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7f8e5a1',
    playedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Lavender Haze',
    artist: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    playedAt: '2024-01-15T09:45:00Z'
  },
  {
    id: '3',
    title: 'Creepin\'',
    artist: 'Metro Boomin, The Weeknd, 21 Savage',
    image: 'https://i.scdn.co/image/ab67616d0000b273cd222052a2594be29a6616b5',
    playedAt: '2024-01-15T08:20:00Z'
  }
];

export const mockCurrentTrack = {
  id: '1',
  title: 'Flowers',
  artist: 'Miley Cyrus',
  album: 'Endless Summer Vacation',
  duration: 200, // in seconds
  currentTime: 45, // in seconds
  image: 'https://i.scdn.co/image/ab67616d0000b273f4d5c3bb9a5d3b6f1c1b4e8a',
  isPlaying: false,
  isLiked: false
};

export const mockSearchResults = {
  tracks: [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      image: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7f8e5a1'
    },
    {
      id: '2',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      duration: '3:53',
      image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5'
    }
  ],
  artists: mockArtists.slice(0, 2),
  albums: [
    {
      id: '1',
      title: 'After Hours',
      artist: 'The Weeknd',
      year: '2020',
      image: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7f8e5a1'
    }
  ],
  playlists: mockPlaylists.slice(0, 2)
};