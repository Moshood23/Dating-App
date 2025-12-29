import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Button from '../components/Button';

/**
 * Matches Page
 * Displays potential matches and allows users to like/skip
 */
const Matches = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Mock matches data - replace with real API data
  const mockMatches = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Smith',
      age: 26,
      gender: 'female',
      bio: 'Love hiking and reading. Coffee enthusiast ☕',
      profilePhoto: null,
    },
    {
      id: 2,
      firstName: 'Emma',
      lastName: 'Johnson',
      age: 24,
      gender: 'female',
      bio: 'Foodie. Travel lover. Always up for an adventure!',
      profilePhoto: null,
    },
    {
      id: 3,
      firstName: 'Jessica',
      lastName: 'Williams',
      age: 27,
      gender: 'female',
      bio: 'Artist and yoga enthusiast. Looking for real connections.',
      profilePhoto: null,
    },
    {
      id: 4,
      firstName: 'Amanda',
      lastName: 'Brown',
      age: 25,
      gender: 'female',
      bio: 'Dog lover. Trying new restaurants every weekend.',
      profilePhoto: null,
    },
  ];

  const currentMatch = mockMatches[currentMatchIndex];
  const hasMoreMatches = currentMatchIndex < mockMatches.length - 1;

  const handleLike = () => {
    if (hasMoreMatches) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };

  const handleSkip = () => {
    if (hasMoreMatches) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">DatingApp</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.CHAT)}
            >
              Chat
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Match
          </h2>
          <p className="text-xl text-gray-600">
            Swipe right to like, left to skip
          </p>
        </div>

        {currentMatch ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Match Card */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                {/* Profile Photo */}
                <div className="h-80 bg-gray-200 flex items-center justify-center">
                  {currentMatch.profilePhoto ? (
                    <img
                      src={currentMatch.profilePhoto}
                      alt={currentMatch.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <svg
                        className="w-20 h-20 text-gray-400 mx-auto mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-gray-500">No photo available</p>
                    </div>
                  )}
                </div>

                {/* Match Info */}
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentMatch.firstName}, {currentMatch.age}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {currentMatch.bio}
                  </p>

                  {/* Match Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {currentMatch.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {currentMatch.age}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Action Buttons & Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions
                </h4>

                {/* Like Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleLike}
                  className="w-full mb-3"
                >
                  ❤️ Like
                </Button>

                {/* Skip Button */}
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleSkip}
                  className="w-full mb-6"
                >
                  ⊘ Skip
                </Button>

                {/* Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">
                      Match {currentMatchIndex + 1}
                    </span>
                    {' '}of {mockMatches.length}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentMatchIndex + 1) / mockMatches.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // No more matches
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No more matches
            </h3>
            <p className="text-gray-600 mb-6">
              You've viewed all available matches. Check back later!
            </p>
            <Button
              variant="primary"
              onClick={() => setCurrentMatchIndex(0)}
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;