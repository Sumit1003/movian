import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Search,
  Film,
  User,
  Heart,
  Download,
  Shield,
  Play,
  Star,
  Mail
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: HelpCircle,
      questions: [
        {
          id: "free-service",
          question: "Is Movian completely free to use?",
          answer: "Yes, Movian is 100% free! We believe everyone should have access to comprehensive movie information and streaming availability without any subscription fees or hidden costs."
        },
        {
          id: "account-required",
          question: "Do I need to create an account to use Movian?",
          answer: "You can browse movies, search our database, and view movie details without an account. However, creating a free account unlocks additional features like saving movies to My List, posting comments, rating movies, and accessing your watch history."
        },
        {
          id: "what-is-movian",
          question: "What exactly is Movian?",
          answer: "Movian is a comprehensive movie discovery and information platform. We provide detailed movie metadata, streaming availability, trailers, cast information, and user reviews. We help you find where to watch movies legally across various streaming platforms."
        },
        {
          id: "device-support",
          question: "What devices support Movian?",
          answer: "Movian is fully responsive and works on all modern devices including desktop computers, laptops, tablets, and smartphones. Our web app is optimized for all major browsers including Chrome, Firefox, Safari, and Edge."
        }
      ]
    },
    {
      id: "features",
      title: "Features & Functionality",
      icon: Film,
      questions: [
        {
          id: "my-list",
          question: "How does My List work?",
          answer: "My List is your personal movie watchlist. When logged in, you can save movies to watch later by clicking the 'Add to My List' button. You can organize, remove, and track movies you're interested in watching."
        },
        {
          id: "streaming-info",
          question: "How do I find where to watch a movie?",
          answer: "On each movie's detail page, you'll find a 'Watch Now' section that shows available streaming platforms. We aggregate data from various legal streaming services to show you where the movie is currently available in your region."
        },
        {
          id: "movie-updates",
          question: "How often is movie information updated?",
          answer: "Our movie database is updated daily with new releases, updated streaming availability, and fresh metadata. We continuously monitor changes across streaming platforms to ensure you have the most current information."
        },
        {
          id: "trailers",
          question: "Can I watch trailers on Movian?",
          answer: "Yes! Most movie pages include official trailers that you can watch directly on our platform. We source trailers from official channels to ensure high quality and accurate content."
        }
      ]
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: User,
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation, enter your email address, choose a username and password, and you're all set! Account creation takes less than a minute and is completely free."
        },
        {
          id: "password-reset",
          question: "What if I forget my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password. You'll be back to watching in no time!"
        },
        {
          id: "profile-customization",
          question: "Can I customize my profile?",
          answer: "Currently, you can manage your watchlist, viewing history, and comments. Future updates will include more profile customization options like avatars and personalized recommendations."
        },
        {
          id: "delete-account",
          question: "How do I delete my account?",
          answer: "You can delete your account at any time from your profile settings. This will permanently remove your data, including your watchlist and comments. This action cannot be undone."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: Shield,
      questions: [
        {
          id: "video-playback",
          question: "Why can't I play a movie?",
          answer: "Movian provides information about where you can legally stream movies. We don't host video content directly. If you're having trouble playing a movie on a streaming platform, please contact that platform's support team."
        },
        {
          id: "site-loading",
          question: "The site is loading slowly. What can I do?",
          answer: "Try refreshing the page, clearing your browser cache, or checking your internet connection. If problems persist, contact our support team with details about your device and browser."
        },
        {
          id: "mobile-issues",
          question: "Is there a mobile app?",
          answer: "Currently, Movian is available as a responsive web app that works perfectly on mobile browsers. We're developing native mobile apps for iOS and Android that will be released soon."
        },
        {
          id: "browser-support",
          question: "Which browsers work best with Movian?",
          answer: "Movian works best with modern, updated browsers. We recommend Chrome, Firefox, Safari, or Edge for the optimal experience. Make sure JavaScript is enabled for full functionality."
        }
      ]
    },
    {
      id: "content",
      title: "Content & Licensing",
      icon: Download,
      questions: [
        {
          id: "content-availability",
          question: "Why are some movies not available?",
          answer: "Movie availability depends on licensing agreements in your region and which streaming platforms have rights to show the content. We display all available options based on your location."
        },
        {
          id: "regional-differences",
          question: "Why does content vary by region?",
          answer: "Streaming rights are often licensed by geographic regions. A movie available in one country might not be available in another due to different distribution agreements."
        },
        {
          id: "new-releases",
          question: "How quickly do new movies appear?",
          answer: "New theatrical releases typically appear in our database as soon as they're announced. Streaming availability is added once the movie becomes available on digital platforms."
        },
        {
          id: "report-issue",
          question: "How do I report incorrect movie information?",
          answer: "Use the 'Report Issue' button on movie pages or contact our support team. Please include the movie title and specific details about what needs correction."
        }
      ]
    }
  ];

  // Filter questions based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
      title="Frequently Asked Questions" 
      description="Find answers to common questions about Movian, our features, and how to get the most out of your movie discovery experience."
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
              <HelpCircle size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Get quick answers to common questions about using Movian
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-8 lg:mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
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
            <div className="text-2xl font-bold text-red-500 mb-1">{faqCategories.length}</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {faqCategories.reduce((total, category) => total + category.questions.length, 0)}
            </div>
            <div className="text-gray-400 text-sm">Questions</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">100%</div>
            <div className="text-gray-400 text-sm">Free</div>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-6 lg:space-y-8">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-4 lg:p-6 border-b border-gray-700/50 bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <category.icon size={20} className="text-red-400" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold text-white">
                    {category.title}
                  </h2>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                    {category.questions.length}
                  </span>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-700/50">
                {category.questions.map((item) => (
                  <motion.div
                    key={item.id}
                    className="border-gray-700/50"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 lg:px-6 py-4 lg:py-5 text-left hover:bg-gray-700/30 transition-colors duration-200 flex items-center justify-between gap-4"
                    >
                      <span className="font-semibold text-white text-base lg:text-lg flex-1">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-red-400"
                      >
                        {openItems[item.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openItems[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 lg:px-6 pb-4 lg:pb-5">
                            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <HelpCircle size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No matching questions found
            </h3>
            <p className="text-gray-500">
              Try searching with different keywords or browse the categories above
            </p>
          </motion.div>
        )}

        {/* Contact Support CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-8 lg:mt-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 lg:p-8 border border-red-500/20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                Still need help?
              </h3>
              <p className="text-gray-300 text-base lg:text-lg">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Support
              </a>
              <a
                href="/help"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Help Center
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default FAQ;