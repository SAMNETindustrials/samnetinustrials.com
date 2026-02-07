"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Award, AlertCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScholarshipModalProps {
  isOpen: boolean
  onClose: () => void
  tab: "details" | "application" | "payment"
}

export function ScholarshipModal({ isOpen, onClose, tab: initialTab }: ScholarshipModalProps) {
  const [tab, setTab] = useState<"details" | "application" | "payment">(initialTab)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    essay: "",
  })
  const [paymentProcessed, setPaymentProcessed] = useState(false)

  const programs = [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "UI/UX & Product Design",
    "CAD & Engineering Design",
    "Industrial Robotics",
    "IoT & Smart Systems",
    "Data Science & Analytics",
    "3D Printing / Additive Manufacturing",
    "CCTV & Security Technology",
    "Branding & Creative Design",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplicationSubmit = () => {
    const applications = JSON.parse(localStorage.getItem("scholarshipApplications") || "[]")
    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      submittedAt: new Date(),
    }
    applications.push(newApplication)
    localStorage.setItem("scholarshipApplications", JSON.stringify(applications))

    alert("Application submitted! Proceed to payment to complete the process.")
    setTab("payment")
  }

  const handlePayment = () => {
    setPaymentProcessed(true)
    setTimeout(() => {
      alert(
        "Payment successful! Your application is now complete. We will review it and contact you within 7 business days.",
      )
      onClose()
      setTab("details")
      setPaymentProcessed(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        program: "",
        essay: "",
      })
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-blue-500/30 my-4"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6 flex items-center justify-between border-b border-blue-400/20 z-10 rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  SAMNET Industrials Discount Program
                </h2>
                <p className="text-sm text-blue-100 mt-1">Passion is enough — skills will be taught</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-6 flex gap-2 border-b border-blue-500/30">
              {(["details", "application", "payment"] as const).map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
                    tab === tabName
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-blue-300 hover:text-blue-200"
                  }`}
                >
                  {tabName === "details" && "Program Details"}
                  {tabName === "application" && "Apply Now"}
                  {tabName === "payment" && "Payment"}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6 max-h-[calc(90vh-250px)] overflow-y-auto">
              {/* Details Tab */}
              {tab === "details" && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <BookOpen className="h-6 w-6" />
                      About Our Discounts & Training Programs
                    </h3>
                    <p className="text-blue-100 mb-4">
                      SAMNET Industrials is committed to nurturing and developing young tech talents. Our discount program is
                      designed to support passionate individuals who are interested and enthusiastic in tech
                      fields. We are offering a 60% discount to few individuals whose passion exceeds others during our 
                      exhibtion classes. Join our Training Hub and get hands-on experience with real-world projects.
                    </p>
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">Training Hub Principles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Hands-on First</strong> - Theory supports practice
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Project-Based</strong> - Every module produces something real
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Progressive Difficulty</strong> - Beginner to advanced
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Mentorship Culture</strong> - Senior supports junior
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Industry Standard Tools</strong> - Real-world technology
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-blue-100 text-sm">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>
                          <strong>Certification</strong> - Recognized credentials
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-cyan-300 mb-3">Program Structure</h4>
                      <ol className="space-y-2 text-blue-100 text-sm list-decimal list-inside">
                        <li>Orientation & Foundation</li>
                        <li>Practical Workshops</li>
                        <li>Real-World Projects</li>
                        <li>Capstone Project</li>
                        <li>Assessment & Certification</li>
                      </ol>
                      <p className="text-xs text-blue-300 mt-3">Minimum 80% attendance required</p>
                    </div>

                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-cyan-300 mb-3">What You'll Get</h4>
                      <ul className="space-y-2 text-blue-100 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>Hands-on technical training</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>Industry mentorship</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>Portfolio building</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>Certification of completion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>Career development support</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-500/30 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-100 mb-1">Application Fee</h4>
                      <p className="text-amber-100/80 text-sm">
                        A non-refundable application processing fee of{" "}
                        <span className="font-bold text-amber-300">₦5000 (5000 Naira)</span> is required to proceed with
                        your application. This fee helps us cover administrative costs and process your application.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-cyan-300 mb-3">Available Programs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {programs.map((program) => (
                        <div key={program} className="flex items-center gap-2 text-blue-100">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          {program}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setTab("application")}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-white cursor-pointer"
                  >
                    Start Your Application
                  </Button>
                </motion.div>
              )}

              {/* Application Tab */}
              {tab === "application" && (
                <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-lg font-semibold text-cyan-300">Application Form</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Email Address</label>
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
                      <label className="block text-sm font-medium text-blue-100 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234 (0) 123-4567"
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Choose Your Program</label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="">Select a program...</option>
                        {programs.map((program) => (
                          <option key={program} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Why do you want to join this program?
                    </label>
                    <textarea
                      name="essay"
                      value={formData.essay}
                      onChange={handleInputChange}
                      placeholder="Tell us about your passion, goals, and why you're interested in this program..."
                      rows={5}
                      className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setTab("details")}
                      className="border-blue-400/50 cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleApplicationSubmit}
                      disabled={
                        !formData.fullName || !formData.email || !formData.phone || !formData.program || !formData.essay
                      }
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-0 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Payment Tab */}
              {tab === "payment" && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-blue-100">
                        <span>Application Fee:</span>
                        <span className="font-semibold">₦5000.00</span>
                      </div>
                      <div className="border-t border-blue-500/30 pt-3 flex justify-between text-lg font-bold text-cyan-300">
                        <span>Total Amount:</span>
                        <span>₦5000.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-6 border border-blue-500/30 space-y-4">
                    <h4 className="font-semibold text-blue-100 mb-4">Payment Information</h4>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Payment Method</label>
                      <select className="w-full bg-slate-700 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors">
                        <option>Bank Transfer (Nigeria)</option>
                        <option>Credit/Debit Card</option>
                        <option>Mobile Money</option>
                        <option>PayPal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Full name as on card"
                        className="w-full bg-slate-700 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-slate-700 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-slate-700 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30 text-green-100 text-sm">
                    <p>✓ Your payment is secure and encrypted. SAMNET does not store card information.</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setTab("application")}
                      className="border-blue-400/50 cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={paymentProcessed}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 border-0 text-white cursor-pointer disabled:opacity-70 transition-all"
                    >
                      {paymentProcessed ? "Processing..." : "Complete Payment (₦5000)"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
