// src/pages/admin/AdminProducts.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import { Trash2 } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const updatePrice = async (id, price) => {
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      await API.put(
        `/admin/products/${id}`,
        { price: numericPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Price updated");
      // Optionally update local state too
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, price: numericPrice } : p
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500">
          Admin · Products
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          Products
        </h2>
        <p className="text-sm text-slate-400 max-w-xl">
          Review all products currently available in the store. Adjust prices or
          remove items that are no longer in stock.
        </p>
      </header>

      {/* Body */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-60 rounded-2xl bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-950/60 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="mt-2 text-sm text-slate-400">
          No products found. Add a new product to get started.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
          {products.map((p) => (
            <div
              key={p._id}
              className="
                group
                bg-slate-900/70 rounded-2xl border border-slate-800
                px-4 py-4 sm:px-5 sm:py-5
                shadow-md shadow-black/40
                flex flex-col gap-3
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg hover:border-emerald-400/60
              "
            >
              {/* Image */}
              <div className="w-full h-36 rounded-xl bg-slate-800/80 flex items-center justify-center overflow-hidden mb-2">
                {p.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt={p.name}
                    className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[11px] text-slate-500">No image</span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                  {p.name}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 bg-slate-800/80 px-2 py-1 rounded-full inline-block">
                  {p._id}
                </p>
              </div>

              {/* Price editor */}
              <div className="flex items-center justify-between gap-3 mt-1">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-1">
                    Price (₹)
                  </span>
                  <input
                    type="number"
                    defaultValue={p.price}
                    onBlur={(e) => updatePrice(p._id, e.target.value)}
                    className="
                      w-24 rounded-full border border-slate-700 bg-slate-900
                      px-3 py-1.5 text-xs text-slate-100
                      focus:outline-none focus:ring-2 focus:ring-emerald-400/70
                      focus:border-emerald-400
                      transition-all duration-150
                    "
                  />
                </div>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-red-500/70
                    px-3 py-1.5 text-[12px] text-red-300
                    hover:bg-red-600 hover:text-white hover:border-red-600
                    hover:-translate-y-0.5 active:translate-y-0
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

export default AdminProducts;