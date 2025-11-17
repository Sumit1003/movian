import React from "react";
import { motion } from "framer-motion";

const SkeletonLoader = ({ variant = "default", count = 1 }) => {
  // 🎬 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
        stiffness: 100,
        damping: 15
      }
    }
  };

  const pulseVariants = {
    initial: { 
      opacity: 0.6,
      scale: 1 
    },
    animate: { 
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Different skeleton variants
  const getSkeletonVariant = () => {
    switch (variant) {
      case "compact":
        return (
          <motion.div
            variants={cardVariants}
            className="group w-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg aspect-[2/3] relative border border-gray-700/30">
              {/* Main Content */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
              />
              
              {/* Shimmer Effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent transform -skew-x-12 z-10"
              />
            </div>
          </motion.div>
        );

      case "card":
        return (
          <motion.div
            variants={cardVariants}
            className="group w-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl aspect-[2/3] relative border border-gray-700/30">
              {/* Main Poster */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
              />
              
              {/* Shimmer Effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent transform -skew-x-12 z-10"
              />
              
              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-4 bg-gray-700 rounded-lg mb-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-3 bg-gray-700 rounded w-16 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>

              {/* Top Badge */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute top-3 right-3 w-10 h-5 bg-gray-700 rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
            </div>
          </motion.div>
        );

      case "detailed":
        return (
          <motion.div
            variants={cardVariants}
            className="group w-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl aspect-[2/3] relative border border-gray-700/30">
              {/* Main Content */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
              />
              
              {/* Shimmer Effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/40 to-transparent transform -skew-x-12 z-10"
              />
              
              {/* Detailed Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                {/* Title */}
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-5 bg-gray-700 rounded-lg mb-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                
                {/* Year */}
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-3 bg-gray-700 rounded w-20 mb-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                
                {/* Type Badge */}
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-6 bg-gray-700 rounded-full w-16 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>

              {/* Rating Badge */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute top-3 right-3 w-12 h-6 bg-gray-700 rounded-full flex items-center gap-1 px-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>

              {/* Action Button */}
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute top-3 left-3 w-8 h-8 bg-gray-700 rounded-full border border-gray-600/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
            </div>

            {/* External Info */}
            <div className="mt-3 space-y-2">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="h-4 bg-gray-800 rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700" />
              </motion.div>
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="h-3 bg-gray-800 rounded w-3/4 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700" />
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            variants={cardVariants}
            className="group w-full"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg aspect-[2/3] relative border border-gray-700/30">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
              />
              
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/25 to-transparent transform -skew-x-12 z-10"
              />
            </div>
          </motion.div>
        );
    }
  };

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-full">
            {getSkeletonVariant()}
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {getSkeletonVariant()}
    </motion.div>
  );
};

// Specialized skeleton components
export const GridSkeleton = ({ columns = 6, rows = 2 }) => {
  const totalItems = columns * rows;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-${columns} gap-4 md:gap-6`}>
        {Array.from({ length: totalItems }).map((_, index) => (
          <SkeletonLoader key={index} variant="card" />
        ))}
      </div>
    </motion.div>
  );
};

export const CategorySkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 bg-gray-700 rounded-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="h-8 bg-gray-700 rounded-2xl w-48 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
        </div>
      </div>

      {/* Movies Grid */}
      <GridSkeleton columns={6} rows={1} />

      {/* Progress Bar */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        className="h-1 bg-gray-800 rounded-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600" />
      </motion.div>
    </motion.div>
  );
};

export const HeroSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-screen bg-gray-800 overflow-hidden"
    >
      {/* Shimmer Effect */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent transform -skew-x-12 z-10"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-12 bg-gray-700 rounded-2xl w-3/4 sm:w-1/2 mb-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="h-6 bg-gray-700 rounded-xl w-1/3 sm:w-1/4 mb-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="h-12 bg-gray-700 rounded-xl w-48 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonLoader;