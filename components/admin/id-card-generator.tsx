"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Upload, Download, Printer, X } from "lucide-react"
import type { Staff } from "./staff-management"
import { StaffIDCard } from "./staff-id-card"
import { Award as IdCard } from "lucide-react" // Import the IdCard component

interface StaffWithPhotos extends Staff {
  passportPhoto?: string
  signature?: string
}

export function IdCardGenerator() {
  const [staffList, setStaffList] = useState<StaffWithPhotos[]>([])
  const [selectedStaff, setSelectedStaff] = useState<StaffWithPhotos | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<StaffWithPhotos>>({
    name: "",
    id: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
  })
  const passportInputRef = useRef<HTMLInputElement>(null)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedStaff = localStorage.getItem("samnet_staff")
    if (savedStaff) {
      const staff = JSON.parse(savedStaff)
      const staffWithPhotos = staff.map((s: Staff) => ({
        ...s,
        passportPhoto: localStorage.getItem(`staff_passport_${s.id}`),
        signature: localStorage.getItem(`staff_signature_${s.id}`),
      }))
      setStaffList(staffWithPhotos)
    }
  }, [])

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        if (selectedStaff) {
          localStorage.setItem(`staff_passport_${selectedStaff.id}`, base64)
          setSelectedStaff({ ...selectedStaff, passportPhoto: base64 })
          const updated = staffList.map((s) => (s.id === selectedStaff.id ? { ...s, passportPhoto: base64 } : s))
          setStaffList(updated)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        if (selectedStaff) {
          localStorage.setItem(`staff_signature_${selectedStaff.id}`, base64)
          setSelectedStaff({ ...selectedStaff, signature: base64 })
          const updated = staffList.map((s) => (s.id === selectedStaff.id ? { ...s, signature: base64 } : s))
          setStaffList(updated)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateIdCard = () => {
    if (!formData.name || !formData.id) {
      alert("Please fill in name and ID")
      return
    }

    const now = new Date().toISOString()
    const newStaff: StaffWithPhotos = {
      name: formData.name,
      id: formData.id,
      department: formData.department || "General",
      designation: formData.designation || "Staff",
      email: formData.email || "",
      phone: formData.phone || "",
      joiningDate: new Date().toISOString(),
      createdAt: now,
      updatedAt: now,
    }

    const updated = [...staffList, newStaff]
    setStaffList(updated)
    localStorage.setItem("samnet_staff", JSON.stringify(updated))

    setFormData({
      name: "",
      id: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
    })
    setShowCreateForm(false)
    setSelectedStaff(newStaff)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Staff ID Cards</h2>
          <p className="text-slate-400 mt-2">Generate, manage, and print professional staff ID cards</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 flex items-center gap-2"
        >
          <Plus size={18} />
          Create ID Card
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Staff Name *</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Staff ID *</label>
                  <input
                    type="text"
                    value={formData.id || ""}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g., SAMNET-001"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Designation</label>
                  <input
                    type="text"
                    value={formData.designation || ""}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g., Software Developer"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department || ""}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Engineering"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="staff@samnet.com"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 123 456 7890"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleCreateIdCard}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                >
                  Create Card
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Staff List */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardContent className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                />
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredStaff.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-8">No staff members found</p>
                ) : (
                  filteredStaff.map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => setSelectedStaff(staff)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedStaff?.id === staff.id
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      <p className="font-medium text-sm">{staff.name}</p>
                      <p className="text-xs opacity-80">{staff.id}</p>
                      <p className="text-xs opacity-70">{staff.designation}</p>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ID Card Preview and Editor */}
        <div className="lg:col-span-3">
          {selectedStaff ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-3 text-sm">Passport Photo</h3>
                    {selectedStaff.passportPhoto ? (
                      <div className="relative">
                        <img
                          src={selectedStaff.passportPhoto || "/placeholder.svg"}
                          alt="Passport"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            localStorage.removeItem(`staff_passport_${selectedStaff.id}`)
                            setSelectedStaff({ ...selectedStaff, passportPhoto: undefined })
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1 rounded-full text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="block">
                        <input
                          ref={passportInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePassportUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => passportInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-cyan-500 transition-colors flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <Upload size={24} className="text-slate-400" />
                          <span className="text-slate-400 text-sm text-center">
                            Click to upload passport photo (4x6)
                          </span>
                        </button>
                      </label>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-3 text-sm">Authorized Signature</h3>
                    {selectedStaff.signature ? (
                      <div className="relative">
                        <img
                          src={selectedStaff.signature || "/placeholder.svg"}
                          alt="Signature"
                          className="w-full h-32 object-contain bg-white rounded-lg p-2"
                        />
                        <button
                          onClick={() => {
                            localStorage.removeItem(`staff_signature_${selectedStaff.id}`)
                            setSelectedStaff({ ...selectedStaff, signature: undefined })
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1 rounded-full text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="block">
                        <input
                          ref={signatureInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => signatureInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-cyan-500 transition-colors flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <Upload size={24} className="text-slate-400" />
                          <span className="text-slate-400 text-sm text-center">
                            Click to upload signature (back cover)
                          </span>
                        </button>
                      </label>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <StaffIDCard staff={selectedStaff} />
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={handlePrint}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Print ID Card
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2 bg-transparent"
                >
                  <Download size={18} />
                  Download
                </Button>
                <Button
                  onClick={() => setSelectedStaff(null)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-16 pb-16">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mx-auto">
                    <IdCard size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-lg font-medium">Select a staff member to create their ID card</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
