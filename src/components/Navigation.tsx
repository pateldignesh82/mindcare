import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Brain,
  Home,
  Gamepad2,
  BookOpen,
  Stethoscope,
  Users,

  Target,
  Trophy,
  Music,
  MessageCircle,
  LogOut,
  User
} from 'lucide-react';

interface NavigationProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

const Navigation = ({ user, onLogout }: NavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/games', icon: Gamepad2, label: 'Stress Relief' },
    { path: '/library', icon: BookOpen, label: 'Library' },
    { path: '/doctors', icon: Stethoscope, label: 'Doctors' },
    { path: '/community', icon: Users, label: 'Community' },

    { path: '/my-journey', icon: Trophy, label: 'My Journey' },
    { path: '/daily-goals', icon: Target, label: 'Daily Goals' },
    { path: '/music', icon: Music, label: 'Music' },
    { path: '/support', icon: MessageCircle, label: 'Support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-r border-gray-200 h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <Brain className="h-8 w-8 text-blue-600 mr-3" />
          <span className="text-xl font-bold text-gray-900">MindCare</span>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive(item.path)
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Emergency Section */}
      <div className="absolute bottom-20 left-0 right-0 mx-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-red-800">Emergency Support</p>
          <p className="text-sm font-bold text-red-900">988</p>
          <p className="text-xs text-red-600">Crisis Lifeline</p>
        </div>
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;