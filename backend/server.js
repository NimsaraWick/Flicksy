// const express = require ('express');
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import mediaRoutes from "./routes/media.route.js";
import searchRoutes from "./routes/search.route.js";

import { protectRoute } from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV_VARS.PORT;
// const __dirname = path.resolve();

app.use(express.json()); //allow us to pass req.body
app.use(cookieParser());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running...");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", protectRoute, mediaRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Connect to DB before handling requests (useful for serverless)
connectDB();

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
  });
}

export default app;
