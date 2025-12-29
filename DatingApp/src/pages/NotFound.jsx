import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';

/**
 * NotFound/404 Page
 * Displayed when user tries to access a route that doesn't exist
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
        </div>

        {/* Error Icon */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Extra Info */}
        <p className="text-xs text-gray-500 mt-8">
          Error Code: 404
        </p>
      </div>
    </div>
  );
};

export default NotFound;