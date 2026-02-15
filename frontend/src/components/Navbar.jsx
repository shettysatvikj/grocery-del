import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className="
        fixed top-0 inset-x-0 z-50
        bg-gradient-to-b from-emerald-50/95 via-white/95 to-white/90
        backdrop-blur-xl
        border-b border-emerald-100
        shadow-sm
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={closeMobile}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 shadow-md shadow-emerald-200/80 flex items-center justify-center">
              <span className="text-xs font-bold text-white">G</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-semibold text-slate-900">
                Grocery<span className="text-emerald-600">Hub</span>
              </span>
              <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-emerald-500/70">
                Fresh &amp; Fast
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="text-[13px] font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Admin
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              onClick={closeMobile}
              className="
                relative inline-flex items-center gap-2
                rounded-full border border-emerald-100 bg-white/95
                px-3 py-1.5 text-[13px] text-slate-700
                hover:border-emerald-400 hover:text-emerald-700
                hover:shadow-sm hover:-translate-y-0.5
                active:translate-y-0
                transition-all duration-200
              "
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[1.4rem] px-1.5 py-0.5 text-[11px] font-semibold text-white bg-emerald-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-[13px] text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="
                    text-[13px] font-medium
                    rounded-full border border-emerald-600
                    px-3.5 py-1.5
                    text-emerald-700
                    hover:bg-emerald-600 hover:text-white
                    transition-all duration-200
                  "
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-[13px] text-slate-600">
                  Hi,{" "}
                  <span className="font-semibold text-slate-900">
                    {user.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="
                    text-[13px]
                    rounded-full border border-emerald-100
                    px-3 py-1.5
                    text-emerald-700
                    hover:bg-emerald-50
                    transition-all duration-200
                  "
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="p-2 rounded-md hover:bg-emerald-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={22} className="text-slate-800" />
              ) : (
                <Menu size={22} className="text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-emerald-100 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={closeMobile}
                className="text-[13px] font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Admin
              </Link>
            )}

            <Link
              to="/cart"
              onClick={closeMobile}
              className="
                relative inline-flex items-center gap-2
                rounded-full border border-emerald-100 bg-white
                px-3 py-1.5 text-[13px] text-slate-700
                hover:border-emerald-400 hover:text-emerald-700
                transition-all duration-200
              "
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[1.4rem] px-1.5 py-0.5 text-[11px] font-semibold text-white bg-emerald-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="text-[13px] text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobile}
                  className="
                    inline-flex items-center justify-center
                    text-[13px] font-medium
                    rounded-full border border-emerald-600
                    px-3.5 py-1.5
                    text-emerald-700
                    hover:bg-emerald-600 hover:text-white
                    transition-all duration-200
                  "
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-[13px] text-slate-600">
                  Hi,{" "}
                  <span className="font-semibold text-slate-900">
                    {user.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="
                    text-[13px]
                    rounded-full border border-emerald-100
                    px-3 py-1.5
                    text-emerald-700
                    hover:bg-emerald-50
                    transition-all duration-200
                  "
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;