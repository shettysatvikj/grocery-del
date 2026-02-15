// src/pages/Home.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getQuantity = (productId) => {
    const item = cartItems.find((i) => i._id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const filteredProducts = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <>
      <div
        className="
          relative min-h-screen
          bg-gradient-to-b from-emerald-50 via-white to-emerald-50
          pt-6 pb-12 px-4 sm:px-6 lg:px-12
          text-slate-900
        "
      >
        {/* Soft background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-16 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header / Hero */}
          <header className="mb-10 space-y-6">
            {/* Top row: hero text + trust indicators */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.7rem] tracking-[0.35em] uppercase text-emerald-700/70 mb-3">
                  Curated Groceries • Farm Fresh • Everyday Luxury
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                  Premium Green Groceries,
                  <span className="block mt-1 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    Delivered With Care
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">
                  Explore a carefully selected range of fresh produce, pantry
                  essentials, and gourmet ingredients — a refined grocery
                  experience for your everyday kitchen.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs text-emerald-700/80 md:items-end">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Same-day delivery in select areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Carefully packed fresh produce</span>
                </div>
              </div>
            </div>

            {/* Second row: search + cart summary */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-emerald-700/80 mb-1.5">
                  Search products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, e.g. “Almonds”, “Milk”..."
                    className="
                      w-full rounded-full border border-emerald-200
                      bg-white
                      px-4 py-2.5 text-sm text-slate-900
                      placeholder:text-emerald-400/70
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                      shadow-sm
                    "
                  />
                </div>
              </div>

              {/* Cart summary */}
              <div className="md:w-[260px]">
                <div
                  className="
                    flex items-center gap-3 rounded-2xl
                    border border-emerald-100 bg-white
                    px-4 py-3
                    shadow-sm
                  "
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <ShoppingCart size={18} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[0.65rem] font-semibold text-emerald-700/80 tracking-[0.24em] uppercase">
                      Your Cart
                    </p>
                    <p className="text-sm text-slate-900">
                      {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Checkout in a few simple steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Loading / Error / Empty states */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="
                    h-72 rounded-3xl
                    border border-emerald-100
                    bg-emerald-50/60
                    animate-pulse
                  "
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 flex justify-center">
              <div
                className="
                  flex items-start gap-3
                  max-w-md
                  rounded-2xl border border-red-200
                  bg-red-50
                  px-4 py-3 text-sm text-red-700
                  shadow-sm
                "
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-red-400" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="mt-10 flex flex-col items-center text-center text-slate-600">
              <div
                className="
                  mb-4 h-12 w-12 rounded-full
                  border border-dashed border-emerald-300
                  flex items-center justify-center
                  text-emerald-500
                "
              >
                <ShoppingCart size={20} />
              </div>
              <p className="text-sm font-medium mb-1">
                No products match your search.
              </p>
              <p className="text-xs max-w-xs text-slate-500">
                Try a different keyword or check back soon — we frequently
                update our seasonal and specialty range.
              </p>
            </div>
          )}

          {/* Products section */}
          {!loading && !error && filteredProducts.length > 0 && (
            <>
              {/* Section header */}
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Our selection
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => {
                  const quantity = getQuantity(p._id);

                  return (
                    <div
                      key={p._id}
                      className="
                        group
                        flex flex-col
                        rounded-2xl border border-emerald-100
                        bg-white/95
                        p-4
                        shadow-sm
                        transition-all duration-300
                        hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100/80
                        hover:border-emerald-300
                      "
                    >
                      {/* Image */}
                      <div
                        className="
                          relative mb-4
                          h-40 w-full
                          overflow-hidden rounded-xl
                          bg-emerald-50
                          flex items-center justify-center
                        "
                      >
                        {p.image ? (
                          <img
                            src={`http://localhost:5000/uploads/${p.image}`}
                            alt={p.name}
                            className="
                              max-h-full object-contain
                              transition-transform duration-300
                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <div className="text-xs text-emerald-700/60">
                            No image available
                          </div>
                        )}
                      </div>

                      {/* Name & price */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-4 space-y-2">
                          <h3
                            className="
                              text-slate-900 font-semibold text-sm sm:text-[0.95rem]
                              leading-snug
                            "
                          >
                            {p.name}
                          </h3>
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-lg font-semibold text-emerald-700">
                              ₹{p.price}
                            </p>
                            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-emerald-500/90">
                              Fresh • Quality
                            </p>
                          </div>
                        </div>

                        {/* Cart controls */}
                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(p)}
                            className="
                              w-full mt-auto
                              inline-flex items-center justify-center gap-2
                              rounded-full
                              bg-gradient-to-r from-emerald-500 to-emerald-600
                              px-4 py-2.5 text-sm font-semibold text-white
                              shadow-md shadow-emerald-200/80
                              hover:shadow-lg hover:shadow-emerald-300/80
                              hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm
                              transition-all duration-200
                            "
                          >
                            <span>Add to Cart</span>
                            <Plus size={16} />
                          </button>
                        ) : (
                          <div
                            className="
                              mt-auto flex items-center justify-between gap-3
                              pt-3 border-t border-emerald-100
                            "
                          >
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeFromCart(p)}
                                className="
                                  p-2 rounded-full
                                  bg-emerald-50 text-emerald-700
                                  border border-emerald-100
                                  hover:bg-emerald-100
                                  hover:-translate-y-0.5
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
                                {quantity}
                              </span>
                              <button
                                onClick={() => addToCart(p)}
                                className="
                                  p-2 rounded-full
                                  bg-emerald-600 text-white
                                  border border-emerald-600
                                  hover:bg-emerald-700
                                  hover:-translate-y-0.5
                                  active:translate-y-0
                                  transition-all duration-200
                                "
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(p)}
                              className="
                                text-[11px]
                                text-slate-400 underline-offset-2
                                hover:text-red-500 hover:underline
                                transition-colors
                              "
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;