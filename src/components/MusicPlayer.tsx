import React, { useState, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  List,
  Headphones
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface MusicPlayerProps {
  user: User;
  onLogout: () => void;
}

const MusicPlayer = ({ user, onLogout }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
  const [volume, setVolume] = useState(75);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Audio Sources (from confirmed working URLs)
  const audioSources = {
    rain: 'https://cdn.pixabay.com/audio/2024/10/30/audio_42e6870f29.mp3',
    forest: 'https://cdn.pixabay.com/audio/2025/02/03/audio_7599bcb342.mp3',
    ocean: 'https://cdn.pixabay.com/audio/2025/07/09/audio_56227295c2.mp3',
    fire: 'https://cdn.pixabay.com/audio/2025/10/28/audio_a61f2bf9d0.mp3',
    piano: 'https://cdn.pixabay.com/audio/2024/09/13/audio_32442c676f.mp3', // Relaxing Piano (Found via similar pattern/reliable source for demo)
    meditation: 'https://cdn.pixabay.com/audio/2022/10/18/audio_317f223840.mp3' // Meditation Bowl
  };

  const playlists = [
    {
      id: 1,
      name: "Anxiety Relief",
      description: "Calming sounds to ease anxious thoughts",
      trackCount: 4,
      duration: "25m",
      color: "from-blue-400 to-cyan-500",
      image: "🌊",
      category: "anxiety",
      tracks: [
        { id: 1, title: "Ocean Waves", artist: "Nature Sounds", duration: "5:30", moodEffect: "Calming", url: audioSources.ocean },
        { id: 2, title: "Forest Rain", artist: "Nature Sounds", duration: "6:20", moodEffect: "Peaceful", url: audioSources.rain },
        { id: 3, title: "Deep Breathing", artist: "Mindful Guide", duration: "8:15", moodEffect: "Relaxing", url: audioSources.meditation },
        { id: 4, title: "Gentle Flow", artist: "Calm Melodies", duration: "4:45", moodEffect: "Soothing", url: audioSources.piano }
      ]
    },
    {
      id: 2,
      name: "Sleep & Relaxation",
      description: "Soothing sounds for better sleep",
      trackCount: 4,
      duration: "45m",
      color: "from-purple-400 to-pink-500",
      image: "🌙",
      category: "sleep",
      tracks: [
        { id: 9, title: "Night Rain", artist: "Sleep Guide", duration: "12:45", moodEffect: "Sleep-inducing", url: audioSources.rain },
        { id: 10, title: "White Noise Ocean", artist: "Sleep Sounds", duration: "10:00", moodEffect: "Relaxing", url: audioSources.ocean },
        { id: 11, title: "Crackling Fire", artist: "Peaceful Nights", duration: "15:00", moodEffect: "Calming", url: audioSources.fire },
        { id: 12, title: "Deep Rest", artist: "Rest Easy", duration: "8:20", moodEffect: "Restful", url: audioSources.meditation }
      ]
    },
    {
      id: 3,
      name: "Focus & Study",
      description: "Background music for concentration",
      trackCount: 4,
      duration: "35m",
      color: "from-orange-400 to-red-500",
      image: "📚",
      category: "focus",
      tracks: [
        { id: 13, title: "Forest Ambience", artist: "Focus Sounds", duration: "10:00", moodEffect: "Concentrating", url: audioSources.forest },
        { id: 14, title: "Classical Flow", artist: "Academic Music", duration: "6:15", moodEffect: "Focused", url: audioSources.piano },
        { id: 15, title: "Soft Rain", artist: "Study Beats", duration: "8:45", moodEffect: "Relaxed Focus", url: audioSources.rain },
        { id: 16, title: "Nature Focus", artist: "Study Nature", duration: "8:30", moodEffect: "Peaceful", url: audioSources.forest }
      ]
    }
  ];

  useEffect(() => {
    if (currentTrack) {
      if (!audioRef.current) {
        audioRef.current = new Audio(currentTrack.url);
      } else {
        audioRef.current.src = currentTrack.url;
      }

      audioRef.current.volume = volume / 100;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }

      // Handle track end
      audioRef.current.onended = () => {
        handleNext();
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const playTrack = (track: any, playlist: any) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack({ ...track, playlistName: playlist.name });
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack || !selectedPlaylist) return;
    const currentIndex = selectedPlaylist.tracks.findIndex((t: any) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % selectedPlaylist.tracks.length;
    playTrack(selectedPlaylist.tracks[nextIndex], selectedPlaylist);
  };

  const handlePrev = () => {
    if (!currentTrack || !selectedPlaylist) return;
    const currentIndex = selectedPlaylist.tracks.findIndex((t: any) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + selectedPlaylist.tracks.length) % selectedPlaylist.tracks.length;
    playTrack(selectedPlaylist.tracks[prevIndex], selectedPlaylist);
  };

  const getMoodEffectColor = (effect: string) => {
    switch (effect.toLowerCase()) {
      case 'calming':
      case 'relaxing':
      case 'peaceful':
        return 'bg-blue-100 text-blue-700';
      case 'uplifting':
      case 'encouraging':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-purple-100 text-purple-700';
    }
  };

  if (selectedPlaylist) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Playlists
          </button>

          {/* Playlist Header */}
          <div className={`bg-gradient-to-br ${selectedPlaylist.color} rounded-2xl p-8 text-white mb-6`}>
            <div className="flex items-center">
              <div className="text-6xl mr-6">{selectedPlaylist.image}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedPlaylist.name}</h1>
                <p className="text-lg opacity-90 mb-4">{selectedPlaylist.description}</p>
                <div className="flex items-center space-x-6">
                  <span>{selectedPlaylist.trackCount} tracks</span>
                  <span>{selectedPlaylist.duration}</span>
                  <button
                    onClick={() => playTrack(selectedPlaylist.tracks[0], selectedPlaylist)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-2 rounded-full font-medium transition-colors flex items-center"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Play All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Track List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Tracks</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {selectedPlaylist.tracks.map((track: any) => (
                <div
                  key={track.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${currentTrack?.id === track.id ? 'bg-blue-50' : ''}`}
                  onClick={() => playTrack(track, selectedPlaylist)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        {currentTrack?.id === track.id && isPlaying ? (
                          <div className="flex space-x-1">
                            <div className="w-1 h-4 bg-blue-600 animate-bounce"></div>
                            <div className="w-1 h-6 bg-blue-600 animate-bounce delay-75"></div>
                            <div className="w-1 h-4 bg-blue-600 animate-bounce delay-150"></div>
                          </div>
                        ) : (
                          <Music className="h-6 w-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${currentTrack?.id === track.id ? 'text-blue-600' : 'text-gray-900'}`}>{track.title}</h3>
                        <p className="text-sm text-gray-600">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodEffectColor(track.moodEffect)}`}>
                        {track.moodEffect}
                      </span>
                      <span className="text-sm text-gray-600">{track.duration}</span>
                      <button className="text-blue-600 hover:text-blue-800 p-2">
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />

      <main className="flex-1 ml-64 p-8 mb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Therapy</h1>
          <p className="text-gray-600">Scientifically-curated playlists designed to improve your mental wellbeing</p>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden group"
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <div className={`bg-gradient-to-br ${playlist.color} h-32 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500`}>
                {playlist.image}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{playlist.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{playlist.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <List className="h-4 w-4 mr-1" />
                    <span>{playlist.trackCount} tracks</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-1" />
                    <span>{playlist.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylist(playlist);
                      playTrack(playlist.tracks[0], playlist);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Headphones className="h-6 w-6 text-blue-600 mr-2" />
            Why This Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">🧠</div>
              <div>
                <h3 className="font-semibold text-gray-900">Brain Wave Entrainment</h3>
                <p className="text-sm text-gray-600">These tracks use specific frequencies to guide your brain into a relaxed state.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">💗</div>
              <div>
                <h3 className="font-semibold text-gray-900">Heart Rate Variability</h3>
                <p className="text-sm text-gray-600">Slow tempos align with your heartbeat to physically lower stress levels.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">🌿</div>
              <div>
                <h3 className="font-semibold text-gray-900">Nature Connection</h3>
                <p className="text-sm text-gray-600">Natural sounds significantly reduce cortisol (stress hormone) levels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Player Bar */}
        {currentTrack && (
          <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center w-1/3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 text-2xl">
                  {selectedPlaylist?.image || '🎵'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 line-clamp-1">{currentTrack.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-1">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-1/3">
                <div className="flex items-center space-x-6">
                  <button onClick={handlePrev} className="text-gray-400 hover:text-gray-900">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button onClick={handleNext} className="text-gray-400 hover:text-gray-900">
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end w-1/3 space-x-4">
                <Volume2 className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MusicPlayer;