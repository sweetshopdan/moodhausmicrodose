'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FROM_STATES } from '@/lib/states'
import Chip from '@/components/ui/Chip'
import IntensitySlider from '@/components/ui/IntensitySlider'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  fromState: string | null
  fromScore: number
  onStateChange: (state: string) => void
  onScoreChange: (score: number) => void
  onNext: () => void
}

export default function FromStateScreen({ fromState, fromScore, onStateChange, onScoreChange, onNext }: Props) {
  const [sliderTouched, setSliderTouched] = useState(false)

  const selectedConfig = FROM_STATES.find(s => s.id === fromState)

  const handleSlider = (val: number) => {
    onScoreChange(val)
    setSliderTouched(true)
  }

  const canProceed = fromState !== null

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={1} />
          <Image src="/MoodHaus__Wordmark_04.png" alt="Mood Haus" width={120} height={29} />
        </div>
        <h1 className="text-2xl font-bold text-forest leading-tight">
          how are you feeling right now?
        </h1>
        <p className="text-sm text-muted mt-2">pick the state that fits best</p>
      </div>

      {/* State chips */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {FROM_STATES.map(s => (
          <Chip
            key={s.id}
            label={s.label}
            selected={fromState === s.id}
            onClick={() => {
              onStateChange(s.id)
              setSliderTouched(false)
            }}
            variant={s.type === 'positive' ? 'positive' : 'default'}
          />
        ))}
      </div>

      {/* Intensity slider */}
      {selectedConfig && (
        <div className="bg-white rounded-2xl p-5 border border-border mb-8 animate-in fade-in duration-300">
          <IntensitySlider
            value={fromScore}
            onChange={handleSlider}
            label={selectedConfig.scaleLabel}
            descriptions={selectedConfig.descriptions}
          />
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
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
