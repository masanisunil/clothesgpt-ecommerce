import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductSkeleton from "../components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  // ✅ FILTER + SORT LOGIC
  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price_low") return a.price - b.price;
      if (sort === "price_high") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* 🔍 SEARCH + SORT (ABOVE HERO) */}
      <section className="max-w-[1400px] mx-auto px-4 pt-6">
        <ProductFilters
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
      </section>

      {/* 🔥 HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src="https://images.pexels.com/photos/1701197/pexels-photo-1701197.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Redefine Your Style
          </h1>
          <p className="mt-6 text-lg opacity-90">
            Fashion that moves with you
          </p>
        </motion.div>
      </section>

      {/* 🛍 PRODUCTS SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">
          Trending Products
        </h2>

        {/* ⏳ LOADING */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 🧱 PRODUCT GRID */}
        {!loading && (
          <>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                No products found
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
