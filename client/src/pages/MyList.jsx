/* -------------------------
   🎬 MyList.jsx — FIXED & SAFE
   No warnings. No async return in effects.
-------------------------- */

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchMyList, removeFromMyList } from "../utils/api";
import { Trash2, Play, Clock, List, Film, Star } from "lucide-react";
import SkeletonLoader from "../components/SkeletonLoader";

const MyList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState({});
  const navigate = useNavigate();

  /* -----------------------------------
     🔄 Fetch List (Corrected)
  ----------------------------------- */
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchMyList();

      if (res?.success && Array.isArray(res.list)) {
        setList(res.list);
      } else {
        setList([]);
        if (res?.message) toast.error(res.message);
      }
    } catch {
      toast.error("Failed to load your list");
      setList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* -----------------------------------
     ❌ Remove Movie
  ----------------------------------- */
  const handleRemove = async (id, title) => {
    setIsRemoving((p) => ({ ...p, [id]: true }));

    try {
      const res = await removeFromMyList(id);
      if (res.success) {
        toast.success(`"${title}" removed`);
        setList((p) => p.filter((m) => m.imdbID !== id));
      } else {
        toast.error(res.message || "Failed to remove");
      }
    } catch {
      toast.error("Failed to remove");
    } finally {
      setIsRemoving((p) => ({ ...p, [id]: false }));
    }
  };

  const handleMovieClick = (id) => navigate(`/movies/${id}`);
  const handleWatch = (id, e) => {
    e.stopPropagation();
    navigate(`/watch/${id}`);
  };

  /* -----------------------------------
     🛠️ FIXED useEffect (NO PROMISE RETURN)
  ----------------------------------- */
  useEffect(() => {
    const run = async () => {
      await loadData();
    };
    run();
  }, [loadData]);

  /* -----------------------------------
     🟦 Animations
  ----------------------------------- */
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  };

  const hover = {
    scale: 1.05,
    y: -6,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  };

  /* -----------------------------------
     📊 Stats
  ----------------------------------- */
  const stats = {
    total: list.length,
    avgRating:
      list.length > 0
        ? (
            list.reduce(
              (sum, m) => sum + (parseFloat(m.imdbRating) || 0),
              0
            ) / list.length
          ).toFixed(1)
        : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 pb-12 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between mb-10 gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-xl"
            >
              <List size={24} />
            </motion.div>

            <div>
              <h1 className="text-4xl font-bold">My List</h1>
              <p className="text-gray-400">Saved movies & shows</p>
            </div>
          </div>

          {list.length > 0 && (
            <div className="flex items-center gap-6 bg-gray-800/40 px-6 py-4 rounded-xl">
              <div className="text-center">
                <p className="text-xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-yellow-400">{stats.avgRating}</p>
                <p className="text-xs text-gray-400">Avg Rating</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && list.length === 0 && (
          <div className="text-center py-28">
            <Film size={80} className="mx-auto text-gray-600 mb-6" />
            <h3 className="text-2xl mb-2">Your list is empty</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Add movies to your watchlist to see them here.
            </p>
            <button
              onClick={() => navigate("/movies")}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
            >
              Browse Movies
            </button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && list.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            <AnimatePresence>
              {list.map((movie) => (
                <motion.div
                  key={movie.imdbID}
                  variants={card}
                  whileHover={hover}
                  exit="exit"
                  layout
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  {/* Poster */}
                  <div className="relative aspect-[2/3]">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = "/placeholder-movie.png")}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                    {/* Play */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => handleWatch(movie.imdbID, e)}
                        className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-xl"
                      >
                        <Play size={20} />
                      </button>
                    </div>

                    {/* Rating */}
                    {movie.imdbRating && (
                      <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                        <Star size={12} className="text-yellow-400" />
                        {movie.imdbRating}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                      {movie.title}
                    </h3>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{movie.year}</span>

                      {movie.runtime && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {movie.runtime}
                        </span>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(movie.imdbID, movie.title);
                      }}
                      disabled={isRemoving[movie.imdbID]}
                      className="w-full mt-3 bg-gray-700 hover:bg-red-600 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                    >
                      {isRemoving[movie.imdbID] ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Removing...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} /> Remove
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyList;
