import Comment from "../models/Comment.js";
import User from "../models/User.js";

/* ===========================
      ADD COMMENT (USER)
=========================== */
export const addComment = async (req, res) => {
  try {
    const { movieId, comment } = req.body;

    if (!movieId || !comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Movie ID and comment text are required",
      });
    }

    const user = await User.findById(req.user.id).select("username");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newComment = await Comment.create({
      movieId,
      userId: req.user.id,
      username: user.username,
      text: comment.trim(),
    });

    return res.json({ success: true, comment: newComment });
  } catch (err) {
    console.error("❌ Add Comment Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

/* ===========================
      GET COMMENTS (USER)
=========================== */
export const getComments = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID required",
      });
    }

    const list = await Comment.find({ movieId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      comments: list || [],
    });
  } catch (err) {
    console.error("❌ Get Comments Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load comments",
    });
  }
};

/* ===========================
      ADMIN — GET ALL COMMENTS
=========================== */
export const getAllComments = async (req, res) => {
  try {
    // Ensure only admins access this
    if (!req.user?.role || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    const list = await Comment.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      comments: list,
    });
  } catch (err) {
    console.error("❌ Admin Fetch Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};
