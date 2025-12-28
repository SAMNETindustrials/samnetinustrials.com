"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Phone, Video, Paperclip, Smile, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  sender: string
  senderRole: string
  content: string
  timestamp: string
  attachments?: string[]
  avatar: string
}

interface Conversation {
  id: string
  name: string
  participants: string[]
  type: "direct" | "group" | "channel"
  messages: Message[]
  avatar: string
}

export function CommunicationHub({ userRole }: { userRole: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedConversations = localStorage.getItem("samnet_conversations")
    if (savedConversations) {
      const convos = JSON.parse(savedConversations)
      setConversations(convos)
      if (convos.length > 0) setSelectedConversation(convos[0])
    } else {
      const defaultConversations: Conversation[] = [
        {
          id: "1",
          name: "SAMNET Team",
          participants: ["admin", "staff", "accountant"],
          type: "group",
          avatar: "S",
          messages: [
            {
              id: "m1",
              sender: "Admin",
              senderRole: "admin",
              content: "Welcome to SAMNET team communication hub!",
              timestamp: new Date().toISOString(),
              avatar: "A",
            },
          ],
        },
        {
          id: "2",
          name: "HR Department",
          participants: ["admin", "staff"],
          type: "channel",
          avatar: "HR",
          messages: [
            {
              id: "m1",
              sender: "Admin",
              senderRole: "admin",
              content: "HR updates and announcements posted here",
              timestamp: new Date().toISOString(),
              avatar: "A",
            },
          ],
        },
      ]
      setConversations(defaultConversations)
      setSelectedConversation(defaultConversations[0])
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "You",
      senderRole: userRole,
      content: message,
      timestamp: new Date().toISOString(),
      avatar: userRole.charAt(0).toUpperCase(),
    }

    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedConversation.id ? { ...conv, messages: [...conv.messages, newMessage] } : conv,
    )

    setConversations(updatedConversations)
    localStorage.setItem("samnet_conversations", JSON.stringify(updatedConversations))
    setSelectedConversation(updatedConversations.find((c) => c.id === selectedConversation.id) || null)
    setMessage("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-[calc(100vh-120px)] bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-slate-700 flex flex-col bg-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-white font-bold mb-4">Messages</h2>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full px-4 py-3 text-left border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${
                selectedConversation?.id === conv.id ? "bg-slate-700 border-l-2 border-l-cyan-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{conv.name}</p>
                  <p className="text-slate-400 text-xs truncate">
                    {conv.messages[conv.messages.length - 1]?.content || "No messages"}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    conv.type === "channel" ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"
                  }`}
                >
                  {conv.type === "channel" ? "Channel" : "Chat"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800">
            <div>
              <h3 className="text-white font-bold">{selectedConversation.name}</h3>
              <p className="text-slate-400 text-sm">{selectedConversation.participants.length} participants</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <Phone size={18} />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <Video size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-900">
            {selectedConversation.messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.senderRole === userRole ? "flex-row-reverse" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className={`flex-1 ${msg.senderRole === userRole ? "text-right" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className={`text-sm font-medium ${
                        msg.senderRole === userRole ? "text-slate-300 order-2" : "text-white"
                      }`}
                    >
                      {msg.sender}
                    </p>
                    <p className="text-xs text-slate-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.senderRole === userRole
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-slate-700 text-slate-100"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-slate-700 bg-slate-800">
            <div className="flex items-end gap-3">
              <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <Paperclip size={18} />
              </Button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <Smile size={18} />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <p>Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  )
}
