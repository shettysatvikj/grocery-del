// src/pages/admin/AddProduct.jsx
import { useState } from "react";
import API from "../../services/api";
import { Upload } from "lucide-react";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("image", imageFile);

      await API.post("/admin/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product added successfully");

      setForm({ name: "", price: "", category: "", stock: "" });
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="inline-flex items-center w-max rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
          Admin · Products
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          Add Product
        </h2>
        <p className="text-sm text-slate-400 max-w-xl">
          Create a new product listing with pricing, stock, and an image. Make sure
          details are accurate for a smooth shopping experience.
        </p>
      </header>

      {/* Form Card */}
      <div
        className="
          rounded-2xl border border-emerald-900/50
          bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90
          shadow-[0_20px_60px_rgba(0,0,0,0.8)]
          px-5 py-6 md:px-6 md:py-7
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="e.g. Organic Almonds 500g"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="e.g. Dry Fruits"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="e.g. 399"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="input-dark"
                placeholder="e.g. 50"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
              Product Image
            </label>

            <label
              className="
                flex items-center justify-center gap-2
                cursor-pointer
                border border-emerald-800/70 rounded-xl
                bg-slate-900/80
                py-3 text-sm text-emerald-100
                hover:border-emerald-400 hover:text-emerald-200 hover:bg-slate-900
                transition-all duration-200
              "
            >
              <Upload size={16} />
              <span>{imageFile ? "Change Image" : "Choose Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>

            {preview && (
              <div className="w-40 h-40 rounded-xl overflow-hidden border border-emerald-800/70 bg-slate-900">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r from-emerald-500 to-emerald-600
              py-3 text-sm font-medium text-white
              shadow-[0_14px_40px_rgba(16,185,129,0.45)]
              hover:shadow-[0_18px_55px_rgba(16,185,129,0.65)]
              hover:-translate-y-0.5
              active:translate-y-0 active:shadow-[0_8px_28px_rgba(16,185,129,0.6)]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Shared Dark Input Style */}
      <style>
        {`
          .input-dark {
            border-radius: 0.75rem;
            border: 1px solid rgba(15, 23, 42, 0.8);
            background: radial-gradient(circle at top left, rgba(16, 185, 129, 0.08), #020617);
            padding: 10px 14px;
            font-size: 14px;
            color: #e5e7eb;
            outline: none;
            transition: all 0.18s ease;
          }

          .input-dark::placeholder {
            color: rgba(148, 163, 184, 0.85);
          }

          .input-dark:focus {
            border-color: #34d399;
            box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.7),
              0 10px 30px rgba(15, 118, 110, 0.55);
          }
        `}
      </style>
    </div>
  );
};

export default AddProduct;