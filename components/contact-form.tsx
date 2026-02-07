"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-sonner"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-blue-900/50 backdrop-blur-sm border border-blue-700/50 p-6 transition-all duration-300 hover:border-cyan-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200" />

        <div className="relative">
          <h3 className="mb-6 text-2xl font-bold">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Your Name"
              required
              className="bg-blue-950/50 border-blue-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            />

            <Input
              type="email"
              placeholder="Your Email"
              required
              className="bg-blue-950/50 border-blue-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            />

            <Input
              placeholder="Subject"
              required
              className="bg-blue-950/50 border-blue-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            />

            <Textarea
              placeholder="Your Message"
              rows={5}
              required
              className="bg-blue-950/50 border-blue-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
