import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
  confirmDisabled = false
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 🎬 Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    },
    disabled: {
      scale: 1,
      opacity: 0.6
    }
  };

  // Get type-specific styles
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          iconBg: "bg-red-500/10 border-red-500/20",
          accent: "text-red-400"
        };
      case "warning":
        return {
          icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
          confirmButton: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          iconBg: "bg-yellow-500/10 border-yellow-500/20",
          accent: "text-yellow-400"
        };
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          confirmButton: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
          iconBg: "bg-green-500/10 border-green-500/20",
          accent: "text-green-400"
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6 text-blue-500" />,
          confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          iconBg: "bg-blue-500/10 border-blue-500/20",
          accent: "text-blue-400"
        };
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          iconBg: "bg-red-500/10 border-red-500/20",
          accent: "text-red-400"
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: 0.1
                    }}
                    className={`p-3 rounded-xl border ${typeStyles.iconBg}`}
                  >
                    {typeStyles.icon}
                  </motion.div>
                  <div>
                    <h3 className={`text-xl font-semibold ${typeStyles.accent}`}>
                      {title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  disabled={isLoading}
                  className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Additional content can go here */}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end p-6 border-t border-gray-700/50 bg-gray-800/20">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none order-2 sm:order-1"
                >
                  {cancelText}
                </motion.button>
                
                <motion.button
                  variants={buttonVariants}
                  whileHover={!isLoading && !confirmDisabled ? "hover" : "disabled"}
                  whileTap="tap"
                  onClick={onConfirm}
                  disabled={isLoading || confirmDisabled}
                  className={`px-6 py-3 text-white rounded-xl font-medium transition-all ${typeStyles.confirmButton} disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none order-1 sm:order-2 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    confirmText
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Focus trap for accessibility */}
          <div className="sr-only">
            <button onClick={onClose}>Close modal</button>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Specialized modal variants
export const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName,
  isLoading = false 
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Confirmation"
      message={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
      confirmText={isLoading ? "Deleting..." : "Delete"}
      cancelText="Cancel"
      type="danger"
      isLoading={isLoading}
    />
  );
};

export const RemoveFromListModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  movieTitle,
  isLoading = false 
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove from List"
      message={`Are you sure you want to remove "${movieTitle}" from your list?`}
      confirmText={isLoading ? "Removing..." : "Remove"}
      cancelText="Keep"
      type="warning"
      isLoading={isLoading}
    />
  );
};

export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title,
  message,
  confirmText = "Got it"
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onClose}
      title={title}
      message={message}
      confirmText={confirmText}
      cancelText={null}
      type="success"
    />
  );
};

export default ConfirmationModal;