import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser'
const app = express();

app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'https://x-blogger.vercel.app', 'https://x-blogger-qpo3ewv6x-mosarof.vercel.app'],
    credentials: true
}));
app.use(cookieParser({
    origin: ['http://localhost:5173', 'https://x-blogger.vercel.app', 'https://x-blogger-qpo3ewv6x-mosarof.vercel.app'],
    credentials: true
}));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

app.use(express.json({
    limit: "1MB"
}));
app.use(express.urlencoded({ extended: true, limit: "1MB" }));
app.use(express.static('public'));

//health chcek route
app.get("/health-check", (req, res) => {
    res.send("Blogging platform API is running...");
});




// Import Routes
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);



export default app;
