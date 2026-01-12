import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { addToCart } from "../api/cart.api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const { refreshCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleAddToBag = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to add items to cart");
      return;
    }

    if (!size) {
      alert("Please select a size");
      return;
    }

    try {
      await addToCart(product.id);
      refreshCart();
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  if (!product) return null;

  return (
    <section className="max-w-[1300px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT – IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-[500px] object-cover bg-[var(--card)]"
          />
        </motion.div>

        {/* RIGHT – INFO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-semibold mb-1">
            CLOTHESGPT
          </h1>

          <p className="text-lg text-gray-500 mb-4">
            {product.name}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold">
              ₹{product.price}
            </span>
            <span className="text-sm text-green-600">
              inclusive of all taxes
            </span>
          </div>

          {/* SIZE SELECTION */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">
              SELECT SIZE
            </p>

            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 border text-sm font-medium ${
                    size === s
                      ? "border-[var(--primary)] text-[var(--primary)]"
                      : "hover:border-black dark:hover:border-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToBag}
              className="flex-1 bg-[var(--primary)] text-white py-4 font-semibold hover:opacity-90"
            >
              ADD TO BAG
            </button>

            <button className="w-14 border flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10">
              <Heart />
            </button>
          </div>

          {/* DELIVERY INFO */}
          <div className="border-t pt-6 text-sm text-gray-600">
            <p>100% Original Products</p>
            <p>Pay on delivery available</p>
            <p>Easy 14 days returns & exchanges</p>
          </div>
        </motion.div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-16 max-w-[800px]">
        <h3 className="text-lg font-semibold mb-3">
          Product Details
        </h3>
        <p className="text-sm leading-relaxed text-gray-600">
          {product.description ||
            "Premium quality fabric with modern fit. Designed for comfort and style, perfect for casual and formal occasions."}
        </p>
      </div>
    </section>
  );
}
