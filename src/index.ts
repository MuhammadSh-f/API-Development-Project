import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { env } from "./config";
import { authRoutes, organizationRoutes } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/organization", organizationRoutes);

// Error handler
// app.use(errorMiddleware);

// Database Connection
mongoose
  .connect(env.mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

export default app;
