// src/pages/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";
import { Package, PlusCircle, ShoppingCart } from "lucide-react";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Manage Products",
      path: "/admin/products",
      icon: Package,
      accent: "from-emerald-400 to-teal-400",
      description: "Edit, remove, and update all grocery items in the store.",
    },
    {
      title: "Add Product",
      path: "/admin/add-product",
      icon: PlusCircle,
      accent: "from-emerald-500 to-lime-400",
      description: "Quickly add new items with price, stock, and images.",
    },
    {
      title: "Manage Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
      accent: "from-emerald-400 to-emerald-700",
      description: "Review, update and track all customer orders.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="inline-flex w-max items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
          Admin
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          Store Control Center
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Manage products, monitor orders, and keep your grocery store running
          smoothly — all from this dashboard.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.path}
              className="
                group
                rounded-2xl border border-emerald-900/40
                bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90
                px-5 py-5
                shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                flex flex-col justify-between gap-4
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,0,0,0.9)]
                hover:border-emerald-400/80
              "
            >
              <div className="flex items-center gap-3 mb-1">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    bg-gradient-to-tr ${item.accent}
                    shadow-md shadow-black/40
                  `}
                >
                  <Icon size={20} className="text-slate-950" />
                </div>
                <div>
                  <h2 className="text-base md:text-[1.05rem] font-semibold text-slate-50">
                    {item.title}
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Admin tool
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>

              <span className="inline-flex items-center text-[12px] font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                Open {item.title.toLowerCase()}
                <span className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;