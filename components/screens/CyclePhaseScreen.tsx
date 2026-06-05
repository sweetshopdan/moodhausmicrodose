'use client'

import type { CyclePhase } from '@/lib/types'
import { CYCLE_PHASE_OPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'

interface Props {
  value: CyclePhase | null
  onChange: (val: CyclePhase) => void
  onNext: () => void
  onBack: () => void
}

export default function CyclePhaseScreen({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-muted tracking-wider">optional</span>
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">Where are you in your cycle?</h1>
      </div>

      <div className="grid grid-cols-1 gap-2 mb-8">
        {CYCLE_PHASE_OPTIONS.map(opt => (
          <Chip
            key={opt.id}
            label={opt.label}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
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
