import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  getProducts,
  getProductById,
  getProductsByIds,
} from "#src/controllers/productsController/getProduct.js";

import { getProductsByCategoryAndFilters } from "#src/controllers/productsController/getProductsByCategoryAndFilters/index.js";

import {
  createProduct,
  createProducts,
} from "#src/controllers/productsController/createProduct.js";

import { updateProduct } from "#src/controllers/productsController/updateProduct.js";

import { deleteProduct } from "#src/controllers/productsController/deleteProduct.js";

import { getRecommendations } from "#src/controllers/productsController/getRecommendations.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/product/:id", getProductById);
router.get("/product/recommendations/:id", getRecommendations);
router.get("/:slugCategoryPath/:filtersStr?", getProductsByCategoryAndFilters);

router.use(requireAuth);
router.use(isAdmin);

router.post("/getbyIds", getProductsByIds);

router.post("/", createProduct);
router.post("/many", createProducts);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export { router as productsRoutes };
