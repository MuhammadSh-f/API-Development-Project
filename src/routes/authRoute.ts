import { Router } from "express";
import {
  signup,
  signin,
  refreshAccessToken,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh-token", refreshAccessToken);

export { router as authRoutes };
