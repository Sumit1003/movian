import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Calendar, ArrowLeft, ShieldCheck } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL || "";

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 IMPORTANT for production (Render)
          body: JSON.stringify({ email, dob }),
        }
      );

      // Parse JSON safely
      let data = {};
      try {
        data = await res.json();
      } catch {
        toast.error("Unexpected server response.");
      }

      if (!res.ok) {
        toast.error(data.message || "Invalid email or date of birth");
        return;
      }

      toast.success(data.message || "Reset link sent!");

      // Clear form
      setEmail("");
      setDob("");

      // Redirect
      navigate("/verify-reset-password");
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error("Server unreachable. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">

      {/* LEFT PANEL — HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />

        <img
          src="/cinema_seats.jpg"
          alt="Cinema"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 p-12 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-3"
          >
            Forgot Your Password?
          </motion.h2>

          <p className="text-gray-300 text-lg max-w-md">
            No worries — we’ll help you recover your account securely.
          </p>
        </div>

        <div className="absolute top-10 right-16 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 left-12 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-500"></div>
      </motion.div>

      {/* RIGHT PANEL — FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-10 px-6 relative">
        <div className="relative z-10 w-full max-w-md">

          {/* LOGO */}
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-5xl font-bold mb-10 tracking-wider text-red-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOVIAN
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 transition mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>

            <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
            <p className="text-gray-400 mb-6">
              Enter your registered email & date of birth.
            </p>

            <div className="bg-red-600/10 border border-red-600/30 p-4 rounded-xl flex items-start gap-3 mb-6">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-1" />
              <p className="text-sm text-gray-300">
                Your identity must be verified before sending reset instructions.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-5">

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* DOB Field */}
              <div className="relative">
                <Calendar className="absolute left-3 top-[45px] text-gray-400 w-5 h-5" />
                <label className="text-gray-300 text-sm ml-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="text-gray-400 text-xs mt-6 text-center">
              Can't access your email?{" "}
              <a href="mailto:support@movian.com" className="text-red-400 hover:underline">
                Contact support
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ForgotPassword;
