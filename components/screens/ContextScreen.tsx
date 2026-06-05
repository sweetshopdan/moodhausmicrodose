'use client'

import Chip from '@/components/ui/Chip'
import ProgressDots from '@/components/ui/ProgressDots'

interface Props {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | null
  socialPref: 'solo' | 'open' | null
  onTimeChange: (t: 'morning' | 'afternoon' | 'evening') => void
  onSocialChange: (s: 'solo' | 'open') => void
  onSubmit: () => void
  onBack: () => void
}

const TIME_OPTIONS = [
  { id: 'morning', label: 'morning' },
  { id: 'afternoon', label: 'afternoon' },
  { id: 'evening', label: 'evening' },
] as const

const SOCIAL_OPTIONS = [
  { id: 'solo', label: 'solo & silent' },
  { id: 'open', label: 'open to others' },
] as const

export default function ContextScreen({ timeOfDay, socialPref, onTimeChange, onSocialChange, onSubmit, onBack }: Props) {
  const canSubmit = timeOfDay !== null && socialPref !== null

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={3} />
          <button onClick={onBack} className="text-xs text-muted hover:text-ink transition-colors">
            ← back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-forest leading-tight">
          a couple more things
        </h1>
        <p className="text-sm text-muted mt-2">helps us tailor the protocol</p>
      </div>

      {/* Time of day */}
      <div className="mb-8">
        <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">time of day</p>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map(opt => (
            <Chip
              key={opt.id}
              label={opt.label}
              selected={timeOfDay === opt.id}
              onClick={() => onTimeChange(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Social preference */}
      <div className="mb-8">
        <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">how do you want to be?</p>
        <div className="flex flex-wrap gap-2">
          {SOCIAL_OPTIONS.map(opt => (
            <Chip
              key={opt.id}
              label={opt.label}
              selected={socialPref === opt.id}
              onClick={() => onSocialChange(opt.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-150 ${
          canSubmit
            ? 'bg-forest text-lime active:scale-95'
            : 'bg-border text-muted cursor-not-allowed'
        }`}
      >
        get my prescription
      </button>
    </div>
  )
}
