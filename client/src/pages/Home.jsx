import FeatureCard from "../components/FeatureCard"
import { Heart, MessageSquare, HelpCircle, Smile, Music, Users, BrainCircuit, Star, CheckCircle } from "lucide-react"

const Home = () => {
  const features = [
    {
      id: "mood-tracker",
      title: "Mood Tracker",
      description: "Track your daily moods and emotions to identify patterns and improve well-being.",
      icon: <Heart className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Talk to our AI assistant for emotional support and mental health guidance anytime.",
      icon: <MessageSquare className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
    },
    {
      id: "quiz",
      title: "Mental Health Quiz",
      description: "Take our quizzes to learn more about yourself and your mental health needs.",
      icon: <BrainCircuit className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
    },
    {
      id: "support",
      title: "Help Support",
      description: "Access resources and professional help when you need it most.",
      icon: <HelpCircle className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
    },
    {
      id: "memes",
      title: "Meme Generator",
      description: "Create and share funny memes to brighten your day and others'.",
      icon: <Smile className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
    },
    {
      id: "relax",
      title: "Relax",
      description: "Guided meditations, breathing exercises, and calming sounds to help you relax.",
      icon: <Music className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFF0EB]",
    },
    {
      id: "groups",
      title: "Support Groups",
      description: "Connect with others facing similar challenges in a safe, supportive environment.",
      icon: <Users className="h-12 w-12 text-[#FF8E7E]" />,
      color: "bg-[#FFE6E2]",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Teacher",
      content:
        "MindWell has completely transformed how I manage stress. The mood tracker helped me identify triggers I wasn't even aware of!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      content:
        "The AI chatbot is available whenever I need someone to talk to. It's been a game-changer for my late-night anxiety.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Healthcare Worker",
      content:
        "After a long day at the hospital, the relaxation exercises help me unwind. I've recommended MindWell to all my colleagues.",
      rating: 4,
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

  const faqs = [
    {
      id: 1,
      question: "Is my data private and secure?",
      answer:
        "Yes, we take privacy seriously. All your personal data is encrypted and never shared with third parties without your explicit consent.",
    },
    {
      id: 2,
      question: "Can I use MindWell for free?",
      answer:
        "MindWell offers a free basic plan with limited features. Premium features are available with a subscription plan starting at $4.99/month.",
    },
    {
      id: 3,
      question: "Is the AI chatbot a replacement for therapy?",
      answer:
        "No, our AI chatbot provides support and guidance but is not a substitute for professional mental health care. We encourage seeking professional help when needed.",
    },
    {
      id: 4,
      question: "How often should I track my mood?",
      answer:
        "For best results, we recommend tracking your mood daily. However, any consistent schedule that works for you will provide valuable insights.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Mental Wellness Journey</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take care of your mind with our comprehensive tools designed to support your mental health.
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#FF8E7E] to-[#FFAA9D] rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
              <p className="text-lg mb-6">
                Our app provides tools and resources to help you understand and improve your mental health.
              </p>
              <button className="bg-white text-[#FF8E7E] hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Mental wellness illustration"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-20 py-16 bg-[#FFF5F1] rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => (
              <div key={step.id} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-6 border-b border-gray-200 pb-6 last:border-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12">
        <div className="bg-[#FFE6E2] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Start Your Wellness Journey?</h2>
          <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who have improved their mental well-being with MindWell.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-8 py-3 rounded-full font-medium transition-colors">
              Sign Up Free
            </button>
            <button className="bg-white text-[#FF8E7E] hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors border border-[#FF8E7E]">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
