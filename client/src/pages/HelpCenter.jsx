import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Search, 
  Mail, 
  MessageCircle, 
  BookOpen,
  Video,
  Phone,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  FileText,
  Settings,
  Download,
  Play
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const supportCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "New to Movian? Learn the basics and how to make the most of our platform.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      resources: [
        { title: "Creating Your Account", link: "/faq#create-account" },
        { title: "Navigating the Platform", link: "/faq#navigation" },
        { title: "Setting Up Your Profile", link: "/faq#profile-setup" },
        { title: "Basic Features Overview", link: "/faq#features" }
      ]
    },
    {
      icon: Video,
      title: "Watching & Streaming",
      description: "Learn how to find and watch movies, manage your watchlist, and more.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      resources: [
        { title: "Finding Where to Watch", link: "/faq#streaming-info" },
        { title: "Using My List Feature", link: "/faq#my-list" },
        { title: "Troubleshooting Playback", link: "/faq#video-playback" },
        { title: "Managing Watch History", link: "/faq#watch-history" }
      ]
    },
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account settings, privacy, and personal preferences.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      resources: [
        { title: "Password Reset Guide", link: "/faq#password-reset" },
        { title: "Privacy Settings", link: "/privacy" },
        { title: "Account Deletion", link: "/faq#delete-account" },
        { title: "Notification Preferences", link: "/faq#notifications" }
      ]
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Technical issues, browser compatibility, and performance optimization.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      resources: [
        { title: "Browser Compatibility", link: "/faq#browser-support" },
        { title: "Performance Issues", link: "/faq#site-loading" },
        { title: "Mobile App Guide", link: "/faq#mobile-issues" },
        { title: "Clearing Cache & Cookies", link: "/faq#cache" }
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Frequently Asked Questions",
      description: "Quick answers to common questions",
      icon: HelpCircle,
      link: "/faq",
      count: "25+ questions"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: Mail,
      link: "/contact",
      count: "24/7 available"
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: Users,
      link: "/community",
      count: "Active community"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Play,
      link: "/tutorials",
      count: "15+ videos"
    }
  ];

  const popularArticles = [
    {
      title: "How to Add Movies to My List",
      category: "Features",
      readTime: "2 min read",
      link: "/help/my-list-guide"
    },
    {
      title: "Troubleshooting Streaming Issues",
      category: "Technical",
      readTime: "5 min read",
      link: "/help/streaming-fixes"
    },
    {
      title: "Understanding Privacy Settings",
      category: "Account",
      readTime: "3 min read",
      link: "/help/privacy-settings"
    },
    {
      title: "Mobile Browser Optimization",
      category: "Technical",
      readTime: "4 min read",
      link: "/help/mobile-optimization"
    }
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      responseTime: "Within 24 hours",
      action: "Send Email",
      link: "mailto:support@movian.com",
      color: "text-red-400"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help during business hours",
      responseTime: "Within 5 minutes",
      action: "Start Chat",
      link: "/chat",
      color: "text-green-400"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      responseTime: "Immediate",
      action: "Call Now",
      link: "tel:+15551234567",
      color: "text-blue-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageLayout 
      title="Help Center" 
      description="Comprehensive support resources, guides, and contact options to help you get the most out of Movian."
      className="min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <HelpCircle size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers, guides, and support resources to help you get the most out of Movian
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-8 lg:mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search help articles, guides, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3 lg:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-12"
        >
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">50+</div>
            <div className="text-gray-400 text-sm">Help Articles</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Support Available</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">98%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">15min</div>
            <div className="text-gray-400 text-sm">Avg. Response Time</div>
          </div>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          variants={itemVariants}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 text-center">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={24} className={category.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      {category.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.link}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group/item"
                        >
                          <ChevronRight size={16} className="group-hover/item:translate-x-1 transition-transform" />
                          <span className="text-sm">{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Quick Links & Popular Articles */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Access</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.title}
                    href={link.link}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
                        <link.icon size={24} className="text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg mb-1">
                          {link.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          {link.description}
                        </p>
                        <span className="text-red-400 text-xs font-medium">
                          {link.count}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Popular Help Articles</h3>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <a
                    key={article.title}
                    href={article.link}
                    className="block bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg mb-2 group-hover:text-red-400 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="bg-gray-700/50 px-2 py-1 rounded">
                            {article.category}
                          </span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-red-400 transition-colors flex-shrink-0 ml-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Support Options Sidebar */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Support Options */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Get Help Now</h3>
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <a
                    key={option.title}
                    href={option.link}
                    className="block p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-600/50 rounded-lg">
                        <option.icon size={20} className={option.color} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">
                          {option.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-1">
                          {option.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{option.responseTime}</span>
                        </div>
                      </div>
                      <span className="text-red-400 text-sm font-medium group-hover:underline">
                        {option.action}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">
                    Urgent Issues
                  </h4>
                  <p className="text-yellow-100 text-sm">
                    For account security issues or critical technical problems, contact our priority support at{" "}
                    <a href="mailto:urgent@movian.com" className="text-yellow-300 underline">
                      urgent@movian.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-400" />
                <div>
                  <h4 className="font-semibold text-white text-lg">System Status</h4>
                  <p className="text-green-100 text-sm">All systems operational</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-8 border border-red-500/20"
        >
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Contact Support
              </a>
              <a
                href="/faq"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse FAQ
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default HelpCenter;