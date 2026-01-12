import api from "./axios";

export const addToCart = (productId) =>
  api.post("/cart", {
    product_id: productId,
    quantity: 1,
  });

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};
