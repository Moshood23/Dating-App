import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!VALIDATION_RULES.EMAIL.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }

  // Check for at least one uppercase, one lowercase, one number
  if (!VALIDATION_RULES.PASSWORD_PATTERN.test(password)) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_WEAK };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORDS_DONT_MATCH };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate name/first name/last name
 * @param {string} name - Name to validate
 * @param {string} fieldName - Field name for error message (e.g., 'First name')
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || !name.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return { isValid: false, error: `${fieldName} must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters` };
  }

  if (name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return { isValid: false, error: `${fieldName} cannot exceed ${VALIDATION_RULES.NAME_MAX_LENGTH} characters` };
  }

  // Only allow letters and spaces
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters and spaces` };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate age
 * @param {number} age - Age to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateAge = (age) => {
  const ageNum = parseInt(age, 10);

  if (!age || isNaN(ageNum)) {
    return { isValid: false, error: 'Age is required' };
  }

  if (ageNum < VALIDATION_RULES.AGE_MIN) {
    return { isValid: false, error: `You must be at least ${VALIDATION_RULES.AGE_MIN} years old` };
  }

  if (ageNum > VALIDATION_RULES.AGE_MAX) {
    return { isValid: false, error: `Age cannot exceed ${VALIDATION_RULES.AGE_MAX}` };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate bio/description
 * @param {string} bio - Bio to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateBio = (bio) => {
  if (!bio || !bio.trim()) {
    return { isValid: false, error: 'Bio is required' };
  }

  if (bio.length > VALIDATION_RULES.BIO_MAX_LENGTH) {
    return { isValid: false, error: `Bio cannot exceed ${VALIDATION_RULES.BIO_MAX_LENGTH} characters` };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate gender selection
 * @param {string} gender - Gender value
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateGender = (gender) => {
  const validGenders = ['male', 'female', 'other'];

  if (!gender || !gender.trim()) {
    return { isValid: false, error: 'Gender is required' };
  }

  if (!validGenders.includes(gender.toLowerCase())) {
    return { isValid: false, error: 'Please select a valid gender' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate interested in selection
 * @param {string} interestedIn - Interested in value
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateInterestedIn = (interestedIn) => {
  const validOptions = ['male', 'female', 'both'];

  if (!interestedIn || !interestedIn.trim()) {
    return { isValid: false, error: 'Interested in is required' };
  }

  if (!validOptions.includes(interestedIn.toLowerCase())) {
    return { isValid: false, error: 'Please select a valid option' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate complete registration form
 * @param {object} formData - Form data object
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  // Validate first name
  const firstNameValidation = validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error;
  }

  // Validate last name
  const lastNameValidation = validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error;
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  // Validate password confirmation
  const confirmPasswordValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error;
  }

  // Validate age
  const ageValidation = validateAge(formData.age);
  if (!ageValidation.isValid) {
    errors.age = ageValidation.error;
  }

  // Validate gender
  const genderValidation = validateGender(formData.gender);
  if (!genderValidation.isValid) {
    errors.gender = genderValidation.error;
  }

  // Validate interested in
  const interestedInValidation = validateInterestedIn(formData.interestedIn);
  if (!interestedInValidation.isValid) {
    errors.interestedIn = interestedInValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form
 * @param {object} formData - Form data object
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Validate password
  if (!formData.password || !formData.password.trim()) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate profile update form
 * @param {object} formData - Form data object
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateProfileForm = (formData) => {
  const errors = {};

  // Validate first name
  const firstNameValidation = validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error;
  }

  // Validate last name
  const lastNameValidation = validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error;
  }

  // Validate age
  const ageValidation = validateAge(formData.age);
  if (!ageValidation.isValid) {
    errors.age = ageValidation.error;
  }

  // Validate bio
  const bioValidation = validateBio(formData.bio);
  if (!bioValidation.isValid) {
    errors.bio = bioValidation.error;
  }

  // Validate gender
  const genderValidation = validateGender(formData.gender);
  if (!genderValidation.isValid) {
    errors.gender = genderValidation.error;
  }

  // Validate interested in
  const interestedInValidation = validateInterestedIn(formData.interestedIn);
  if (!interestedInValidation.isValid) {
    errors.interestedIn = interestedInValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};