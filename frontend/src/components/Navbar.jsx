import { motion } from "framer-motion";
import { Moon, Sun, ShoppingBag, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { count } = useCart();
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) return null; // 🔥 prevents flicker

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-[var(--bg)] border-b"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          CLOTHES<span className="text-[var(--primary)]">GPT</span>
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">
          {/* LOGIN / PROFILE */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-medium hover:text-[var(--primary)]"
            >
              <User size={18} />
              Login
            </Link>
          ) : (
            <Link
              to="/profile"
              className="flex items-center gap-1 text-sm font-medium hover:text-[var(--primary)]"
            >
              <User size={18} />
              Profile
            </Link>
          )}

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* THEME */}
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
