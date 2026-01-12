import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Manage Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div
            key={order.order_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border bg-[var(--card)] p-5 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                Order #{order.order_id}
              </p>
              <p className="text-sm text-gray-500">
                ₹{order.total_price}
              </p>
            </div>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.order_id, e.target.value)
              }
              className="border px-3 py-2 text-sm"
            >
              <option>PAID</option>
              <option>SHIPPED</option>
              <option>DELIVERED</option>
              <option>CANCELLED</option>
            </select>
          </motion.div>
        ))}
      </div>
    </>
  );
}
