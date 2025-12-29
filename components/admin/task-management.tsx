"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "./task-form"
import { TaskDetail } from "./task-detail"
import { Plus, Search, MessageSquare, Paperclip } from "lucide-react"

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  department: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  comments: Array<{
    id: string
    author: string
    text: string
    timestamp: string
  }>
  attachments: Array<{
    id: string
    name: string
    type: string
    size: number
    url: string
  }>
  createdAt: string
  updatedAt: string
}

const DEPARTMENTS = [
  "All Tasks",
  "Management",
  "Operations",
  "Training",
  "Infrastructure",
  "Finance",
  "HR",
  "Marketing",
  "Customer Service",
]

const DEPARTMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Management: { bg: "#EBF8FF", text: "#0284C7", border: "#0284C7" },
  Operations: { bg: "#FEE2E2", text: "#DC2626", border: "#DC2626" },
  Training: { bg: "#F0FDF4", text: "#16A34A", border: "#16A34A" },
  Infrastructure: { bg: "#FEF3C7", text: "#D97706", border: "#D97706" },
  Finance: { bg: "#F3E8FF", text: "#7C3AED", border: "#7C3AED" },
  HR: { bg: "#FCE7F3", text: "#DB2777", border: "#DB2777" },
  Marketing: { bg: "#E0E7FF", text: "#4F46E5", border: "#4F46E5" },
  "Customer Service": { bg: "#F5F3FF", text: "#6D28D9", border: "#6D28D9" },
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState("All Tasks")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const savedTasks = localStorage.getItem("samnet_tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem("samnet_tasks", JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  const addTask = (taskData: Omit<Task, "id" | "comments" | "attachments" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveTasks([...tasks, newTask])
    setShowForm(false)
  }

  const updateTask = (updatedTask: Task) => {
    const newTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    saveTasks(newTasks)
    setSelectedTask(updatedTask)
  }

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id))
    setSelectedTask(null)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesDept = selectedDepartment === "All Tasks" || task.department === selectedDepartment
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  const getDepartmentCount = (dept: string) => {
    if (dept === "All Tasks") return tasks.length
    return tasks.filter((t) => t.department === dept).length
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen bg-slate-50">
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
          <div className="space-y-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDepartment(dept)
                  setSelectedTask(null)
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  selectedDepartment === dept
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{dept}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    selectedDepartment === dept ? "bg-white/30 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {getDepartmentCount(dept)}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>
      </aside>

      <main className="lg:col-span-3">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <TaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />
          </div>
        ) : selectedTask ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <TaskDetail
              task={selectedTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Task</h1>
                <p className="text-gray-600 text-sm mt-1">Welcome back! Manage your tasks efficiently</p>
              </div>

              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search task"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => {
                    const deptColor = DEPARTMENT_COLORS[task.department] || DEPARTMENT_COLORS.Management
                    return (
                      <button
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-l-4 text-left group overflow-hidden"
                        style={{ borderLeftColor: deptColor.border }}
                      >
                        {/* Task Header with Department */}
                        <div className="px-6 py-4" style={{ backgroundColor: deptColor.bg }}>
                          <h3 className="font-bold text-sm" style={{ color: deptColor.text }}>
                            {task.department}
                          </h3>
                        </div>

                        {/* Task Content */}
                        <div className="px-6 py-4 space-y-3">
                          <h2 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                            {task.title}
                          </h2>
                          <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>

                          {/* Task Metadata */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} />
                              <span>{task.comments.length}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Paperclip size={16} />
                              <span>{task.attachments.length}</span>
                            </div>
                          </div>

                          {/* Assigned Staff Avatar */}
                          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                              {task.assignedTo.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs text-gray-600">{task.assignedTo}</span>
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No tasks found</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
