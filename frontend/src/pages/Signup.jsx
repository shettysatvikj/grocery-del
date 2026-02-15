import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div
      className="
        relative min-h-screen
        flex items-center justify-center
        bg-gradient-to-b from-emerald-50 via-white to-emerald-50
        px-4 py-10
      "
    >
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-16 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join{" "}
            <span className="font-semibold text-emerald-600">GroceryHub</span>{" "}
            and start ordering fresh groceries in minutes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            w-full
            bg-white/95 p-6 sm:p-7 rounded-2xl
            border border-emerald-100
            shadow-lg shadow-emerald-100/70
          "
        >
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700/80 mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full px-3.5 py-2.5
                rounded-xl border border-emerald-200 bg-white
                text-sm text-slate-900
                placeholder:text-emerald-400/70
                focus:outline-none focus:ring-2 focus:ring-emerald-500/90 focus:border-emerald-500
                transition-shadow
              "
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700/80 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="
                w-full px-3.5 py-2.5
                rounded-xl border border-emerald-200 bg-white
                text-sm text-slate-900
                placeholder:text-emerald-400/70
                focus:outline-none focus:ring-2 focus:ring-emerald-500/90 focus:border-emerald-500
                transition-shadow
              "
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700/80 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="
                  w-full px-3.5 py-2.5
                  rounded-xl border border-emerald-200 bg-white
                  text-sm text-slate-900
                  placeholder:text-emerald-400/70
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/90 focus:border-emerald-500
                  transition-shadow
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-emerald-400 hover:text-emerald-600
                  transition-colors
                "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="
              w-full
              bg-gradient-to-r from-emerald-500 to-emerald-600
              text-white py-2.5 rounded-full
              text-sm font-medium
              shadow-md shadow-emerald-200/80
              hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-300/80 hover:-translate-y-0.5
              active:translate-y-0 active:shadow-sm
              transition-all duration-200
            "
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Create one account to manage all your GroceryHub orders seamlessly.
        </p>
      </div>
    </div>
  );
};

export default Signup;