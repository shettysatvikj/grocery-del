// src/pages/admin/AdminOrders.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { Trash2 } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Fetch Orders
  // ===============================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || [];

      // Sort newest first
      data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===============================
  // Update Order Status
  // ===============================
  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/admin/orders/${id}`,
        { orderStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order status updated");
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating status.");
    }
  };

  // ===============================
  // Delete Single Order
  // ===============================
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?"))
      return;

    try {
      await API.delete(`/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders((prev) => prev.filter((o) => o._id !== id));
      alert("Order deleted");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Error deleting order.");
    }
  };

  // ===============================
  // Delete All Orders
  // ===============================
  const deleteAllOrders = async () => {
    if (!window.confirm("This will permanently delete ALL orders. Continue?"))
      return;

    if (
      !window.confirm(
        "Are you absolutely sure? This action cannot be undone."
      )
    )
      return;

    try {
      await API.delete("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders([]);
      alert("All orders deleted");
    } catch (err) {
      console.error("Error deleting all orders:", err);
      alert("Failed to delete all orders");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500">
            Admin · Orders
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
            All Orders
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            View, update, and manage every order placed in your grocery store.
          </p>
        </div>

        {orders.length > 0 && (
          <button
            onClick={deleteAllOrders}
            className="
              inline-flex items-center justify-center
              rounded-full border border-red-500/70
              px-4 py-2 text-sm text-red-300
              hover:bg-red-600 hover:text-white hover:border-red-600
              hover:-translate-y-0.5 active:translate-y-0
              transition-all duration-200
            "
          >
            <Trash2 size={16} className="mr-2" />
            Delete All
          </button>
        )}
      </header>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="space-y-3 mt-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 rounded-2xl bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-950/60 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && !error && orders.length === 0 && (
        <p className="mt-2 text-sm text-slate-400">
          No orders found yet.
        </p>
      )}

      {/* ================= ORDER LIST ================= */}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-4 mt-1">
          {orders.map((o) => (
            <div
              key={o._id}
              className="
                flex flex-col gap-3
                rounded-2xl border border-slate-800 bg-slate-900/70
                px-4 py-4 sm:px-5 sm:py-5
                shadow-md shadow-black/40
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg hover:border-emerald-400/60
              "
            >
              {/* Top Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-[0.8rem] font-mono text-slate-200 bg-slate-800/80 px-2 py-1 rounded-full inline-block">
                    {o._id}
                  </p>
                  <p className="text-sm text-slate-100">
                    User:{" "}
                    <span className="font-semibold">
                      {o.userId?.name || "User deleted"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-sm text-slate-300 space-y-1 md:text-right">
                  <p>
                    Items:{" "}
                    <span className="font-semibold">
                      {o.items.length}
                    </span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="font-semibold text-emerald-400">
                      ₹{o.totalAmount?.toFixed?.(2) || o.totalAmount}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-[11px] font-medium ${
                    o.paymentStatus === "Paid"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-500/10 text-red-300 border border-red-500/40"
                  }`}
                >
                  Payment: {o.paymentStatus}
                </span>

                <span
                  className={`inline-flex px-2 py-1 rounded-full text-[11px] font-medium ${
                    o.orderStatus === "Delivered"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                      : o.orderStatus === "Cancelled"
                      ? "bg-red-500/10 text-red-300 border border-red-500/40"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  Status: {o.orderStatus}
                </span>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <select
                  value={o.orderStatus}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                  className="
                    rounded-full border border-slate-700 bg-slate-900
                    px-3 py-1.5 text-[12px] text-slate-100
                    focus:outline-none focus:ring-2 focus:ring-emerald-400/70
                  "
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => deleteOrder(o._id)}
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-red-500/70
                    px-3 py-1.5 text-[12px] text-red-300
                    hover:bg-red-600 hover:text-white hover:border-red-600
                    transition-all duration-200
                  "
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
