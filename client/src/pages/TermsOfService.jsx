import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  User, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Ban,
  Copyright,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Mail,
  Clock,
  BookOpen
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const termsSections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing or using Movian ("the Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access the Service.`,
      subsections: [
        {
          title: "Legal Agreement",
          content: "These terms constitute a legally binding agreement between you and Movian regarding your use of our movie discovery platform and related services."
        },
        {
          title: "Updates and Modifications",
          content: "We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the modified terms."
        }
      ]
    },
    {
      id: "eligibility",
      title: "Eligibility and Registration",
      icon: User,
      content: "To use certain features of Movian, you must register for an account and meet specific eligibility requirements.",
      subsections: [
        {
          title: "Age Requirement",
          content: "You must be at least 16 years old to use our Service. Users under 16 may only use the Service with parental consent and supervision."
        },
        {
          title: "Account Responsibility",
          content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          title: "Accurate Information",
          content: "You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate."
        }
      ]
    },
    {
      id: "user-conduct",
      title: "User Conduct and Responsibilities",
      icon: Shield,
      content: "Users must adhere to community guidelines and use the Service in a lawful and respectful manner.",
      subsections: [
        {
          title: "Prohibited Activities",
          content: "You agree not to engage in: spamming, hacking, distributing malware, harassing other users, or any illegal activities through our platform."
        },
        {
          title: "Content Guidelines",
          content: "User-generated content must not contain hate speech, threats, pornography, or material that infringes on intellectual property rights."
        },
        {
          title: "Respectful Interaction",
          content: "Maintain respectful communication with other users. Do not engage in personal attacks, bullying, or harassment."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Copyright,
      content: "Movian respects intellectual property rights and expects users to do the same.",
      subsections: [
        {
          title: "Our Content",
          content: "All Movian-original content, including logos, design, and platform code, is protected by copyright and trademark laws."
        },
        {
          title: "Third-Party Content",
          content: "Movie titles, posters, trailers, and related content belong to their respective copyright owners. We display this content under fair use principles."
        },
        {
          title: "User Content License",
          content: "By posting content on Movian, you grant us a worldwide, non-exclusive license to display and distribute that content through our Service."
        }
      ]
    },
    {
      id: "service-description",
      title: "Service Description",
      icon: BookOpen,
      content: "Movian is a movie discovery platform that provides information about films and their availability across streaming services.",
      subsections: [
        {
          title: "Metadata Provider",
          content: "We aggregate and display movie information, including plot summaries, cast details, ratings, and streaming availability."
        },
        {
          title: "No Video Hosting",
          content: "Movian does not host, store, or stream video content. We provide links to legitimate streaming platforms where available."
        },
        {
          title: "Information Accuracy",
          content: "While we strive for accuracy, we cannot guarantee that all information is current or complete. Streaming availability changes frequently."
        }
      ]
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      icon: Ban,
      content: "Certain activities are strictly prohibited when using the Movian platform.",
      subsections: [
        {
          title: "Commercial Use",
          content: "You may not use Movian for commercial purposes without our express written permission, including data scraping or reselling our services."
        },
        {
          title: "Automated Access",
          content: "Do not use bots, spiders, or other automated means to access the Service in ways that could harm our infrastructure."
        },
        {
          title: "Legal Compliance",
          content: "You must comply with all applicable laws and regulations while using our Service, including copyright and data protection laws."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination and Suspension",
      icon: Clock,
      content: "We reserve the right to suspend or terminate accounts that violate our terms or engage in harmful activities.",
      subsections: [
        {
          title: "Our Rights",
          content: "We may suspend or terminate your account at our sole discretion for violations of these terms or for any reason that threatens platform security."
        },
        {
          title: "User Termination",
          content: "You may delete your account at any time through your account settings. Account deletion is permanent and cannot be reversed."
        },
        {
          title: "Effect of Termination",
          content: "Upon termination, your right to use the Service ceases immediately, and we may delete your content and data from our systems."
        }
      ]
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      icon: AlertTriangle,
      content: "The Service is provided 'as is' without warranties of any kind, either express or implied.",
      subsections: [
        {
          title: "No Guarantees",
          content: "We do not guarantee that the Service will be uninterrupted, error-free, or completely secure."
        },
        {
          title: "Content Accuracy",
          content: "We are not responsible for the accuracy, completeness, or reliability of movie information provided by third parties."
        },
        {
          title: "Streaming Availability",
          content: "We do not guarantee that movies will be available for streaming on the platforms we list, as availability changes frequently."
        }
      ]
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Scale,
      content: "To the fullest extent permitted by law, Movian shall not be liable for certain damages.",
      subsections: [
        {
          title: "Direct Damages",
          content: "We are not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the Service."
        },
        {
          title: "Maximum Liability",
          content: "Our total liability to you for all claims shall not exceed the amount you have paid us for the Service in the past six months, if any."
        },
        {
          title: "Essential Purpose",
          content: "These limitations apply even if any remedy fails of its essential purpose and form an essential basis of the bargain between us."
        }
      ]
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: Shield,
      content: "You agree to protect Movian from claims and liabilities arising from your use of the Service.",
      subsections: [
        {
          title: "Your Responsibility",
          content: "You agree to indemnify and hold harmless Movian from any claims, damages, or expenses arising from your violation of these terms."
        },
        {
          title: "Legal Defense",
          content: "This includes reasonable attorneys' fees and costs incurred in defending against third-party claims related to your use of the Service."
        }
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Dispute Resolution",
      icon: Scale,
      content: "These terms are governed by specific laws and include provisions for resolving disputes.",
      subsections: [
        {
          title: "Applicable Law",
          content: "These terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions."
        },
        {
          title: "Dispute Resolution",
          content: "Any disputes shall be resolved through binding arbitration in San Francisco, California, rather than in court."
        },
        {
          title: "Class Action Waiver",
          content: "You waive any right to participate in class actions or class-wide arbitrations against Movian."
        }
      ]
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous Provisions",
      icon: FileText,
      content: "Additional legal provisions that govern our relationship and these terms.",
      subsections: [
        {
          title: "Entire Agreement",
          content: "These terms, together with our Privacy Policy, constitute the entire agreement between you and Movian regarding the Service."
        },
        {
          title: "Severability",
          content: "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect."
        },
        {
          title: "No Waiver",
          content: "Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights."
        }
      ]
    }
  ];

  const quickFacts = [
    {
      title: "Last Updated",
      value: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    {
      title: "Effective Date",
      value: "January 1, 2024"
    },
    {
      title: "Version",
      value: "3.0"
    },
    {
      title: "Governing Law",
      value: "California, USA"
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
      title="Terms of Service" 
      description="Legal terms governing your use of Movian's movie discovery platform and related services."
      className="min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <Scale size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using Movian. Your access to and use of the Service is conditioned on your acceptance of these terms.
          </p>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-12"
        >
          {quickFacts.map((fact, index) => (
            <div key={fact.title} className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="text-gray-400 text-sm mb-1">{fact.title}</div>
              <div className="text-red-400 font-semibold text-lg">{fact.value}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-6 lg:space-y-8"
          >
            {/* Important Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Important Legal Notice
                  </h3>
                  <p className="text-yellow-100">
                    These Terms of Service constitute a legally binding agreement between you and Movian. 
                    By accessing or using our platform, you acknowledge that you have read, understood, 
                    and agree to be bound by these terms and our Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6">
              {termsSections.map((section) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-6 text-left hover:bg-gray-700/30 transition-colors duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-red-500/10 rounded-xl">
                        <section.icon size={24} className="text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                          {section.title}
                        </h2>
                        <p className="text-gray-300 text-base lg:text-lg">
                          {section.content}
                        </p>
                      </div>
                    </div>
                    <div className="text-red-400 flex-shrink-0">
                      {openSections[section.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </button>
                  
                  {openSections[section.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-4">
                        {section.subsections.map((subsection, index) => (
                          <div key={index} className="border-l-2 border-red-500 pl-4">
                            <h4 className="font-semibold text-white text-lg mb-2">
                              {subsection.title}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">
                              {subsection.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-gray-300 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Legal Inquiries</div>
                  <a href="mailto:legal@movian.com" className="text-red-400 hover:text-red-300 font-medium">
                    legal@movian.com
                  </a>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">General Support</div>
                  <a href="mailto:support@movian.com" className="text-red-400 hover:text-red-300 font-medium">
                    support@movian.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Key Points */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Key Points</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Must be 16+ to use the service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Respect copyright and community guidelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">No commercial use without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Service provided 'as is' without warranties</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">California law governs these terms</span>
                </li>
              </ul>
            </div>

            {/* Related Documents */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Related Documents</h3>
              <div className="space-y-3">
                <a
                  href="/privacy"
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors group"
                >
                  <span className="text-white text-sm font-medium">Privacy Policy</span>
                  <ExternalLink size={14} className="text-red-400 group-hover:text-red-300 transition-colors" />
                </a>
                <a
                  href="/cookies"
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors group"
                >
                  <span className="text-white text-sm font-medium">Cookie Policy</span>
                  <ExternalLink size={14} className="text-red-400 group-hover:text-red-300 transition-colors" />
                </a>
                <a
                  href="/copyright"
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors group"
                >
                  <span className="text-white text-sm font-medium">Copyright Notice</span>
                  <ExternalLink size={14} className="text-red-400 group-hover:text-red-300 transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/settings/account"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <User size={16} />
                  <span className="text-sm">Account Settings</span>
                </a>
                <a
                  href="/help"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <FileText size={16} />
                  <span className="text-sm">Help Center</span>
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <Mail size={16} />
                  <span className="text-sm">Contact Support</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Notice */}
        <motion.div
          variants={itemVariants}
          className="mt-8 lg:mt-12 text-center"
        >
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-400 text-sm lg:text-base">
              These Terms of Service were last updated on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}. By using Movian, you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default TermsOfService;