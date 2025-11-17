import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Copyright as CopyrightIcon, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  BookOpen,
  Mail,
  Scale
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      icon: CopyrightIcon,
      title: "Copyright Ownership",
      content: "All movie titles, posters, trailers, artwork, logos, and other intellectual property displayed on Movian are the exclusive property of their respective copyright owners, including but not limited to production studios, distributors, and content creators."
    },
    {
      icon: Shield,
      title: "Content Usage",
      content: "Movian functions as a metadata aggregator and does not host, store, or stream any video content. All media information, including plot summaries, cast details, and ratings, is provided for informational purposes under fair use principles."
    },
    {
      icon: AlertTriangle,
      title: "Trademark Notice",
      content: "All trademarks, service marks, trade names, and logos displayed on this platform are the property of their respective owners. Use of these marks does not imply endorsement or affiliation with Movian."
    },
    {
      icon: FileText,
      title: "DMCA Compliance",
      content: "Movian respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (DMCA). If you believe your copyright has been infringed, please contact our designated agent."
    }
  ];

  const legalPolicies = [
    {
      title: "Digital Millennium Copyright Act",
      description: "Our DMCA takedown procedure and agent information",
      link: "/dmca-policy"
    },
    {
      title: "Terms of Service",
      description: "Complete terms governing your use of Movian",
      link: "/terms"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your information",
      link: "/privacy"
    },
    {
      title: "Cookie Policy",
      description: "Information about our use of cookies and tracking",
      link: "/cookies"
    }
  ];

  const contactInfo = [
    {
      method: "Email",
      details: "legal@movian.com",
      link: "mailto:legal@movian.com"
    },
    {
      method: "Response Time",
      details: "Within 48 hours for copyright matters"
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
      title="Copyright Notice" 
      description="Important information about copyright, intellectual property, and legal compliance on Movian."
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
              <CopyrightIcon size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Copyright Notice
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Protecting intellectual property rights and ensuring legal compliance
          </p>
        </motion.div>

        {/* Important Notice Banner */}
        <motion.div
          variants={itemVariants}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 lg:p-6 mb-8 lg:mb-12"
        >
          <div className="flex items-start gap-3 lg:gap-4">
            <AlertTriangle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                Important Legal Notice
              </h3>
              <p className="text-yellow-100 text-sm lg:text-base">
                Movian is a movie information and discovery platform. We do not host or distribute 
                copyrighted content. All media rights belong to their respective owners.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            {/* Copyright Sections */}
            <div className="space-y-6 lg:space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-gray-700/50"
                >
                  <div className="flex items-start gap-4 lg:gap-6">
                    <div className="p-3 bg-red-500/10 rounded-xl flex-shrink-0">
                      <section.icon size={24} className="text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
                        {section.title}
                      </h3>
                      <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fair Use Explanation */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4 lg:gap-6">
                <BookOpen size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
                    Fair Use Doctrine
                  </h3>
                  <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-4">
                    Movian operates under the fair use doctrine, which allows for limited use of 
                    copyrighted material without permission for purposes such as criticism, comment, 
                    news reporting, teaching, scholarship, and research.
                  </p>
                  <ul className="text-blue-100 text-sm lg:text-base space-y-2 list-disc list-inside">
                    <li>Our use is transformative and adds new expression or meaning</li>
                    <li>We use only small, necessary portions of the work</li>
                    <li>Our service does not negatively impact the market for the original work</li>
                    <li>We provide attribution to copyright holders where possible</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail size={20} className="text-red-400" />
                Copyright Inquiries
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

            {/* Related Policies */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Scale size={20} className="text-red-400" />
                Related Policies
              </h3>
              <div className="space-y-3">
                {legalPolicies.map((policy, index) => (
                  <a
                    key={policy.title}
                    href={policy.link}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm group-hover:text-red-400 transition-colors truncate">
                        {policy.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">
                        {policy.description}
                      </p>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-red-400 transition-colors flex-shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">
                Key Points
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Metadata only - no video hosting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Respects all copyright laws</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">DMCA compliant procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-300">Prompt response to claims</span>
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
              © {currentYear} Movian. All rights reserved. This copyright notice is subject to 
              change without prior notification. Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Copyright;