// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const API = import.meta.env.VITE_API_BASE_URL || "";
    try {
      const res = await fetch(
        `${API}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 important for Render
          body: JSON.stringify({ password }),
        }
      );

      // Safe JSON parse
      let data = {};
      try {
        data = await res.json();
      } catch {
        toast.error("Unexpected server response.");
      }

      if (!res.ok) {
        toast.error(data.message || "Invalid or expired reset link.");
        return;
      }

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error("Reset error:", err);
      toast.error("Server unreachable. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black">

      {/* LEFT — Reset Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-12 relative z-30">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#101010]/90 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-10 sm:p-12 w-full max-w-md"
        >

          {/* LOGO */}
          <h1
            className="text-center text-5xl font-bold tracking-wide mb-6 text-red-600"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOVIAN
          </h1>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Reset Password
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Create a strong new password to secure your account.
          </p>

          {/* FORM */}
          <form onSubmit={handleReset} className="space-y-5">

            {/* PASSWORD FIELD */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-12 pr-12 bg-black/40 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 transition-all py-3 rounded-xl text-white font-semibold shadow-lg shadow-red-600/40 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Remember your password?{" "}
            <Link to="/login" className="text-red-500 hover:underline font-semibold">
              Sign In
            </Link>
          </p>

        </motion.div>
      </div>

      {/* RIGHT — Background Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="/cinema_seats.jpg"
          alt="Cinema Seats"
          className="w-full h-full object-cover brightness-[0.40]"
        />

        <div className="absolute bottom-10 left-10 text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4"
          >
            Secure your account
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg"
          >
            Choose a strong password and stay protected.
          </motion.p>
        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
