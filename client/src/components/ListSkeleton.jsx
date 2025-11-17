// components/ListSkeleton.jsx
import React from "react";
import { motion } from "framer-motion";

const ListSkeleton = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group"
    >
      <motion.div
        variants={cardVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl aspect-[2/3] relative border border-gray-700/30"
      >
        {/* Main Poster Skeleton */}
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
        
        {/* Poster Details Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
          {/* Title Skeleton */}
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="h-4 bg-gray-700 rounded-lg mb-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          
          {/* Year Skeleton */}
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="h-3 bg-gray-700 rounded w-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          
          {/* Type Badge Skeleton */}
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="h-6 bg-gray-700 rounded-full w-14 mt-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
        </div>

        {/* Remove Button Skeleton */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="absolute top-3 right-3 w-8 h-8 bg-gray-700 rounded-full border border-gray-600/50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
        </motion.div>

        {/* Hover Overlay Skeleton */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </motion.div>

      {/* Bottom Text Skeleton (for grid layouts) */}
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
};

// Enhanced HomeSkeleton using ListSkeleton
export const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Hero Skeleton */}
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
              className="h-10 sm:h-12 bg-gray-700 rounded-2xl w-3/4 sm:w-1/2 mb-4 relative overflow-hidden"
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

      {/* Categories Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-16 lg:space-y-20 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        {[1, 2, 3, 4].map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + category * 0.1 }}
            className="relative"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-8">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ListSkeleton key={index} />
              ))}
            </div>

            {/* Progress Bar */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="h-1 bg-gray-800 rounded-full mt-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Enhanced SearchSkeleton using ListSkeleton
export const SearchSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Search Header Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-gray-700 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="h-12 bg-gray-700 rounded-2xl w-64 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
          </motion.div>
        </div>
      </motion.div>

      {/* Search Results Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <ListSkeleton key={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ListSkeleton;