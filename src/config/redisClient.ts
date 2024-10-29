import Redis from "ioredis";
import { env } from ".";

const redis = new Redis({
  host: env.REDIS_HOST || "localhost",
  port: parseInt(env.REDIS_PORT || "6379", 10),
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
