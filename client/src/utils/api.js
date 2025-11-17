import axios from "axios";

// Unified API base URL for dev + prod
const API = import.meta.env.VITE_API_BASE_URL || "";

/* ===================================
    MOVIES — TRENDING / DETAILS
=================================== */
export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(`${API}/api/movies/trending`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await axios.get(`${API}/api/movies/movie/${id}`, {
      withCredentials: true,
    });

    if (!res.data || res.data.Response === "False") {
      throw new Error("Invalid movie data");
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};

/* ===================================
    MOVIE POSTERS (SEARCH)
=================================== */
export const fetchMoviePosters = async (title = "") => {
  try {
    const query = encodeURIComponent(title);
    const res = await axios.get(`${API}/api/movies/search/${query}`, {
      params: { page: 1 },
    });

    const posters = res.data.movies
      ?.map((m) => m.Poster)
      .filter((p) => p && p !== "N/A");

    return posters?.slice(0, 6) || [];
  } catch (error) {
    console.error("Poster fetch error:", error);
    return [];
  }
};

/* ===================================
    TRAILER FETCH
=================================== */
export const fetchTrailer = async (title, year = "") => {
  if (!title) return null;

  const encoded = encodeURIComponent(title);
  let url = `${API}/api/movies/trailer/${encoded}`;
  if (year) url += `/${year}`;

  const res = await fetch(url, { credentials: "include" });
  const data = await res.json();

  return data?.videoId ? data : null;
};

/* ===================================
    SEARCH MOVIES
=================================== */
export const searchMovies = async (query, page = 1) => {
  try {
    const res = await axios.get(
      `${API}/api/movies/search/${encodeURIComponent(query)}`,
      { params: { page } }
    );

    const data = res.data;

    if (Array.isArray(data)) return { movies: data };
    if (data.Search) return { movies: data.Search };
    if (data.results) return { movies: data.results };

    return { movies: [] };
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to fetch search results");
  }
};

/* ===================================
    GENRE MOVIES
=================================== */
export const fetchMoviesByGenre = async (genre, page = 1) => {
  try {
    const res = await axios.get(`${API}/api/movies/genre/${genre}`, {
      params: { page },
    });

    return res.data;
  } catch (error) {
    console.error("Genre fetch error:", error);
    throw error;
  }
};

/* ===================================
    ⭐ MY LIST — AUTH PROTECTED
=================================== */
export const checkInMyList = async (imdbID) => {
  try {
    const res = await fetch(`${API}/api/mylist/check/${imdbID}`, {
      credentials: "include",
    });
    return await res.json();
  } catch {
    return { success: false, exists: false };
  }
};

export const addToMyList = async (movie) => {
  try {
    const res = await fetch(`${API}/api/mylist/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const removeFromMyList = async (imdbID) => {
  try {
    const res = await fetch(`${API}/api/mylist/remove/${imdbID}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch {
    return { success: false };
  }
};

export const fetchMyList = async () => {
  try {
    const res = await fetch(`${API}/api/mylist/all`, {
      credentials: "include",
    });
    return await res.json();
  } catch {
    return { success: false, list: [] };
  }
};

/* ===================================
    COMMENTS
=================================== */
export const fetchComments = async (movieId) => {
  try {
    const res = await fetch(`${API}/api/comments/${movieId}`, {
      credentials: "include",
    });

    return await res.json();
  } catch {
    return { success: false, comments: [] };
  }
};

export const postComment = async (movieId, comment) => {
  try {
    const res = await fetch(`${API}/api/comments/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, comment }),
    });

    return await res.json();
  } catch {
    return { success: false };
  }
};
