import express from "express";
import rateLimit from "express-rate-limit";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

export default router;
