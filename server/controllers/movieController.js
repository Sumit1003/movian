import axios from "axios";
import Movie from "../models/Movie.js"; 


/* ===========================
   🔹 Trending Movies
=========================== */
export const getTrendingMovies = async (req, res) => {
  try {
    const trendingTitles = [
      "Dune: Part Two",
      "Oppenheimer",
      "Poor Things",
      "The Batman",
      "Everything Everywhere All at Once",
      "Spider-Man: Across the Spider-Verse",
      "Avatar: The Way of Water",
      "Top Gun: Maverick",
    ];

    const apiKey = process.env.OMDB_API_KEY;
    const promises = trendingTitles.map(async (title) => {
      try {
        const response = await axios.get(process.env.OMDB_API_URL, {
          params: { t: title, apikey: apiKey, type: "movie" },
        });
        return response.data?.Response === "True" ? response.data : null;
      } catch (error) {
        console.warn(`⚠️ Failed to fetch "${title}": ${error.message}`);
        return null;
      }
    });

    const movieResults = (await Promise.all(promises)).filter(Boolean);
    res.json({
      success: true,
      results: movieResults,
      total: movieResults.length,
    });
  } catch (err) {
    console.error("❌ OMDB Trending Fetch Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trending movies",
      details: err.message,
    });
  }
};

/* ===========================
   🔹 Get Movie by IMDb ID
=========================== */
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`${process.env.OMDB_API_URL}`, {
    params: {
      i: id,
      apikey: process.env.OMDB_API_KEY,
      plot: "full"
    }
  });
  res.json(response.data);
};


/* ===========================
   🔹 Get Trailer from YouTube API
=========================== */
export const getTrailer = async (req, res) => {
  try {
    let { title, year } = req.params;

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!title) return res.status(400).json({ message: "Movie title is required" });

    // Express already decodes the param → do NOT decode twice
    title = title.trim();

    // Clean year (remove "–", ranges, extra text)
    if (year) {
      year = year.replace(/[^0-9]/g, "").slice(0, 4);
    }

    let searchQuery = `${title} official trailer`;
    if (year) searchQuery += ` ${year}`;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: searchQuery,
          key: apiKey,
          type: "video",
          maxResults: 1,
          videoEmbeddable: "true",
          safeSearch: "strict",
        },
      }
    );

    const video = response?.data?.items?.[0];
    if (!video)
      return res.status(404).json({ message: "Trailer not found" });

    const thumbnail =
      video.snippet?.thumbnails?.high?.url ||
      video.snippet?.thumbnails?.medium?.url ||
      video.snippet?.thumbnails?.default?.url ||
      "";

    res.json({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail,
    });

  } catch (err) {
    console.error("❌ YouTube Trailer Fetch Error:", err?.response?.data || err.message);
    res.status(500).json({
      message: "Failed to fetch trailer",
      error: err.message,
    });
  }
};




/* ===========================
   🔹 Search Movies
=========================== */
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, year, type } = req.query;
    const apiKey = process.env.OMDB_API_KEY;

    if (!query || !query.trim())
      return res.status(400).json({ error: "Search query is required" });

    const params = { s: query.trim(), apikey: apiKey, page: parseInt(page) };
    if (year) params.y = year;
    if (type && ["movie", "series", "episode"].includes(type)) params.type = type;

    const response = await axios.get(process.env.OMDB_API_URL, { params });

    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: response.data.Error || "No results found",
      });
    }

    res.json({
      success: true,
      results: response.data.Search,
      totalResults: parseInt(response.data.totalResults),
      currentPage: parseInt(page),
      hasMore: parseInt(page) * 10 < parseInt(response.data.totalResults),
    });
  } catch (err) {
    console.error("❌ OMDB Search Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to search movies",
      details: err.message,
    });
  }
};

/* ===========================
   🔹 Get Movie by Title
=========================== */
export const getMovieByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const { year, plot = "short" } = req.query;

    if (!title) return res.status(400).json({ error: "Movie title is required" });

    const params = { t: title, apikey: process.env.OMDB_API_KEY, plot };
    if (year) params.y = year;

    const response = await axios.get(process.env.OMDB_API_URL, { params });

    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: response.data.Error || "Movie not found",
      });
    }

    res.json({ success: true, movie: response.data });
  } catch (err) {
    console.error("❌ OMDB Movie by Title Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch movie details",
      details: err.message,
    });
  }
};

