import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { signUserToken } from "../config/jwt.js";

export const register = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    res.json({ message: "User registered", user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = signUserToken(user);

    res.json({ token, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
};
