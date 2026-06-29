'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { showToasts } from '@/lib/toast-utils'
import { CheckSquare, Square } from 'lucide-react'

const initialChecklist = [
  { id: 1, title: 'Morning Medicine', completed: true },
  { id: 2, title: 'Blood Pressure Check', completed: false },
  { id: 3, title: 'Walk 20 Minutes', completed: false },
  { id: 4, title: 'Drink Water (8-10 glasses)', completed: false },
  { id: 5, title: 'Evening Medicine', completed: false },
]

export function DailyCareChecklist() {
  const [checklist, setChecklist] = useState(initialChecklist)

  const toggleTask = (id: number) => {
    setChecklist(
      checklist.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )

    // Show toast notification
    const task = checklist.find(t => t.id === id)
    if (task && !task.completed) {
      showToasts.success(`${task.title} Completed`, 'Great job! Keep up the good recovery work.')
    }
  }

  const completedCount = checklist.filter((t) => t.completed).length
  const totalCount = checklist.length
  const progress = Math.round((completedCount / totalCount) * 100)

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Daily Care Checklist</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{totalCount} Complete
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          {checklist.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition text-left"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-accent flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span
                className={`text-sm font-medium ${
                  task.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
