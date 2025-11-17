import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">

      {/* LEFT PANEL — HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

        {/* Hero Image */}
        <img
          src="cinema_seats.jpg"
          alt="Cinema"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 p-12 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-3"
          >
            Check Your Email
          </motion.h2>

          <p className="text-gray-300 text-lg max-w-md">
            We’ve sent a verification link to your registered email.
          </p>
        </div>

        {/* Floating lights */}
        <div className="absolute top-10 right-16 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 left-12 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-500"></div>
      </motion.div>

      {/* RIGHT PANEL — GLASS CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-10 px-6 relative">
        <div className="relative z-10 w-full max-w-md">

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
          >
            {/* Mail Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mb-8 shadow-lg"
            >
              <Mail className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent mb-4">
              Check Your Email
            </h2>

            <p className="text-gray-300 text-lg max-w-sm mx-auto mb-8">
              A verification link has been sent.  
              Open your inbox and tap the link to activate your Movian account.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8 max-w-sm mx-auto text-left">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Secure account verification</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Link expires in 24 hours</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Protecting your privacy</span>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-400/30 mb-8">
              <p className="text-orange-200 text-sm">
                Tip: Can't find it? Check your spam folder or try again.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 justify-center"
              >
                Go to Login
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold transition-all border border-gray-600 flex items-center gap-2 justify-center"
              >
                Check Again
                <Mail className="w-5 h-5" />
              </button>
            </div>

            {/* Support */}
            <p className="text-gray-400 text-xs mt-6">
              Need help?{" "}
              <a href="mailto:support@movian.com" className="text-red-400 hover:underline">
                Contact support
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* FLOATING PARTICLES */}
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
              opacity: [0.1, 0.35, 0.1],
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

export default CheckEmail;
