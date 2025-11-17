import React from "react";
import { motion } from "framer-motion";

const SearchSkeleton = () => {
  // Animation variants for shimmer effect
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { 
      x: "100%", 
      transition: { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "linear" 
      } 
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[2/3] flex flex-col"
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* Poster skeleton */}
      <div className="relative flex-1 bg-gray-700/50 overflow-hidden">
        {/* Simulated poster image skeleton */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-gray-600/50 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Rating badge skeleton */}
        <div className="absolute top-2 left-2 w-12 h-6 bg-gray-600/50 rounded-full animate-pulse" />
        
        {/* Hover overlay skeleton */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600/30 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-600/50 rounded animate-pulse" />
          <div className="h-4 bg-gray-600/50 rounded w-3/4 animate-pulse" />
        </div>
        
        {/* Metadata skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600/50 rounded-full animate-pulse" />
            <div className="w-12 h-3 bg-gray-600/50 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-600/50 rounded animate-pulse" />
            <div className="w-8 h-3 bg-gray-600/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Genre tags skeleton */}
        <div className="flex gap-1 flex-wrap">
          <div className="w-12 h-5 bg-gray-600/30 rounded-full animate-pulse" />
          <div className="w-16 h-5 bg-gray-600/30 rounded-full animate-pulse" />
          <div className="w-10 h-5 bg-gray-600/30 rounded-full animate-pulse" />
        </div>

        {/* Action button skeleton */}
        <div className="pt-2">
          <div className="h-8 bg-gray-600/30 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute top-2 right-2">
        <div className="w-6 h-6 bg-gray-600/50 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default SearchSkeleton;