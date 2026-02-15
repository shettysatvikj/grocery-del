// src/pages/Success.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { CheckCircle2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/orders/my");
        const data = res.data || [];
        // Sort newest first
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to fetch your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <>
      <Navbar />

      <div
        className="
          relative min-h-screen
          bg-gradient-to-b from-emerald-50 via-white to-emerald-50
          pt-24 pb-12 px-4 sm:px-6 lg:px-12
        "
      >
        {/* Soft background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-16 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Success header */}
          <header className="flex flex-col items-center text-center mb-8">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-md shadow-emerald-200/80">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-600">
              Payment Successful 🎉
            </h1>
            <p className="mt-2 text-sm md:text-[0.95rem] text-slate-600 max-w-xl">
              Thank you for your order. We’ve received your payment and are
              getting your items ready for delivery.
            </p>
            <button
              onClick={() => navigate("/")}
              className="
                mt-4 inline-flex items-center justify-center
                rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600
                px-4 py-2 text-xs sm:text-sm font-medium text-white
                shadow-md shadow-emerald-200/80
                hover:shadow-lg hover:shadow-emerald-300/80 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-sm
                transition-all duration-200
              "
            >
              Continue shopping
            </button>
          </header>

          {/* Latest order highlight */}
          {latestOrder && (
            <section className="mb-8">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-4 sm:px-5 sm:py-5 flex items-start gap-3 shadow-sm">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Package size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 mb-1">
                    Latest order
                  </p>
                  <p className="text-sm text-slate-800">
                    Order ID:{" "}
                    <span className="font-mono text-[0.8rem] bg-white/80 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      {latestOrder._id}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {latestOrder.items.length} item
                    {latestOrder.items.length !== 1 ? "s" : ""} · Total: ₹
                    {latestOrder.totalAmount?.toFixed
                      ? latestOrder.totalAmount.toFixed(2)
                      : latestOrder.totalAmount}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Placed on{" "}
                    {new Date(latestOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Orders list */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                Your Orders
              </h2>
              {orders.length > 0 && (
                <span className="text-xs text-slate-500">
                  Showing {orders.length} order
                  {orders.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="
                      h-24 rounded-2xl
                      border border-emerald-100
                      bg-emerald-50/60
                      animate-pulse
                    "
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && orders.length === 0 && (
              <p className="text-sm text-slate-500 text-center mt-4">
                No orders found yet.
              </p>
            )}

            {!loading && !error && orders.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {orders.map((o) => (
                  <div
                    key={o._id}
                    className="
                      rounded-2xl border border-emerald-100 bg-white/95
                      px-4 py-4 sm:px-5 sm:py-5
                      shadow-sm
                      flex flex-col justify-between gap-3
                      transition-all duration-200
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/80
                      hover:border-emerald-300
                    "
                  >
                    <div className="space-y-2">
                      <p className="text-[0.8rem] font-mono text-slate-700 bg-emerald-50 px-2 py-1 rounded-full inline-block border border-emerald-100">
                        {o._id}
                      </p>
                      <p className="text-sm text-slate-600">
                        Items:{" "}
                        <span className="font-semibold">
                          {o.items.length}
                        </span>{" "}
                        | Total:{" "}
                        <span className="font-semibold text-emerald-700">
                          ₹
                          {o.totalAmount?.toFixed
                            ? o.totalAmount.toFixed(2)
                            : o.totalAmount}
                        </span>
                      </p>

                      <p className="text-xs text-slate-500">
                        Ordered on{" "}
                        {new Date(o.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {/* Payment status */}
                      <span
                        className={`
                          inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium
                          ${
                            o.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-red-50 text-red-700 border border-red-100"
                          }
                        `}
                      >
                        Payment: {o.paymentStatus}
                      </span>

                      {/* Order status */}
                      <span
                        className={`
                          inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium
                          ${
                            o.orderStatus === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : o.orderStatus === "Cancelled"
                              ? "bg-red-50 text-red-700 border border-red-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }
                        `}
                      >
                        Status: {o.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Success;