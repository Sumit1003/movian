import React from "react";
import { motion } from "framer-motion";
import { Search, Film, Heart, Clock, Home, RefreshCw, Plus } from "lucide-react";

const EmptyState = ({ 
  emoji = "🎬", 
  title, 
  message, 
  actionText, 
  onAction,
  secondaryActionText,
  onSecondaryAction,
  icon: Icon,
  variant = "default",
  size = "medium"
}) => {
  // 🎬 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const emojiVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.3
        }
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const secondaryButtonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(55, 65, 81, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Size variants
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          emoji: "text-4xl",
          title: "text-xl",
          message: "text-base",
          padding: "py-8"
        };
      case "large":
        return {
          emoji: "text-8xl",
          title: "text-4xl",
          message: "text-xl",
          padding: "py-24"
        };
      default:
        return {
          emoji: "text-6xl",
          title: "text-2xl",
          message: "text-lg",
          padding: "py-16"
        };
    }
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "search":
        return {
          icon: Search,
          emoji: "🔍",
          defaultTitle: "No Results Found",
          defaultMessage: "Try adjusting your search terms or browse different categories.",
          defaultAction: "New Search"
        };
      case "favorites":
        return {
          icon: Heart,
          emoji: "❤️",
          defaultTitle: "No Favorites Yet",
          defaultMessage: "Start building your collection by adding movies to your favorites.",
          defaultAction: "Browse Movies"
        };
      case "watchlist":
        return {
          icon: Clock,
          emoji: "⏰",
          defaultTitle: "Watchlist is Empty",
          defaultMessage: "Add movies you want to watch later to your personal watchlist.",
          defaultAction: "Discover Movies"
        };
      case "error":
        return {
          icon: RefreshCw,
          emoji: "⚠️",
          defaultTitle: "Something Went Wrong",
          defaultMessage: "We encountered an issue. Please try refreshing or check your connection.",
          defaultAction: "Try Again"
        };
      case "movies":
        return {
          icon: Film,
          emoji: "🎬",
          defaultTitle: "No Movies Available",
          defaultMessage: "We couldn't find any movies matching your criteria. Try different filters.",
          defaultAction: "Reset Filters"
        };
      default:
        return {
          icon: Film,
          emoji: emoji,
          defaultTitle: "Nothing Here Yet",
          defaultMessage: "Get started by exploring our movie collection.",
          defaultAction: "Get Started"
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();
  const DisplayIcon = Icon || variantStyles.icon;
  const displayEmoji = emoji === "🎬" ? variantStyles.emoji : emoji;
  const displayTitle = title || variantStyles.defaultTitle;
  const displayMessage = message || variantStyles.defaultMessage;
  const displayActionText = actionText || variantStyles.defaultAction;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`text-center px-4 sm:px-6 ${sizeStyles.padding}`}
    >
      {/* Icon/Emoji */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <motion.div
          variants={emojiVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={`relative ${sizeStyles.emoji} mb-4`}
        >
          {displayEmoji}
          
          {/* Animated background circle */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full -z-10"
            style={{ 
              top: '-20%', 
              left: '-20%', 
              right: '-20%', 
              bottom: '-20%' 
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={itemVariants}
        className="max-w-md mx-auto"
      >
        {/* Title */}
        <motion.h3
          variants={itemVariants}
          className={`font-bold text-white mb-4 ${sizeStyles.title}`}
        >
          {displayTitle}
        </motion.h3>

        {/* Message */}
        <motion.p
          variants={itemVariants}
          className={`text-gray-400 mb-8 leading-relaxed ${sizeStyles.message}`}
        >
          {displayMessage}
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary Action */}
          {onAction && displayActionText && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onAction}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg shadow-red-600/25 min-w-[140px] justify-center"
            >
              <DisplayIcon size={20} />
              {displayActionText}
            </motion.button>
          )}

          {/* Secondary Action */}
          {onSecondaryAction && secondaryActionText && (
            <motion.button
              variants={secondaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onSecondaryAction}
              className="px-6 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 text-gray-300 rounded-xl font-medium hover:text-white transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {secondaryActionText}
            </motion.button>
          )}
        </motion.div>

        {/* Additional Tips based on variant */}
        {variant === "search" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <p className="text-gray-500 text-sm mb-3">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Action", "Comedy", "2023", "Marvel", "Drama"].map((term) => (
                <span
                  key={term}
                  className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-xs border border-gray-700/50"
                >
                  {term}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Animated dots */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Pre-configured empty state components
export const SearchEmptyState = (props) => (
  <EmptyState variant="search" {...props} />
);

export const FavoritesEmptyState = (props) => (
  <EmptyState variant="favorites" {...props} />
);

export const WatchlistEmptyState = (props) => (
  <EmptyState variant="watchlist" {...props} />
);

export const ErrorEmptyState = (props) => (
  <EmptyState variant="error" {...props} />
);

export const MoviesEmptyState = (props) => (
  <EmptyState variant="movies" {...props} />
);

export default EmptyState;