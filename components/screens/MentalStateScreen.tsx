'use client'

import type { MentalState } from '@/lib/types'
import { MENTAL_STATE_OPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  value: MentalState | null
  onChange: (val: MentalState) => void
  onNext: () => void
}

export default function MentalStateScreen({ value, onChange, onNext }: Props) {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={1} total={4} />
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">How's your head today?</h1>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {MENTAL_STATE_OPTIONS.map(opt => (
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
