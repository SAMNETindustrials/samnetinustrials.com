"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  type: "user" | "bot"
  text: string
  timestamp: Date
}

const BOT_RESPONSES: { [key: string]: string } = {
  hello: "Hello! Welcome to SAMNET Industrials. How can I help you today?",
  services:
    "We offer Software Development, IoT Solutions, Smart Gadgets, Manufacturing, Security & CCTV, and Digital Innovation services.",
  training:
    "Our Training Hub offers courses in Software Development, Web Development, Mobile Apps, UI/UX Design, CAD, Robotics, IoT, 3D Printing, Security Tech, and Creative Design.",
  scholarship:
    "Yes! We offer merit-based and need-based scholarships for deserving students. Learn more in our Training Hub section.",
  contact:
    "You can reach us at info@samnetindustrials.com or call +1 (555) 123-4567. Business hours: Mon-Fri, 9AM-6PM.",
  about:
    "SAMNET Industrials is a leading tech company with 10+ years of excellence, 500+ completed projects, and 1000+ trained professionals.",
  default:
    "That's interesting! Could you tell me more or ask about our services, training programs, scholarships, or how to contact us?",
}

const KEYWORDS: { [key: string]: string[] } = {
  hello: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
  services: ["services", "what do you offer", "solutions", "products", "offerings"],
  training: ["training", "courses", "learn", "education", "programs", "hub"],
  scholarship: ["scholarship", "grant", "financial aid", "funding", "support"],
  contact: ["contact", "phone", "email", "reach", "call", "address"],
  about: ["about", "who are you", "company", "history", "background", "experience"],
}

function matchUserInput(input: string): string {
  const lowerInput = input.toLowerCase()

  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some((keyword) => lowerInput.includes(keyword))) {
      return BOT_RESPONSES[key]
    }
  }

  return BOT_RESPONSES.default
}

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOverClickable, setIsOverClickable] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi there! 👋 I'm SAMNET's AI Assistant. Ask me about our services, training programs, or anything else!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      setRotation((prev) => (prev + 1) % 360)

      const element = document.elementFromPoint(e.clientX, e.clientY)
      const clickableSelectors = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        '[role="button"]',
        '[role="link"]',
        "[onclick]",
      ]
      const isClickable = clickableSelectors.some(
        (selector) => element?.matches(selector) || element?.closest(selector),
      )
      setIsOverClickable(!!isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: matchUserInput(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFollowerClick = () => {
    if (!isOverClickable) {
      setIsChatOpen(!isChatOpen)
      setIsMinimized(false)
    }
  }

  return (
    <>
      {/* Rotating Mouse Follower Circle */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full z-50 mix-blend-screen transition-cursor ${
          isOverClickable ? "pointer-events-none" : "pointer-events-auto cursor-pointer"
        }`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 1 : 0,
          rotate: rotation,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        style={{
          border: "2px solid rgba(0, 200, 255, 0.6)",
          boxShadow: "0 0 10px rgba(0, 200, 255, 0.4)",
        }}
        onClick={handleFollowerClick}
      >
        <div className="w-full h-full rounded-full"></div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          opacity: isVisible ? 1 : 0,
        }}
        style={{
          boxShadow: "0 0 8px rgba(0, 200, 255, 0.8)",
        }}
      />

      {/* Chat Window - integrated from homepage-chatbot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 transition-all duration-300"
            style={{
              height: isMinimized ? "56px" : "600px",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">SAMNET Assistant</h3>
                    <p className="text-xs text-blue-100">Always here to help</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4 text-white" />
                    ) : (
                      <Minimize2 className="h-4 w-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none"
                              : "bg-slate-800 text-blue-100 border border-blue-500/30 rounded-bl-none"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-blue-500/30 p-4 flex gap-2 flex-shrink-0">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-slate-800 border border-blue-500/30 rounded-lg px-3 py-2 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
