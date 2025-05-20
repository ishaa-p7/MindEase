"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Users, Award, Lightbulb, Target, ArrowRight } from "lucide-react"

const AboutPage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

 

  // Values data
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Compassion",
      description:
        "We approach mental health with empathy and understanding, recognizing everyone's journey is unique.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Privacy",
      description:
        "We prioritize your privacy and data security, ensuring a safe space for your mental wellness journey.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "We believe in the power of connection and support networks in improving mental wellbeing.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality",
      description: "We are committed to providing evidence-based tools and resources of the highest quality.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We continuously explore new ways to make mental wellness support more effective and accessible.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Accessibility",
      description:
        "We strive to make mental health resources available to everyone, regardless of background or circumstance.",
    },
  ]

  

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#FFF5F1] to-[#FFE6E2]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE6E2] rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF0EB] rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                About <span className="text-primary">MindEase</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We're on a mission to make mental wellness accessible to everyone through innovative tools, supportive
                community, and evidence-based resources.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
                <p className="text-lg italic text-gray-700">
                  "You don’t have to hit rock bottom to ask for help. Every feeling matters—especially the quiet ones."
                </p>
                <p className="mt-2 text-primary font-medium"> - Isha</p>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/placeholder.svg?height=500&width=600" alt="MindEase team" className="rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">
              The journey that led to creating a platform dedicated to mental wellness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">From Personal Experience to Global Mission</h3>
              <div className="space-y-4 text-gray-700">
                <p>
  MindEase was born from a deeply personal place. During my college years, I witnessed friends and family silently struggling with depression and anxiety—too afraid or unsure to reach out for help.
</p>
<p>
  I saw the toll it took on them and how easily their pain went unnoticed. These experiences sparked a determination in me to create something that could offer daily support and early comfort to anyone dealing with mental health challenges.
</p>
<p>
  With that vision, I began building MindEase—a space where people could track their emotions, feel heard, and know they’re not alone. What started as a simple idea has grown into a mental wellness platform designed to be there when it matters most.
</p>
<p>
  Today,MindEase empowers users across the world to care for their mental health, one day at a time—driven by a mission to make mental wellness accessible, supportive, and stigma-free.
</p>

              </div>
              
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FFE6E2] rounded-lg z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FFF0EB] rounded-lg z-0"></div>
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Our journey"
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     
            

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-[#FF8E7E] to-[#FFAA9D] rounded-xl p-10 text-white shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl leading-relaxed mb-6">
                To empower individuals to take control of their mental wellbeing through accessible tools, supportive
                community, and evidence-based resources.
              </p>
              <p className="text-lg opacity-90">
                We believe that mental wellness should be a daily practice, not just something addressed in times of
                crisis.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-10 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                A world where everyone has the tools and support they need to nurture their mental health, just as they
                would their physical health.
              </p>
              <p className="text-lg text-gray-600">
                We envision mental wellness becoming an integral part of everyday life, free from stigma and accessible
                to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-[#FFF5F1]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Values</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">The core principles that guide everything we do at MindEase</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
                variants={fadeIn}
              >
                <div className="w-16 h-16 rounded-full bg-[#FFE6E2] flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
    </div>
  )
}

export default AboutPage
