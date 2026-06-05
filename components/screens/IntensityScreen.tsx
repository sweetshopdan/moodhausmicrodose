'use client'

import type { MentalState } from '@/lib/types'
import { MENTAL_INTENSITY_DESCRIPTIONS } from '@/lib/states'
import IntensitySlider from '@/components/ui/IntensitySlider'
import ProgressDots from '@/components/ui/ProgressDots'

const SCALE_LABELS: Record<MentalState, string> = {
  anxious:    'how anxious are you?',
  scattered:  'how scattered are you?',
  flat:       'how flat are you?',
  wired_tired:'how wired-tired are you?',
  steady:     'how steady are you feeling?',
  sharp:      'how sharp are you?',
  great:      'how great are you feeling?',
}

interface Props {
  mentalState: MentalState
  value: number
  onChange: (val: number) => void
  onNext: () => void
  onBack: () => void
}

export default function IntensityScreen({ mentalState, value, onChange, onNext, onBack }: Props) {
  const descriptions = MENTAL_INTENSITY_DESCRIPTIONS[mentalState] ?? {}
  const label = SCALE_LABELS[mentalState]

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={2} total={6} />
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">Rate your intensity</h1>
      </div>

      <div className="bg-white/10 rounded-2xl p-5 mb-8">
        <IntensitySlider
          value={value}
          onChange={onChange}
          label={label}
          descriptions={descriptions}
        />
      </div>

      <div className="flex-1" />

      <button
        onClick={onNext}
        className="w-full py-4 bg-forest text-lime rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95"
      >
        Next →
      </button>
    </div>
  )
}
