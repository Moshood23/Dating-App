import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state and validation
 * @param {object} initialValues - Initial form values
 * @param {function} onSubmit - Callback function on form submit
 * @param {function} validate - Validation function that returns errors object
 * @returns {object} - Form state and handlers
 */
export const useForm = (initialValues = {}, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle field value change
   * @param {Event} e - Input event
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  /**
   * Handle field blur event
   * @param {Event} e - Blur event
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field if validate function provided
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] });
      if (fieldErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name],
        }));
      }
    }
  }, [values, validate]);

  /**
   * Validate all fields
   * @returns {object} - Errors object
   */
  const validateForm = useCallback(() => {
    if (!validate) {
      return {};
    }

    const formErrors = validate(values);
    setErrors(formErrors);
    return formErrors;
  }, [values, validate]);

  /**
   * Handle form submit
   * @param {Event} e - Submit event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Submit form
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, validateForm]);

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set form values manually
   * @param {object} newValues - New values to set
   */
  const setFormValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  /**
   * Set field value manually
   * @param {string} name - Field name
   * @param {any} value - Field value
   */
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Set field error manually
   * @param {string} name - Field name
   * @param {string} error - Error message
   */
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  /**
   * Get field props object (for easy spreading into input)
   * @param {string} name - Field name
   * @returns {object} - Field props
   */
  const getFieldProps = useCallback((name) => {
    return {
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
    };
  }, [values, handleChange, handleBlur]);

  /**
   * Get field metadata (value, error, touched)
   * @param {string} name - Field name
   * @returns {object} - Field metadata
   */
  const getFieldMeta = useCallback((name) => {
    return {
      value: values[name] || '',
      error: errors[name] || '',
      touched: touched[name] || false,
    };
  }, [values, errors, touched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFieldValue,
    setFieldError,
    getFieldProps,
    getFieldMeta,
  };
};

export default useForm;