import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Users, Phone, BookOpen, Gamepad2, ArrowRight, Shield, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      {/* Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-300 opacity-20 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-300 opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                MindCare
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/auth"
                className="hidden sm:inline-block text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 shadow-sm border border-blue-100">
            <Sparkles className="w-4 h-4" />
            <span>#1 Mental Health Platform for Students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Inner Balance</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000">
            A revolutionary 3D dimensional approach to student well-being.
            Gamified stress relief, professional support, and a thriving community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <Link
              to="/auth"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-blue-600 shadow-inner">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Gamified Relief</h3>
              <p className="text-gray-600 leading-relaxed">
                Turn stress management into an adventure. Earn rewards while playing scientifically designed games.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-green-600 shadow-inner">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Smart Library</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-curated resources tailored to your mood. From meditation guides to academic stress busters.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-purple-600 shadow-inner">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Expert Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Instant access to licensed therapists. Video consultations in a secure, private environment.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-orange-600 shadow-inner">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Peer Circles</h3>
              <p className="text-gray-600 leading-relaxed">
                Join safe, moderated support groups. Connect with students who truly understand your journey.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-red-600 shadow-inner">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">24/7 Shield</h3>
              <p className="text-gray-600 leading-relaxed">
                Always-on crisis support integration. One click access to emergency helplines and chat.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl border-t border-white/50">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 text-teal-600 shadow-inner">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">AI Assessment</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep learning powered mental health tracking. Visualise your emotional growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6">MindCare</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Empowering students to take control of their mental well-being through technology, community, and professional care.
          </p>
          <div className="text-sm text-gray-600 pt-8 border-t border-gray-800">
            © 2024 MindCare Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;