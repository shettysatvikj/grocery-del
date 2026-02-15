import { Routes, Route, Outlet } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Success from "./pages/Success";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AddProduct from "./pages/admin/AddProduct";

/**
 * PublicLayout
 * - Wraps your main grocery store pages
 * - Keeps Navbar, but no centering container so Home can be full-width
 */
const PublicLayout = () => (
  <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
    {/* Top navbar */}
    <Navbar />

    {/* Main content area – removed max-w-6xl mx-auto */}
    <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-12">
      <Outlet />
    </main>
  </div>
);

/**
 * AdminShell
 * - Wraps admin routes with AdminRoute
 * - Gives a darker admin feel and separate layout
 */
const AdminShell = () => (
  <AdminRoute>
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* You can add an AdminNavbar/Sidebar later if you create one */}
      <main className="px-4 sm:px-6 lg:px-10 py-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  </AdminRoute>
);

function App() {
  return (
    <Routes>
      {/* Public / customer-facing routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminShell />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default App;