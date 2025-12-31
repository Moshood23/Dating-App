// API Base URL - Change this when you have your backend ready
export const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
  },
  // Profile endpoints
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile/update',
    UPLOAD_PHOTO: '/profile/upload-photo',
  },
  // Matches endpoints
  MATCHES: {
    GET_ALL: '/matches',
    GET_ONE: '/matches/:id',
    LIKE: '/matches/:id/like',
    UNLIKE: '/matches/:id/unlike',
    SKIP: '/matches/:id/skip',
  },
  // Chat endpoints
  CHAT: {
    GET_CONVERSATIONS: '/chat/conversations',
    GET_MESSAGES: '/chat/conversations/:id/messages',
    SEND_MESSAGE: '/chat/conversations/:id/messages',
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  AGE_MIN: 18,
  AGE_MAX: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_WEAK: 'Password must contain uppercase, lowercase, and numbers',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`,
  NAME_TOO_LONG: `Name cannot exceed ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`,
  EMAIL_ALREADY_EXISTS: 'This email is already registered',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  
  // Network errors
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  TIMEOUT: 'Request timed out. Please try again',
  
  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! Please log in',
  LOGIN_SUCCESS: 'Login successful!',
  PROFILE_UPDATED: 'Profile updated successfully',
  PHOTO_UPLOADED: 'Photo uploaded successfully',
  MATCH_LIKED: 'Match liked!',
  MESSAGE_SENT: 'Message sent',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  PREFERENCES: 'user_preferences',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// App Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  MATCHES: '/matches',
  CHAT: '/chat',
  NOT_FOUND: '/404',
};

// Form Field Names
export const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  AGE: 'age',
  BIO: 'bio',
  GENDER: 'gender',
  INTERESTED_IN: 'interestedIn',
};

// Socket.io Events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE_SENT: 'messageSent',
  MESSAGE_RECEIVED: 'messageReceived',
  USER_TYPING: 'userTyping',
  USER_STOPPED_TYPING: 'userStoppedTyping',
  MATCH_NOTIFICATION: 'matchNotification',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 10000,
  SOCKET_RECONNECT: 5000,
  DEBOUNCE: 300,
};