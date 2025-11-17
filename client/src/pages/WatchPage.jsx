import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import {
  getMovieById,
  addToMyList,
  removeFromMyList,
  fetchMyList,
  fetchTrailer,
  searchMovies,
} from "../utils/api";

const WatchPage = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [similar, setSimilar] = useState([]);

  const [activeProvider, setActiveProvider] = useState(0);

  const [stillWatching, setStillWatching] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(false);
  const [nextMovie, setNextMovie] = useState(null);

  const inactivityTimer = useRef(null);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL || "";

  /* ----------------------------------------
      BACKEND PROXY PROVIDER (Main)
  ----------------------------------------*/
  const BACKEND_PROXY = `${API}/api/embed/${imdbId}`;

  /* ----------------------------------------
      Backup Providers
  ----------------------------------------*/
  const providers = [
    // Primary Recommended
    { name: "Clean Player (Recommended)", url: BACKEND_PROXY },
    
    // Vidsrc Family (Most Reliable)
    { name: "Vidsrc.to", url: `https://vidsrc.to/embed/movie/${imdbId}` },
    { name: "Vidsrc.xyz", url: `https://vidsrc.xyz/embed/movie/${imdbId}` },
    { name: "Vidsrc.me", url: `https://vidsrc.me/embed/movie/${imdbId}` },
    { name: "Vidsrc.pro", url: `https://vidsrc.pro/embed/movie/${imdbId}` },
    
    // Multi-Source Aggregators
    { name: "MultiEmbed", url: `https://multiembed.mov/?video_id=${imdbId}` },
    { name: "SuperEmbed", url: `https://superembed.stream/embed/movie/${imdbId}` },
    { name: "2Embed", url: `https://www.2embed.to/embed/${imdbId}` },
    { name: "MovieWeb", url: `https://movie-web.app/embed/movie/${imdbId}` },
    
    // Streaming Platforms
    { name: "SmashyStream", url: `https://player.smashystream.com/e/${imdbId}` },
    { name: "MoviesApi", url: `https://moviesapi.club/movie/${imdbId}` },
    { name: "SFlix", url: `https://sflix.to/embed/movie/${imdbId}` },
    
    // Video Hosts
    { name: "StreamTape", url: `https://streamtape.com/e/${imdbId}` },
    { name: "DoodStream", url: `https://doodstream.com/e/${imdbId}` },
    { name: "MixDrop", url: `https://mixdrop.com/e/${imdbId}` },
    
    // Legacy/Backup
    { name: "m.protonmovies.space", url: `https://m.protonmovies.space/embed/movie/${imdbId}` },
    { name: "VTube", url: `https://vtube.to/embed/movie/${imdbId}` },
    { name: "YMovies", url: `https://ymovies.tv/embed/movie/${imdbId}` }
];

  const playerURL = providers[activeProvider]?.url;

  /* ----------------------------------------
      INACTIVITY TIMER (Still Watching)
  ----------------------------------------*/
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setStillWatching(true);
    }, 15 * 60 * 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer.current);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
    };
  }, []);

  /* ----------------------------------------
      LOAD MOVIE METADATA
  ----------------------------------------*/
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovieById(imdbId);

        if (!data?.Title) {
          toast.error("Movie not found");
          return navigate("/movies");
        }

        setMovie(data);

        // Check if saved
        const list = await fetchMyList();
        setIsSaved(list.list?.some((m) => m.imdbID === imdbId));

        // Trailer
        const t = await fetchTrailer(data.Title, data.Year);
        setTrailer(t);

        // Similar
        if (data.Genre) {
          const first = data.Genre.split(",")[0]?.trim();
          const sim = await searchMovies(first);

          setSimilar(
            sim.movies?.filter((m) => m.imdbID !== imdbId).slice(0, 8)
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load movie");
      }
    };

    load();
  }, [imdbId, navigate]);

  /* ----------------------------------------
      LOAD COMMENTS
  ----------------------------------------*/
  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await fetch(
          `${API}/api/comments/${imdbId}`,
          { credentials: "include" }
        );

        const data = await res.json();
        if (data.success) setComments(data.comments);
      } catch {}
    };

    loadComments();
  }, [imdbId]);

  const addComment = async () => {
    if (!commentInput.trim()) return;

    try {
      const res = await fetch(
        `${API}/api/comments/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId: imdbId, comment: commentInput }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setComments((prev) => [data.comment, ...prev]);
        setCommentInput("");
        toast.success("Comment added!");
      }
    } catch {
      toast.error("Login required");
    }
  };

  /* ----------------------------------------
      AUTOPLAY NEXT MOVIE
  ----------------------------------------*/
  const startAutoPlayNext = () => {
    if (similar.length > 0) {
      setNextMovie(similar[0]);
      setAutoPlayNext(true);
    }
  };

  const playNextMovie = () => {
    if (nextMovie) navigate(`/watch/${nextMovie.imdbID}`);
  };

  /* ----------------------------------------
      MY LIST SAVE/REMOVE
  ----------------------------------------*/
  const toggleList = async () => {
    const item = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      type: movie.Type,
    };

    if (isSaved) {
      const res = await removeFromMyList(movie.imdbID);
      if (res.success) {
        setIsSaved(false);
        toast.success("Removed from My List");
      }
    } else {
      const res = await addToMyList(item);
      if (res.success) {
        setIsSaved(true);
        toast.success("Added ❤️");
      }
    }
  };

  /* ----------------------------------------
      PAGE OUTPUT
  ----------------------------------------*/
  if (!movie)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster />

      {/* ----------------------------------------
          PLAYER BLOCK (Backend Proxy + Switcher)
      ----------------------------------------*/}
      <div className="relative w-full h-[60vh] md:h-[80vh]">

        {/* Gradient overlay (does not block clicks) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0 pointer-events-none" />

        <iframe
          key={activeProvider}
          src={playerURL}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full relative z-10"
          frameBorder="0"
          loading="lazy"
          onLoad={() => setTimeout(startAutoPlayNext, 300000)}
        ></iframe>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          ⬅ Back
        </button>

        {/* Provider Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <select
            value={activeProvider}
            onChange={(e) => setActiveProvider(Number(e.target.value))}
            className="bg-black/70 border border-white/20 text-white px-3 py-2 rounded-lg"
          >
            {providers.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STILL WATCHING */}
      <AnimatePresence>
        {stillWatching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center"
          >
            <div className="bg-[#111] p-10 rounded-3xl">
              <h2 className="text-2xl mb-4">Are you still watching?</h2>
              <button
                onClick={() => setStillWatching(false)}
                className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Yes, Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOVIE INFO */}
      <div className="px-6 md:px-12 mt-14">
        <h1 className="text-4xl font-bold text-red-500">{movie.Title}</h1>

        <div className="flex gap-3 text-gray-400 mt-3">
          <span>{movie.Year}</span>•<span>{movie.Runtime}</span>•<span>{movie.Rated}</span>
        </div>

        <p className="text-gray-300 mt-4 max-w-3xl">{movie.Plot}</p>

        {trailer && (
          <button
            className="mt-4 bg-red-600 px-5 py-2 rounded-lg"
            onClick={() =>
              window.open(`https://www.youtube.com/watch?v=${trailer.videoId}`, "_blank")
            }
          >
            ▶ Watch Trailer
          </button>
        )}

        <button
          onClick={toggleList}
          className={`mt-4 px-6 py-2 rounded-lg ${
            isSaved ? "bg-red-600" : "bg-gray-800"
          }`}
        >
          {isSaved ? "❤️ Saved" : "🤍 Save to My List"}
        </button>
      </div>

      {/* SIMILAR MOVIES */}
      <div className="px-6 md:px-12 mt-16">
        <h2 className="text-xl font-semibold mb-4">More Like This</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {similar.map((m) => (
            <motion.div
              key={m.imdbID}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => navigate(`/watch/${m.imdbID}`)}
            >
              <img
                src={m.Poster}
                className="w-full h-60 object-cover rounded-xl"
              />
              <p className="mt-2">{m.Title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* COMMENTS */}
      <div className="px-6 md:px-12 my-14">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>

        <div className="flex gap-3 mb-4">
          <input
            className="flex-1 bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg"
            placeholder="Share your thoughts..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="bg-red-600 px-4 py-2 rounded-lg" onClick={addComment}>
            Post
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="bg-gray-900 p-4 rounded-lg">
              <p>{c.text}</p>
              <small className="text-gray-500 block">
                {new Date(c.createdAt).toLocaleString()}
              </small>
              <p className="text-red-400 text-xs">— {c.username}</p>

              {c.replies?.length > 0 && (
                <div className="ml-4 mt-2 border-l border-gray-700 pl-3 space-y-2">
                  {c.replies.map((r, i) => (
                    <div key={i} className="bg-gray-800 p-2 rounded-lg">
                      <p className="text-blue-400 text-sm font-semibold">
                        {r.adminName} (Admin)
                      </p>
                      <p>{r.replyText}</p>
                      <small className="text-gray-500 text-xs">
                        {new Date(r.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
