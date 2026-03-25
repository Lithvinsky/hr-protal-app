import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
connectDB();

const app = express();

const defaultOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
const extraOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = [...defaultOrigins, ...extraOrigins];

function isVercelHost(hostname) {
  return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      try {
        const { protocol, hostname } = new URL(origin);
        if (protocol === "https:" && isVercelHost(hostname)) {
          return callback(null, true);
        }
      } catch {
        // ignore
      }
      callback(null, false);
    },
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("HR Portal API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
