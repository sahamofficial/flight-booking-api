/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {boolean} includeTime - Whether to include time in the result
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format a date to display only time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time
 */
export const formatTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Calculate the duration between two dates in hours and minutes
 * @param {string} startDate - Start date ISO string
 * @param {string} endDate - End date ISO string
 * @returns {string} Formatted duration
 */
export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationMinutes = Math.round((end - start) / (1000 * 60));
  
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

/**
 * Format price to currency
 * @param {number} price - Price to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'USD') => {
  if (price === undefined || price === null) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Truncate text to a certain length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.substring(0, length) + '...';
};

/**
 * Generate a slug from a string
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug
 */
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

/**
 * Get a random item from an array
 * @param {Array} array - Array to get a random item from
 * @returns {*} Random item
 */
export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

/**
 * Check if a date is in the past
 * @param {string} dateString - ISO date string
 * @returns {boolean} Whether the date is in the past
 */
export const isDateInPast = (dateString) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const now = new Date();
  
  return date < now;
};

/**
 * Sort an array of objects by a key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {boolean} ascending - Sort direction
 * @returns {Array} Sorted array
 */
export const sortArrayByKey = (array, key, ascending = true) => {
  if (!array || !key) return array;
  
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

/**
 * Filter an array of objects by a search query
 * @param {Array} array - Array to filter
 * @param {string} query - Search query
 * @param {Array} keys - Keys to search in
 * @returns {Array} Filtered array
 */
export const filterArrayByQuery = (array, query, keys) => {
  if (!array || !query || !keys || keys.length === 0) return array;
  
  const lowerCaseQuery = query.toLowerCase();
  
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerCaseQuery);
      }
      return false;
    });
  });
};
