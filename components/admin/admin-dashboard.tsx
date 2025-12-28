"use client"

import { useState, useEffect } from "react"
import {
  LogOut,
  Home,
  Users,
  FileText,
  Award as IdCard,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Settings,
  Bell,
  Search,
  Menu,
  Award,
} from "lucide-react"
import { TaskManagement } from "./task-management"
import { StaffManagement } from "./staff-management"
import { IdCardGenerator } from "./id-card-generator"
import { CommunicationHub } from "./communication-hub"
import { CommunityHub } from "./community-hub"
import { AccountingUnit } from "./accounting-unit"
import { PayrollManagement } from "./payroll-management"
import { SettingsProfile } from "./settings-profile"
import { CertificateGenerator } from "./certificate-generator"

interface AdminDashboardProps {
  userRole: "admin" | "accountant" | "staff" | "normal"
  onLogout: () => void
}

export function AdminDashboard({ userRole, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "tasks"
    | "staff"
    | "idcards"
    | "certificates"
    | "comms"
    | "community"
    | "accounting"
    | "payroll"
    | "settings"
  >("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [taskStats, setTaskStats] = useState({ total: 0, pending: 0, completed: 0 })
  const [staffCount, setStaffCount] = useState(0)

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("samnet_tasks") || "[]")
    const staff = JSON.parse(localStorage.getItem("samnet_staff") || "[]")

    setTaskStats({
      total: tasks.length,
      pending: tasks.filter((t: any) => t.status !== "completed").length,
      completed: tasks.filter((t: any) => t.status === "completed").length,
    })
    setStaffCount(staff.length)
  }, [activeTab])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    onLogout()
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, roles: ["admin", "accountant", "staff", "normal"] },
    { id: "tasks", label: "Task Management", icon: FileText, roles: ["admin", "staff"] },
    { id: "staff", label: "Staff Management", icon: Users, roles: ["admin"] },
    { id: "idcards", label: "ID Card Generator", icon: IdCard, roles: ["admin"] },
    { id: "certificates", label: "Certificates", icon: Award, roles: ["admin"] },
    { id: "comms", label: "Communication", icon: MessageSquare, roles: ["admin", "accountant", "staff", "normal"] },
    { id: "community", label: "Community Hub", icon: TrendingUp, roles: ["admin", "accountant", "staff", "normal"] },
    { id: "accounting", label: "Accounting", icon: DollarSign, roles: ["admin", "accountant"] },
    { id: "payroll", label: "Payroll", icon: DollarSign, roles: ["admin", "accountant"] },
    { id: "settings", label: "Settings", icon: Settings, roles: ["admin", "accountant", "staff", "normal"] },
  ]

  const availableItems = navigationItems.filter((item) => item.roles.includes(userRole))

  const getRoleColor = () => {
    switch (userRole) {
      case "admin":
        return "from-red-500 to-red-600"
      case "accountant":
        return "from-green-500 to-green-600"
      case "staff":
        return "from-blue-500 to-blue-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getRoleLabel = () => {
    switch (userRole) {
      case "admin":
        return "Administrator"
      case "accountant":
        return "Accountant"
      case "staff":
        return "Staff Member"
      default:
        return "User"
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ... existing sidebar ... */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 sticky top-0 h-screen`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm">SAMNET</p>
              <p className="text-slate-400 text-xs">Admin Portal</p>
            </div>
          )}
        </div>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-b border-slate-700">
            <div className={`flex items-center gap-3 bg-gradient-to-br ${getRoleColor()} rounded-lg p-3 text-white`}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {userRole.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{getRoleLabel()}</p>
                <p className="text-white/70 text-xs truncate capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {availableItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden md:block flex-1 max-w-sm">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-slate-300 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-slate-400 mt-1">Welcome back, {getRoleLabel()}!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Tasks" value={taskStats.total} color="from-blue-500 to-blue-600" icon="📋" />
                <StatCard
                  title="Pending Tasks"
                  value={taskStats.pending}
                  color="from-amber-500 to-amber-600"
                  icon="⏳"
                />
                <StatCard
                  title="Completed Tasks"
                  value={taskStats.completed}
                  color="from-green-500 to-green-600"
                  icon="✓"
                />
                <StatCard title="Staff Members" value={staffCount} color="from-purple-500 to-purple-600" icon="👥" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userRole === "admin" && (
                  <>
                    <QuickActionCard
                      title="Create Task"
                      description="Assign new tasks"
                      onClick={() => setActiveTab("tasks")}
                    />
                    <QuickActionCard
                      title="Add Staff"
                      description="Register staff members"
                      onClick={() => setActiveTab("staff")}
                    />
                    <QuickActionCard
                      title="Generate ID"
                      description="Create ID cards"
                      onClick={() => setActiveTab("idcards")}
                    />
                    <QuickActionCard
                      title="View Payroll"
                      description="Manage payroll"
                      onClick={() => setActiveTab("payroll")}
                    />
                  </>
                )}
                {userRole === "accountant" && (
                  <>
                    <QuickActionCard
                      title="Invoices"
                      description="Create invoices"
                      onClick={() => setActiveTab("accounting")}
                    />
                    <QuickActionCard
                      title="Payroll"
                      description="Manage payroll"
                      onClick={() => setActiveTab("payroll")}
                    />
                    <QuickActionCard
                      title="Messages"
                      description="Team communication"
                      onClick={() => setActiveTab("comms")}
                    />
                    <QuickActionCard
                      title="Community"
                      description="Community hub"
                      onClick={() => setActiveTab("community")}
                    />
                  </>
                )}
                {userRole === "staff" && (
                  <>
                    <QuickActionCard
                      title="My Tasks"
                      description="View assigned tasks"
                      onClick={() => setActiveTab("tasks")}
                    />
                    <QuickActionCard
                      title="Messages"
                      description="Team communication"
                      onClick={() => setActiveTab("comms")}
                    />
                    <QuickActionCard
                      title="Community"
                      description="Share achievements"
                      onClick={() => setActiveTab("community")}
                    />
                  </>
                )}
                {userRole === "normal" && (
                  <>
                    <QuickActionCard
                      title="Messages"
                      description="Team communication"
                      onClick={() => setActiveTab("comms")}
                    />
                    <QuickActionCard
                      title="Community"
                      description="View community posts"
                      onClick={() => setActiveTab("community")}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          {activeTab === "tasks" && (userRole === "admin" || userRole === "staff") && (
            <div className="p-6">
              <TaskManagement />
            </div>
          )}
          {activeTab === "staff" && userRole === "admin" && (
            <div className="p-6">
              <StaffManagement />
            </div>
          )}
          {activeTab === "idcards" && userRole === "admin" && (
            <div className="p-6">
              <IdCardGenerator />
            </div>
          )}
          {activeTab === "certificates" && userRole === "admin" && (
            <div className="p-6">
              <CertificateGenerator userRole={userRole} />
            </div>
          )}
          {activeTab === "comms" && (
            <div className="p-6">
              <CommunicationHub userRole={userRole} />
            </div>
          )}
          {activeTab === "community" && (
            <div className="p-6">
              <CommunityHub userRole={userRole} />
            </div>
          )}
          {activeTab === "accounting" && (userRole === "admin" || userRole === "accountant") && (
            <div className="p-6">
              <AccountingUnit userRole={userRole} />
            </div>
          )}
          {activeTab === "payroll" && (userRole === "admin" || userRole === "accountant") && (
            <div className="p-6">
              <PayrollManagement userRole={userRole} />
            </div>
          )}
          {activeTab === "settings" && (
            <div className="p-6">
              <SettingsProfile userRole={userRole} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, color, icon }: { title: string; value: number; color: string; icon: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}

function QuickActionCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-left hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
    >
      <h3 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm mt-2">{description}</p>
      <div className="mt-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
    </button>
  )
}
