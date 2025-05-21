"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import axios from "axios"

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
  const [isLoading, setIsLoading] = useState(false)

  // No auto-scrolling - user controls the scroll position
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current && chatContainerRef.current) {
      // Scroll only the chat container, not the whole page
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (input.trim() === "" || isLoading) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Call the backend API
      const response = await axios.post("http://localhost:3000/api/chatbot", {
        prompt: userInput,
      })

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
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

          <div className="h-[400px] overflow-y-auto p-4 bg-[#FFF5F1]" ref={chatContainerRef}>
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

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex items-center mb-1">
                    <Bot className="h-4 w-4 mr-1" />
                    <span className="text-xs opacity-75">{formatTime(new Date())}</span>
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 bg-[#FF8E7E] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#FF8E7E] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#FF8E7E] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

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
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`${
                  isLoading ? "bg-gray-400" : "bg-[#FF8E7E] hover:bg-[#FF7A68]"
                } text-white px-4 py-2 rounded-r-lg transition-colors`}
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Our AI Chatbot</h3>
          <p className="text-gray-600 mb-4">
            Our AI chatbot is powered by Groq's LLaMA 3 model and is designed to provide emotional support and guidance
            for your mental wellness journey. While it's not a replacement for professional therapy, it can help you:
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
