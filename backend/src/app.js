import express from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();

// ── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors())

// ── Routes ─────────────────────────────────────────────────
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
