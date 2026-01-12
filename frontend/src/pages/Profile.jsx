import { useEffect, useState } from "react";
import { getOrders } from "../api/order.api";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-8">
        My Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="border bg-[var(--card)] p-4 h-fit">
          <button className="w-full text-left px-3 py-2 text-sm bg-[var(--primary)] text-white">
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-red-600 mt-4"
          >
            Logout
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.order_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border bg-[var(--card)] p-5 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  Order #{order.order_id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{order.total_price}
                </p>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
