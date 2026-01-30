import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Gamepad2, 
  BookOpen, 
  Stethoscope, 
  Users, 
  ShoppingBag, 
  Coffee, 
  Music, 
  MessageCircle,
  TrendingUp,
  Heart,
  Calendar,
  Award
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const getWelcomeMessage = () => {
    const results = user.assessmentResults;
    if (!results) return "Welcome to your wellness dashboard!";
    
    if (results.score >= 3) {
      return "We're here to support you through this challenging time. Let's explore resources that can help.";
    } else if (results.score >= 2) {
      return "It's great that you're taking care of your mental health. Let's continue building healthy habits.";
    } else {
      return "You're doing well! Let's maintain your positive mental health with our resources.";
    }
  };

  const getRecommendations = () => {
    const results = user.assessmentResults;
    if (!results) return [];

    const recommendations = [];
    if (results.stress) recommendations.push({ text: "Try our stress relief games", link: "/games", icon: Gamepad2 });
    if (results.anxiety) recommendations.push({ text: "Connect with our anxiety support community", link: "/community", icon: Users });
    if (results.depression) recommendations.push({ text: "Consult with a mental health professional", link: "/doctors", icon: Stethoscope });
    if (results.sleepIssues) recommendations.push({ text: "Listen to our sleep-focused music therapy", link: "/music", icon: Music });
    
    return recommendations;
  };

  const quickActions = [
    { title: 'Stress Relief Games', description: 'Interactive activities to reduce stress', icon: Gamepad2, link: '/games', color: 'from-blue-500 to-purple-600' },
    { title: 'Resource Library', description: 'Mental health guides and articles', icon: BookOpen, link: '/library', color: 'from-green-500 to-teal-600' },
    { title: 'Doctor Consultation', description: 'Book sessions with professionals', icon: Stethoscope, link: '/doctors', color: 'from-purple-500 to-pink-600' },
    { title: 'Community Support', description: 'Connect with peer support groups', icon: Users, link: '/community', color: 'from-orange-500 to-red-600' },
    { title: 'Wellness Shopping', description: 'Self-care products and rewards', icon: ShoppingBag, link: '/shopping', color: 'from-pink-500 to-rose-600' },
    { title: 'Food Delivery', description: 'Comfort food to boost your mood', icon: Coffee, link: '/food', color: 'from-yellow-500 to-orange-600' },
    { title: 'Music Therapy', description: 'Relaxing sounds and meditation', icon: Music, link: '/music', color: 'from-indigo-500 to-blue-600' },
    { title: 'Get Support', description: 'Chat support and helplines', icon: MessageCircle, link: '/support', color: 'from-teal-500 to-green-600' },
  ];

  const recommendations = getRecommendations();

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Hello, {user.name}! 👋</h1>
            <p className="text-lg opacity-90 mb-4">{getWelcomeMessage()}</p>
            {user.assessmentResults && (
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-4 mt-6">
                <Brain className="h-6 w-6 mr-3" />
                <div>
                  <p className="font-semibold">Assessment Score: {user.assessmentResults.score}/4</p>
                  <p className="text-sm opacity-90">Based on your recent check-in</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personalized Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <Link
                    key={index}
                    to={rec.link}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 hover:from-yellow-100 hover:to-orange-100 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <Icon className="h-6 w-6 text-orange-600 mr-3" />
                      <span className="font-medium text-gray-900">{rec.text}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wellness Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mood Points</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions This Month</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Today's Motivation */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Wellness Tip</h3>
          <p className="text-gray-700 mb-4">
            "Take a few minutes to practice deep breathing. Inhale for 4 counts, hold for 4, and exhale for 6. This simple technique can help reduce stress and anxiety throughout your day."
          </p>
          <div className="flex items-center text-sm text-indigo-600">
            <Heart className="h-4 w-4 mr-1" />
            <span>Take care of yourself today</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;