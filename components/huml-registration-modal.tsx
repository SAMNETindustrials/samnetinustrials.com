"use client"

import React from "react"

import { useState } from "react"
import { X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HuMLRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HuMLRegistrationModal({ isOpen, onClose }: HuMLRegistrationModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "Model (Learner)",
    experience: "",
    goals: "",
    availability: "Full-time",
    agree: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agree: e.target.checked }))
  }

  const handleSubmit = () => {
    if (step === 1) {
      if (formData.fullName && formData.email && formData.phone) {
        setStep(2)
      }
    } else if (step === 2) {
      if (formData.goals && formData.agree) {
        // Save to localStorage
        const registrations = JSON.parse(localStorage.getItem("humlRegistrations") || "[]")
        registrations.push({
          ...formData,
          submittedAt: new Date().toISOString(),
        })
        localStorage.setItem("humlRegistrations", JSON.stringify(registrations))
        setIsSubmitted(true)
      }
    }
  }

  if (!isOpen) return null

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-gradient-to-br from-blue-900/80 to-slate-900/80 backdrop-blur-xl border border-blue-500/50 rounded-2xl max-w-md w-full p-8 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Registration Submitted!</h3>
            <p className="text-blue-100 mb-6">
              Thank you for your interest in HuML. We've received your registration and will contact you shortly with more information about the program.
            </p>
            <p className="text-sm text-cyan-400 mb-8">
              A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-gradient-to-br from-blue-900/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/50 rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-blue-300 hover:text-cyan-400 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-blue-500/30">
          <h2 className="text-3xl font-bold mb-2">Join HuML</h2>
          <p className="text-blue-100">
            Step {step} of 2 • Unlock your potential with our revolutionary training program
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6 pb-4">
          <div className="flex gap-2">
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-blue-900/50"}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-blue-900/50"}`}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Full Name *</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Email Address *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Phone Number *</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 (90) 27349707"
                  className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">HuML Role</label>
                <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                  <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-500/30">
                    <SelectItem value="Model (Learner)">Model (Learner)</SelectItem>
                    <SelectItem value="Trainer (Coach)">Trainer (Coach)</SelectItem>
                    <SelectItem value="Human ML Engineer">Human ML Engineer</SelectItem>
                    <SelectItem value="Dataset Curator">Dataset Curator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Availability</label>
                <Select value={formData.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
                  <SelectTrigger className="bg-blue-900/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-900 border-blue-500/30">
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Professional Experience</label>
                <Textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Tell us about your professional background..."
                  className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400/50 min-h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">Your Goals with HuML *</label>
                <Textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="What do you want to achieve through HuML training?"
                  className="bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-400/50 min-h-24"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 rounded border-blue-500/50 bg-blue-900/50 checked:bg-cyan-500 cursor-pointer"
                />
                <label className="text-sm text-blue-100 cursor-pointer">
                  I agree to the HuML Terms and Conditions and understand that this is a commitment to excellence.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-blue-500/30 flex gap-4">
          {step === 2 && (
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="flex-1 border-blue-400/50 text-blue-300 hover:text-blue-200 hover:border-blue-300 bg-transparent"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={step === 1 ? !formData.fullName || !formData.email || !formData.phone : !formData.goals || !formData.agree}
            className={`flex-1 ${
              step === 2 ? "w-full" : ""
            } bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {step === 1 ? "Next" : "Submit Registration"}
          </Button>
        </div>
      </div>
    </div>
  )
}
