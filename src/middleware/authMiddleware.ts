import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";
// import { CustomError } from "../types";

export const authMiddleware = (req: Request, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret!) as {
      id: string;
      email: string;
      role: string;
    };
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as "admin" | "member" | "guest",
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
