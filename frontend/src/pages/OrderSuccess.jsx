import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-4">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mb-8">
          Thank you for shopping with CLOTHESGPT
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-3 bg-[var(--primary)] text-white font-semibold"
        >
          VIEW ORDERS
        </button>
      </motion.div>
    </div>
  );
}
