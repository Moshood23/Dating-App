import { STORAGE_KEYS } from '../constants';

/**
 * Save authentication token to localStorage
 * @param {string} token - JWT token to save
 * @returns {boolean} - True if successful, false otherwise
 */
export const saveAuthToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token format');
      return false;
    }
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    return true;
  } catch (error) {
    console.error('Error saving auth token:', error);
    return false;
  }
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} - Token if found, null otherwise
 */
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token || null;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

/**
 * Save refresh token to localStorage
 * @param {string} token - Refresh token to save
 * @returns {boolean} - True if successful, false otherwise
 */
export const saveRefreshToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      console.error('Invalid refresh token format');
      return false;
    }
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    return true;
  } catch (error) {
    console.error('Error saving refresh token:', error);
    return false;
  }
};

/**
 * Get refresh token from localStorage
 * @returns {string|null} - Refresh token if found, null otherwise
 */
export const getRefreshToken = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    return token || null;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

/**
 * Save both auth and refresh tokens
 * @param {string} authToken - JWT token
 * @param {string} refreshToken - Refresh token
 * @returns {boolean} - True if both saved successfully
 */
export const saveTokens = (authToken, refreshToken) => {
  const authSaved = saveAuthToken(authToken);
  const refreshSaved = saveRefreshToken(refreshToken);
  return authSaved && refreshSaved;
};

/**
 * Remove authentication token from localStorage
 * @returns {boolean} - True if successful
 */
export const removeAuthToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    return true;
  } catch (error) {
    console.error('Error removing auth token:', error);
    return false;
  }
};

/**
 * Remove refresh token from localStorage
 * @returns {boolean} - True if successful
 */
export const removeRefreshToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return true;
  } catch (error) {
    console.error('Error removing refresh token:', error);
    return false;
  }
};

/**
 * Clear all authentication tokens
 * @returns {boolean} - True if successful
 */
export const clearAllTokens = () => {
  const authRemoved = removeAuthToken();
  const refreshRemoved = removeRefreshToken();
  return authRemoved && refreshRemoved;
};

/**
 * Check if token exists
 * @returns {boolean} - True if auth token exists
 */
export const hasAuthToken = () => {
  return getAuthToken() !== null;
};

/**
 * Decode JWT token (basic decoding, doesn't verify signature)
 * NOTE: This only decodes, it doesn't verify the token signature
 * @param {string} token - JWT token to decode
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }

    // Decode the payload (second part)
    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true;
  }
};

/**
 * Get user ID from auth token
 * @returns {string|null} - User ID if found, null otherwise
 */
export const getUserIdFromToken = () => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.userId || decoded?.sub || null;
  } catch (error) {
    console.error('Error getting user ID from token:', error);
    return null;
  }
};

/**
 * Get user email from auth token
 * @returns {string|null} - User email if found, null otherwise
 */
export const getUserEmailFromToken = () => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.email || null;
  } catch (error) {
    console.error('Error getting user email from token:', error);
    return null;
  }
};

/**
 * Save user data to localStorage
 * @param {object} userData - User data object
 * @returns {boolean} - True if successful
 */
export const saveUserData = (userData) => {
  try {
    if (!userData || typeof userData !== 'object') {
      console.error('Invalid user data format');
      return false;
    }
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User data if found, null otherwise
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Remove user data from localStorage
 * @returns {boolean} - True if successful
 */
export const removeUserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    return true;
  } catch (error) {
    console.error('Error removing user data:', error);
    return false;
  }
};

/**
 * Clear all auth-related data
 * @returns {boolean} - True if successful
 */
export const clearAllAuthData = () => {
  const tokenCleared = clearAllTokens();
  const userDataRemoved = removeUserData();
  return tokenCleared && userDataRemoved;
};

/**
 * Get authorization header for API requests
 * @returns {object} - Authorization header object or empty object if no token
 */
export const getAuthorizationHeader = () => {
  const token = getAuthToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};