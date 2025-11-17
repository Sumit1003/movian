import React from "react";
import PageLayout from "../components/PageLayout";

const CookiePolicy = () => {
  return (
    <PageLayout title="Cookie Policy">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Introduction */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-lg text-gray-300 leading-relaxed">
            Movian uses cookies and similar technologies to enhance your user experience, 
            track performance, personalize content, and provide essential functionality.
          </p>
        </div>

        {/* What are Cookies */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">What Are Cookies?</h2>
          <p className="text-gray-300 mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us understand how you interact with our service and remember your preferences.
          </p>
        </section>

        {/* Types of Cookies We Use */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-white mb-2">Essential Cookies</h3>
              <p className="text-gray-300 text-sm">
                Required for basic website functionality. These cannot be disabled as they are necessary for the website to work properly.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-white mb-2">Performance Cookies</h3>
              <p className="text-gray-300 text-sm">
                Help us understand how visitors interact with our website, allowing us to improve performance and user experience.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-white mb-2">Functional Cookies</h3>
              <p className="text-gray-300 text-sm">
                Enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-white mb-2">Targeting Cookies</h3>
              <p className="text-gray-300 text-sm">
                Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Cookie Management */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Managing Your Cookie Preferences</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              You have full control over your cookie preferences. Here's how you can manage them:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Browser Settings</h3>
                <p className="text-gray-300 text-sm">
                  Most web browsers allow you to control cookies through their settings preferences. 
                  You can usually find these settings in the "Options" or "Preferences" menu of your browser.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Opt-Out Tools</h3>
                <p className="text-gray-300 text-sm">
                  Various third-party tools are available to help you manage tracking technologies and opt out of certain types of cookies.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> Disabling certain cookies may affect the functionality and performance of our website. 
                Some features may not work properly if essential cookies are disabled.
              </p>
            </div>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-300 mb-4">
            We may also use cookies from trusted third-party partners for analytics, advertising, 
            and social media integration. These third parties have their own privacy policies and cookie policies.
          </p>
        </section>

        {/* Updates to Policy */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Updates to This Policy</h2>
          <p className="text-gray-300">
            We may update this Cookie Policy from time to time to reflect changes in technology, 
            regulation, or our services. We encourage you to periodically review this page for the latest information.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about our use of cookies or this Cookie Policy, 
            please contact us at{" "}
            <a href="mailto:privacy@movian.com" className="text-red-400 hover:text-red-300 transition-colors">
              privacy@movian.com
            </a>
          </p>
        </section>

        {/* Last Updated */}
        <div className="bg-gray-800/30 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default CookiePolicy;