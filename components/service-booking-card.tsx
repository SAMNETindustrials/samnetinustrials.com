"use client"

import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface ServiceBookingCardProps {
  onOpen?: () => void
}

export function ServiceBookingCard({ onOpen }: ServiceBookingCardProps) {
  return (
    <GlassmorphicCard>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-3xl">📋</div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Need Our Services?</h3>
          <p className="text-blue-200">
            Explore our comprehensive range of tech solutions and get in touch with our team to discuss your project
            needs.
          </p>
        </div>
      </div>

      <div className="space-y-3 my-6 text-blue-100">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">✓</span>
          <span>Custom Software Development</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">✓</span>
          <span>IoT & Smart Systems Integration</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">✓</span>
          <span>Quick Consultation & Proposal</span>
        </div>
      </div>

      <Button
        onClick={onOpen}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 cursor-pointer text-white font-semibold py-3"
      >
        <span className="flex items-center justify-center gap-2">
          <Zap className="h-4 w-4" />
          Book a Service Today
        </span>
      </Button>
    </GlassmorphicCard>
  )
}
