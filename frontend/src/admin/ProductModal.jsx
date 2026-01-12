import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductModal({
  open,
  onClose,
  product,
  refresh,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImageUrl(product.image_url || "");
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    }
  }, [product]);

  if (!open) return null;

  const handleSubmit = async () => {
    const payload = {
      name,
      price,
      description,
      image_url: imageUrl,
    };

    if (product) {
      await api.put(`/products/${product.id}`, payload);
    } else {
      await api.post("/products", payload);
    }

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 mb-3"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
