// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import API from "../services/api";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCheckout = async () => {
    if (!user) {
      // If not logged in, send to login
      navigate("/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) return;

    const res = await API.post("/payment/checkout", {
      cartItems,
      userId: user.id,
    });

    window.location.href = res.data.url;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 49 : 0; // example
  const total = subtotal + shipping;
console.log(cartItems)
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

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                Your Basket
              </h2>
              <p className="text-sm text-slate-600">
                Review your items and get ready for a fresh, fast delivery.
              </p>
            </div>
          </header>

          {cartItems.length === 0 ? (
            // Empty state
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-white/95 px-6 py-10 text-center shadow-sm">
              <p className="text-base font-medium text-slate-800 mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Looks like you haven’t added any fresh picks yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="
                  inline-flex items-center justify-center px-5 py-2.5 rounded-full
                  bg-gradient-to-r from-emerald-500 to-emerald-600
                  text-sm font-medium text-white
                  shadow-md shadow-emerald-200/80
                  hover:shadow-lg hover:shadow-emerald-300/80 hover:-translate-y-0.5
                  active:translate-y-0 active:shadow-sm
                  transition-all duration-200
                "
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
              {/* Items list */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="
                      flex flex-col sm:flex-row gap-4 items-center sm:items-stretch
                      rounded-2xl border border-emerald-100 bg-white/95 p-4
                      shadow-sm
                      transition-all duration-200
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/80
                      hover:border-emerald-300
                    "
                  >
                    {/* Image */}
                    <div className="w-full sm:w-24 flex-shrink-0">
                      <div className="h-24 w-full rounded-xl bg-emerald-50 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                       <img
  src={`https://grocery-del-backend1.onrender.com/uploads/${item.image}`}
  alt={item.name}
  className="h-full w-full object-cover"
/>

                        ) : (
                          <span className="text-[11px] text-emerald-700/60">
                            No image
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info + controls */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          ₹{item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex flex-col items-center sm:items-end gap-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.max(item.quantity - 1, 1)
                              )
                            }
                            className="
                              p-2 rounded-full
                              bg-emerald-50 text-emerald-700
                              border border-emerald-100
                              hover:bg-emerald-100 hover:-translate-y-0.5
                              active:translate-y-0
                              transition-all duration-200
                            "
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            className="
                              px-3 py-1 rounded-full
                              bg-emerald-50 text-emerald-800
                              text-sm font-medium
                              border border-emerald-100
                            "
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="
                              p-2 rounded-full
                              bg-emerald-600 text-white
                              border border-emerald-600
                              hover:bg-emerald-700 hover:-translate-y-0.5
                              active:translate-y-0
                              transition-all duration-200
                            "
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Line total + remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-emerald-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="
                              p-2 rounded-full bg-red-50 text-red-500
                              border border-red-100
                              hover:bg-red-100 hover:-translate-y-0.5
                              active:translate-y-0
                              transition-all duration-200
                            "
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-emerald-100 bg-white/95 shadow-sm p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping > 0
                          ? ""
                          : "text-emerald-600 font-medium"
                      }
                    >
                      {shipping > 0 ? `₹${shipping}` : "Free"}
                    </span>
                  </div>
                  <div className="h-px bg-emerald-100 my-3" />
                  <div className="flex justify-between text-[0.95rem] font-semibold text-slate-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="
                    mt-5 w-full inline-flex items-center justify-center
                    rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600
                    px-4 py-2.5 text-sm font-medium text-white
                    shadow-md shadow-emerald-200/80
                    hover:shadow-lg hover:shadow-emerald-300/80 hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-sm
                    transition-all duration-200
                  "
                >
                  Proceed to Payment
                </button>

                {!user && (
                  <p className="mt-3 text-[11px] text-slate-500 text-center">
                    You’ll be asked to log in before completing payment.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;