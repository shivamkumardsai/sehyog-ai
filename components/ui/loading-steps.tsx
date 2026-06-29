'use client'

import { Check, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface LoadingStep {
  label: string
  duration?: number
}

interface LoadingStepsProps {
  steps: LoadingStep[]
  currentStep?: number
  isComplete?: boolean
}

export function LoadingSteps({ steps, currentStep = 0, isComplete = false }: LoadingStepsProps) {
  const [displayStep, setDisplayStep] = useState(currentStep)

  useEffect(() => {
    setDisplayStep(currentStep)
  }, [currentStep])

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {index < displayStep ? (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-in">
                <Check className="w-5 h-5 text-white" />
              </div>
            ) : index === displayStep ? (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
            )}
          </div>

          {/* Label */}
          <div className="flex-1">
            <p
              className={`text-sm font-medium transition-colors ${
                index <= displayStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </p>
          </div>

          {/* Progress line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute left-4 w-1 h-6 transition-colors ${
                index < displayStep ? 'bg-accent' : 'bg-muted'
              }`}
              style={{ top: `${3.5 * (index + 1) + 1}rem` }}
            />
          )}
        </div>
      ))}

      {/* Completion message */}
      {isComplete && (
        <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3">
          <Check className="w-5 h-5 text-accent flex-shrink-0" />
          <p className="text-sm font-medium text-accent">All steps completed successfully!</p>
        </div>
      )}
    </div>
  )
}
