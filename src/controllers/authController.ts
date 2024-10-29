import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import redis from "../config/redisClient";
import User from "../models/user";
import { env } from "../config";
import bcrypt, { genSalt } from "bcrypt";

export const signup = async (req: Request, res: any) => {
  const { name, email, password, role, organizationID } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await genSalt();
    const userPassword = await bcrypt.hash(password, salt);

    await User.create({
      name: name,
      email: email,
      password: userPassword,
      salt: salt,
      role: role,
      organization: organizationID,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const signin = async (req: Request, res: any) => {
  const { email, password } = req.body;

  try {
    //Check the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email does not exist" });
    }
    //Check the password if the email is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      env.jwtSecret!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign({ id: user._id }, env.refreshTokenSecret!, {
      expiresIn: "7d",
    });

    // Store the refresh token in Redis with an expiration
    await redis.set(
      `refreshToken:${user.id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );
    return res.status(200).json({
      message: "Signin successful",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error signing in user" });
  }
};

export const refreshAccessToken = async (req: Request, res: any) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, env.refreshTokenSecret!) as {
      id: string;
    };
    const userID = decoded.id;

    const storedToken = await redis.get(`refreshToken:${userID}`);

    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
        storedToken: storedToken,
      });
    }
    const newAccessToken = jwt.sign({ id: userID }, env.jwtSecret!, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign(
      { id: (decoded as any).id },
      env.refreshTokenSecret!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Token refreshed successfully",
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
