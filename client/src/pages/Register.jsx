import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Calendar } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!dob) {
      toast.error("Please select your date of birth");
      return;
    }

    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_BASE_URL;

      if (!API) {
        toast.error("API URL missing. Set VITE_API_BASE_URL.");
        return;
      }

      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
          dob,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created! Verify your email to continue.");
        navigate("/verify");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register Error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black">
      
      {/* LEFT BANNER */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="/cinema_seats.jpg"
          alt="Cinema"
          className="w-full h-full object-cover brightness-[0.25]"
        />

        <div className="absolute bottom-12 left-12 text-white max-w-lg">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Start your journey with us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Join millions of movie lovers worldwide.
          </motion.p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-12 relative">

        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-black to-black" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/20 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-8 sm:p-10"
        >

          <h1
            className="text-center text-5xl font-bold tracking-wide mb-8 text-red-600"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOVIAN
          </h1>

          <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
          <p className="text-gray-400 text-center mb-8">Join Movian and start watching</p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your full name"
                className="w-full py-3 pl-12 pr-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full py-3 pl-12 pr-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* DOB */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                className="w-full py-3 pl-12 pr-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-red-500 outline-none"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Create a password"
                className="w-full py-3 pl-12 pr-12 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                disabled={loading}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full py-3 pl-12 pr-12 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                disabled={loading}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all shadow-red-600/40 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline font-semibold">
              Sign In
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default Register;
