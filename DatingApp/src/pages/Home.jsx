import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Button from '../components/Button';

/**
 * Home Page
 * Landing page for authenticated users
 */
const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
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
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.MATCHES)}
            >
              Matches
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.CHAT)}
            >
              Chat
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.firstName}! 👋
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to find your perfect match?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* View Matches Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-10-5v5m5-5v5M3.5 9.5h13"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              View Matches
            </h3>
            <p className="text-gray-600 mb-4">
              Discover people who match your preferences
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTES.MATCHES)}
            >
              Browse Matches
            </Button>
          </div>

          {/* Complete Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4m0-5a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Profile
            </h3>
            <p className="text-gray-600 mb-4">
              Add a photo and update your profile details
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              Edit Profile
            </Button>
          </div>

          {/* Messages Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
                <path d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7-1.274 4.057-5.064 7-5.522-3-9.542-7z" opacity="0.5"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Messages
            </h3>
            <p className="text-gray-600 mb-4">
              Connect with matches and start conversations
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTES.CHAT)}
            >
              View Messages
            </Button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Your Profile
          </h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.firstName || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.lastName || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.email || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Age</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.age || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {user?.gender || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Interested In</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {user?.interestedIn || 'N/A'}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            Edit Full Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;