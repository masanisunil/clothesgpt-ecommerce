import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/products", label: "Products" },
  { path: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:block w-56 bg-white border-r">
      <div className="h-14 flex items-center px-4 font-bold text-[#2874f0]">
        Admin Panel
      </div>

      <nav className="px-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-3 py-2 text-sm ${
              pathname === link.path
                ? "bg-[#e8f0fe] text-[#2874f0] font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
