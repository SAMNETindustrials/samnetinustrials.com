"use client"

import { Button } from "@/components/ui/button"

interface ServiceBookingButtonProps {
  onOpen?: () => void
}

export function ServiceBookingButton({ onOpen }: ServiceBookingButtonProps) {
  return (
    <Button
      onClick={onOpen}
      className="group relative px-8 py-6 text-lg font-semibold overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
    >
      <span className="relative z-10 flex items-center gap-2">📋 Book a Service</span>
    </Button>
  )
}
