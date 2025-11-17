// src/pages/VerifyResetPassword.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyResetPassword = () => {
  return (
    <div className="min-h-screen w-full flex bg-black relative overflow-hidden">

      {/* ✨ FLOATING PARTICLES / SPARKLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-red-500/20 rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* LEFT PANEL — EMAIL CONFIRMATION */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-12 relative z-30">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-red-500/20 shadow-[0_0_50px_-12px_rgba(220,0,0,0.4)] rounded-3xl p-10 sm:p-12 w-full max-w-md"
        >

          {/* LOGO */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-5xl font-bold tracking-wide mb-6 text-red-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOVIAN
          </motion.h1>

          {/* ICON */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <Mail
              size={60}
              className="text-red-500 drop-shadow-[0_0_12px_rgba(255,0,0,0.6)] animate-pulse"
            />
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white text-center mb-3"
          >
            Check Your Email
          </motion.h2>

          {/* MESSAGE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-center mb-8 leading-relaxed"
          >
            We’ve sent a secure password reset link to your inbox.
            Follow the instructions to continue.
          </motion.p>

          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 text-center"
          >
            <p className="text-gray-400 text-sm">
              Didn’t receive an email?{" "}
              <Link
                to="/forgot-password"
                className="text-red-500 hover:underline font-semibold"
              >
                Resend
              </Link>
            </p>

            <p className="text-gray-400 text-sm">
              Back to{" "}
              <Link
                to="/login"
                className="text-red-500 hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT PANEL — CINEMA ART */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="/cinema_seats.jpg"
          alt="Cinema Seats"
          className="w-full h-full object-cover brightness-[0.35]"
        />

        {/* DARK VIGNETTE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* SIDE TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-10 left-10 text-white"
        >
          <h2 className="text-4xl font-bold mb-4 drop-shadow-xl">
            Reset Your Password
          </h2>
          <p className="text-gray-300 text-lg max-w-sm">
            We're helping you recover your account quickly and securely.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyResetPassword;
