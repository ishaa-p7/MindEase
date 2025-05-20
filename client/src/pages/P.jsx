"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react"

const P= () => {
  // Last updated date
  const lastUpdated = "May 21, 2024"

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div>
      {/* Header Section */}
      <section className="relative py-12 bg-gradient-to-r from-[#FFF5F1] to-[#FFE6E2] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE6E2] rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF0EB] rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-700 mb-2">MindEase Mental Wellness App</p>
            <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Introduction</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>
                  Welcome to MindEase. This Privacy Policy explains how we collect, use, and protect your information
                  when you use our mental wellness application.
                </p>
                <p>
                  MindEase is owned and operated by Isha, based in India. We are committed to protecting your privacy
                  and complying with applicable Indian laws, including the Information Technology Act, 2000 and the
                  Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                  Information) Rules, 2011.
                </p>
                <p>
                  By using the MindEase app, you consent to the data practices described in this policy. If you do not
                  agree with our policies, please do not use our app.
                </p>
              </div>
            </motion.div>

            {/* Information Collection */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Information We Collect</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>We collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, and profile details you provide when
                    creating an account.
                  </li>
                  <li>
                    <strong>Mental Wellness Data:</strong> Mood entries, journal content, and responses to wellness
                    assessments that you voluntarily provide.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Device type, operating system, and app usage data to improve
                    your experience.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Information Use */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">How We Use Your Information</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve the MindEase app and its features</li>
                  <li>Personalize your experience and deliver content relevant to your needs</li>
                  <li>Send you important notifications about your account or the app</li>
                  <li>Monitor app usage to improve functionality and user experience</li>
                </ul>
                <p>
                  <strong>We do not sell your personal information to third parties under any circumstances.</strong>
                </p>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Data Security</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>
                  We implement industry-standard security measures to protect your information from unauthorized access,
                  alteration, disclosure, or destruction.
                </p>
                <p>
                  These measures include encryption, secure servers, and regular security assessments, in compliance
                  with Indian data protection regulations.
                </p>
                <p>
                  While we strive to protect your personal information, no method of electronic transmission or storage
                  is 100% secure. We cannot guarantee absolute security of your data.
                </p>
              </div>
            </motion.div>

            {/* Data Sharing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Data Sharing and Disclosure</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>We may share your information in the following limited circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party service providers who help us operate
                    and improve the MindEase app (cloud storage, analytics, etc.).
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law, such as in response to a legal process or
                    government request in accordance with Indian regulations.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly authorize us to share your information.
                  </li>
                </ul>
                <p>
                  All service providers are contractually obligated to use your information only for providing services
                  to MindEase and must maintain confidentiality.
                </p>
              </div>
            </motion.div>

            {/* User Rights */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Your Rights</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>As a MindEase user, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, you can use the features within the app or contact us at the email address
                  provided below.
                </p>
              </div>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFE6E2] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Changes to This Policy</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  Significant changes will be notified through an in-app notification or via the email associated with
                  your account.
                </p>
                <p>
                  Your continued use of MindEase after such modifications will constitute your acknowledgment of the
                  modified policy.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-[#FF8E7E] to-[#FFAA9D] rounded-xl shadow-lg p-6 mb-6 text-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Contact Us</h2>
              </div>
              <div className="space-y-3">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="font-medium">
                  <strong>MindEase</strong>
                  <br />
                  Attention: Isha
                  <br />
                  Email: ishaa3603@gmail.com
                  <br />
                </p>
                <p>We will respond to your inquiry as soon as possible, typically within 7 business days.</p>
              </div>
            </motion.div>

            {/* Acceptance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your Acceptance</h2>
              <div className="text-gray-700 text-center">
                <p>
                  By using the MindEase app, you signify your acceptance of this Privacy Policy. If you do not agree
                  with this policy, please do not use our app.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default P
