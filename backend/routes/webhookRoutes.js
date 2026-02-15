// routes/webhookRoutes.js
import express from "express";
import { stripeWebhook } from "../controllers/stripeWebhookController.js";

const router = express.Router();

// Stripe will POST here after payment
router.post("/", stripeWebhook);

export default router;
