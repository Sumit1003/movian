import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* -------------------------------------------
   🔐 ADMIN LOGIN
-------------------------------------------- */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmailMatch = email === process.env.ADMIN_EMAIL;
    const isPasswordMatch = password === process.env.ADMIN_PASSWORD;

    if (!isEmailMatch || !isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      {
        admin: true,
        email,
        name: process.env.ADMIN_NAME,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Admin logged in successfully",
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* -------------------------------------------
   🔄 VERIFY ADMIN SESSION
-------------------------------------------- */
export const verifyAdminSession = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin: req.admin,
    });
  } catch (err) {
    console.error("Admin session verify error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* -------------------------------------------
   👥 GET ALL USERS
-------------------------------------------- */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

/* -------------------------------------------
   🚫 BAN / UNBAN USER
-------------------------------------------- */
export const toggleBan = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({
      success: true,
      message: user.isBanned ? "User has been banned" : "User unbanned successfully",
      user,
    });
  } catch (err) {
    console.error("Toggle ban error:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

/* -------------------------------------------
   💬 GET ALL COMMENTS
-------------------------------------------- */
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ success: false, message: "Failed to load comments" });
  }
};

/* -------------------------------------------
   🗑️ DELETE COMMENT
-------------------------------------------- */
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const deleted = await Comment.findByIdAndDelete(commentId);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* -------------------------------------------
   📨 ADMIN REPLY TO COMMENT
-------------------------------------------- */
export const replyToComment = async (req, res) => {
  try {
    const { replyText } = req.body;

    if (!replyText || replyText.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Reply cannot be empty" });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    comment.replies.push({
      adminName: req.admin.name,
      replyText: replyText.trim(),
      repliedAt: new Date(),
    });

    await comment.save();

    res.json({
      success: true,
      message: "Reply added successfully",
      comment,
    });
  } catch (err) {
    console.error("Reply error:", err);
    res.status(500).json({ success: false, message: "Failed to add reply" });
  }
};
