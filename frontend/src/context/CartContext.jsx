import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      setItems(res.data.items || []);
      setTotal(res.data.total_price || 0);
      setCount(res.data.items?.length || 0);
    } catch (err) {
      console.error("Fetch cart failed", err);
      setItems([]);
      setTotal(0);
      setCount(0);
    }
  };

  const refreshCart = fetchCart;

  // ✅ FIXED REMOVE (MATCHES BACKEND)
  const removeItem = async (productId) => {
    await api.delete(`/cart/${productId}`);
    fetchCart();
  };

  const updateQuantity = async (productId, quantity) => {
  if (quantity < 1) return;
  await api.put(`/cart/${productId}`, { quantity });
  fetchCart();
};


  // ✅ PLACE ORDER
  const placeOrder = async () => {
    const res = await api.post("/orders");
    fetchCart();
    return res.data.order_id;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        fetchCart,
        refreshCart,
        removeItem,
        placeOrder,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
