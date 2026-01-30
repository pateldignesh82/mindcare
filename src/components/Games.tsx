import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Star,
  Trophy,
  Smile,
  Zap,
  Heart,
  XCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface GamesProps {
  user: User;
  onLogout: () => void;
}

// --- Sub-Components for Games ---

const BreathingExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4); // 4-4-4 breathing
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setPhase('inhale');
            setCycles(c => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isActive]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={`w-64 h-64 rounded-full border-8 flex items-center justify-center transition-all duration-1000 ${phase === 'inhale' ? 'scale-125 border-blue-400 bg-blue-50' :
        phase === 'hold' ? 'scale-125 border-purple-400 bg-purple-50' :
          'scale-100 border-green-400 bg-green-50'
        }`}>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{timeLeft}</div>
          <div className="uppercase tracking-widest font-semibold text-gray-600">{phase}</div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xl text-gray-700 mb-4">Cycles completed: {cycles}</p>
        <button
          onClick={() => {
            setIsActive(false);
            onComplete();
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Finish Session
        </button>
      </div>
    </div>
  );
};

const MeditationTimer = ({ onComplete }: { onComplete: () => void }) => {
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-6xl font-bold text-indigo-600 mb-8 font-mono">
        {formatTime(timeLeft)}
      </div>

      <div className="space-x-4 mb-8">
        {[300, 600, 900].map(t => (
          <button
            key={t}
            onClick={() => { setDuration(t); setTimeLeft(t); setIsActive(false); }}
            className={`px-4 py-2 rounded-lg ${duration === t ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
          >
            {t / 60} min
          </button>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center px-8 py-4 rounded-full text-xl font-bold text-white transition-colors ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
            }`}
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setIsActive(false); setTimeLeft(duration); }}
          className="flex items-center px-6 py-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold"
        >
          <RotateCcw className="mr-2" /> Reset
        </button>
      </div>
      <button
        onClick={onComplete}
        className="mt-8 text-gray-500 hover:text-gray-700 underline"
      >
        Exit Meditation
      </button>
    </div>
  );
};

const MemoryPuzzle = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState<{ id: number, content: string, isFlipped: boolean, isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    // Initialize game
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        content: emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;

      if (newCards[first].content === newCards[second].content) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatches(m => m + 1);

        if (matches + 1 === emojis.length) {
          setTimeout(() => onComplete(100), 1000);
        }
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <span className="font-bold">Moves: {moves}</span>
        <span className="font-bold">Matches: {matches}/{emojis.length}</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square text-3xl flex items-center justify-center rounded-xl transition-all transform ${card.isFlipped || card.isMatched
              ? 'bg-blue-100 rotate-0'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 rotate-180'
              }`}
          >
            {(card.isFlipped || card.isMatched) ? card.content : '❓'}
          </button>
        ))}
      </div>
      <button
        onClick={() => onComplete(0)}
        className="mt-6 w-full text-center text-gray-500 hover:text-gray-700"
      >
        Quit Game
      </button>
    </div>
  );
};

const NatureSounds = ({ onComplete }: { onComplete: () => void }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const sounds = [
    {
      id: 'rain',
      name: 'Gentle Rain',
      icon: '🌧️',
      color: 'blue',
      url: 'https://cdn.pixabay.com/audio/2024/10/30/audio_42e6870f29.mp3'
    },
    {
      id: 'forest',
      name: 'Forest Birds',
      icon: '🌲',
      color: 'green',
      url: 'https://cdn.pixabay.com/audio/2025/02/03/audio_7599bcb342.mp3'
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      icon: '🌊',
      color: 'cyan',
      url: 'https://cdn.pixabay.com/audio/2025/07/09/audio_56227295c2.mp3'
    },
    {
      id: 'fire',
      name: 'Crackling Fire',
      icon: '🔥',
      color: 'orange',
      url: 'https://cdn.pixabay.com/audio/2025/10/28/audio_a61f2bf9d0.mp3'
    },
  ];

  useEffect(() => {
    if (activeSound) {
      const sound = sounds.find(s => s.id === activeSound);
      if (sound) {
        if (!audioRef.current) {
          audioRef.current = new Audio(sound.url);
          audioRef.current.loop = true;
        } else {
          audioRef.current.src = sound.url;
        }
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [activeSound]);

  const toggleSound = (id: string) => {
    if (activeSound === id) {
      setActiveSound(null);
    } else {
      setActiveSound(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sounds.map(sound => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound.id)}
            className={`p-6 rounded-xl border-2 transition-all flex items-center justify-between ${activeSound === sound.id
              ? `border-${sound.color}-500 bg-${sound.color}-50 shadow-md`
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4">{sound.icon}</span>
              <div className="text-left">
                <h3 className="font-bold text-gray-900">{sound.name}</h3>
                <p className="text-sm text-gray-500">{activeSound === sound.id ? 'Playing...' : 'Click to play'}</p>
              </div>
            </div>
            {activeSound === sound.id ? (
              <Volume2 className={`h-6 w-6 text-${sound.color}-500 animate-pulse`} />
            ) : (
              <Play className="h-6 w-6 text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {activeSound && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center text-gray-600 flex flex-col items-center">
          <p className="mb-2">🎵 Now Playing: {sounds.find(s => s.id === activeSound)?.name}</p>
          <button
            onClick={() => setActiveSound(null)}
            className="text-sm text-red-500 flex items-center hover:text-red-700"
          >
            <VolumeX className="h-4 w-4 mr-1" /> Mute
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setActiveSound(null);
          onComplete();
        }}
        className="mt-8 block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
      >
        Finish Listening
      </button>
    </div>
  );
};

