import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Checkout() {
  const { items, total, fetchCart, placeOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    navigate("/order-success");
 
};


  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">
          Your bag is empty
        </h2>
        <p className="text-gray-500">
          Add items before proceeding to checkout
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT – ADDRESS + PAYMENT */}
        <div className="md:col-span-2 space-y-8">
          {/* ADDRESS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border bg-[var(--card)] p-6"
          >
            <h2 className="font-semibold mb-4">
              Delivery Address
            </h2>

            <p className="text-sm text-gray-600">
              Sunil <br />
              123, Main Street <br />
              Bengaluru, Karnataka <br />
              560001
            </p>

            <button className="mt-4 text-sm text-[var(--primary)] font-medium">
              CHANGE ADDRESS
            </button>
          </motion.div>

          {/* PAYMENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border bg-[var(--card)] p-6"
          >
            <h2 className="font-semibold mb-4">
              Payment Method
            </h2>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input type="radio" checked readOnly />
                Credit / Debit Card
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" readOnly />
                UPI
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" readOnly />
                Cash on Delivery
              </label>
            </div>
          </motion.div>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border bg-[var(--card)] p-6 h-fit"
        >
          <h2 className="font-semibold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between text-sm mb-3">
            <span>Total MRP</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <span>Convenience Fee</span>
            <span className="text-green-600">
              FREE
            </span>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold mb-6">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[var(--primary)] text-white py-3 font-semibold hover:opacity-90 transition"
          >
            PLACE ORDER
          </button>
        </motion.div>
      </div>
    </section>
  );
}
