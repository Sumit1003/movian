import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const MovieCard = ({ movie, category, priority = false, onClick }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 🎬 Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleCardClick = () => {
    navigate(`/movies/${movie.imdbID}`);
    if (onClick) onClick(movie);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      whileTap="tap"
      onClick={handleCardClick}
      className="relative group cursor-pointer w-full"
    >
      {/* Card Wrapper with Glow Effect */}
      <motion.div
        className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 aspect-[2/3] relative"
        whileHover={{
          boxShadow: "0 0 25px 4px rgba(255, 255, 255, 0.25)", // 🔥 Soft red glow
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          {!imageLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {/* Movie Poster */}
          <motion.img
            variants={imageVariants}
            initial="hidden"
            animate={imageLoaded ? "visible" : "hidden"}
            whileHover="hover"
            src={
              imageError
                ? "/placeholder-movie.png"
                : movie.Poster !== "N/A"
                ? movie.Poster
                : "/placeholder-movie.png"
            }
            alt={movie.Title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Movie Info (hover reveal) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight">
              {movie.Title}
            </h3>
            <p className="text-gray-300 text-xs mb-2">{movie.Year}</p>
            {movie.Type && (
              <span className="inline-block px-2 py-1 bg-red-600/80 text-white text-xs rounded-full capitalize">
                {movie.Type}
              </span>
            )}
          </div>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full capitalize">
                {category}
              </span>
            </div>
          )}

          {/* IMDb Rating Badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
              <Star size={10} className="text-yellow-400 fill-current" />
              <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compact Info for Mobile */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{movie.Year}</span>
          {movie.Type && (
            <span className="capitalize bg-gray-700 px-2 py-1 rounded-full">
              {movie.Type}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Compact version (for search/grid)
export const CompactMovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px 3px rgba(255, 255, 255, 0.2)", // subtle white glow
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onClick={() => navigate(`/movies/${movie.imdbID}`)}
      className="relative cursor-pointer group"
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden aspect-[2/3] relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl" />
        )}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.png"}
          alt={movie.Title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="text-center p-3">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {movie.Title}
            </h3>
            <p className="text-gray-300 text-xs">{movie.Year}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
