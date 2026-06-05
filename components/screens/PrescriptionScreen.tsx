'use client'

import { useEffect, useState } from 'react'
import type { Prescription } from '@/lib/types'
import ProgressDots from '@/components/ui/ProgressDots'
import IntensityBar from '@/components/ui/IntensityBar'
import TherapyStep from '@/components/ui/TherapyStep'
import DrinkCard from '@/components/ui/DrinkCard'

const LOADING_MESSAGES = [
  'reading your state...',
  'building your protocol...',
  'almost there...',
]

interface Props {
  loading: boolean
  streamingCopy: string
  prescription: Prescription | null
  error: string | null
  onStartOver: () => void
}

export default function PrescriptionScreen({ loading, streamingCopy, prescription, error, onStartOver }: Props) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [loading])

  // Loading state
  if (loading && !prescription) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center max-w-sm mx-auto px-6 py-10 text-center">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full border-2 border-forest border-t-transparent animate-spin mx-auto mb-6" />
          <p className="text-sm text-muted transition-all duration-300 min-h-[20px]">
            {LOADING_MESSAGES[msgIndex]}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center max-w-sm mx-auto px-6 py-10 text-center">
        <p className="text-3xl mb-4">⚠</p>
        <p className="text-sm font-semibold text-ink mb-2">something went wrong</p>
        <p className="text-xs text-muted mb-1 leading-relaxed">{error}</p>
        {error.includes('401') || error.includes('API key') || error.includes('api_key') ? (
          <p className="text-xs text-amber mt-2 leading-relaxed">
            check that your anthropic api key is set in .env.local and restart the server
          </p>
        ) : null}
        <button
          onClick={onStartOver}
          className="mt-8 px-6 py-3 bg-forest text-cream rounded-2xl text-sm font-semibold"
        >
          try again
        </button>
      </div>
    )
  }

  if (!prescription) return null

  const displayCopy = prescription.copy || streamingCopy

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <ProgressDots current={4} />
          <span className="text-xs text-muted tracking-wider">your prescription</span>
        </div>
      </div>

      {/* Prescription card */}
      <div className="bg-forest rounded-3xl p-6 mb-6">
        {/* Headline */}
        <h1 className="text-2xl font-bold text-lime leading-tight mb-4">
          {prescription.headline}
        </h1>

        {/* Intro copy */}
        <p className="text-sm italic leading-relaxed mb-5 text-cream/85">
          {displayCopy}
        </p>

        {/* Intensity bar */}
        <IntensityBar score={prescription.intensityScore} />
      </div>

      {/* Therapy sequence */}
      <div className="mb-6">
        <p className="text-xs text-muted uppercase tracking-wider mb-4 font-medium">your protocol</p>
        <div className="flex flex-col gap-4">
          {prescription.therapy.map((step, i) => (
            <TherapyStep key={i} index={i + 1} {...step} />
          ))}
        </div>
      </div>

      {/* Drinks */}
      <div className="mb-6">
        <p className="text-xs text-muted uppercase tracking-wider mb-4 font-medium">adaptogen prescription</p>
        <div className="flex flex-col gap-3">
          {prescription.drinks.map((drink, i) => (
            <DrinkCard key={i} {...drink} />
          ))}
        </div>
      </div>

      {/* Note */}
      {prescription.note && (
        <div className="mb-8 px-1">
          <p className="text-xs text-muted italic leading-relaxed">{prescription.note}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mb-6 px-4 py-4 rounded-2xl bg-amber border border-amber">
        <p className="text-xs font-semibold text-white leading-relaxed text-center">
          This is a guide, not medical advice. We are not medical professionals. Listen to your body — if something doesn't feel right, stop.
        </p>
      </div>

      {/* Start over */}
      <div className="flex-1" />
      <button
        onClick={onStartOver}
        className="w-full py-4 bg-forest text-lime rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95"
      >
        start over
      </button>
    </div>
  )
}
