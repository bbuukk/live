import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  createCategories,
  createCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);

router.use(requireAuth, isAdmin);
router.post("/", createCategory);
router.post("/many", createCategories);
router.patch("/:id", updateCategory);

export { router as categoryRoutes };
