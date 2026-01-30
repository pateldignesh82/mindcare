import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    Circle,
    Calendar,
    RefreshCw,
    TrendingUp,
    Droplets,
    Moon,
    Sun,
    Book
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface DailyGoalsProps {
    user: User;
    onLogout: () => void;
}

const DailyGoals = ({ user, onLogout }: DailyGoalsProps) => {
    const [goals, setGoals] = useState([
        { id: 1, text: "Drink 8 glasses of water", icon: <Droplets className="h-5 w-5 text-blue-500" />, completed: false },
        { id: 2, text: "Sleep for 7+ hours", icon: <Moon className="h-5 w-5 text-indigo-500" />, completed: false },
        { id: 3, text: "10 mins Mindfulness", icon: <Sun className="h-5 w-5 text-yellow-500" />, completed: false },
        { id: 4, text: "Read a library article", icon: <Book className="h-5 w-5 text-green-500" />, completed: false },
    ]);

    useEffect(() => {
        const savedGoals = localStorage.getItem(`dailyGoals_${new Date().toDateString()}`);
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
    }, []);

    const toggleGoal = (id: number) => {
        const newGoals = goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        );
        setGoals(newGoals);
        localStorage.setItem(`dailyGoals_${new Date().toDateString()}`, JSON.stringify(newGoals));
    };

    const progress = Math.round((goals.filter(g => g.completed).length / goals.length) * 100);

    return (
        <div className="flex">
            <Navigation user={user} onLogout={onLogout} />

            <main className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Wellness Goals</h1>
                    <p className="text-gray-600">Small habits create big changes. What will you achieve today?</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Progress Card */}
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-8 text-white mb-8 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Today's Progress</h2>
                            <span className="text-3xl font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-black bg-opacity-20 rounded-full h-4">
                            <div
                                className="bg-white rounded-full h-4 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="mt-4 text-teal-100 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            {progress === 100 ? "Amazing! You've crushed your goals today! 🎉" : "Keep going! You're doing great."}
                        </p>
                    </div>

                    {/* Goals List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center text-gray-500">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <button
                                onClick={() => {
                                    const resetGoals = goals.map(g => ({ ...g, completed: false }));
                                    setGoals(resetGoals);
                                    localStorage.removeItem(`dailyGoals_${new Date().toDateString()}`);
                                }}
                                className="text-sm text-gray-400 hover:text-blue-500 flex items-center transition-colors"
                                title="Reset for demo"
                            >
                                <RefreshCw className="h-4 w-4 mr-1" /> Reset
                            </button>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    onClick={() => toggleGoal(goal.id)}
                                    className={`p-6 flex items-center cursor-pointer transition-all hover:bg-gray-50 ${goal.completed ? 'bg-green-50' : ''
                                        }`}
                                >
                                    <div className={`flex-shrink-0 mr-4 transition-transform ${goal.completed ? 'scale-110' : ''}`}>
                                        {goal.completed ? (
                                            <CheckCircle className="h-8 w-8 text-green-500" />
                                        ) : (
                                            <Circle className="h-8 w-8 text-gray-300" />
                                        )}
                                    </div>

                                    <div className="flex-1 flex items-center">
                                        <div className={`p-2 rounded-lg mr-4 ${goal.completed ? 'bg-white bg-opacity-50' : 'bg-gray-100'}`}>
                                            {goal.icon}
                                        </div>
                                        <span className={`text-lg font-medium ${goal.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                                            }`}>
                                            {goal.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DailyGoals;
