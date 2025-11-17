import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import MovieCard from "./MovieCard";

const CategoryRow = ({ 
  title, 
  movies, 
  category, 
  seeMoreLink, 
  icon,
  gradient = "from-red-500 to-red-600"
}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Scroll functionality
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 400;
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    setIsScrolling(true);
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => {
      checkScrollPosition();
      setIsScrolling(false);
    }, 300);
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = () => {
    if (isScrolling) return;
    checkScrollPosition();
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={titleVariants}
          className="flex items-center gap-3"
        >
          {icon && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-red-500"
            >
              {icon}
            </motion.div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h2>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full text-xs font-medium text-gray-300 border border-gray-700/50"
          >
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </motion.span>
        </motion.div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-gray-600/50 shadow-2xl transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Movies Grid */}
        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-6"
          style={{ scrollBehavior: 'smooth' }}
        >
          <AnimatePresence>
            {movies.map((movie, index) => (
              <motion.div
                key={movie.imdbID || index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover="hover"
                className="flex-shrink-0 w-36 sm:w-44 md:w-48 lg:w-56"
              >
                <MovieCard 
                  movie={movie} 
                  category={category}
                  priority={index < 4} // Lazy load after first 4 items
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Right Arrow */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-gray-600/50 shadow-2xl transition-all duration-200"
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
      </div>

      {/* Mobile See More Button */}
      {seeMoreLink && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden flex justify-center mt-4 px-4"
        >
          <motion.a
            href={seeMoreLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 border border-gray-700/50 w-full max-w-xs justify-center shadow-lg"
          >
            <Play size={16} />
            <span>Explore More</span>
          </motion.a>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-1 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full mx-4 sm:mx-6 lg:mx-8 mt-2 overflow-hidden"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
        />
      </motion.div>
    </motion.div>
  );
};

export default CategoryRow;