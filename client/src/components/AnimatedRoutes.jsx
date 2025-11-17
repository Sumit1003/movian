import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRouteDirection } from "../context/RouteDirectionContext";

// Pages
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetail from "../pages/MovieDetail";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

// 🎬 Page variants (direction-aware)
const pageVariants = {
  forwardEnter: { opacity: 0, x: 80 },
  backwardEnter: { opacity: 0, x: -80 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  forwardExit: { opacity: 0, x: -80, transition: { duration: 0.4 } },
  backwardExit: { opacity: 0, x: 80, transition: { duration: 0.4 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { direction } = useRouteDirection();
  const isMobile = window.innerWidth < 768;

  const getMotionProps = () => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
      };
    }

    return {
      variants: pageVariants,
      initial: direction === "forward" ? "forwardEnter" : "backwardEnter",
      animate: "center",
      exit: direction === "forward" ? "forwardExit" : "backwardExit",
    };
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...getMotionProps()} className="min-h-screen">
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/movies"
          element={
            <motion.div {...getMotionProps()} className="min-h-screen">
              <Movies />
            </motion.div>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <motion.div {...getMotionProps()} className="min-h-screen">
              <MovieDetail />
            </motion.div>
          }
        />
        <Route
          path="/search"
          element={
            <motion.div {...getMotionProps()} className="min-h-screen">
              <Search />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              {...getMotionProps()}
              className="min-h-screen flex items-center justify-center bg-gray-900"
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              {...getMotionProps()}
              className="min-h-screen flex items-center justify-center bg-gray-900"
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <motion.div
              {...getMotionProps()}
              className="min-h-screen flex items-center justify-center bg-gray-900"
            >
              <ForgotPassword />
            </motion.div>
          }
        />

        <Route
  path="/verify-email/:token"
  element={
    <motion.div
      variants={getPageVariants()}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen"
    >
      <VerifyEmail />
    </motion.div>
  }
/>

<Route
  path="/forgot-password"
  element={
    <motion.div
      variants={getPageVariants()}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen"
    >
      <ForgotPassword />
    </motion.div>
  }
/>

<Route
  path="/reset-password/:token"
  element={
    <motion.div
      variants={getPageVariants()}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen"
    >
      <ResetPassword />
    </motion.div>
  }
/>



      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
