'use client'

import Image from 'next/image'
import type { BiologicalSex } from '@/lib/types'
import { SEX_OPTIONS } from '@/lib/states'
import Chip from '@/components/ui/Chip'

interface Props {
  value: BiologicalSex | null
  onChange: (val: BiologicalSex) => void
  onNext: () => void
}

export default function SexScreen({ value, onChange, onNext }: Props) {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-muted tracking-wider">1 of 2</span>
          <Image src="/MoodHaus__Wordmark_04.png" alt="Mood Haus" width={120} height={29} />
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">Before we get started</h1>
      </div>

      <div className="grid grid-cols-1 gap-2 mb-8">
        {SEX_OPTIONS.map(opt => (
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
