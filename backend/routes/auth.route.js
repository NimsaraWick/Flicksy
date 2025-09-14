import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// router.patch("/signup", signup);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/signup", signup
// router.get("/login", login);
// router.get("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

export default router;
