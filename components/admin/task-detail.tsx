"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "./task-management"

interface TaskDetailProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (id: string) => void
  onClose: () => void
}

export function TaskDetail({ task, onUpdate, onDelete, onClose }: TaskDetailProps) {
  const [newComment, setNewComment] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedStatus, setEditedStatus] = useState(task.status)

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedTask: Task = {
        ...task,
        comments: [
          ...task.comments,
          {
            id: Date.now().toString(),
            author: "Admin",
            text: newComment,
            timestamp: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      }
      onUpdate(updatedTask)
      setNewComment("")
    }
  }

  const handleStatusChange = () => {
    if (editedStatus !== task.status) {
      onUpdate({
        ...task,
        status: editedStatus,
        updatedAt: new Date().toISOString(),
      })
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription className="mt-2">{task.description}</CardDescription>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm("Delete this task?")) {
                  onDelete(task.id)
                }
              }}
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Task Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{task.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="font-medium">{task.priority.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                {isEditing ? (
                  <div className="flex gap-2">
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value as any)}
                      className="flex-1 px-2 py-1 border border-input rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button size="sm" onClick={handleStatusChange}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditedStatus(task.status)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="w-full">
                    {task.status} - Change
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Comments ({task.comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <Button onClick={handleAddComment} size="sm" className="mt-2">
              Post Comment
            </Button>
          </div>

          {task.comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No comments yet</p>
          ) : (
            <div className="space-y-3">
              {task.comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-primary pl-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attachments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attachments ({task.attachments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {task.attachments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No attachments yet</p>
          ) : (
            <div className="space-y-2">
              {task.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-3 bg-secondary rounded">
                  <div>
                    <p className="font-medium text-sm">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <a
                    href={attachment.url}
                    download={attachment.name}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
