import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/order.api";
import { motion } from "framer-motion";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(setOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading order details…</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-6">
        Order Details
      </h1>

      {/* ORDER SUMMARY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border bg-[var(--card)] p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <p className="font-semibold">
              Order #{order.order_id}
            </p>
            <p className="text-sm text-gray-500">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-6">
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
        </div>
      </motion.div>

      {/* ITEMS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border bg-[var(--card)] p-6"
      >
        <h2 className="font-semibold mb-4">
          Items in this order
        </h2>

        <div className="space-y-6">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-28 h-36 object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">
                  CLOTHESGPT
                </p>

                <p className="text-sm text-gray-500">
                  {item.name}
                </p>

                <p className="mt-1 font-semibold">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* DELIVERY INFO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border bg-[var(--card)] p-6 mt-8"
      >
        <h2 className="font-semibold mb-3">
          Delivery Address
        </h2>

        <p className="text-sm text-gray-600">
          Sunil <br />
          123, Main Street <br />
          Bengaluru, Karnataka <br />
          560001
        </p>
      </motion.div>
    </section>
  );
}
