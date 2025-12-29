import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateRegistrationForm } from '../utils/validation';
import { ROUTES, FORM_FIELDS } from '../constants';
import Input from '../components/Input';
import Button from '../components/Button';

/**
 * Register/Sign Up Page
 * Allows new users to create an account
 */
const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, success: authSuccess } = useAuth();
  const [apiError, setApiError] = useState('');

  // Initialize form with useForm hook
  const form = useForm(
    {
      [FORM_FIELDS.FIRST_NAME]: '',
      [FORM_FIELDS.LAST_NAME]: '',
      [FORM_FIELDS.EMAIL]: '',
      [FORM_FIELDS.PASSWORD]: '',
      [FORM_FIELDS.CONFIRM_PASSWORD]: '',
      [FORM_FIELDS.AGE]: '',
      [FORM_FIELDS.GENDER]: '',
      [FORM_FIELDS.INTERESTED_IN]: '',
    },
    async (values) => {
      try {
        setApiError('');
        await register(values);
        // Redirect to login on successful registration
        navigate(ROUTES.LOGIN);
      } catch (err) {
        setApiError(err.message || 'Registration failed. Please try again.');
      }
    },
    validateRegistrationForm
  );

  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } = form;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            DatingApp
          </h1>
          <p className="text-gray-600">
            Find your perfect match
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create Account
          </h2>

          {/* Error Messages */}
          {(authError || apiError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm">{authError || apiError}</p>
            </div>
          )}

          {/* Success Message */}
          {authSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm">{authSuccess}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Input */}
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              {...getFieldProps(FORM_FIELDS.FIRST_NAME)}
              error={getFieldMeta(FORM_FIELDS.FIRST_NAME).error}
              touched={getFieldMeta(FORM_FIELDS.FIRST_NAME).touched}
              required
            />

            {/* Last Name Input */}
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              {...getFieldProps(FORM_FIELDS.LAST_NAME)}
              error={getFieldMeta(FORM_FIELDS.LAST_NAME).error}
              touched={getFieldMeta(FORM_FIELDS.LAST_NAME).touched}
              required
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              {...getFieldProps(FORM_FIELDS.EMAIL)}
              error={getFieldMeta(FORM_FIELDS.EMAIL).error}
              touched={getFieldMeta(FORM_FIELDS.EMAIL).touched}
              required
            />

            {/* Age Input */}
            <Input
              label="Age"
              type="number"
              placeholder="25"
              {...getFieldProps(FORM_FIELDS.AGE)}
              error={getFieldMeta(FORM_FIELDS.AGE).error}
              touched={getFieldMeta(FORM_FIELDS.AGE).touched}
              required
            />

            {/* Gender Select */}
            <div>
              <label
                htmlFor={FORM_FIELDS.GENDER}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...getFieldProps(FORM_FIELDS.GENDER)}
                onBlur={(e) => {
                  form.handleBlur(e);
                }}
                className={`
                  w-full px-4 py-2 text-base border rounded-lg
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-0
                  ${getFieldMeta(FORM_FIELDS.GENDER).touched && getFieldMeta(FORM_FIELDS.GENDER).error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }
                `}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {getFieldMeta(FORM_FIELDS.GENDER).touched && getFieldMeta(FORM_FIELDS.GENDER).error && (
                <p className="text-sm text-red-500 mt-1">
                  {getFieldMeta(FORM_FIELDS.GENDER).error}
                </p>
              )}
            </div>

            {/* Interested In Select */}
            <div>
              <label
                htmlFor={FORM_FIELDS.INTERESTED_IN}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Interested In <span className="text-red-500">*</span>
              </label>
              <select
                {...getFieldProps(FORM_FIELDS.INTERESTED_IN)}
                onBlur={(e) => {
                  form.handleBlur(e);
                }}
                className={`
                  w-full px-4 py-2 text-base border rounded-lg
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-0
                  ${getFieldMeta(FORM_FIELDS.INTERESTED_IN).touched && getFieldMeta(FORM_FIELDS.INTERESTED_IN).error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }
                `}
              >
                <option value="">Select preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="both">Both</option>
              </select>
              {getFieldMeta(FORM_FIELDS.INTERESTED_IN).touched && getFieldMeta(FORM_FIELDS.INTERESTED_IN).error && (
                <p className="text-sm text-red-500 mt-1">
                  {getFieldMeta(FORM_FIELDS.INTERESTED_IN).error}
                </p>
              )}
            </div>

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              {...getFieldProps(FORM_FIELDS.PASSWORD)}
              error={getFieldMeta(FORM_FIELDS.PASSWORD).error}
              touched={getFieldMeta(FORM_FIELDS.PASSWORD).touched}
              required
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...getFieldProps(FORM_FIELDS.CONFIRM_PASSWORD)}
              error={getFieldMeta(FORM_FIELDS.CONFIRM_PASSWORD).error}
              touched={getFieldMeta(FORM_FIELDS.CONFIRM_PASSWORD).touched}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link to={ROUTES.LOGIN}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;