import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";
import {
  signIn,
  signUp,
  addLikedProduct,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.use(requireAuth);
router.patch("/like/:userId", addLikedProduct);

export { router as userRoutes };
