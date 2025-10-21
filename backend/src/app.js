import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

const allowedOrigins = [
    "https://x-blogger.vercel.app"
];

// ✅ CORS middleware
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // for mobile, Postman, etc.
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(null, false); // ❌ do NOT throw an error
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// ✅ Handle preflight requests
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
        return res.sendStatus(200);
    }
    next();
});

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Static files
app.use(express.static("public"));

// Health check
app.get("/health-check", (req, res) => {
    res.send("Blogging platform API is running...");
});

// Routes
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
