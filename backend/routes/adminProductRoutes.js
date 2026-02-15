
import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct, // ✅ ADDED
} from "../controllers/adminProductController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

// ADD PRODUCT
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addProduct
);

// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"), // ✅ allow updating image too
  updateProduct
);

// DELETE PRODUCT ✅
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;
