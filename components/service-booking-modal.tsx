"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Phone, Mail, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceBooking {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  serviceType: string
  description: string
  preferredDate: string
  preferredTime: string
  budget: string
  additionalInfo: string
  status: "new"
  submittedAt: Date
}

interface ServiceBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ServiceBookingModal({ isOpen, onClose }: ServiceBookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    budget: "",
    additionalInfo: "",
  })

  const services = [
    "Software Development & Consultation",
    "Mobile Apllication",
    "Web Development",
    "IoT & Smart Systems",
    "UI/UX, Product Designs & Branding",
    "Manufacturing",
    "Security & CCTV",
    "Engineering Designs",
    "3D Printing Technology",
    "Data Science & Analytics",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem("serviceBookings") || "[]")
    const newBooking: ServiceBooking = {
      id: Date.now().toString(),
      ...formData,
      status: "new",
      submittedAt: new Date(),
    }
    bookings.push(newBooking)
    localStorage.setItem("serviceBookings", JSON.stringify(bookings))

    // Reset form and close
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      serviceType: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
      budget: "",
      additionalInfo: "",
    })
    setStep(1)
    onClose()

    // Show success message
    alert("Service booking submitted successfully! Our team will contact you soon.")
  }

  const isStep1Valid = formData.companyName && formData.contactName && formData.email && formData.phone
  const isStep2Valid = formData.serviceType && formData.description
  const isStep3Valid = formData.preferredDate && formData.preferredTime && formData.budget

  const canProceedStep1 = isStep1Valid
  const canProceedStep2 = isStep2Valid
  const canProceedStep3 = isStep3Valid

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-blue-500/30 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6 flex items-center justify-between border-b border-blue-400/20 z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">Book Our Services</h2>
                <p className="text-sm text-blue-100 mt-1">Transform your business with SAMNET Industrials tech solutions</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 pt-6 flex gap-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= num
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-slate-700 text-blue-300"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && <div className={`flex-1 h-0.5 ${step > num ? "bg-cyan-500" : "bg-slate-700"}`} />}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-lg font-semibold text-cyan-300">Your Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Contact Person</label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-cyan-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-lg font-semibold text-cyan-300">Service Details</h3>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Select Service</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-cyan-400" />
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project requirements, goals, and any specific needs..."
                      rows={5}
                      className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Schedule & Budget */}
              {step === 3 && (
                <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-lg font-semibold text-cyan-300">Schedule & Budget</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Preferred Time</label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select budget range...</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Any other details you'd like us to know? (Optional)"
                      rows={4}
                      className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-blue-500/30 bg-slate-900/80 backdrop-blur px-6 py-4 flex gap-3 justify-end z-20">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-blue-400/50 cursor-pointer"
                >
                  Previous
                </Button>
              )}

              {step < 3 ? (
                <Button
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-white cursor-pointer transition-all"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedStep3}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-white flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-4 w-4" />
                  Submit Booking
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
