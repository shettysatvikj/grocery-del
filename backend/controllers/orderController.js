
import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("userId", "name email"); // optional, in case you want user info

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
