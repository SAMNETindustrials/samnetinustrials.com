"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TaskForm } from "./task-form"
import { TaskList } from "./task-list"
import { TaskDetail } from "./task-detail"

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
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

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

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

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Task Management</h2>
          <p className="text-muted-foreground mt-1">Create, assign, and track staff tasks</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ New Task</Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "pending", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({filteredTasks.length})
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1">
          <TaskList tasks={filteredTasks} selectedTask={selectedTask} onSelectTask={setSelectedTask} />
        </div>

        {/* Task Detail or Form */}
        <div className="lg:col-span-2">
          {showForm ? (
            <TaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />
          ) : selectedTask ? (
            <TaskDetail
              task={selectedTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onClose={() => setSelectedTask(null)}
            />
          ) : (
            <Card>
              <CardContent className="pt-8">
                <p className="text-center text-muted-foreground">Select a task or create a new one</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
