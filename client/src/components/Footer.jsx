import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Heart, Play, Film, Star } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  // Check scroll position for back-to-top button
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate subscription
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // 🎬 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const footerSections = [
    {
      title: "Explore",
      icon: <Film size={16} className="text-red-500" />,
      links: [
        { name: "Home", path: "/", icon: "🏠" },
        { name: "Movies", path: "/movies", icon: "🎬" },
        { name: "My List", path: "/mylist", icon: "📑" },
        { name: "Search", path: "/search", icon: "🔍" },
      ]
    },
    {
      title: "Support",
      icon: <Star size={16} className="text-red-500" />,
      links: [
        { name: "Help Center", path: "/help", icon: "❓" },
        { name: "Contact Us", path: "/contact", icon: "📞" },
        { name: "FAQ", path: "/faq", icon: "💡" },
        { name: "Feedback", path: "/feedback", icon: "💬" },
      ]
    },
    {
      title: "Legal",
      icon: <Play size={16} className="text-red-500" />,
      links: [
        { name: "Privacy Policy", path: "/privacy", icon: "🔒" },
        { name: "Terms of Service", path: "/terms", icon: "📄" },
        { name: "Cookie Policy", path: "/cookies", icon: "🍪" },
        { name: "Copyright", path: "/copyright", icon: "©️" },
      ]
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/movian",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
      ),
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      url: "https://facebook.com/sumit_s30",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
        </svg>
      ),
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/sumit_s30",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.199-1.549-.75-.938-1.011-2.142-.697-3.299.313-1.156 1.143-2.086 2.247-2.499 1.105-.413 2.354-.256 3.299.45.944.707 1.549 1.858 1.549 3.199 0 1.297-.611 2.448-1.549 3.199-.938.75-2.142 1.011-3.299.697-1.156-.314-2.086-1.144-2.499-2.248zm7.548 0c-1.297 0-2.448-.611-3.199-1.549-.75-.938-1.011-2.142-.697-3.299.313-1.156 1.143-2.086 2.247-2.499 1.105-.413 2.354-.256 3.299.45.944.707 1.549 1.858 1.549 3.199 0 1.297-.611 2.448-1.549 3.199-.938.75-2.142 1.011-3.299.697-1.156-.314-2.086-1.144-2.499-2.248z" clipRule="evenodd"/>
        </svg>
      ),
      color: "hover:text-pink-500"
    },
    {
      name: "GitHub",
      url: "https://github.com/sumit1003",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
        </svg>
      ),
      color: "hover:text-gray-300"
    }
  ];

  return (
    <>
      <motion.footer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border-t border-gray-800/50"
      >
        {/* JOIN TELEGRAM BANNER */}
<div className="w-full bg-red-600 text-white text-center py-3 shadow-lg">
  <a
    href="https://t.me/movian_updates"
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg font-semibold tracking-wide flex items-center justify-center gap-2"
  >
    🚀 Join us on Telegram for Updates
  </a>
</div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  MOVIAN
                </span>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-sm lg:text-base mb-6 max-w-md leading-relaxed"
              >
                Your ultimate destination for discovering and tracking movies. 
                Explore thousands of films, create your personal watchlist, and never miss a great movie again.
              </motion.p>
              
              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 ${social.color} transition-all duration-200 p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Footer Links Sections */}
            {footerSections.map((section, index) => (
              <motion.div 
                key={section.title}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <motion.h3 
                  className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2"
                >
                  {section.icon}
                  {section.title}
                </motion.h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <motion.li 
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white text-sm transition-all duration-200 flex items-center gap-2 group"
                      >
                        <span className="text-xs">{link.icon}</span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50 py-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-400"
              >
                <p>© {currentYear} MOVIAN. All rights reserved.</p>
                <div className="hidden sm:block w-px h-4 bg-gray-600" />
                <motion.p 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  Made with <Heart size={14} className="text-red-500 fill-current" /> for movie lovers
                </motion.p>
              </motion.div>
              
              {/* Additional Legal Links */}
              <motion.div 
                className="flex gap-6 text-sm text-gray-400"
              >
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <motion.a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    whileHover={{ color: "#ffffff", scale: 1.05 }}
                    className="transition-all duration-200 hover:text-white"
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isScrollVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: "#EF4444" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gray-800 hover:bg-red-600 text-white rounded-xl shadow-2xl shadow-black/50 border border-gray-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;