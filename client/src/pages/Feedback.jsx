import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Bug,
  Lightbulb,
  Heart,
  CheckCircle,
  AlertCircle,
  User,
  Mail
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "general",
    rating: 0,
    message: "",
    allowContact: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: "general",
      label: "General Feedback",
      icon: MessageSquare,
      description: "Share your overall thoughts and experience",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "bug",
      label: "Bug Report",
      icon: Bug,
      description: "Report technical issues or errors",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    },
    {
      id: "suggestion",
      label: "Feature Suggestion",
      icon: Lightbulb,
      description: "Suggest new features or improvements",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: "compliment",
      label: "Compliment",
      icon: Heart,
      description: "Share what you love about Movian",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error("Please provide your feedback message");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Feedback submitted:', formData);
      
      toast.success("Thank you for your feedback! We appreciate your input.");
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        feedbackType: "general",
        rating: 0,
        message: "",
        allowContact: false
      });
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isSubmitted) {
    return (
      <PageLayout 
        title="Thank You!" 
        description="We appreciate your feedback and will use it to improve Movian."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-2xl">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Feedback Received!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for taking the time to share your thoughts with us. 
            Your feedback helps us make Movian better for everyone.
          </p>
          <div className="space-y-4">
            <p className="text-gray-400">
              We review all feedback carefully and use it to guide our development process.
            </p>
            <p className="text-gray-400">
              If you provided contact information and requested follow-up, we'll be in touch soon.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </a>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit More Feedback
            </button>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Share Your Feedback" 
      description="Help us improve Movian by sharing your thoughts, suggestions, and experiences."
      className="min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <MessageSquare size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Your thoughts help us create a better experience for everyone. We read every piece of feedback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Feedback Information */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            {/* Why Feedback Matters */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Heart size={20} className="text-red-400" />
                Why Your Feedback Matters
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Helps us prioritize new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Improves the user experience for everyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Identifies and fixes issues quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Shapes the future of Movian</span>
                </li>
              </ul>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">
                    Response Time
                  </h4>
                  <p className="text-yellow-100 text-sm">
                    While we can't respond to every submission individually, we review all feedback 
                    and use it to inform our development decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <Mail size={16} />
                  <span className="text-sm">Contact Support</span>
                </a>
                <a
                  href="/faq"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <MessageSquare size={16} />
                  <span className="text-sm">Browse FAQ</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-gray-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Your Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Feedback Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What type of feedback are you sharing? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feedbackTypes.map((type) => (
                    <motion.label
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        formData.feedbackType === type.id
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="feedbackType"
                        value={type.id}
                        checked={formData.feedbackType === type.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2 rounded-lg ${type.bgColor}`}>
                          <type.icon size={20} className={type.color} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">
                            {type.label}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  How would you rate your overall experience? (Optional)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRatingClick(star)}
                      className="p-2 transition-colors"
                    >
                      <Star
                        size={24}
                        className={
                          star <= formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400 hover:text-yellow-400"
                        }
                      />
                    </motion.button>
                  ))}
                  <span className="text-gray-400 text-sm ml-2">
                    {formData.rating > 0 ? `${formData.rating}/5` : "Click to rate"}
                  </span>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Your Feedback *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please share your thoughts, suggestions, or describe any issues you've encountered..."
                />
                <p className="text-gray-400 text-xs">
                  Be as detailed as possible. For bug reports, include steps to reproduce the issue.
                </p>
              </div>

              {/* Contact Permission */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="allowContact"
                  name="allowContact"
                  checked={formData.allowContact}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="allowContact" className="text-sm text-gray-300">
                  I'm open to being contacted for follow-up questions about my feedback
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 lg:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed text-base lg:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} className="lg:size-5" />
                    Submit Feedback
                  </>
                )}
              </motion.button>

              <p className="text-gray-400 text-xs text-center">
                By submitting feedback, you agree to our{" "}
                <a href="/privacy" className="text-red-400 hover:text-red-300 underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Feedback;