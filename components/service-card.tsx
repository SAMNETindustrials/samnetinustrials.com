"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  onBook?: () => void
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-blue-900/40 backdrop-blur-sm border border-blue-700/30 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-blue-900/60 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
          <p className="text-blue-200 leading-relaxed">{description}</p>
          <div className="mt-4">
            <Button
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-500 border-0"
              onClick={onBook}
            >
              Book a Service
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
