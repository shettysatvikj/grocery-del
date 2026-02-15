
import express from "express";
import { getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ named import

const router = express.Router();

router.get("/my", protect, getMyOrders);

export default router;
