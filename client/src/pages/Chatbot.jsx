"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your mental wellness assistant. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I understand how you're feeling. Would you like to talk more about it?",
        "Thank you for sharing. What do you think triggered these feelings?",
        "That's completely valid. Have you tried any coping strategies that helped before?",
        "I'm here to support you. Would you like some mindfulness exercises to try?",
        "It sounds like you're going through a lot. Remember to be kind to yourself.",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Chatbot</h1>
        <p className="text-gray-600 mb-8">
          Talk to our AI assistant for emotional support and mental health guidance anytime. Your conversations are
          private and secure.
        </p>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#FF8E7E] text-white p-4">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Wellness Assistant</h2>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 bg-[#FFF5F1]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-[#FF8E7E] text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === "bot" ? <Bot className="h-4 w-4 mr-1" /> : <User className="h-4 w-4 mr-1" />}
                    <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
              />
              <button
                type="submit"
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Our AI Chatbot</h3>
          <p className="text-gray-600 mb-4">
            Our AI chatbot is designed to provide emotional support and guidance for your mental wellness journey. While
            it's not a replacement for professional therapy, it can help you:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Process your thoughts and feelings in a safe space</li>
            <li>Learn coping strategies for stress, anxiety, and low mood</li>
            <li>Practice mindfulness and relaxation techniques</li>
            <li>Get recommendations for self-care activities</li>
            <li>Find resources for additional support when needed</li>
          </ul>
          <div className="mt-6 p-4 bg-[#FFF0EB] rounded-lg border border-[#FFE6E2]">
            <p className="text-gray-700 font-medium">
              Note: In case of emergency or crisis, please contact a mental health professional or call your local
              emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage
