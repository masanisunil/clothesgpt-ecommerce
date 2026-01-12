import { useState } from "react";
import { sendSmsOtp, verifySmsOtp } from "../api/smsOtp.api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SmsOtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    await sendSmsOtp(phone);
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await verifySmsOtp(phone, otp);
    localStorage.setItem("token", res.data.access_token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--card)] p-8 w-96"
      >
        <h2 className="text-xl font-semibold mb-6">
          Login via Mobile OTP
        </h2>

        {step === 1 && (
          <>
            <input
              placeholder="+91XXXXXXXXXX"
              className="w-full border p-3 mb-4"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-[var(--primary)] text-white py-3"
            >
              SEND OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              className="w-full border p-3 mb-4"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-[var(--primary)] text-white py-3"
            >
              VERIFY OTP
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
