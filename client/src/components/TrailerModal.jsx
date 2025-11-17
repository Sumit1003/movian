import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TrailerModal = ({ trailer, isOpen, onClose }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  if (!isOpen || !trailer) return null;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const getVideoId = () => {
    return trailer?.videoId || trailer?.id?.videoId || "";
  };

  const getTrailerSrc = () => {
    const id = getVideoId();
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1` : "";
  };

  const getTrailerTitle = () => {
    return trailer?.title || trailer?.snippet?.title || "Movie Trailer";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          className="relative w-full max-w-4xl rounded-xl bg-black overflow-hidden shadow-2xl"
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-20 h-10 w-10 flex items-center justify-center bg-red-600 rounded-full text-white shadow-2xl hover:bg-red-700 hover:scale-110 transition"
          >
            ✕
          </button>

          <div className="relative aspect-video w-full">
            {/* Iframe */}
            <iframe
              src={getTrailerSrc()}
              title={getTrailerTitle()}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              frameBorder="0"
              loading="eager"
              onLoad={() => setIsIframeLoaded(true)}
            />

            {/* Loading – only until iframe loads */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading trailer...</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-900 px-6 py-4 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {getTrailerTitle()}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrailerModal;
