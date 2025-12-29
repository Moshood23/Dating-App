/**
 * Format a date to a readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'time', 'relative'
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
      time: { hour: '2-digit', minute: '2-digit' },
    };

    if (format === 'relative') {
      return getRelativeTime(dateObj);
    }

    return dateObj.toLocaleDateString('en-US', options[format] || options.short);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "just now")
 * @param {Date} date - Date to format
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (date) => {
  try {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return formatDate(date, 'short');
  } catch (error) {
    console.error('Error calculating relative time:', error);
    return 'Invalid date';
  }
};

/**
 * Format a full name from first and last name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} - Full name
 */
export const formatFullName = (firstName, lastName) => {
  try {
    const first = firstName?.trim() || '';
    const last = lastName?.trim() || '';
    return `${first} ${last}`.trim();
  } catch (error) {
    console.error('Error formatting full name:', error);
    return 'Unknown';
  }
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  try {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  } catch (error) {
    console.error('Error capitalizing string:', error);
    return '';
  }
};

/**
 * Capitalize all words in a string
 * @param {string} str - String to capitalize
 * @returns {string} - Title case string
 */
export const toTitleCase = (str) => {
  try {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    console.error('Error converting to title case:', error);
    return '';
  }
};

/**
 * Truncate a string to a maximum length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} ellipsis - Ellipsis string (default: '...')
 * @returns {string} - Truncated string
 */
export const truncateString = (str, maxLength = 50, ellipsis = '...') => {
  try {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - ellipsis.length) + ellipsis;
  } catch (error) {
    console.error('Error truncating string:', error);
    return '';
  }
};

/**
 * Format age from birthdate
 * @param {string|Date} birthDate - Birth date
 * @returns {number} - Age in years
 */
export const calculateAge = (birthDate) => {
  try {
    const dateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;

    if (isNaN(dateObj.getTime())) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDiff = today.getMonth() - dateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return null;
  }
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  try {
    if (!phone || typeof phone !== 'string') return '';

    // Remove non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
  } catch (error) {
    console.error('Error formatting phone number:', error);
    return phone;
  }
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  try {
    const num = parseFloat(amount);
    if (isNaN(num)) return '$0.00';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(num);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$0.00';
  }
};

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  try {
    const number = parseFloat(num);
    if (isNaN(number)) return '0';
    return number.toLocaleString('en-US');
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};

/**
 * Format bytes to human-readable size
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted size
 */
export const formatBytes = (bytes, decimals = 2) => {
  try {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  } catch (error) {
    console.error('Error formatting bytes:', error);
    return '0 Bytes';
  }
};

/**
 * Format email to mask middle part
 * @param {string} email - Email to format
 * @returns {string} - Masked email
 */
export const maskEmail = (email) => {
  try {
    if (!email || typeof email !== 'string') return '';

    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;

    const maskedLocal = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  } catch (error) {
    console.error('Error masking email:', error);
    return email;
  }
};

/**
 * Format gender display
 * @param {string} gender - Gender value
 * @returns {string} - Formatted gender
 */
export const formatGender = (gender) => {
  try {
    const genderMap = {
      male: 'Male',
      female: 'Female',
      other: 'Other',
    };
    return genderMap[gender?.toLowerCase()] || capitalize(gender);
  } catch (error) {
    console.error('Error formatting gender:', error);
    return gender;
  }
};

/**
 * Format location string
 * @param {string} city - City name
 * @param {string} state - State/Province name
 * @param {string} country - Country name
 * @returns {string} - Formatted location
 */
export const formatLocation = (city, state, country) => {
  try {
    const parts = [city, state, country].filter(Boolean);
    return parts.join(', ');
  } catch (error) {
    console.error('Error formatting location:', error);
    return '';
  }
};

/**
 * Slugify a string (convert to URL-friendly format)
 * @param {string} str - String to slugify
 * @returns {string} - Slugified string
 */
export const slugify = (str) => {
  try {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } catch (error) {
    console.error('Error slugifying string:', error);
    return '';
  }
};

/**
 * Format time duration (in seconds) to readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration
 */
export const formatDuration = (seconds) => {
  try {
    const num = parseInt(seconds, 10);
    if (isNaN(num) || num < 0) return '0s';

    const hours = Math.floor(num / 3600);
    const minutes = Math.floor((num % 3600) / 60);
    const secs = num % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
  } catch (error) {
    console.error('Error formatting duration:', error);
    return '0s';
  }
};