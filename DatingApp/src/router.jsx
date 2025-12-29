import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import { ROUTES } from './constants/index.js';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Matches from './pages/Matches.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';

// Components
import Loading from './components/Loading.jsx';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

/**
 * Public Route Component
 * Redirects to home if user is already authenticated
 * (prevents authenticated users from accessing login/register)
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen message="Loading..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

/**
 * App Router
 * Main routing configuration for the entire application
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* Login Route - only accessible if not authenticated */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Register Route - only accessible if not authenticated */}
        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        {/* Home Route - requires authentication */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Profile Route - requires authentication */}
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Matches Route - requires authentication */}
        <Route
          path={ROUTES.MATCHES}
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />

        {/* Chat Route - requires authentication */}
        <Route
          path={ROUTES.CHAT}
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* 404 Route - catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;