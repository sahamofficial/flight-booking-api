import api from '../api/api';

/**
 * Check if user is authenticated by verifying token in localStorage
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get the current user's JWT token
 * @returns {string|null} JWT token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set the JWT token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove the JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if the current user is an admin
 * @param {Object} user - User object
 * @returns {boolean} Admin status
 */
export const isAdmin = (user) => {
  return user && user.is_admin === true;
};

/**
 * Format error message from API response
 * @param {Error} error - Error object from API request
 * @returns {string} Formatted error message
 */
export const formatError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data.message) {
      return error.response.data.message;
    }
    if (error.response.data.errors) {
      // Format validation errors
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join('. ');
      return errorMessages;
    }
    return `Error: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server. Please check your internet connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'An unexpected error occurred.';
  }
};

/**
 * Setup axios interceptors for handling auth tokens
 */
export const setupAuthInterceptors = () => {
  // Add a request interceptor to attach the token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add a response interceptor to handle auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem('token');
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(new Error('Your session has expired. Please log in again.'));
      }
      return Promise.reject(error);
    }
  );
};
