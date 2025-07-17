import "dotenv/config";
import express, { json, Router } from "express";
import cors from "cors";
import {
  clearGameHistory,
  getChoices,
  getGameHistory,
  getGameStats,
  getRandomChoice,
  playGameRound,
} from "./controllers/controllers.js";

const app = express();
const router = Router();

const PORT = process.env.PORT || 5000;
const DEVELOPMENT_URL = ["http://localhost:3003", "http://127.0.0.1:3003", 'https://codechallenge.boohma.com'];
const isProduction = process.env.NODE_ENV === "production";

// Middleware
app.use(
  cors({
    origin: isProduction ? process.env.PRODUCTION_URL : DEVELOPMENT_URL,
  })
);

app.use(json());

// Routes
router
  .get("/choices", getChoices)
  .get("/choice", getRandomChoice)
  .post("/play", playGameRound)
  .get("/history", getGameHistory)
  .delete("/history", clearGameHistory)
  .get("/stats", getGameStats);

app.use("/", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
