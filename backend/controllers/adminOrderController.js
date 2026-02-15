import Order from "../models/Order.js";


// ==============================
// GET ALL ORDERS
// ==============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// UPDATE ORDER STATUS (Admin-controlled)
// ==============================
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.status; // matches frontend
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// DELETE SINGLE ORDER
// ==============================
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// DELETE ALL ORDERS (NEW)
// ==============================
export const deleteAllOrders = async (req, res) => {
  try {
    const result = await Order.deleteMany({});

    res.json({
      message: "All orders deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all orders:", error);
    res.status(500).json({ message: "Failed to delete all orders" });
  }
};
