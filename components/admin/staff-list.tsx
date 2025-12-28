"use client"

import { Card } from "@/components/ui/card"
import type { Staff } from "./staff-management"

interface StaffListProps {
  staff: Staff[]
  selectedStaff: Staff | null
  onSelectStaff: (staff: Staff) => void
}

export function StaffList({ staff, selectedStaff, onSelectStaff }: StaffListProps) {
  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto">
      {staff.length === 0 ? (
        <Card className="p-4">
          <p className="text-center text-muted-foreground text-sm">No staff found</p>
        </Card>
      ) : (
        staff.map((member) => (
          <Card
            key={member.id}
            onClick={() => onSelectStaff(member)}
            className={`p-4 cursor-pointer transition-colors ${
              selectedStaff?.id === member.id ? "bg-primary/10 border-primary" : "hover:bg-secondary/50"
            }`}
          >
            <h3 className="font-medium text-foreground">{member.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{member.id}</p>
            <p className="text-xs text-muted-foreground">{member.designation}</p>
          </Card>
        ))
      )}
    </div>
  )
}
