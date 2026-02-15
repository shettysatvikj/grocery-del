import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
} from "../controllers/adminOrderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders
router.get("/", protect, adminOnly, getAllOrders);

// IMPORTANT: Delete ALL must come before /:id
router.delete("/", protect, adminOnly, deleteAllOrders);

// Update order status
router.put("/:id", protect, adminOnly, updateOrderStatus);

// Delete single order
router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;
