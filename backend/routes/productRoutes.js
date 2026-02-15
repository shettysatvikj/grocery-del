
import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import { upload } from "../middleware/multerConfig.js"; // Multer config

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST a product with image upload
router.post("/", upload.single("image"), createProduct);

export default router;
