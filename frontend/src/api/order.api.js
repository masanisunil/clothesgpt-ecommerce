import api from "./axios";

export const checkoutOrder = async () => {
  const res = await api.post("/orders/checkout");
  return res.data;
};

export const payOrder = async (orderId) => {
  const res = await api.post("/payments/mock", {
    order_id: orderId,
    payment_method: "CARD",
  });
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const getOrderById = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

