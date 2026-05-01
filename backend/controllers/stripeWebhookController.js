import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        console.log("Payment not completed");
        return res.json({ received: true });
      }

      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);
      if (!order) {
        console.error("Order not found:", orderId);
        return res.status(404).send("Order not found");
      }

      // ✅ Update order
      order.paymentStatus = "Paid";
      order.orderStatus = "Processing";
      await order.save();

      console.log(`✅ Order ${orderId} marked as Paid & Processing`);
    }
  } catch (err) {
    console.error("Error updating order:", err.message);
    return res.status(500).send("Internal Server Error");
  }

  res.json({ received: true });
};
