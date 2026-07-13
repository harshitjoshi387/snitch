import { Router } from "express";
import { validRegisterUser } from "../validator/auth.validator.js";
import { register, login, getMe } from "../controllers/auth.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

// ── Local Auth ─────────────────────────────────────────────
router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

// ── Google OAuth ───────────────────────────────────────────
// Step 1: Redirect user to Google consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Step 2: Google redirects back here with user data
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT for the authenticated user
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1d" }
    );

    // Redirect to frontend with token as query param
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/auth/google/success?token=${token}`);
  }
);

export default router;