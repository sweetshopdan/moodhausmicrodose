'use client'

import { TO_OPTIONS, TO_SCALE_DESCRIPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'
import IntensitySlider from '@/components/ui/IntensitySlider'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  fromState: string
  toState: string | null
  toScore: number
  onStateChange: (state: string) => void
  onScoreChange: (score: number) => void
  onNext: () => void
  onBack: () => void
}

export default function ToStateScreen({ fromState, toState, toScore, onStateChange, onScoreChange, onNext, onBack }: Props) {
  const options = TO_OPTIONS[fromState] ?? []
  const canProceed = toState !== null

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={2} />
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-forest leading-tight">
          where do you want to get to?
        </h1>
        <p className="text-sm text-muted mt-2">your protocol will be built around this shift</p>
      </div>

      {/* Target state chips */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {options.map(opt => (
          <Chip
            key={opt}
            label={opt}
            selected={toState === opt}
            onClick={() => onStateChange(opt)}
          />
        ))}
      </div>

      {/* Ambition slider */}
      {toState && (
        <div className="bg-white rounded-2xl p-5 border border-border mb-8 animate-in fade-in duration-300">
          <IntensitySlider
            value={toScore}
            onChange={onScoreChange}
            label="how high do you want to go?"
            descriptions={TO_SCALE_DESCRIPTIONS}
          />
        </div>
      )}

      <div className="flex-1" />

      {canProceed && (
        <button
          onClick={onNext}
          className="w-full py-4 bg-forest text-lime rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95"
        >
          next →
        </button>
      )}
    </div>
  )
}
