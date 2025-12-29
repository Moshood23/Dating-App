import React, { useEffect } from 'react';

/**
 * Reusable Modal/Dialog Component
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {string} children - Modal content
 * @param {string} size - Modal size: 'sm', 'md', 'lg', 'xl'
 * @param {boolean} closeOnBackdropClick - Whether to close on backdrop click
 * @param {boolean} closeButton - Whether to show close button
 * @param {object} footer - Footer content (usually action buttons)
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element|null} - Modal component or null if not open
 */
const Modal = ({
  isOpen,
  onClose,
  title = '',
  children,
  size = 'md',
  closeOnBackdropClick = true,
  closeButton = true,
  footer,
  className = '',
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Modal size styles
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto
          w-full mx-4 ${sizeStyles[size]} ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        {(title || closeButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {closeButton && (
              <button
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {typeof children === 'string' ? (
            <p className="text-gray-700">{children}</p>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;