import express from "express";
import { getTrendingTV, getTVDetails, getSimilarTV, getTVTrailers, getTVCategory } from "../controllers/tv.controller.js"


const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/details", getTVDetails);
router.get("/:id/similar", getSimilarTV);
router.get("/:category", getTVCategory);

export default router;

