import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types/User';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import Games from './components/Games';
import Library from './components/Library';
import DoctorConsultation from './components/DoctorConsultation';
import Community from './components/Community';
import MyJourney from './components/MyJourney';
import DailyGoals from './components/DailyGoals';
import MusicPlayer from './components/MusicPlayer';
import Support from './components/Support';
import ChatWidget from './components/Chat/ChatWidget';


function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mindcare_user');
    const savedAssessment = localStorage.getItem('mindcare_assessment_completed');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAssessment) {
      setHasCompletedAssessment(JSON.parse(savedAssessment));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('mindcare_user', JSON.stringify(userData));
    setHasCompletedAssessment(false);
    localStorage.removeItem('mindcare_assessment_completed');
  };

  const handleLogout = () => {
    setUser(null);
    setHasCompletedAssessment(false);
    localStorage.removeItem('mindcare_user');
    localStorage.removeItem('mindcare_assessment_completed');
  };

  const handleAssessmentComplete = () => {
    setHasCompletedAssessment(true);
    localStorage.setItem('mindcare_assessment_completed', 'true');
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) return <Navigate to="/auth" replace />;
    if (!hasCompletedAssessment) return <Navigate to="/assessment" replace />;
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/auth" element={!user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
        <Route
          path="/assessment"
          element={
            user && !hasCompletedAssessment ?
              <Assessment user={user} onComplete={handleAssessmentComplete} /> :
              <Navigate to="/dashboard" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorConsultation user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-journey"
          element={
            <ProtectedRoute>
              <MyJourney user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-goals"
          element={
            <ProtectedRoute>
              <DailyGoals user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music"
          element={
            <ProtectedRoute>
              <MusicPlayer user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support user={user!} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ChatWidget />
    </div>
  );
}

export default App;