// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import WatchPage from "./pages/WatchPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyResetPassword from "./pages/VerifyResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Copyright from './pages/Copyright';

import ProtectedRoute from "./components/ProtectedRoute";
import { RouteDirectionProvider } from "./context/RouteDirectionContext";


// =============================================
// 🔥 FIXED NAVBAR / FOOTER HIDE PATHS
// (No trailing slash for dynamic routes)
// =============================================
const HIDE_NAVBAR = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify",
  "/verify-email",
  "/reset-password",
  "/admin-login",
  "/admin/dashboard",
  "/watch",        // FIXED
];

const HIDE_FOOTER = [...HIDE_NAVBAR];

const matchPath = (patterns, pathname) =>
  patterns.some((p) => pathname.startsWith(p));


// =============================================
// 🔥 ROUTES WITH ANIMATION
// =============================================
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/mylist"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watch/:imdbId"
          element={
            <ProtectedRoute>
              <WatchPage />
            </ProtectedRoute>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<CheckEmail />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/verify-reset-password" element={<VerifyResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* STATIC PAGES */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/copyright" element={<Copyright />} />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-gray-400">Page Not Found</p>
                <a
                  href="/"
                  className="bg-red-600 px-4 py-2 rounded-lg mt-6 inline-block"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />

      </Routes>
    </AnimatePresence>
  );
};


// =============================================
// 🔥 LAYOUT CONTROLLER (Navbar + Footer)
// =============================================
const LayoutController = ({ children }) => {
  const location = useLocation();

  const hideNavbar = matchPath(HIDE_NAVBAR, location.pathname);
  const hideFooter = matchPath(HIDE_FOOTER, location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {!hideNavbar && <Navbar />}
      <div className="flex-1">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
};


// =============================================
// 🔥 MAIN APP
// =============================================
const App = () => {
  return (
    <Router>
      <RouteDirectionProvider>
        <LayoutController>
          <AnimatedRoutes />
        </LayoutController>
      </RouteDirectionProvider>
    </Router>
  );
};

export default App;
