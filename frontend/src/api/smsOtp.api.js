import api from "./axios";

export const sendSmsOtp = (phone) =>
  api.post("/auth/otp/sms", { phone });

export const verifySmsOtp = (phone, otp) =>
  api.post("/auth/otp/sms/verify", { phone, otp });
