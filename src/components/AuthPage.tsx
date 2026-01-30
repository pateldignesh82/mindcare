import React, { useState } from 'react';
import { Brain, Eye, EyeOff } from 'lucide-react';
import { User } from '../types/User';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    year: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login - in real app, verify against database
      const user: User = {
        id: Date.now().toString(),
        name: formData.name || 'Student User',
        email: formData.email,
        university: 'Mock University',
        year: 'Undergraduate'
      };
      onLogin(user);
    } else {
      // Mock registration - in real app, create user in database
      const user: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        university: formData.university,
        year: formData.year
      };
      onLogin(user);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">MindCare</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Join MindCare'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? 'Sign in to continue your wellness journey' 
              : 'Create your account to get started'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                  University
                </label>
                <input
                  id="university"
                  name="university"
                  type="text"
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your university name"
                  value={formData.university}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Academic Year
                </label>
                <select
                  id="year"
                  name="year"
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Select your year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>

        {/* Emergency Contact Info */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-sm text-red-800 font-medium">In Crisis? Call 988 (Suicide & Crisis Lifeline)</p>
          <p className="text-xs text-red-600 mt-1">24/7 free and confidential support</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;