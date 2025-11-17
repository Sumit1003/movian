import express from "express";
import {
  addComment,
  getComments,
  getAllComments
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================================================
   USER ROUTES
   ========================================================= */

// ⬇ Anyone can view comments for a movie (public GET)
router.get("/:movieId", getComments);

// ⬇ Only logged-in users can add a comment
router.post("/add", protect, addComment);


/* =========================================================
   ADMIN ROUTES
   ========================================================= */

// ⬇ Admin-only: get ALL comments
router.get("/", verifyAdmin, getAllComments);


export default router;
