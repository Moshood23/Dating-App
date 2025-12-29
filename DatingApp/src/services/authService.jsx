import { API_BASE_URL, API_ENDPOINTS, TIMEOUTS } from '../constants';
import { getAuthorizationHeader, getRefreshToken } from '../utils/tokenManager';

/**
 * Auth Service - Handles all authentication API calls
 * Replace mock data with real API calls when backend is ready
 */

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {Promise<object>} - Response with token and user data
 */
export const registerUser = async (userData) => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - Response with token and user data
 */
export const loginUser = async (email, password) => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<object>} - Response from server
 */
export const logoutUser = async () => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`;
    const headers = getAuthorizationHeader();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Refresh authentication token
 * @returns {Promise<object>} - Response with new token
 */
export const refreshAuthToken = async () => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

/**
 * Verify if email already exists
 * @param {string} email - Email to check
 * @returns {Promise<object>} - Response with exists flag
 */
export const checkEmailExists = async (email) => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}?checkEmail=${encodeURIComponent(email)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Email check error:', error);
    throw error;
  }
};

/**
 * Get current user profile (authenticated request)
 * @returns {Promise<object>} - Current user data
 */
export const getCurrentUser = async () => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.PROFILE.GET}`;
    const headers = getAuthorizationHeader();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<object>} - Response from server
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    const url = `${API_BASE_URL}/auth/forgot-password`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<object>} - Response from server
 */
export const resetPasswordWithToken = async (token, newPassword) => {
  try {
    const url = `${API_BASE_URL}/auth/reset-password`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset with token error:', error);
    throw error;
  }
};

/**
 * Change password (authenticated request)
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<object>} - Response from server
 */
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const url = `${API_BASE_URL}/auth/change-password`;
    const headers = getAuthorizationHeader();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
      timeout: TIMEOUTS.API_REQUEST,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshAuthToken,
  checkEmailExists,
  getCurrentUser,
  sendPasswordResetEmail,
  resetPasswordWithToken,
  changePassword,
};