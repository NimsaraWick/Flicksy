import express from "express";
import {
  getTrendingMedia,
  getMediaDetails,
  getSimilarMedia,
  getMediaTrailers,
  getMediaCategory,
} from "../controllers/media.controller.js";

const router = express.Router();

// All routes will include the type parameter (movie or tv)
router.get("/:type/:id/trailers", getMediaTrailers);
router.get("/:type/:id/details", getMediaDetails);
router.get("/:type/:id/similar", getSimilarMedia);
router.get("/:type/trending", getTrendingMedia);
router.get("/:type/:category", getMediaCategory);

export default router;
