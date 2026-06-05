'use client'

import type { SleepQuality } from '@/lib/types'
import { SLEEP_OPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  value: SleepQuality | null
  onChange: (val: SleepQuality) => void
  onSubmit: (sleep: SleepQuality) => void
  onSkip: () => void
  onBack: () => void
}

export default function SleepScreen({ value, onChange, onSubmit, onSkip, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={4} total={4} />
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">How did you sleep?</h1>
        <p className="text-sm text-muted mt-2">Helps us calibrate your protocol</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {SLEEP_OPTIONS.map(opt => (
          <Chip
            key={opt.id}
            label={opt.label}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-3">
        {value && (
          <button
            onClick={() => onSubmit(value)}
            className="w-full py-4 bg-forest text-lime rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95"
          >
            Get my prescription
          </button>
        )}
        <button
          onClick={onSkip}
          className="w-full py-3 text-muted text-sm font-medium transition-colors hover:text-ink"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
