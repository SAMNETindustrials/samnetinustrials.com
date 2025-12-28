"use client"

import { useState } from "react"
import { Upload, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserProfile {
  name: string
  email: string
  phone: string
  department: string
  designation: string
  passport: string | null
  avatar: string | null
}

export function SettingsProfile({ userRole }: { userRole: string }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("samnet_user_profile")
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
          passport: null,
          avatar: null,
        }
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleFileUpload = (field: "passport" | "avatar", file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfile({ ...profile, [field]: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = () => {
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem("samnet_user_profile", JSON.stringify(profile))
      setIsSaving(false)
      alert("Profile updated successfully!")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
        <p className="text-slate-400">Manage your profile information and upload documents</p>
      </div>

      {/* Avatar Upload */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white font-bold mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera size={32} className="text-white" />
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
              <Upload size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload("avatar", e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white font-bold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              value={profile.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Enter your department"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Designation</label>
            <input
              type="text"
              value={profile.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              placeholder="Enter your designation"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white font-bold mb-4">Documents</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Passport / ID Document</label>
            <div className="flex items-center gap-4">
              {profile.passport && (
                <div className="relative">
                  <img
                    src={profile.passport || "/placeholder.svg"}
                    alt="Passport"
                    className="w-20 h-24 object-cover rounded-lg border border-slate-600"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
                <Upload size={16} />
                Upload Passport
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload("passport", e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Save size={16} className="mr-2" />
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  )
}
