import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductModal from "./ProductModal";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null); // 🔥 ADD MODE
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // ✏️ EDIT MODE
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Manage Products
        </h2>

        {/* ➕ ADD PRODUCT BUTTON */}
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border bg-[var(--card)] p-4 rounded"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="h-40 w-full object-cover mb-3"
            />

            <h3 className="font-semibold truncate">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 truncate">
              {product.description}
            </p>

            <p className="font-bold mt-2">
              ₹{product.price}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
        refresh={fetchProducts}
      />
    </div>
  );
}
