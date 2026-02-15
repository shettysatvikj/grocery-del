import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        relative min-h-screen
        bg-gradient-to-b from-emerald-50 via-white to-emerald-50
        flex items-center justify-center
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue shopping with{" "}
            <span className="font-semibold text-emerald-600">GroceryHub</span>.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white/95 rounded-2xl border border-emerald-100
            shadow-lg shadow-emerald-100/70
            px-5 py-6 sm:px-6 sm:py-7
          "
        >
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
                w-full rounded-xl border border-emerald-200 bg-white
                px-3.5 py-2.5 text-sm text-slate-900
                placeholder:text-emerald-400/70
                focus:outline-none focus:ring-2 focus:ring-emerald-500/90 focus:border-emerald-500
                transition-shadow
              "
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="mb-2">
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
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="
                  w-full rounded-xl border border-emerald-200 bg-white
                  px-3.5 py-2.5 text-sm text-slate-900
                  placeholder:text-emerald-400/70
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/90 focus:border-emerald-500
                  transition-shadow
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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

          {/* Error message */}
          {errorMsg && (
            <p className="mt-2 mb-1 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {errorMsg}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={submitting}
            className="
              mt-4 w-full inline-flex items-center justify-center
              rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600
              px-4 py-2.5 text-sm font-medium text-white
              shadow-md shadow-emerald-200/80
              hover:shadow-lg hover:shadow-emerald-300/80 hover:-translate-y-0.5
              active:translate-y-0 active:shadow-sm
              disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>

        {/* Hint */}
        <p className="mt-4 text-center text-[11px] text-slate-400">
          Use your GroceryHub account to manage all your grocery orders in one
          place.
        </p>
      </div>
    </div>
  );
};

export default Login;