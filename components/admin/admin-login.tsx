"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminLoginProps {
  onLogin: (role: "admin" | "accountant" | "staff" | "normal") => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState<"admin" | "accountant" | "staff" | "normal">("admin")

  const credentials = {
    admin: { email: "admin@samnet.com", password: "admin123" },
    accountant: { email: "accountant@samnet.com", password: "accounts123" },
    staff: { email: "staff@samnet.com", password: "staff123" },
    normal: { email: "user@samnet.com", password: "user123" },
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const cred = credentials[selectedRole]

    if (email === cred.email && password === cred.password) {
      localStorage.setItem("userRole", selectedRole)
      localStorage.setItem("userEmail", email)
      onLogin(selectedRole)
    } else {
      setError("Invalid email or password")
      setPassword("")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center border-b border-slate-700">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-white">SAMNET Industrials</CardTitle>
          <CardDescription className="text-slate-400">Admin & Staff Portal</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
              {(["admin", "accountant", "staff", "normal"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role)
                    setEmail(credentials[role].email)
                    setPassword("")
                    setError("")
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedRole === role
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-300 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-400">Admin: admin@samnet.com / admin123</p>
            <p className="text-xs text-slate-400">Accountant: accountant@samnet.com / accounts123</p>
            <p className="text-xs text-slate-400">Staff: staff@samnet.com / staff123</p>
            <p className="text-xs text-slate-400">User: user@samnet.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
