import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import AppRouter from './router.jsx';

/**
 * Main App Component
 * Provides authentication context and error boundary
 * Wraps entire application with necessary providers
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;