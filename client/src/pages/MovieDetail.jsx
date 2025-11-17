import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import { getMovieById, fetchTrailer, checkInMyList, addToMyList, removeFromMyList } from "../utils/api";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isSeries, setIsSeries] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===========================
  // FETCH DATA
  // ===========================
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        if (!data) throw new Error("Movie not found");

        setMovie(data);
        setIsSeries(data.Type === "series");

        // Episodes
        if (data.Type === "series") {
          const epList = [];
          const totalSeasons = Number(data.totalSeasons);

          for (let season = 1; season <= totalSeasons; season++) {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${data.imdbID}&Season=${season}`
            );
            const json = await res.json();
            if (json.Episodes) {
              json.Episodes.forEach((ep) => {
                epList.push({
                  title: ep.Title,
                  episode: ep.Episode,
                  released: ep.Released,
                  imdbRating: ep.imdbRating,
                  imdbID: ep.imdbID,
                  season
                });
              });
            }
          }
          setEpisodes(epList);
        }

        // Trailer from your backend
        const tr = await fetchTrailer(data.Title, data.Year);
        if (tr) setTrailer(tr);

        // Check saved
        const saved = await checkInMyList(data.imdbID);
        if (saved.success) setIsSaved(saved.exists);

      } catch (err) {
        toast.error("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // ===========================
  // SAVE / REMOVE
  // ===========================
  const toggleSave = async () => {
    if (!movie) return;

    const item = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
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
        toast.success("Added to My List");
      }
    }
  };

  // ===========================
  // LOADING
  // ===========================
  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1>Movie Not Found</h1>
        <button
          onClick={() => navigate("/movies")}
          className="bg-red-600 px-6 py-3 mt-4 rounded-lg"
        >
          Back
        </button>
      </div>
    );

  // ===========================
  // MAIN UI
  // ===========================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <Toaster />

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-red-600 px-4 py-2 rounded-lg"
      >
        ⬅ Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* POSTER */}
        <div>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.png"}
            className="rounded-xl shadow-xl w-full"
          />

          <button
            onClick={() => navigate(`/watch/${movie.imdbID}`)}
            className="mt-6 w-full bg-red-600 py-3 rounded-lg text-lg"
          >
            ▶ Watch Movie
          </button>

          <button
            onClick={toggleSave}
            className={`mt-4 w-full py-3 rounded-lg ${
              isSaved ? "bg-red-600" : "bg-gray-800"
            }`}
          >
            {isSaved ? "❤️ Saved" : "🤍 Save to My List"}
          </button>
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-red-500">{movie.Title}</h1>

          <div className="mt-2 text-gray-400">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </div>

          <div className="flex gap-2 mt-3">
            {movie.Genre.split(",").map((g, i) => (
              <span
                key={i}
                className="bg-gray-800 px-3 py-1 rounded-full text-xs"
              >
                {g.trim()}
              </span>
            ))}
          </div>

          {/* Ratings */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-900 p-4 rounded-xl">
              <p className="text-red-500">IMDb</p>
              <p className="text-xl font-bold">{movie.imdbRating}</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-xl">
              <p className="text-red-500">Votes</p>
              <p className="text-xl font-bold">{movie.imdbVotes}</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-xl">
              <p className="text-red-500">Metascore</p>
              <p className="text-xl font-bold">{movie.Metascore}</p>
            </div>
          </div>

          {/* Plot */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Plot</h2>
            <p className="text-gray-300">{movie.Plot}</p>
          </div>

          {/* CAST */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Cast</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {movie.Actors.split(",").map((actor, i) => (
                <div
                  key={i}
                  className="bg-gray-900 px-4 py-3 rounded-lg text-center"
                >
                  {actor.trim()}
                </div>
              ))}
            </div>
          </div>

          {/* TRAILER */}
          {trailer && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3 text-red-500">Trailer</h2>

              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.videoId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* EPISODES */}
          {isSeries && episodes.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3 text-red-500">
                Episodes
              </h2>

              <div className="space-y-3">
                {episodes.map((ep, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/watch/${ep.imdbID}`)}
                    className="bg-gray-900 p-4 rounded-xl cursor-pointer hover:bg-gray-800"
                  >
                    <p className="font-bold">
                      S{ep.season} • E{ep.episode} — {ep.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {ep.released} • ⭐ {ep.imdbRating}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOWNLOAD MIRRORS */}
<div className="mt-12">
  <h2 className="text-xl font-semibold mb-3 text-red-500">
    Download Links
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {["Server 1", "Server 2", "Server 3", "Backup"].map((srv, i) => (
      <a
        key={i}
        href={`https://example.com/${movie.imdbID}/${i}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 block"
      >
        {srv}
      </a>
    ))}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
