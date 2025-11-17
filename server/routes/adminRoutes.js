import express from "express";
import {
  adminLogin,
  verifyAdminSession,
  getAllUsers,
  toggleBan,
  getAllComments,
  deleteComment,
  replyToComment
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

/* -------------------------------
   🔐 Admin Authentication Routes
-------------------------------- */

router.post("/login", adminLogin);               // Public
router.get("/session", verifyAdmin, verifyAdminSession); // Protected


/* -------------------------------
   👥 User Management
-------------------------------- */

router.get("/users", verifyAdmin, getAllUsers);
router.put("/users/ban/:userId", verifyAdmin, toggleBan);


/* -------------------------------
   💬 Comment Moderation
-------------------------------- */

router.get("/comments", verifyAdmin, getAllComments);
router.delete("/comments/:id", verifyAdmin, deleteComment);
router.post("/comments/reply/:id", verifyAdmin, replyToComment);


export default router;
