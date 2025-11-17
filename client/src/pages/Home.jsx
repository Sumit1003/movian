import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTrendingMovies, fetchMoviesByGenre } from "../utils/api";
import Hero from "../components/Hero";
import CategoryRow from "../components/CategoryRow";
import HomeSkeleton from "../components/HomeSkeleton";
import ErrorState from "../components/ErrorState";
import { Play, RefreshCw, Info, Star } from "lucide-react";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [heroLoading, setHeroLoading] = useState(true);

  // 🎬 Animation Variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    },
    out: { 
      opacity: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut" 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const categoryVariants = {
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
        damping: 15
      }
    }
  };

  // Enhanced card variants with better hover effects
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30 
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

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(239, 68, 68, 0.9)",
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

  const loadHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setHeroLoading(true);
      setError("");

      // Fetch all data in parallel for better performance
      const [trendingData, actionData, comedyData, dramaData] = await Promise.allSettled([
        fetchTrendingMovies(),
        fetchMoviesByGenre("action"),
        fetchMoviesByGenre("comedy"),
        fetchMoviesByGenre("drama")
      ]);

      // Handle successful responses
      const handleResponse = (result, defaultValue = []) => {
        if (result.status === 'fulfilled') {
          const data = result.value;
          return Array.isArray(data) ? data : data?.results || data?.movies || defaultValue;
        }
        console.warn('API call failed:', result.reason);
        return defaultValue;
      };

      setTrendingMovies(handleResponse(trendingData));
      setActionMovies(handleResponse(actionData));
      setComedyMovies(handleResponse(comedyData));
      setDramaMovies(handleResponse(dramaData));

    } catch (err) {
      console.error("Home data fetch error:", err);
      setError("Failed to load movies. Please check your connection and try again.");
    } finally {
      setLoading(false);
      // Add a small delay for hero loading to ensure smooth transition
      setTimeout(() => setHeroLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  const handleRetry = () => {
    loadHomeData();
  };

  // Select a random movie for hero section from trending movies
  const getHeroMovie = () => {
    if (!trendingMovies || trendingMovies.length === 0) return null;
    
    // Prefer movies with poster images for hero
    const moviesWithPosters = trendingMovies.filter(movie => 
      movie?.Poster && movie.Poster !== "N/A"
    );
    
    const source = moviesWithPosters.length > 0 ? moviesWithPosters : trendingMovies;
    const randomMovie = source[Math.floor(Math.random() * source.length)];
    
    return randomMovie;
  };

  // Safe array check utility
  const hasMovies = (moviesArray) => {
    return Array.isArray(moviesArray) && moviesArray.length > 0;
  };

  // Calculate total movies loaded
  const totalMovies = [
    ...trendingMovies,
    ...actionMovies,
    ...comedyMovies,
    ...dramaMovies
  ].filter(Boolean).length;

  if (loading) {
    return <HomeSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  const heroMovie = getHeroMovie();
  const remainingTrending = hasMovies(trendingMovies) 
    ? trendingMovies.filter(movie => movie !== heroMovie)
    : [];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black"
    >
      {/* Hero Section with Loading State */}
      <AnimatePresence mode="wait">
        {heroLoading ? (
          <motion.div
            key="hero-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-400 text-lg">Loading amazing content...</p>
            </div>
          </motion.div>
        ) : (
          heroMovie && (
            <motion.div
              key="hero-loaded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Hero movie={heroMovie} />
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Movies Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16 lg:space-y-20 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Stats Bar */}
        {!loading && totalMovies > 0 && (
          <motion.div
            variants={categoryVariants}
            className="max-w-7xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalMovies}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Movies</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">4</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Categories</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {hasMovies(trendingMovies) ? trendingMovies.length : 0}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Trending</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trending Now */}
        {hasMovies(remainingTrending) && (
          <motion.div variants={categoryVariants}>
            <CategoryRow
              title="🔥 Trending Now"
              movies={remainingTrending}
              category="trending"
              cardVariants={cardVariants}
              buttonVariants={buttonVariants}
            />
          </motion.div>
        )}

        {/* Action Movies */}
        {hasMovies(actionMovies) && (
          <motion.div variants={categoryVariants}>
            <CategoryRow
              title="💥 Action & Adventure"
              movies={actionMovies.slice(0, 12)}
              category="action"
              seeMoreLink="/browse?genre=action"
              gradient="from-orange-500 to-red-600"
              cardVariants={cardVariants}
              buttonVariants={buttonVariants}
            />
          </motion.div>
        )}

        {/* Comedy Movies */}
        {hasMovies(comedyMovies) && (
          <motion.div variants={categoryVariants}>
            <CategoryRow
              title="😂 Comedy"
              movies={comedyMovies.slice(0, 12)}
              category="comedy"
              seeMoreLink="/browse?genre=comedy"
              gradient="from-yellow-500 to-orange-500"
              cardVariants={cardVariants}
              buttonVariants={buttonVariants}
            />
          </motion.div>
        )}

        {/* Drama Movies */}
        {hasMovies(dramaMovies) && (
          <motion.div variants={categoryVariants}>
            <CategoryRow
              title="🎭 Drama"
              movies={dramaMovies.slice(0, 12)}
              category="drama"
              seeMoreLink="/browse?genre=drama"
              gradient="from-purple-500 to-pink-600"
              cardVariants={cardVariants}
              buttonVariants={buttonVariants}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {!heroMovie && !hasMovies(trendingMovies) && !hasMovies(actionMovies) && 
         !hasMovies(comedyMovies) && !hasMovies(dramaMovies) && (
          <motion.div
            variants={categoryVariants}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-8xl mb-6"
            >
              🎬
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4"
            >
              No Movies Available
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 max-w-md mx-auto mb-8 text-lg"
            >
              We're having trouble loading movies right now. Please check your connection and try again.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -5px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg"
            >
              <RefreshCw size={20} />
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Loading More Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-3"
            />
            <p className="text-gray-400">Loading more content...</p>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRetry}
        className="fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-2xl shadow-red-600/30 flex items-center justify-center"
      >
        <RefreshCw size={20} className="text-white" />
      </motion.button>
    </motion.div>
  );
};

export default Home;