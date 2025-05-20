"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  MessageSquare,
  HelpCircle,
  Smile,
  Music,
  Users,
  BrainCircuit,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import FeatureCard from "../components/FeatureCard"
import { Link } from 'react-router-dom';



const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const features = [
    {
      id: "mood-tracker",
      title: "Mood Tracker",
      description: "Track your daily moods and emotions to identify patterns and improve well-being.",
      icon: <Heart className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
      href: "/mood-tracker",
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Talk to our AI assistant for emotional support and mental health guidance anytime.",
      icon: <MessageSquare className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
      href: "/chatbot",
    },
    {
      id: "quiz",
      title: "Mental Health Quiz",
      description: "Take our quizzes to learn more about yourself and your mental health needs.",
      icon: <BrainCircuit className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
      href: "/quiz",
    },
    {
      id: "support",
      title: "Help Support",
      description: "Access resources and professional help when you need it most.",
      icon: <HelpCircle className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
      href: "/help",
    },
    {
      id: "memes",
      title: "Meme Generator",
      description: "Create and share funny memes to brighten your day and others'.",
      icon: <Smile className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
      href: "meme-generator",
    },
    {
      id: "relax",
      title: "Relax",
      description: "Guided meditations, breathing exercises, and calming sounds to help you relax.",
      icon: <Music className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
      href: "relax",
    },
    {
      id: "groups",
      title: "Support Groups",
      description: "Connect with others facing similar challenges in a safe, supportive environment.",
      icon: <Users className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
      href: "groups",
    },
  ]

  const howItWorks = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your free account to access all features and start your wellness journey.",
      icon: <CheckCircle className="h-8 w-8 text-[#FF8E7E]" />,
    },
    {
      id: 2,
      title: "Track Your Mood",
      description: "Log your daily emotions to identify patterns and triggers over time.",
      icon: <CheckCircle className="h-8 w-8 text-[#FF8E7E]" />,
    },
    {
      id: 3,
      title: "Get Support",
      description: "Use our AI chatbot or join support groups for guidance and connection.",
      icon: <CheckCircle className="h-8 w-8 text-[#FF8E7E]" />,
    },
    {
      id: 4,
      title: "Practice Self-Care",
      description: "Explore relaxation techniques and fun activities to boost your mood.",
      icon: <CheckCircle className="h-8 w-8 text-[#FF8E7E]" />,
    },
  ]



  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE6E2] rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF0EB] rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Your Mental <span className="text-[#FF8E7E]">Wellness</span> Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Take care of your mind with our comprehensive tools designed to support your mental health and well-being.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/sign-up">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-[#FF8E7E]/20"
  >
    Get Started Free
  </motion.button>
</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#FF8E7E] hover:bg-gray-50 px-8 py-4 rounded-full font-medium transition-colors border-2 border-[#FF8E7E] shadow-lg"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#FFE6E2] rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#FFF0EB] rounded-full z-0"></div>

            <div className="relative z-10 bg-gradient-to-br from-[#FF8E7E] to-[#FFAA9D] rounded-3xl p-10 md:p-14 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

              <div className="flex flex-col md:flex-row items-center relative z-10">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Begin Your Wellness Journey Today
                  </h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                    Our app provides tools and resources to help you understand and improve your mental health, one step
                    at a time.
                  </p>
                  <Link to="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#FF8E7E] hover:bg-gray-100 px-8 py-4 rounded-full font-medium transition-colors shadow-xl flex items-center"
                  >
                    Start Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                  </Link>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Mental wellness illustration"
                    className="rounded-2xl max-w-full h-auto shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#FFF5F1]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Comprehensive Tools for Your Mental Wellness
            </h2>
            <p className="text-xl text-gray-600">
              Explore our range of features designed to support every aspect of your mental health journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.id} variants={itemVariants} custom={index}>
                <FeatureCard
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                  href={feature.href}
                  animated={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFE6E2] rounded-full filter blur-3xl opacity-30 transform translate-x-1/2"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#FFF0EB] rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">
              Our simple process helps you improve your mental wellness in just a few steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFE6E2] via-[#FF8E7E] to-[#FFE6E2] transform -translate-y-1/2 z-0"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            >
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#FFE6E2] rounded-full opacity-30 animate-pulse"></div>
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-md relative z-10">
                      {step.icon}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF8E7E] rounded-full flex items-center justify-center text-white font-bold">
                        {step.id}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

     

    </div>
  )
}

export default HomePage
