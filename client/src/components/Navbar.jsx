import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Search, User, Home, Film, Bookmark, LogOut, UserPlus, ChevronDown } from "lucide-react";
import { CheckCircle, AlertTriangle } from "lucide-react"; // ✅ icons


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Detect scroll direction (hide on scroll down, show on scroll up)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setScrollDirection("down");
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection("up");
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setShowMobileSearch(false);
    setProfileDropdown(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setSearchTerm("");
    setMenuOpen(false);
    setShowMobileSearch(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileDropdown(false);
    navigate("/");
  };

  // Framer Motion variants
  const navVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    exit: { 
      x: "100%", 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
  };

  const mobileSearchVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Movies", path: "/movies", icon: Film },
    { name: "Search", path: "/search", icon: Search },
    { name: "MyList", path: "/mylist", icon: Bookmark },
  ];

  const getNavBackground = () => {
    if (isScrolled) {
      return "bg-black/95 backdrop-blur-xl shadow-2xl";
    }
    return "bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md";
  };

  return (
    <>
      {/* Netflix-style scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-500 z-[100]"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navbar Header */}
      <motion.nav
        variants={navVariants}
        initial="visible"
        animate={scrollDirection === "down" ? "hidden" : "visible"}
        className={`flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 fixed top-0 w-full z-50 transition-all duration-300 ${getNavBackground()} border-b border-gray-800/50`}
      >
        {/* Logo & Navigation */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Logo */}
          <motion.div
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">MOVIAN</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.li
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`cursor-pointer flex items-center gap-2 py-2 px-3 rounded-lg transition-all ${
                    location.pathname === link.path 
                      ? "text-white bg-red-600/20 border-b-2 border-red-600" 
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.name}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
        

        {/* Desktop Search & Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* Auth Buttons */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800/70 py-2 px-4 rounded-full transition-all border border-gray-700"
              >
                <User size={18} className="text-red-500" />
                <span className="text-white font-medium hidden lg:inline">
                  {user.username}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="bg-gray-800/50 hover:bg-gray-800/70 text-white py-2 px-4 rounded-full transition-all border border-gray-700"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-4 rounded-full transition-all shadow-lg"
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Search Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Search size={20} />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            key="mobile-search"
            variants={mobileSearchVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-4 z-40 shadow-2xl"
            ref={searchRef}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search movies..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-lg font-medium text-white transition-all"
              >
                Search
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              key="mobile-menu"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-gray-900 text-white flex flex-col z-50 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <motion.div
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <h2 className="text-xl font-bold">MOVIAN</h2>
                </motion.div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 p-6">
                <ul className="space-y-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <motion.li
                        key={link.path}
                        onClick={() => {
                          navigate(link.path);
                          setMenuOpen(false);
                        }}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`cursor-pointer py-3 px-4 rounded-lg flex items-center gap-3 ${
                          location.pathname === link.path 
                            ? "bg-red-600/20 text-red-500" 
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-lg font-medium">{link.name}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Auth Section */}
              <div className="p-6 border-t border-gray-800">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <User size={20} className="text-red-500" />
                      <div>
                        <p className="text-gray-400 text-sm">Logged in as</p>
                        <p className="text-white font-semibold">{user.username}</p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <User size={18} />
                      <span>Login</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate("/register");
                        setMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;