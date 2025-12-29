import React, { useState } from 'react';

/**
 * Reusable Input Component
 * @param {string} label - Input label text
 * @param {string} type - Input type: 'text', 'email', 'password', 'number', 'date', etc.
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {string} error - Error message to display
 * @param {boolean} touched - Whether field has been touched
 * @param {string} name - Input name attribute
 * @param {boolean} required - Whether field is required
 * @param {string} className - Additional CSS classes
 * @param {object} rest - All other props
 * @returns {JSX.Element} - Input component
 */
const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  error = '',
  touched = false,
  name = '',
  required = false,
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type for password visibility toggle
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Show error if field is touched and has error
  const showError = touched && error;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full px-4 py-2 text-base border rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${showError
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
            ${type === 'password' && 'pr-10'}
          `}
          {...rest}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex="-1"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 3c-4.478 0-8.268 2.943-9.542 7 1.274 4.057 5.064 7 9.542 7 1.375 0 2.717-.208 4-.604l2.296 2.296a1 1 0 101.414-1.414L10 3zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {showError && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;