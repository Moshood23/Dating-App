import { useState, useCallback } from 'react';
import { TIMEOUTS } from '../constants';

/**
 * Custom hook for making API requests
 * Handles loading, error, and data states
 * @returns {object} - { data, loading, error, request }
 */
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make an API request
   * @param {string} url - API endpoint URL
   * @param {object} options - Fetch options (method, headers, body, etc.)
   * @returns {Promise<object>} - Response data
   */
  const request = useCallback(async (url, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Set default options
      const defaultOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: TIMEOUTS.API_REQUEST,
      };

      // Merge options
      const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      };

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout);

      const response = await fetch(url, {
        ...mergedOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Parse response
      const responseData = await response.json();

      setData(responseData);
      return responseData;
    } catch (err) {
      const errorMessage = err.name === 'AbortError' 
        ? 'Request timeout' 
        : err.message || 'An error occurred';
      
      setError(errorMessage);
      console.error('API Request Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset fetch state
   */
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    request,
    reset,
  };
};

export default useFetch;