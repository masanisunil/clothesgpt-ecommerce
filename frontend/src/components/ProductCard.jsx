import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-[var(--card)] cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-[320px] object-cover transition duration-500 group-hover:scale-105"
          />

          {/* WISHLIST */}
          <button
            onClick={(e) => {
              e.preventDefault(); // 👈 VERY IMPORTANT
              e.stopPropagation();
              alert("Added to wishlist");
            }}
            className="absolute top-3 right-3 bg-white/80 dark:bg-black/60 p-2 rounded-full hover:scale-105 transition"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* INFO */}
        <div className="px-2 pt-3 pb-4">
          <p className="text-sm font-semibold truncate">
            CLOTHESGPT
          </p>

          <p className="text-sm text-gray-500 truncate">
            {product.name}
          </p>

          <p className="mt-1 font-semibold">
            ₹{product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
