import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Licensees from './pages/Licensees';
import Licenses from './pages/Licenses';
import Renewals from './pages/Renewals';
import Applications from './pages/Applications';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import ActivityLog from './pages/ActivityLog';
import HelpSupport from './pages/HelpSupport';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/licensees" element={
        <ProtectedRoute>
          <Layout>
            <Licensees />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/licenses" element={
        <ProtectedRoute>
          <Layout>
            <Licenses />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/renewals" element={
        <ProtectedRoute>
          <Layout>
            <Renewals />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute>
          <Layout>
            <Applications />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/documents" element={
        <ProtectedRoute>
          <Layout>
            <Documents />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <Layout>
            <Reports />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Layout>
            <Messages />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/activity-log" element={
        <ProtectedRoute>
          <Layout>
            <ActivityLog />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/help-support" element={
        <ProtectedRoute>
          <Layout>
            <HelpSupport />
          </Layout>
        </ProtectedRoute>
      } />
      {/* Catch all route - redirect to dashboard if authenticated, login if not */}
      <Route path="*" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
