"use client"

import { Card } from "@/components/ui/card"
import type { Task } from "./task-management"

interface TaskListProps {
  tasks: Task[]
  selectedTask: Task | null
  onSelectTask: (task: Task) => void
}

export function TaskList({ tasks, selectedTask, onSelectTask }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: "bg-gray-200 text-gray-800",
      "in-progress": "bg-blue-200 text-blue-800",
      completed: "bg-green-200 text-green-800",
    }
    return statusConfig[status as keyof typeof statusConfig] || ""
  }

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto">
      {tasks.length === 0 ? (
        <Card className="p-4">
          <p className="text-center text-muted-foreground text-sm">No tasks found</p>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            onClick={() => onSelectTask(task)}
            className={`p-4 cursor-pointer transition-colors ${
              selectedTask?.id === task.id ? "bg-primary/10 border-primary" : "hover:bg-secondary/50"
            }`}
          >
            <div className="space-y-2">
              <h3 className="font-medium text-foreground line-clamp-2">{task.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(task.status)}`}>{task.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">To: {task.assignedTo}</p>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
