"use client"

import { useState, useEffect } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLogin } from "@/components/admin/admin-login"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "accountant" | "staff" | "normal">("normal")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "accountant" | "staff" | "normal" | null
    if (role) {
      setUserRole(role)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? (
    <AdminDashboard userRole={userRole} onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminLogin
      onLogin={(role) => {
        setUserRole(role)
        setIsAuthenticated(true)
      }}
    />
  )
}
