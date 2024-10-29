import { Router } from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  inviteUserToOrganization,
  updateOrganization,
} from "../controllers/organizationController";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, createOrganization);
router.get("/:organization_id", authMiddleware, getOrganizationById);
router.get("/", authMiddleware, getOrganizations);
router.put("/:organization_id", authMiddleware, updateOrganization);
router.delete("/:organization_id", authMiddleware, deleteOrganization);
router.post(
  "/:organization_id/invite",
  authMiddleware,
  inviteUserToOrganization
);

export { router as organizationRoutes };
