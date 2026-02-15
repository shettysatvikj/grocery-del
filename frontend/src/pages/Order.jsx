// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Package, CheckCircle2 } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Show payment success notification if coming from checkout success redirect
    if (window.location.search.includes("success=true")) {
      setSuccess(true);
    }
  }, []);

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
          {/* Optional success alert */}
          {success && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-800 shadow-sm">
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="font-semibold text-emerald-700">
                  Payment Successful!
                </p>
                <p className="text-[12px] leading-snug">
                  Your order has been placed and will appear in your order list
                  below.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Package size={20} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                My Orders
              </h1>
              <p className="text-sm text-slate-600">
                Track all your past and current grocery orders in one place.
              </p>
            </div>
          </header>

          {/* Loading / error / empty / list */}
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
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-5 text-sm text-slate-600 shadow-sm">
              <p className="font-medium text-slate-800 mb-1">
                No orders yet
              </p>
              <p className="text-xs text-slate-500">
                Once you complete a purchase, your orders will show up here so
                you can review and track them.
              </p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4 mt-1">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="
                    flex flex-col sm:flex-row gap-3 items-start sm:items-center
                    rounded-2xl border border-emerald-100 bg-white/95
                    px-4 py-4 sm:px-5 sm:py-5
                    shadow-sm
                    transition-all duration-200
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/80
                    hover:border-emerald-300
                  "
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-[0.8rem] font-mono text-slate-700 bg-emerald-50 px-2 py-1 rounded-full inline-block border border-emerald-100">
                      {o._id}
                    </p>
                    <p className="text-sm text-slate-700">
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
                    <p className="text-[12px] text-slate-500">
                      Ordered on{" "}
                      {new Date(o.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Payment status pill */}
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

                    {/* Order status pill */}
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
        </div>
      </div>
    </>
  );
};

export default Orders;