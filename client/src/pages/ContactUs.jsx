import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@movian.com",
      link: "mailto:support@movian.com",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon to Fri from 9am to 6pm",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "123 Movie Street, Cinema City, CC 10101",
      link: "https://maps.google.com",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically reply within",
      details: "24 hours",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@movian_official",
      url: "https://instagram.com/movian_official",
      color: "text-pink-500",
      hoverColor: "hover:bg-pink-500/10"
    },
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@movian",
      url: "https://twitter.com/movian",
      color: "text-blue-400",
      hoverColor: "hover:bg-blue-400/10"
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "Movian Official",
      url: "https://facebook.com/movianofficial",
      color: "text-blue-600",
      hoverColor: "hover:bg-blue-600/10"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "Movian",
      url: "https://linkedin.com/company/movian",
      color: "text-blue-700",
      hoverColor: "hover:bg-blue-700/10"
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
      title="Contact Us" 
      description="Get in touch with our team. We're here to help you with any questions or concerns."
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
          className="text-center mb-8 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Have questions about Movian? We're here to help! Reach out to our support team 
            and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information - Left Sidebar for Desktop */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-1 space-y-6 lg:space-y-8"
          >
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 lg:gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className={`p-2 lg:p-3 rounded-lg ${method.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon size={20} className={`${method.color} lg:size-6`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-base lg:text-lg mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 text-xs lg:text-sm mb-2">
                        {method.description}
                      </p>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm lg:text-base break-words"
                        >
                          {method.details}
                        </a>
                      ) : (
                        <p className="text-white font-medium text-sm lg:text-base">{method.details}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-700/50"
            >
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4 flex items-center gap-2">
                <MessageCircle size={18} className="text-red-500 lg:size-5" />
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-gray-700/50 ${social.hoverColor} transition-all duration-300 group`}
                  >
                    <social.icon size={16} className={`${social.color} lg:size-5`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-xs lg:text-sm group-hover:text-current truncate">
                        {social.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQ Prompt */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-4 lg:p-6 border border-red-500/20"
            >
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5 lg:size-5 lg:mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-base lg:text-lg mb-1 lg:mb-2">
                    Quick Question?
                  </h4>
                  <p className="text-gray-300 text-sm lg:text-base mb-2 lg:mb-3">
                    Check out our FAQ section for instant answers.
                  </p>
                  <a
                    href="/faq"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors text-sm lg:text-base"
                  >
                    Visit FAQ
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Main Content Area */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700/50"
          >
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Send us a Message</h2>
              <p className="text-gray-400 text-base lg:text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm lg:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm lg:text-base"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm lg:text-base"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none text-sm lg:text-base"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 lg:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed text-base lg:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="lg:size-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-gray-400 text-xs lg:text-sm text-center">
                By submitting this form, you agree to our{" "}
                <a href="/privacy" className="text-red-400 hover:text-red-300 underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>

        {/* Support Notice */}
        <motion.div
          variants={itemVariants}
          className="mt-8 lg:mt-12 bg-gray-800/30 rounded-xl p-4 lg:p-6 border border-yellow-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5 lg:size-5 lg:mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-white text-base lg:text-lg mb-1 lg:mb-2">
                Need Immediate Assistance?
              </h4>
              <p className="text-gray-300 text-sm lg:text-base">
                For urgent issues regarding your account or technical problems, please email us directly at{" "}
                <a href="mailto:urgent@movian.com" className="text-red-400 hover:text-red-300 font-medium">
                  urgent@movian.com
                </a>{" "}
                and we'll prioritize your request.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default ContactUs;