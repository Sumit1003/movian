import express from "express";
import {
  addToList,
  getMyList,
  removeFromList,
  checkInMyList,
} from "../controllers/myListController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToList);
router.get("/all", protect, getMyList);
router.delete("/remove/:imdbID", protect, removeFromList);
router.get("/check/:imdbID", protect, checkInMyList);

export default router;
