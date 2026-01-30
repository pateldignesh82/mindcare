import React, { useState, useEffect } from 'react';
import {
    Trophy,
    Target,
    Calendar,
    TrendingUp,
    Award,
    Star,
    Activity,
    Zap
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface MyJourneyProps {
    user: User;
    onLogout: () => void;
}

const MyJourney = ({ user, onLogout }: MyJourneyProps) => {
    const [moodPoints, setMoodPoints] = useState(0);
    const [journalCount, setJournalCount] = useState(0);
    const [streak, setStreak] = useState(3); // Mock streak for demo

    useEffect(() => {
        // Load data from localStorage
        const savedPoints = localStorage.getItem('moodPoints');
        if (savedPoints) setMoodPoints(parseInt(savedPoints));

        const savedEntries = localStorage.getItem('gratitudeEntries');
        if (savedEntries) {
            const entries = JSON.parse(savedEntries);
            setJournalCount(entries.length);
        }
    }, []);

    const achievements = [
        { title: "First Step", desc: "Completed first login", icon: "🌱", unlocked: true },
        { title: "Mindful Master", desc: "Meditated for 10 mins", icon: "🧘", unlocked: moodPoints > 50 },
        { title: "Gratitude Guru", desc: "5 Journal Entries", icon: "✍️", unlocked: journalCount >= 5 },
        { title: "Stress Buster", desc: "Played relief game", icon: "🎮", unlocked: moodPoints > 20 }
    ];

    return (
        <div className="flex">
            <Navigation user={user} onLogout={onLogout} />

            <main className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wellness Journey</h1>
                    <p className="text-gray-600">Track your progress and celebrate your small wins.</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                                Total Points
                            </span>
                        </div>
                        <h3 className="text-4xl font-bold mb-1">{moodPoints}</h3>
                        <p className="text-blue-100">Mood Points Earned</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                                Current Streak
                            </span>
                        </div>
                        <h3 className="text-4xl font-bold mb-1">{streak} Days</h3>
                        <p className="text-purple-100">Consistency Score</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                                Journaling
                            </span>
                        </div>
                        <h3 className="text-4xl font-bold mb-1">{journalCount}</h3>
                        <p className="text-green-100">Entries Written</p>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
                        <div className="flex items-center text-sm text-gray-500">
                            <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border-2 transition-all ${achievement.unlocked
                                        ? 'border-yellow-200 bg-yellow-50'
                                        : 'border-gray-100 bg-gray-50 opacity-60 grayscale'
                                    }`}
                            >
                                <div className="text-3xl mb-3">{achievement.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                                <p className="text-sm text-gray-600">{achievement.desc}</p>
                                {achievement.unlocked && (
                                    <div className="mt-3 flex items-center text-xs font-semibold text-yellow-700">
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        Unlocked
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Graph Placeholder */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Wellness Report</h2>
                    <div className="h-40 flex items-end justify-between space-x-4 px-4">
                        {[40, 70, 45, 90, 60, 80, 50].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <div
                                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                                    style={{ height: `${height}%`, opacity: 0.7 }}
                                ></div>
                                <span className="text-xs text-gray-500 mt-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default MyJourney;
