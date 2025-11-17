// components/HomeSkeleton.jsx
import React from "react";
import { motion } from "framer-motion";

const HomeSkeleton = () => {
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

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
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
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black"
    >
      {/* Hero Skeleton */}
      <motion.div
        variants={itemVariants}
        className="relative h-screen bg-gray-800 overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent transform -skew-x-12 z-10"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="h-10 sm:h-12 bg-gray-700 rounded-2xl w-3/4 sm:w-1/2 mb-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
            </motion.div>
            
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="h-6 bg-gray-700 rounded-xl w-1/3 sm:w-1/4 mb-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl w-48 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="h-12 bg-gray-700 rounded-xl w-40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar Skeleton */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center -mt-8 mb-12 px-4"
      >
        <div className="flex items-center gap-6 lg:gap-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-700/50">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="w-12 h-12 bg-gray-700 rounded-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
              <div className="space-y-2">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-4 bg-gray-700 rounded w-16 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-3 bg-gray-700 rounded w-12 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>
              {item < 3 && (
                <div className="w-px h-8 bg-gray-600" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Skeletons */}
      <motion.div
        variants={containerVariants}
        className="space-y-16 lg:space-y-20 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        {[1, 2, 3, 4].map((category) => (
          <motion.div
            key={category}
            variants={itemVariants}
            className="relative"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="w-8 h-8 bg-gray-700 rounded-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-8 bg-gray-700 rounded-2xl w-48 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="h-6 bg-gray-700 rounded-full w-16 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>
              
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="hidden sm:block h-10 bg-gray-700 rounded-xl w-32 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </motion.div>
            </div>

            {/* Movies Grid */}
            <div className="relative">
              {/* Scroll Arrows */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="w-10 h-10 bg-gray-700 rounded-full border border-gray-600/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>

              <div className="flex gap-4 sm:gap-6 overflow-hidden px-2 sm:px-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    className="flex-shrink-0 w-36 sm:w-44 md:w-48 lg:w-56"
                  >
                    <div className="aspect-[2/3] bg-gray-800 rounded-2xl relative overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
                      
                      {/* Poster Shimmer */}
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent transform -skew-x-12"
                      />
                      
                      {/* Bottom Gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
                      
                      {/* Text Content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                          variants={pulseVariants}
                          initial="initial"
                          animate="animate"
                          className="h-4 bg-gray-700 rounded mb-2 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                        </motion.div>
                        <motion.div
                          variants={pulseVariants}
                          initial="initial"
                          animate="animate"
                          className="h-3 bg-gray-700 rounded w-3/4 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="w-10 h-10 bg-gray-700 rounded-full border border-gray-600/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
                </motion.div>
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="h-1 bg-gray-800 rounded-full mx-2 sm:mx-4 mt-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600" />
            </motion.div>

            {/* Mobile See More */}
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="sm:hidden flex justify-center mt-6"
            >
              <div className="h-12 bg-gray-700 rounded-xl w-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Loading Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full shadow-2xl flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default HomeSkeleton;