import { NavLink } from "react-router-dom";
import { Package, ShoppingCart } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-[var(--bg)]">
      {/* SIDEBAR */}
      <aside className="border-r p-6">
        <h1 className="text-xl font-bold mb-8">
          Admin<span className="text-[var(--primary)]">X</span>
        </h1>

        <nav className="space-y-3">
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }`
            }
          >
            <Package size={18} />
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }`
            }
          >
            <ShoppingCart size={18} />
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="p-10">{children}</main>
    </div>
  );
}
