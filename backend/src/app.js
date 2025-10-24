// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// =====================
// 1. Security Middlewares
// =====================
app.use(helmet());

// =====================
// 2. Allowed Origins
// =====================
const allowedOrigins = [
  "http://localhost:5173",
  "https://x-blogger.vercel.app",
  "https://x-blogger-qpo3ewv6x-mosarof.vercel.app",
];

// =====================
// 3. CORS Middleware
// =====================
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps, curl, etc.
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================
// 4. Preflight Handling
// =====================
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Origin",
      allowedOrigins.includes(req.headers.origin) ? req.headers.origin : ""
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.sendStatus(200);
  }
  next();
});

// =====================
// 5. Other Middlewares
// =====================
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate Limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again later",
// });
// app.use(limiter);

// Static Files
app.use(express.static("public"));

// =====================
// 6. Health Check
// =====================
app.get("/health-check", (req, res) => {
  res.json({ success: true, message: "Backend is running!" });
});

// =====================
// 7. Routes
// =====================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
