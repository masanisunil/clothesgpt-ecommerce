import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
  const {
    items = [],
    total = 0,
    fetchCart,
    removeItem,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ EMPTY CART STATE
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>

        <p className="text-gray-500 mb-6">
          You have no items in your shopping bag
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[var(--primary)] text-white font-semibold tracking-wide hover:opacity-90 transition"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-8">
        Shopping Bag ({items.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT – ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.product_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-6 border p-4 bg-[var(--card)]"
            >
              {/* IMAGE */}
              <img
                src={item.image_url}
                alt={item.name}
                className="w-32 h-40 object-cover"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="font-semibold">FashionX</p>

                <p className="text-sm text-gray-500 mb-2">{item.name}</p>

                <p className="font-semibold">₹{item.price}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    className="w-8 h-8 border flex items-center justify-center"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    className="w-8 h-8 border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product_id)}
                  className="mt-3 text-sm text-red-500 hover:underline"
                >
                  REMOVE
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT – PRICE DETAILS */}
        <div className="border p-6 h-fit bg-[var(--card)]">
          <h2 className="font-semibold mb-4">PRICE DETAILS</h2>

          <div className="flex justify-between text-sm mb-3">
            <span>Total MRP</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <span>Convenience Fee</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold mb-6">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          {/* ✅ FIXED PLACE ORDER */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[var(--primary)] text-white py-3 font-semibold hover:opacity-90 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </section>
  );
}
