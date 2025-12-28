"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StaffForm } from "./staff-form"
import { StaffList } from "./staff-list"

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  designation: string
  department: string
  joiningDate: string
  photo?: string
  createdAt: string
  updatedAt: string
}

export function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedStaff = localStorage.getItem("samnet_staff")
    if (savedStaff) {
      setStaffList(JSON.parse(savedStaff))
    }
  }, [])

  const saveStaff = (newStaff: Staff[]) => {
    localStorage.setItem("samnet_staff", JSON.stringify(newStaff))
    setStaffList(newStaff)
  }

  const addStaff = (staffData: Omit<Staff, "id" | "createdAt" | "updatedAt">) => {
    const newStaff: Staff = {
      ...staffData,
      id: `SAMNET-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveStaff([...staffList, newStaff])
    setShowForm(false)
  }

  const updateStaff = (updatedStaff: Staff) => {
    const newStaffList = staffList.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
    saveStaff(newStaffList)
    setSelectedStaff(updatedStaff)
  }

  const deleteStaff = (id: string) => {
    saveStaff(staffList.filter((s) => s.id !== id))
    setSelectedStaff(null)
  }

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground mt-1">Manage staff members and their information</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Add Staff</Button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by name, email, or staff ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff List */}
        <div className="lg:col-span-1">
          <StaffList staff={filteredStaff} selectedStaff={selectedStaff} onSelectStaff={setSelectedStaff} />
        </div>

        {/* Staff Detail or Form */}
        <div className="lg:col-span-2">
          {showForm ? (
            <StaffForm onSubmit={addStaff} onCancel={() => setShowForm(false)} />
          ) : selectedStaff ? (
            <Card>
              <CardHeader>
                <CardTitle>Staff Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Staff ID</p>
                    <p className="font-medium">{selectedStaff.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedStaff.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Designation</p>
                    <p className="font-medium">{selectedStaff.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedStaff.department}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Joining Date</p>
                    <p className="font-medium">{new Date(selectedStaff.joiningDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Delete this staff member?")) {
                        deleteStaff(selectedStaff.id)
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-8">
                <p className="text-center text-muted-foreground">Select a staff member or add a new one</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
