import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL || {
  host: "127.0.0.1",
  port: 6379,
  // password: process.env.REDIS_PASSWORD, // uncomment if using auth
});

redisClient.on("connect", () => console.log("Connected to Redis (ioredis)"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export default redisClient;
