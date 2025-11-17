import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Play, Film, RefreshCw } from "lucide-react";
import { searchMovies, fetchTrailer } from "../utils/api";
import MovieCard from "../components/MovieCard";
import TrailerModal from "../components/TrailerModal";
import SearchSkeleton from "../components/SearchSkeleton";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // 🎬 Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

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

  // Debounced search for better UX
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);
      setSearchTimeout(timeoutId);
    } else if (query.trim().length === 0 && hasSearched) {
      clearSearch();
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [query]);

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    const searchQuery = query.trim();
    if (!searchQuery) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const data = await searchMovies(searchQuery);
      if (data.movies && data.movies.length > 0) {
        setResults(data.movies);
      } else {
        setResults([]);
        setError("No movies found. Try a different search term.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search movies. Please check your connection and try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleWatchTrailer = async (movie) => {
    setTrailerLoading(movie.imdbID);
    setError("");

    try {
      const data = await fetchTrailer(movie.Title, movie.Year);
      if (data && data.videoId) {
        setTrailer(data);
      } else {
        setError("Trailer not found for this movie.");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
      setError("Failed to load trailer. Please try again.");
    } finally {
      setTrailerLoading(null);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
    setHasSearched(false);
  };

  const handleRetry = () => {
    if (query.trim()) {
      handleSearch();
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white"
    >
      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <SearchIcon size={24} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Discover Movies
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Search through our extensive movie collection and watch trailers instantly
          </motion.p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <SearchIcon 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search for movies, actors, or genres..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
              />
              {query && (
                <motion.button
                  type="button"
                  onClick={clearSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X size={18} />
                </motion.button>
              )}
            </motion.div>
          </div>
          <motion.button
            type="submit"
            disabled={loading || !query.trim()}
            variants={buttonVariants}
            whileHover={!loading && query.trim() ? "hover" : {}}
            whileTap="tap"
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl font-semibold disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 min-w-[140px] flex items-center justify-center gap-2 shadow-lg shadow-red-600/25"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon size={18} />
                Search
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-red-900/50 backdrop-blur-sm border border-red-700/50 rounded-2xl p-6 text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  🎬
                </motion.div>
                <h3 className="text-red-200 text-xl font-semibold mb-2">Search Issue</h3>
                <p className="text-red-200 mb-4">{error}</p>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleRetry}
                  className="px-6 py-3 bg-red-600 rounded-xl font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-red-600/25"
                >
                  <RefreshCw size={18} />
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Info */}
        <AnimatePresence>
          {hasSearched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <motion.p 
                className="text-gray-300 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {results.length > 0 
                  ? `Found ${results.length} movie${results.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`
                }
              </motion.p>
              {results.length > 0 && (
                <motion.button
                  onClick={clearSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-200 text-sm"
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <SearchSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {results.map((movie, index) => (
                  <motion.div
                    key={movie.imdbID}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ 
                      delay: index * 0.1,
                      layout: { duration: 0.5 }
                    }}
                    className="relative group"
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && hasSearched && results.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
              <h3 className="text-3xl font-bold text-white mb-4">
                No Movies Found
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Try searching with different keywords, check your spelling, or browse our categories.
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={clearSearch}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl font-semibold flex items-center gap-3 mx-auto shadow-lg shadow-red-600/25"
              >
                <SearchIcon size={20} />
                New Search
              </motion.button>
            </motion.div>
          )}

          {/* Initial State */}
          {!hasSearched && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🔍
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Start Your Movie Journey
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                Enter a movie title, actor name, or genre above to discover amazing films and watch their trailers instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300"
                >
                  Try: "Action"
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300"
                >
                  Try: "Marvel"
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300"
                >
                  Try: "2023"
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Search;