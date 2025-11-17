import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  

  useEffect(() => {
    const verify = async () => {
      const base = import.meta.env.VITE_API_BASE_URL;

      if (!base) {
        console.error("VITE_API_BASE_URL is not set");
        toast.error("Server config error. Please try again later.");
        setStatus("error");
        return;
      }

      try {
        const url = `${base}/api/auth/verify-email/${token}`;

        const res = await fetch(url, {
          method: "GET",
          credentials: "include", // important for production
        });

        // Safe JSON parsing (in case server returns HTML on error)
        let data = {};
        try {
          data = await res.json();
        } catch {
          data = { message: "Invalid server response" };
        }

        if (res.ok && data.success) {
          toast.success("Email verified successfully! 🎉");
          setStatus("success");

          // Auto redirect after a short delay
          setTimeout(() => navigate("/login"), 3000);
        } else {
          toast.error(data.message || "Invalid or expired verification link.");
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Network error. Please try again.");
        setStatus("error");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
    }
  }, [token, navigate]);

  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white relative overflow-hidden">

      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
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
            Verifying Email
          </motion.h2>
          <p className="text-gray-300 text-lg max-w-md">
            We're confirming your Movian account. This will take a moment.
          </p>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-10 px-6">
        <div className="relative z-10 w-full max-w-md">

          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-5xl font-bold mb-10 tracking-wider text-red-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOVIAN
          </motion.h1>

          {/* STATUS CARD */}
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: "linear",
                  }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Loader2 className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-2">Verifying...</h2>
                <p className="text-gray-300">
                  Please wait while we confirm your identity.
                </p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.7 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
                >
                  <CheckCircle className="w-14 h-14 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-green-400 mb-2">
                  Email Verified!
                </h2>
                <p className="text-gray-300 mb-6">
                  You’ll be redirected to login shortly…
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  Go to Login <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.7 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-xl"
                >
                  <XCircle className="w-14 h-14 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-red-400 mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-300 mb-6">
                  This link may be expired or already used.
                </p>

                <button
                  onClick={() => navigate("/register")}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg mb-3"
                >
                  Back to Sign Up
                </button>

                <Link
                  to="/login"
                  className="block w-full text-center bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold border border-gray-600 transition-all"
                >
                  Go to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
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
              delay: Math.random(),
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VerifyEmail;
