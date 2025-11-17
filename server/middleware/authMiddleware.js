import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * 🔐 User Authentication Middleware
 * - Ensures ONLY normal user tokens are accepted
 * - Rejects admin tokens
 * - Works with Render HTTPS (cookies + headers)
 * - Blocks banned users
 */
export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Support Authorization header as fallback
    if (!token && req.header("Authorization")?.startsWith("Bearer")) {
      token = req.header("Authorization").split(" ")[1];
    }

    // No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message:
          err.name === "TokenExpiredError"
            ? "Session expired. Please log in again."
            : "Invalid token. Login required.",
      });
    }

    // ❌ If this is an admin token → block it
    if (decoded.admin) {
      return res.status(403).json({
        success: false,
        message: "Admins cannot access normal user routes.",
      });
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account no longer exists.",
      });
    }

    // ❌ Block banned users
    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: "Your account has been banned.",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("❌ Auth Middleware Error:", err);
    res.status(500).json({
      success: false,
      message: "Authentication failed. Try again later.",
    });
  }
};
