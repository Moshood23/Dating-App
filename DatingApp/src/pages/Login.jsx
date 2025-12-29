import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateLoginForm } from '../utils/validation';
import { ROUTES } from '../constants';
import Input from '../components/Input';
import Button from '../components/Button';

/**
 * Login Page
 * Allows existing users to log in with email and password
 */
const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError, success: authSuccess } = useAuth();
  const [apiError, setApiError] = useState('');

  // Initialize form with useForm hook
  const form = useForm(
    { email: '', password: '' },
    async (values) => {
      try {
        setApiError('');
        await login(values.email, values.password);
        // Redirect to home on successful login
        navigate(ROUTES.HOME);
      } catch (err) {
        setApiError(err.message || 'Login failed. Please try again.');
      }
    },
    validateLoginForm
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
            Welcome Back
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
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              {...getFieldProps('email')}
              error={getFieldMeta('email').error}
              touched={getFieldMeta('email').touched}
              required
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...getFieldProps('password')}
              error={getFieldMeta('password').error}
              touched={getFieldMeta('password').touched}
              required
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link to={ROUTES.REGISTER}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full"
            >
              Create Account
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          By signing in, you agree to our{' '}
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

export default Login;
