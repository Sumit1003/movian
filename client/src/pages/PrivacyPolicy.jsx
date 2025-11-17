import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Database, 
  Cookie, 
  User,
  Mail,
  Lock,
  Trash2,
  Download,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const policySections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      content: `Movian ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our movie discovery platform and related services.`,
      subsections: [
        {
          title: "Scope",
          content: "This policy applies to all users of Movian's website, mobile applications, and related services."
        },
        {
          title: "Consent",
          content: "By using our services, you consent to the data practices described in this policy."
        }
      ]
    },
    {
      id: "data-collection",
      title: "Information We Collect",
      icon: Database,
      content: "We collect information to provide and improve our services, personalize your experience, and communicate with you.",
      subsections: [
        {
          title: "Personal Information",
          content: "When you create an account, we collect your email address, username, and password. This information is essential for account management and security."
        },
        {
          title: "Usage Data",
          content: "We automatically collect information about your interactions with our platform, including movies you view, searches you perform, and features you use."
        },
        {
          title: "Device Information",
          content: "We collect technical information about your device, including IP address, browser type, operating system, and device identifiers for security and analytics purposes."
        },
        {
          title: "Cookies and Tracking",
          content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content."
        }
      ]
    },
    {
      id: "data-usage",
      title: "How We Use Your Information",
      icon: Eye,
      content: "Your information helps us provide, maintain, and improve our services while ensuring a secure and personalized experience.",
      subsections: [
        {
          title: "Service Delivery",
          content: "To provide and maintain our movie discovery platform, including personalized recommendations and watchlist features."
        },
        {
          title: "Communication",
          content: "To send you service-related notifications, updates, security alerts, and support messages."
        },
        {
          title: "Improvements",
          content: "To analyze usage patterns and trends, helping us improve our services and develop new features."
        },
        {
          title: "Security",
          content: "To protect against fraudulent, unauthorized, or illegal activity and maintain the security of our platform."
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      icon: User,
      content: "We are committed to protecting your privacy and only share your information in limited circumstances.",
      subsections: [
        {
          title: "Service Providers",
          content: "We may share information with trusted third-party vendors who help us operate our platform, such as hosting providers and analytics services."
        },
        {
          title: "Legal Requirements",
          content: "We may disclose information if required by law, court order, or governmental authority."
        },
        {
          title: "Business Transfers",
          content: "In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction."
        },
        {
          title: "No Sale of Data",
          content: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: "We implement appropriate technical and organizational measures to protect your personal information.",
      subsections: [
        {
          title: "Encryption",
          content: "We use industry-standard encryption protocols to protect data in transit and at rest."
        },
        {
          title: "Access Controls",
          content: "Strict access controls limit which employees can access user data, and only for legitimate business purposes."
        },
        {
          title: "Regular Audits",
          content: "We conduct regular security assessments and audits to maintain the highest security standards."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights & Choices",
      icon: CheckCircle,
      content: "You have several rights regarding your personal information and how it's used.",
      subsections: [
        {
          title: "Access and Correction",
          content: "You can access and update your personal information through your account settings at any time."
        },
        {
          title: "Data Export",
          content: "You can request a copy of your personal data in a structured, machine-readable format."
        },
        {
          title: "Account Deletion",
          content: "You can delete your account and associated data through your account settings or by contacting us."
        },
        {
          title: "Marketing Communications",
          content: "You can opt-out of promotional communications at any time by using the unsubscribe link in our emails."
        },
        {
          title: "Cookie Preferences",
          content: "You can manage your cookie preferences through your browser settings or our cookie consent tool."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Cookie,
      content: "We use cookies and similar technologies to enhance your browsing experience and analyze platform usage.",
      subsections: [
        {
          title: "Essential Cookies",
          content: "Required for basic platform functionality, such as user authentication and session management."
        },
        {
          title: "Analytics Cookies",
          content: "Help us understand how visitors interact with our platform and identify areas for improvement."
        },
        {
          title: "Preference Cookies",
          content: "Remember your settings and preferences to provide a personalized experience."
        },
        {
          title: "Third-Party Cookies",
          content: "Some third-party services we use may set their own cookies for features like embedded content."
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Trash2,
      content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy.",
      subsections: [
        {
          title: "Account Data",
          content: "We retain your account information for as long as your account is active or as needed to provide services."
        },
        {
          title: "Usage Data",
          content: "Analytics and usage data are typically retained for 24 months to help us improve our services."
        },
        {
          title: "Legal Requirements",
          content: "We may retain certain information as required by law or for legitimate business purposes."
        }
      ]
    },
    {
      id: "international",
      title: "International Data Transfers",
      icon: Download,
      content: "Your information may be transferred to and processed in countries other than your country of residence.",
      subsections: [
        {
          title: "Data Locations",
          content: "We may store and process data in the United States and other countries where our service providers operate."
        },
        {
          title: "Protection Measures",
          content: "We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses."
        }
      ]
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: User,
      content: "Our services are not directed to individuals under the age of 16.",
      subsections: [
        {
          title: "Age Restrictions",
          content: "We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will take steps to delete the information."
        },
        {
          title: "Parental Controls",
          content: "Parents or guardians who believe their child has provided personal information should contact us immediately."
        }
      ]
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: Mail,
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
      subsections: [
        {
          title: "Notification",
          content: "We will notify you of any material changes by posting the updated policy on our platform and updating the \"Last Updated\" date."
        },
        {
          title: "Continued Use",
          content: "Your continued use of our services after changes become effective constitutes acceptance of the updated policy."
        }
      ]
    }
  ];

  const contactInfo = [
    {
      method: "Email",
      details: "privacy@movian.com",
      link: "mailto:privacy@movian.com"
    },
    {
      method: "Response Time",
      details: "Within 48 hours for privacy-related inquiries"
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
      title="Privacy Policy" 
      description="Learn how Movian collects, uses, and protects your personal information while providing our movie discovery services."
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
              <Shield size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is our priority. This policy explains how we protect and manage your personal information.
          </p>
        </motion.div>

        {/* Last Updated & Quick Info */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8 lg:mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <div className="text-2xl font-bold text-red-500 mb-1">Last Updated</div>
              <div className="text-gray-300">{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500 mb-1">Policy Version</div>
              <div className="text-gray-300">2.1</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500 mb-1">Applicable To</div>
              <div className="text-gray-300">All Users & Services</div>
            </div>
          </div>
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
                    Important Notice
                  </h3>
                  <p className="text-yellow-100">
                    This Privacy Policy applies to all Movian services. By using our platform, 
                    you agree to the collection and use of information in accordance with this policy. 
                    We are committed to transparency and giving you control over your personal data.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-6">
              {policySections.map((section) => (
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

            {/* Compliance Notice */}
            <motion.div
              variants={itemVariants}
              className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Compliance & Standards
                  </h3>
                  <p className="text-green-100">
                    Movian complies with global privacy regulations including GDPR, CCPA, and other 
                    applicable data protection laws. We regularly review and update our practices 
                    to maintain the highest standards of data protection and user privacy.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Contact Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail size={20} className="text-red-400" />
                Privacy Inquiries
              </h3>
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <div key={contact.method} className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-b-0">
                    <span className="text-gray-400 text-sm">{contact.method}:</span>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        {contact.details}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-medium">{contact.details}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/settings/privacy"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <User size={16} />
                  <span className="text-sm">Privacy Settings</span>
                </a>
                <a
                  href="/cookies"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <Cookie size={16} />
                  <span className="text-sm">Cookie Preferences</span>
                </a>
                <a
                  href="/help/data-export"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-white"
                >
                  <Download size={16} />
                  <span className="text-sm">Export Your Data</span>
                </a>
              </div>
            </div>

            {/* Related Policies */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Related Policies</h3>
              <div className="space-y-3">
                <a
                  href="/terms"
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors group"
                >
                  <span className="text-white text-sm font-medium">Terms of Service</span>
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

            {/* Key Principles */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Our Privacy Principles</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Transparency in data practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">User control over personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Data minimization and purpose limitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Strong security measures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">No sale of personal information</span>
                </li>
              </ul>
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
              This Privacy Policy is part of our Terms of Service. By using Movian, you agree to both this 
              Privacy Policy and our Terms of Service. If you have any questions about this policy, 
              please contact us at <a href="mailto:privacy@movian.com" className="text-red-400 hover:text-red-300">privacy@movian.com</a>.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default PrivacyPolicy;