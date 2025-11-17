import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  cachedAt: { type: Date, default: Date.now },
});

export const searchMoviesByGenre = async (req, res) => {
  try {
    const { genre, page = 1, type = "movie" } = req.query;
    
    const response = await axios.get(process.env.OMDB_API_URL, {
      params: {
        s: genre,
        apikey: process.env.OMDB_API_KEY,
        type,
        page: parseInt(page)
      }
    });

    if (response.data.Response === "False") {
      return res.status(404).json({ 
        message: `No ${genre} movies found`,
        movies: [] 
      });
    }

    res.json({
      movies: response.data.Search,
      totalResults: parseInt(response.data.totalResults),
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error("Genre search error:", err);
    res.status(500).json({ 
      message: "Failed to fetch genre movies", 
      error: err.message 
    });
  }
};

export default mongoose.model("Movie", movieSchema);
