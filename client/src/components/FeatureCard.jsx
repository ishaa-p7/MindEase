"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const FeatureCard = ({ id, title, description, icon, color, href, animated = false }) => {
  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const iconContainerVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const arrowVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const CardComponent = animated ? motion.div : "div"
  const props = animated
    ? {
        variants: cardVariants,
        whileHover: "hover",
        initial: "initial",
        className: `${color} rounded-2xl p-8 h-full shadow-lg transition-all duration-300 border border-transparent hover:border-[#FF8E7E]/20 overflow-hidden relative`,
      }
    : {
        className: `${color} rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#FF8E7E]/20 overflow-hidden relative`,
      }

  return (
    <Link to={href || `/${id}`}>
      <CardComponent {...props}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#FF8E7E] opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10">
          {animated ? (
            <motion.div
              variants={iconContainerVariants}
              className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-md mb-6"
            >
              {icon}
            </motion.div>
          ) : (
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-md mb-6">{icon}</div>
          )}

          <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

          <div className="flex items-center text-[#FF8E7E] font-medium">
            <span>Learn more</span>
            {animated ? (
              <motion.div variants={arrowVariants} className="ml-2">
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            ) : (
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </div>
      </CardComponent>
    </Link>
  )
}

export default FeatureCard
