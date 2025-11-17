import express from "express";
import axios from "axios";
import {
  getTrendingMovies,
  getMovieById,
  getTrailer,
  searchMovies,
  getMovieByTitle,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/trailer/:title/:year?", getTrailer);

/* ===========================
   🔹 BASE MOVIE ROUTES
=========================== */
router.get("/trending", getTrendingMovies);
router.get("/movie/:id", getMovieById);
router.get("/search/:query", searchMovies);
// router.get("/trailer/:title", getTrailer);       // generic

/* ===========================
   🔹 ALL MOVIES (with pagination)
=========================== */
router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const searchQuery = req.query.search?.trim() || "movie"; // default fallback

    if (page < 1) return res.status(400).json({ error: "Page number must be ≥ 1" });
    if (limit < 1 || limit > 100)
      return res.status(400).json({ error: "Limit must be between 1 and 100" });

    const response = await axios.get(process.env.OMDB_API_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: searchQuery,
        type: "movie",
        page: page,
      },
      timeout: 10000,
    });

    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: response.data.Error || "No movies found",
        results: [],
        totalResults: 0,
        totalPages: 0,
      });
    }

    const movies = response.data.Search || [];
    const totalResults = parseInt(response.data.totalResults) || movies.length;
    const totalPages = Math.ceil(totalResults / 10); // OMDb always returns 10 results per page

    res.json({
      success: true,
      results: movies,
      totalResults,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      searchQuery,
    });
  } catch (err) {
    console.error("❌ Failed to fetch movies:", err.message);
    res.status(500).json({
      success: false,
      error: "Server error while fetching movies",
      details: err.message,
    });
  }
});

/* ===========================
   🔹 MOVIES BY GENRE
=========================== */
router.get("/genre/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const page = parseInt(req.query.page) || 1;

    if (!genre) {
      return res.status(400).json({ success: false, error: "Genre is required" });
    }

    // Call OMDb with search keyword as the genre name
    const response = await axios.get(process.env.OMDB_API_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: genre,
        type: "movie",
        page,
      },
    });

    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: response.data.Error || `No ${genre} movies found`,
        results: [],
        totalResults: 0,
      });
    }

    const movies = response.data.Search || [];
    const totalResults = parseInt(response.data.totalResults) || movies.length;
    const totalPages = Math.ceil(totalResults / 10); // OMDb limit = 10 per page

    res.json({
      success: true,
      genre,
      results: movies,
      totalResults,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (err) {
    console.error(`❌ Error fetching ${req.params.genre} movies:`, err.message);
    res.status(500).json({
      success: false,
      error: `Server error fetching ${req.params.genre} movies`,
      details: err.message,
    });
  }
});

/* ===========================
   🔹 RANDOM MOVIES (shuffle)
=========================== */
router.get("/random", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const popularKeywords = [
      "action",
      "comedy",
      "drama",
      "thriller",
      "adventure",
      "sci-fi",
      "romance",
    ];

    const randomKeyword =
      popularKeywords[Math.floor(Math.random() * popularKeywords.length)];

    const response = await axios.get(process.env.OMDB_API_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: randomKeyword,
        type: "movie",
        page: 1,
      },
    });

    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: "No random movies found",
        results: [],
      });
    }

    const allMovies = response.data.Search || [];
    const shuffled = allMovies.sort(() => 0.5 - Math.random());
    const randomMovies = shuffled.slice(0, limit);

    res.json({
      success: true,
      results: randomMovies,
      total: randomMovies.length,
      genre: randomKeyword,
    });
  } catch (err) {
    console.error("❌ Failed to fetch random movies:", err.message);
    res.status(500).json({
      success: false,
      error: "Server error while fetching random movies",
      details: err.message,
    });
  }
});

export default router;
