import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  getProducts,
  getProductById,
  getProductsByIds,
  getProductsByCategoryAndFilters,
  getFilters,
} from "#src/controllers/product/get.product_controller.js.js";

import {
  createProduct,
  createProducts,
} from "#src/controllers/product/create.product_controller.js";

import { updateProduct } from "#src/controllers/product/update.product_controller.js";

import { deleteProduct } from "#src/controllers/product/delete.product_controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/product/:id", getProductById);

router.get("/:slugCategoryPath/:filtersStr?", getProductsByCategoryAndFilters);
router.get("/filters/:slugCategoryPath/:filtersStr?", getFilters);

router.post("/getbyIds", getProductsByIds);

router.use(requireAuth);
router.use(isAdmin);

router.post("/", createProduct);
router.post("/many", createProducts);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export { router as productsRoutes };