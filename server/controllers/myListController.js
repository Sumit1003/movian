import MyList from "../models/MyList.js";

// ⭐ ADD
export const addToList = async (req, res) => {
  try {
    const userId = req.user._id;
    const { imdbID, title, poster, year, type, imdbRating, runtime } = req.body;

    if (!imdbID) {
      return res.status(400).json({ success: false, message: "imdbID required" });
    }

    // Prevent duplicates per user
    const exists = await MyList.findOne({ userId, imdbID });
    if (exists) {
      return res.json({ success: true, message: "Already in your list" });
    }

    const newMovie = await MyList.create({
      userId,
      imdbID,
      title,
      poster,
      year,
      type,
      imdbRating,
      runtime,
    });

    res.json({ success: true, movie: newMovie });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// ⭐ GET ALL
export const getMyList = async (req, res) => {
  try {
    const userId = req.user._id;

    const list = await MyList.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, list });
  } catch (err) {
    res.status(500).json({ success: false, list: [] });
  }
};


// ⭐ REMOVE
export const removeFromList = async (req, res) => {
  try {
    const userId = req.user._id;
    const { imdbID } = req.params;

    await MyList.findOneAndDelete({ userId, imdbID });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const checkInMyList = async (req, res) => {
  try {
    const userId = req.user._id;
    const imdbID = req.params.imdbID;

    const movie = await MyList.findOne({ userId, imdbID });

    res.json({
      success: true,
      exists: !!movie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


