import { useEffect, useState } from "react";
import { getOrders } from "../api/order.api";
import { motion } from "framer-motion";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading your orders…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-500">
          Looks like you haven’t placed any orders.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.order_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border bg-[var(--card)] p-5 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {/* LEFT */}
            <div>
              <p className="font-semibold">
                Order #{order.order_id}
              </p>

              <p className="text-sm text-gray-500">
                Placed on{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <p className="font-semibold">
                ₹{order.total_price}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order.status === "SHIPPED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
