import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateProfileForm } from '../utils/validation';
import { ROUTES, FORM_FIELDS } from '../constants';
import Input from '../components/Input';
import Button from '../components/Button';

/**
 * Profile Page
 * Allows users to view and update their profile information
 */
const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, error: authError } = useAuth();
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize form with current user data
  const form = useForm(
    {
      [FORM_FIELDS.FIRST_NAME]: user?.firstName || '',
      [FORM_FIELDS.LAST_NAME]: user?.lastName || '',
      [FORM_FIELDS.AGE]: user?.age || '',
      [FORM_FIELDS.GENDER]: user?.gender || '',
      [FORM_FIELDS.INTERESTED_IN]: user?.interestedIn || '',
      bio: user?.bio || '',
    },
    async (values) => {
      try {
        setApiError('');
        setSuccessMessage('');
        await updateProfile(values);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setApiError(err.message || 'Failed to update profile');
      }
    },
    validateProfileForm
  );

  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } = form;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">DatingApp</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Profile
          </h2>
          <p className="text-gray-600 mb-8">
            Update your profile information to help others find you
          </p>

          {/* Error Messages */}
          {(authError || apiError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{authError || apiError}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Photo
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {user?.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <Button variant="secondary" size="sm" type="button">
                    Upload Photo
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="John"
                  {...getFieldProps(FORM_FIELDS.FIRST_NAME)}
                  error={getFieldMeta(FORM_FIELDS.FIRST_NAME).error}
                  touched={getFieldMeta(FORM_FIELDS.FIRST_NAME).touched}
                  required
                />

                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  {...getFieldProps(FORM_FIELDS.LAST_NAME)}
                  error={getFieldMeta(FORM_FIELDS.LAST_NAME).error}
                  touched={getFieldMeta(FORM_FIELDS.LAST_NAME).touched}
                  required
                />

                <Input
                  label="Age"
                  type="number"
                  placeholder="25"
                  {...getFieldProps(FORM_FIELDS.AGE)}
                  error={getFieldMeta(FORM_FIELDS.AGE).error}
                  touched={getFieldMeta(FORM_FIELDS.AGE).touched}
                  required
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={FORM_FIELDS.GENDER}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...getFieldProps(FORM_FIELDS.GENDER)}
                    onBlur={(e) => form.handleBlur(e)}
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

                <div>
                  <label
                    htmlFor={FORM_FIELDS.INTERESTED_IN}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...getFieldProps(FORM_FIELDS.INTERESTED_IN)}
                    onBlur={(e) => form.handleBlur(e)}
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
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About You
              </h3>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...getFieldProps('bio')}
                  onBlur={(e) => form.handleBlur(e)}
                  placeholder="Tell others about yourself..."
                  rows="5"
                  className={`
                    w-full px-4 py-2 text-base border rounded-lg
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-0
                    resize-none
                    ${getFieldMeta('bio').touched && getFieldMeta('bio').error
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                />
                {getFieldMeta('bio').touched && getFieldMeta('bio').error && (
                  <p className="text-sm text-red-500 mt-1">
                    {getFieldMeta('bio').error}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;