const GratitudeJournal = ({ onComplete }: { onComplete: () => void }) => {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState('');

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('gratitudeEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.trim()) {
      setEntries([newEntry, ...entries]);
      setNewEntry('');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={addEntry} className="mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">What are you grateful for today?</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="I am grateful for..."
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {entries.length === 0 && (
          <p className="text-center text-gray-400 italic">No entries yet. Start writing!</p>
        )}
        {entries.map((entry, idx) => (
          <div key={idx} className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start shadow-sm">
            <Heart className="h-5 w-5 text-pink-500 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-800">{entry}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="mt-8 block w-full text-center text-gray-500 hover:text-gray-700"
      >
        Done Writing
      </button>
    </div>
  );
};

// --- Main Games Component ---

const Games = ({ user, onLogout }: GamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [moodPoints, setMoodPoints] = useState(1247);

  // Load mood points from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem('moodPoints');
    if (savedPoints) {
      setMoodPoints(parseInt(savedPoints));
    }
  }, []);

  // Save mood points to localStorage
  useEffect(() => {
    localStorage.setItem('moodPoints', moodPoints.toString());
  }, [moodPoints]);

  const games = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Guided breathing to reduce stress and anxiety',
      icon: '🫁',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'meditation',
      title: 'Mindful Meditation',
      description: 'Calm your mind with guided meditation',
      icon: '🧘‍♂️',
      difficulty: 'Beginner',
      duration: '10 min',
      points: 100,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'puzzles',
      title: 'Memory Puzzles',
      description: 'Match pairs to distract from worries',
      icon: '🧩',
      difficulty: 'Medium',
      duration: '15 min',
      points: 75,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'nature',
      title: 'Nature Sounds',
      description: 'Immerse yourself in calming nature sounds',
      icon: '🌿',
      difficulty: 'Easy',
      duration: '30 min',
      points: 60,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'journal',
      title: 'Gratitude Journal',
      description: 'Write down things you\'re grateful for',
      icon: '📝',
      difficulty: 'Easy',
      duration: '10 min',
      points: 90,
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  const handleGameComplete = (pointsEarned: number = 0) => {
    if (pointsEarned > 0) {
      setMoodPoints(prev => prev + pointsEarned);
    }
    setSelectedGame(null);
  };

  const renderActiveGame = () => {
    // Wrapper to ensure layout consistency
    const GameWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[600px]">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </main>
      </div>
    );

    switch (selectedGame) {
      case 'breathing':
        return (
          <GameWrapper title="Breathing Exercise">
            <BreathingExercise onComplete={() => handleGameComplete(50)} />
          </GameWrapper>
        );
      case 'meditation':
        return (
          <GameWrapper title="Mindful Meditation">
            <MeditationTimer onComplete={() => handleGameComplete(100)} />
          </GameWrapper>
        );
      case 'puzzles':
        return (
          <GameWrapper title="Memory Puzzles">
            <MemoryPuzzle onComplete={(score) => handleGameComplete(score)} />
          </GameWrapper>
        );
      case 'nature':
        return (
          <GameWrapper title="Nature Sounds">
            <NatureSounds onComplete={() => handleGameComplete(60)} />
          </GameWrapper>
        );
      case 'journal':
        return (
          <GameWrapper title="Gratitude Journal">
            <GratitudeJournal onComplete={() => handleGameComplete(90)} />
          </GameWrapper>
        );
      default:
        return null; // Should not happen
    }
  };

  if (selectedGame) {
    return renderActiveGame();
  }

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stress Relief Games</h1>
          <p className="text-gray-600">Interactive activities designed to help you relax and reduce stress</p>

          {/* Mood Points Display */}
          <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white inline-block">
            <div className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">{moodPoints} Mood Points</span>
            </div>
          </div>
        </div>

        {/* Featured Game */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Daily Wellness Challenge</h2>
              <p className="text-lg opacity-90 mb-4">Complete today's breathing exercise for bonus points!</p>
              <button
                onClick={() => setSelectedGame('breathing')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Challenge (+50 points)
              </button>
            </div>
            <div className="text-8xl opacity-20">🏆</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
              <div className={`bg-gradient-to-br ${game.color} h-32 flex items-center justify-center text-4xl`}>
                {game.icon}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>

                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center text-blue-600">
                    <Timer className="h-4 w-4 mr-1" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>{game.points} pts</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                    {game.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedGame(game.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Mood Boosters */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Mood Boosters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Take 5 Deep Breaths", icon: "💨", points: 10 },
              { title: "Smile for 30 Seconds", icon: "😊", points: 15 },
              { title: "Stretch Your Arms", icon: "🙆‍♂️", points: 20 },
              { title: "Think of Something Good", icon: "💭", points: 25 }
            ].map((booster, index) => (
              <button
                key={index}
                onClick={() => setMoodPoints(prev => prev + booster.points)}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
              >
                <div className="text-3xl mb-2">{booster.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">{booster.title}</h3>
                <div className="text-sm text-green-600">+{booster.points} points</div>
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Recent Achievements
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Smile className="h-4 w-4 text-green-500 mr-2" />
                  <span>Completed 7-day wellness streak!</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Earned 1000+ mood points this week</span>
                </div>
              </div>
            </div>
            <div className="text-4xl opacity-50">🏅</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;