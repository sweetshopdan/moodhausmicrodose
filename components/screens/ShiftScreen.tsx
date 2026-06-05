'use client'

import type { MentalState } from '@/lib/types'
import { SHIFT_OPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  mentalState: MentalState
  value: string | null
  onChange: (val: string) => void
  onNext: () => void
  onBack: () => void
}

export default function ShiftScreen({ mentalState, value, onChange, onNext, onBack }: Props) {
  const options = SHIFT_OPTIONS[mentalState] ?? []

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={3} total={6} />
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">Where do you want to get to?</h1>
        <p className="text-sm text-muted mt-2">Your protocol will be built around this shift</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {options.map(opt => (
          <Chip
            key={opt}
            label={opt}
            selected={value === opt}
            onClick={() => onChange(opt)}
          />
        ))}
      </div>

      <div className="flex-1" />

      {value && (
        <button
          onClick={onNext}
          className="w-full py-4 bg-forest text-lime rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95"
        >
          Next →
        </button>
      )}
    </div>
  )
}
