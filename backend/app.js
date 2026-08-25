import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./src/config/config.js";
import UserModel from "./src/models/user.model.js";
import jwt from "jsonwebtoken";
import productRouter from "./src/routes/product.routes.js"

const app = express();

// ── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: true, // This reflects the request origin, allowing any origin to work with credentials
  credentials: true
}));
app.use(passport.initialize());

// ── Google OAuth Strategy ─────────────────────────────────
// passport.use(new GoogleStrategy({
//   clientID: config.GOOGLE_CLIENT_ID,
//   clientSecret: config.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/api/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if user already exists with this Google ID
//     let user = await UserModel.findOne({ googleId: profile.id });

//     if (!user) {
//       // Check if a user with the same email already exists (linked by email)
//       const email = profile.emails?.[0]?.value;
//       if (email) {
//         user = await UserModel.findOne({ email });
//         if (user) {
//           // Link google account to existing user
//           user.googleId = profile.id;
//           user.avatar = profile.photos?.[0]?.value || user.avatar;
//           await user.save();
//         }
//       }

//       // If still no user found, create a new one
//       if (!user) {
//         user = await UserModel.create({
//           googleId: profile.id,
//           email: email,
//           fullname: profile.displayName,
//           avatar: profile.photos?.[0]?.value
//         });
//       }
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error, null);
//   }
// }));

import authRoutes from "./src/routes/auth.routes.js";

// ── Routes ─────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/product",productRouter)

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
