import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import {
  saveTokens,
  clearAllAuthData,
  getAuthToken,
  getUserData,
  saveUserData,
} from '../utils/tokenManager';

// Create the Auth Context
export const AuthContext = createContext();

/**
 * Auth Context Provider Component
 * Manages authentication state and provides auth methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getAuthToken();
        const userData = getUserData();

        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Clear error message after 5 seconds
   */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Clear success message after 3 seconds
   */
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} - User data
   */
  const register = useCallback(async (userData) => {
    try {
      setError(null);
      setSuccess(null);

      // Mock API call - replace with real API call later
      // For now, we'll simulate a successful registration
      const mockResponse = {
        token: 'mock_auth_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          age: userData.age,
          gender: userData.gender,
          interestedIn: userData.interestedIn,
          bio: '',
          profilePhoto: null,
          createdAt: new Date().toISOString(),
        },
      };

      // Save tokens and user data
      const tokensSaved = saveTokens(mockResponse.token, mockResponse.refreshToken);
      if (!tokensSaved) {
        throw new Error('Failed to save tokens');
      }

      const userDataSaved = saveUserData(mockResponse.user);
      if (!userDataSaved) {
        throw new Error('Failed to save user data');
      }

      // Update state
      setUser(mockResponse.user);
      setIsAuthenticated(true);
      setSuccess(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);

      return mockResponse.user;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - User data
   */
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      setSuccess(null);

      // Mock API call - replace with real API call later
      // For now, we'll simulate a successful login
      const mockResponse = {
        token: 'mock_auth_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          age: 25,
          gender: 'male',
          interestedIn: 'female',
          bio: 'Looking for meaningful connections',
          profilePhoto: null,
          createdAt: new Date().toISOString(),
        },
      };

      // Save tokens and user data
      const tokensSaved = saveTokens(mockResponse.token, mockResponse.refreshToken);
      if (!tokensSaved) {
        throw new Error('Failed to save tokens');
      }

      const userDataSaved = saveUserData(mockResponse.user);
      if (!userDataSaved) {
        throw new Error('Failed to save user data');
      }

      // Update state
      setUser(mockResponse.user);
      setIsAuthenticated(true);
      setSuccess(SUCCESS_MESSAGES.LOGIN_SUCCESS);

      return mockResponse.user;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    try {
      setError(null);

      // Clear all auth data from localStorage
      const cleared = clearAllAuthData();
      if (!cleared) {
        throw new Error('Failed to clear auth data');
      }

      // Update state
      setUser(null);
      setIsAuthenticated(false);
      setSuccess('Logged out successfully');
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Update user profile
   * @param {object} updatedData - Updated user data
   * @returns {Promise<object>} - Updated user data
   */
  const updateProfile = useCallback(async (updatedData) => {
    try {
      setError(null);
      setSuccess(null);

      // Mock API call - replace with real API call later
      const updatedUser = {
        ...user,
        ...updatedData,
      };

      // Save updated user data to localStorage
      const userDataSaved = saveUserData(updatedUser);
      if (!userDataSaved) {
        throw new Error('Failed to save user data');
      }

      // Update state
      setUser(updatedUser);
      setSuccess(SUCCESS_MESSAGES.PROFILE_UPDATED);

      return updatedUser;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      setError(errorMessage);
      throw err;
    }
  }, [user]);

  /**
   * Clear all messages (errors and success)
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    success,

    // Methods
    register,
    login,
    logout,
    updateProfile,
    clearMessages,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;