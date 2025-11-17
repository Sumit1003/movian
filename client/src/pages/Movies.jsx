import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, RefreshCw, Film, Star } from "lucide-react";
import SkeletonLoader from "../components/SkeletonLoader";
import ColorThief from "colorthief";

// 🧱 Simple Error Boundary to prevent UI crashes
class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn("💥 MovieCard error caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-800 text-gray-300 p-4 rounded-lg text-center aspect-[2/3] flex items-center justify-center">
          ⚠️ Something went wrong loading this movie.
        </div>
      );
    }
    return this.props.children;
  }
}

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.05, y: -5 },
  };

  // Fetch movies - Updated for 20 movies per page
  const API = import.meta.env.VITE_API_BASE_URL || "";
  const fetchMovies = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError("");
    setIsNavigating(true);
    try {
      const res = await fetch(`${API}/api/movies/all?page=${pageNum}&limit=20`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch movies");
      
      setMovies(data.results || []);
      setTotalResults(data.totalResults || 0);
      // Calculate total pages based on 20 movies per page
      setTotalPages(Math.ceil((data.totalResults || 0) / 20));
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setError("Unable to load movies. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setIsNavigating(false), 300);
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCardClick = (imdbID) => {
    if (!imdbID) return;
    navigate(`/movies/${imdbID}`);
  };

  const handleRetry = () => {
    fetchMovies(page);
  };

  // Color aura cache
  const colorRefs = useRef({});

  const extractDominantColor = (img, imdbID) => {
    try {
      if (!img || !imdbID) return;
      const colorThief = new ColorThief();
      if (img.complete && img.naturalWidth > 0) {
        const color = colorThief.getColor(img);
        if (Array.isArray(color)) {
          colorRefs.current[imdbID] = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.35)`;
        }
      }
    } catch {
      colorRefs.current[imdbID] = "rgba(255,255,255,0.2)";
    }
  };

  const PaginationButton = ({ children, onClick, disabled, active = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[44px] min-w-[44px] flex items-center justify-center
        px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${active ? "bg-red-600 text-white shadow-lg" : "bg-gray-700 hover:bg-gray-600 text-gray-200"}
      `}
    >
      {children}
    </button>
  );

  const getPageNumbers = () => {
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages)
      start = Math.max(1, end - maxVisiblePages + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  // Calculate showing range for 20 movies per page
  const showingStart = ((page - 1) * 20) + 1;
  const showingEnd = Math.min(page * 20, totalResults);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col items-center pt-20 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Film size={24} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              All Movies
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-4">Discover our entire movie collection</p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto mb-8 bg-red-900/20 border border-red-700 rounded-xl p-4 text-center"
          >
            <p className="text-red-300 mb-3">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </motion.div>
        )}

        {/* Movies Grid - 20 movies per page */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl w-full"
        >
          {loading
            ? [...Array(20)].map((_, i) => <SkeletonLoader key={i} />)
            : movies.map((movie, index) => (
                <SafeBoundary key={movie.imdbID || index}>
                  <motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  transition={{ delay: index * 0.05 }}
  className="group relative cursor-pointer"
>
  {/* Movie Card Container */}
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 aspect-[2/3] relative">

    {/* Poster */}
    <img
      crossOrigin="anonymous"
      ref={(img) => img && extractDominantColor(img, movie.imdbID)}
      src={
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "/placeholder-movie.png"
      }
      alt={movie.Title || "Movie"}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      onError={(e) => (e.target.src = "/placeholder-movie.png")}
      onClick={() => handleCardClick(movie.imdbID)}
    />

                      {/* Gradient Overlay */}
    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

    {/* Movie Info */}
    <div className="absolute bottom-12 left-0 right-0 p-3">
      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
        {movie.Title || "Untitled"}
      </h3>
      <div className="flex items-center justify-between text-xs text-gray-300">
        <span>{movie.Year || "N/A"}</span>
        <div className="flex items-center gap-2">
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="flex items-center gap-1">
              <Star size={10} className="text-yellow-400 fill-current" />
              <span className="text-yellow-400">{movie.imdbRating}</span>
            </div>
          )}
          {movie.Type && (
            <span className="capitalize bg-gray-700/80 px-2 py-1 rounded-full text-xs">
              {movie.Type}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* ⭐ WATCH NOW BUTTON */}
    <button
      onClick={(e) => {
        e.stopPropagation();   // prevent movie detail navigation
        navigate(`/watch/${movie.imdbID}`);
      }}
      className="
        absolute bottom-2 left-1/2 -translate-x-1/2
        w-[90%] py-2 text-sm font-semibold
        bg-red-600 hover:bg-red-700
        rounded-lg shadow-lg transition-all
        text-white text-center
      "
    >
      Watch Now
    </button>
                      {/* Hover Glow Aura */}
    <motion.div
      whileHover={{
        boxShadow: `0 0 25px 6px ${
          colorRefs.current[movie.imdbID] || "rgba(239, 68, 68, 0.3)"
        }`,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 rounded-xl pointer-events-none"
    />
  </div>
</motion.div>
                </SafeBoundary>
              ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-7xl"
          >
            {/* Page Info */}
            <div className="text-gray-400 text-sm">
              Page <span className="text-red-400 font-semibold">{page}</span> of{" "}
              <span className="text-red-400 font-semibold">{totalPages}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <PaginationButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                <ChevronLeft size={18} />
              </PaginationButton>
              
              {getPageNumbers().map((p) => (
                <PaginationButton key={p} onClick={() => handlePageChange(p)} active={p === page}>
                  {p}
                </PaginationButton>
              ))}
              
              <PaginationButton
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight size={18} />
              </PaginationButton>
            </div>

            {/* Quick Jump - Desktop Only */}
            {window.innerWidth >= 640 && totalPages > 5 && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Go to:</span>
                <select
                  value={page}
                  onChange={(e) => handlePageChange(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Film size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No movies found</h3>
            <p className="text-gray-500">Try refreshing the page or check back later</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Movies;