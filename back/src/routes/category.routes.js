import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import { createCategory } from "#src/controllers/category/create.category_controller.js";

import { updateCategory } from "#src/controllers/category/update.category_controller.js";

import {
  getCategories,
  getRootCategories,
  getCategoryByPath,
  getDirectSubcategoriesByPath,
} from "#src/controllers/category/get.category_controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/root", getRootCategories);
router.get("/category/by-path/:path", getCategoryByPath);

router.get(
  "/subcategories/by-parent-category-path/:path",
  getDirectSubcategoriesByPath
);

router.use(requireAuth, isAdmin);
router.post("/", createCategory);
router.patch("/:id", updateCategory);

export { router as categoryRoutes };
