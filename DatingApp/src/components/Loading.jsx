import React from 'react';

/**
 * Loading/Spinner Component
 * @param {string} size - Spinner size: 'sm', 'md', 'lg'
 * @param {string} variant - Spinner style: 'spinner', 'dots', 'pulse'
 * @param {string} message - Optional message to display below spinner
 * @param {boolean} fullscreen - Whether spinner takes full screen
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} - Loading component
 */
const Loading = ({
  size = 'md',
  variant = 'spinner',
  message = 'Loading...',
  fullscreen = false,
  className = '',
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  // Container styles based on fullscreen
  const containerStyles = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex flex-col items-center justify-center gap-4';

  // Spinner variant: Default spinner
  const renderSpinner = () => (
    <svg
      className={`${sizeStyles[size]} animate-spin text-blue-600`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Dots variant: Three bouncing dots
  const renderDots = () => (
    <div className={`${sizeStyles[size]} flex items-center justify-center gap-1`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-600 rounded-full"
          style={{
            animation: `bounce 1.4s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          40% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );

  // Pulse variant: Pulsing circle
  const renderPulse = () => (
    <div
      className={`${sizeStyles[size]} bg-blue-600 rounded-full animate-pulse`}
    />
  );

  // Select variant
  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`${containerStyles} ${className}`}>
      {renderVariant()}
      {message && (
        <p className="text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default Loading;