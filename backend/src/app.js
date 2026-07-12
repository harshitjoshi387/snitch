import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

const app = express();

// ── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
  origin: true, // This reflects the request origin, allowing any origin to work with credentials
  credentials: true
}));

import authRoutes from "./routes/auth.routes.js";

// ── Routes ─────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "🚀 Server is up and running" });
});

// ── 404 Handler ────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ── Global Error Handler ───────────────────────────────────
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
