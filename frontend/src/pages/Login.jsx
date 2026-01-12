import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      login(data.access_token); // 🔥 KEY FIX
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex relative items-center justify-center bg-black">
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="fashion"
        />
        <div className="relative text-white text-center px-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to CLOTHESGPT
          </h1>
          <p className="opacity-90">
            Discover fashion that defines you
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Login
          </h2>
          

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-3"
              onChange={(e) => setPassword(e.target.value)}
            />
             {/* <Link to="/login/sms">Login with Mobile OTP</Link> */}

            <button
              onClick={handleLogin}
              className="w-full bg-[var(--primary)] text-white py-3 font-semibold"
            >
              LOGIN
            </button>
           

          </div>
        </motion.div>
      </div>
    </div>
  );
}
