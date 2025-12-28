"use client"

import QRCode from "qrcode"
import { useEffect, useRef } from "react"
import type { Staff } from "./staff-management"
import { Card } from "@/components/ui/card"

interface StaffIDCardProps {
  staff: Staff
}

export function StaffIDCard({ staff }: StaffIDCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      // Generate QR code with staff ID and email
      QRCode.toCanvas(
        canvasRef.current,
        JSON.stringify({
          id: staff.id,
          name: staff.name,
          email: staff.email,
        }),
        {
          width: 120,
          color: { dark: "#1e3a5f", light: "#ffffff" },
        },
      )
    }
  }, [staff])

  return (
    <div className="no-print space-y-4">
      <Card className="w-full max-w-md mx-auto">
        {/* ID Card Front */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-lg aspect-video flex flex-col justify-between relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm">SAMNET INDUSTRIALS</h3>
                <p className="text-xs opacity-90">Staff ID Card</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <span className="text-xs font-bold">S</span>
              </div>
            </div>

            {/* Middle content */}
            <div className="space-y-2">
              <div>
                <p className="text-xs opacity-75">Name</p>
                <p className="font-bold text-base">{staff.name}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs opacity-75">ID</p>
                  <p className="font-mono text-sm font-bold">{staff.id}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs opacity-75">Department</p>
                  <p className="text-xs font-medium">{staff.department}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-white/30 flex items-center justify-between">
              <div className="text-xs">
                <p className="opacity-75">Designation</p>
                <p className="font-semibold">{staff.designation}</p>
              </div>
              <canvas ref={canvasRef} className="w-16 h-16 bg-white/90 rounded p-1"></canvas>
            </div>
          </div>
        </div>

        {/* ID Card Back */}
        <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white p-6 rounded-lg mt-4 aspect-video flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm mb-3">Contact Information</h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="opacity-75">Email</p>
                <p className="font-mono text-sm break-all">{staff.email}</p>
              </div>
              <div>
                <p className="opacity-75">Phone</p>
                <p className="font-mono text-sm">{staff.phone || "N/A"}</p>
              </div>
              <div>
                <p className="opacity-75">Joining Date</p>
                <p className="text-sm">{new Date(staff.joiningDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="text-xs opacity-75 text-center border-t border-white/30 pt-2">
            <p>This card is the property of SAMNET Industrials</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
