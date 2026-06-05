'use client'

import { useState, useCallback, useEffect } from 'react'
import type {
  Screen, UserProfile, CheckIn,
  BiologicalSex, AgeRange, HormonalStatus, CyclePhase,
  MentalState, PhysicalState, SocialMode, SleepQuality,
  Prescription, PrescriptionRequest,
} from '@/lib/types'

import SexScreen from '@/components/screens/SexScreen'
import AgeScreen from '@/components/screens/AgeScreen'
import HormonalScreen from '@/components/screens/HormonalScreen'
import CyclePhaseScreen from '@/components/screens/CyclePhaseScreen'
import MentalStateScreen from '@/components/screens/MentalStateScreen'
import IntensityScreen from '@/components/screens/IntensityScreen'
import ShiftScreen from '@/components/screens/ShiftScreen'
import PhysicalStateScreen from '@/components/screens/PhysicalStateScreen'
import SocialModeScreen from '@/components/screens/SocialModeScreen'
import SleepScreen from '@/components/screens/SleepScreen'
import PrescriptionScreen from '@/components/screens/PrescriptionScreen'

const PROFILE_KEY = 'microdose_profile'

function detectTimeOfDay(): CheckIn['timeOfDay'] {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [screen, setScreen] = useState<Screen>('sex')

  // Onboarding profile (persisted)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [draft, setDraft] = useState<Partial<UserProfile>>({})

  // Daily check-in (transient)
  const [checkIn, setCheckIn] = useState<Partial<CheckIn>>({ mentalScore: 5 })

  // Prescription result
  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const [loading, setLoading] = useState(false)
  const [streamingCopy, setStreamingCopy] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const saveProfile = useCallback((finalProfile: UserProfile) => {
    setProfile(finalProfile)
    setScreen('mental')
    setCheckIn({ mentalScore: 5, timeOfDay: detectTimeOfDay() })
  }, [])

  // --- Onboarding handlers ---

  const afterSex = useCallback((sex: BiologicalSex) => {
    setDraft(prev => ({ ...prev, sex }))
    setScreen('age')
  }, [])

  const afterAge = useCallback((ageRange: AgeRange) => {
    const updated = { ...draft, ageRange }
    setDraft(updated)
    if (updated.sex === 'female') {
      setScreen('hormonal')
    } else {
      saveProfile(updated as UserProfile)
    }
  }, [draft, saveProfile])

  const afterHormonal = useCallback((hormonalStatus: HormonalStatus) => {
    const updated = { ...draft, hormonalStatus }
    setDraft(updated)
    if (hormonalStatus === 'cycling') {
      setScreen('cycle')
    } else {
      saveProfile(updated as UserProfile)
    }
  }, [draft, saveProfile])

  const afterCycle = useCallback((cyclePhase: CyclePhase) => {
    saveProfile({ ...draft, cyclePhase } as UserProfile)
  }, [draft, saveProfile])

  // --- Daily check-in handlers ---

  const afterMental = useCallback((mentalState: MentalState) => {
    setCheckIn(prev => ({ ...prev, mentalState }))
    setScreen('intensity')
  }, [])

  const afterIntensity = useCallback(() => {
    setScreen('shift')
  }, [])

  const afterShift = useCallback((desiredState: string) => {
    setCheckIn(prev => ({ ...prev, desiredState }))
    setScreen('physical')
  }, [])

  const afterPhysical = useCallback((physicalState: PhysicalState) => {
    setCheckIn(prev => ({ ...prev, physicalState }))
    setScreen('social')
  }, [])

  const afterSocial = useCallback((socialMode: SocialMode) => {
    setCheckIn(prev => ({ ...prev, socialMode }))
    setScreen('sleep')
  }, [])

  const submitPrescription = useCallback(async (finalCheckIn: CheckIn) => {
    if (!profile) return

    setScreen('prescription')
    setLoading(true)
    setStreamingCopy('')
    setPrescription(null)
    setError(null)

    const body: PrescriptionRequest = { profile, checkIn: finalCheckIn }

    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => '')
        throw new Error(`API error ${res.status}${text ? ': ' + text : ''}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })

        const copyMatch = accumulated.match(/"copy"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (copyMatch) {
          const rawCopy = copyMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
          setStreamingCopy(rawCopy)
        }
      }

      const json = accumulated.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
      const result: Prescription = JSON.parse(json)
      setPrescription(result)
      setLoading(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'something went wrong'
      setLoading(false)
      setError(msg)
    }
  }, [profile])

  const afterSleep = useCallback((sleep: SleepQuality) => {
    const final: CheckIn = {
      mentalState: checkIn.mentalState!,
      mentalScore: checkIn.mentalScore!,
      desiredState: checkIn.desiredState!,
      physicalState: checkIn.physicalState!,
      socialMode: checkIn.socialMode!,
      sleepQuality: sleep,
      timeOfDay: checkIn.timeOfDay!,
    }
    submitPrescription(final)
  }, [checkIn, submitPrescription])

  const skipSleep = useCallback(() => {
    const final: CheckIn = {
      mentalState: checkIn.mentalState!,
      mentalScore: checkIn.mentalScore!,
      desiredState: checkIn.desiredState!,
      physicalState: checkIn.physicalState!,
      socialMode: checkIn.socialMode!,
      timeOfDay: checkIn.timeOfDay!,
    }
    submitPrescription(final)
  }, [checkIn, submitPrescription])

  // Start over clears everything — goes back to sex screen
  const startOver = useCallback(() => {
    localStorage.removeItem(PROFILE_KEY)
    setProfile(null)
    setDraft({})
    setCheckIn({ mentalScore: 5 })
    setPrescription(null)
    setError(null)
    setScreen('sex')
  }, [])

  if (!mounted) return <div className="min-h-screen bg-cream" />

  return (
    <div className="min-h-screen bg-cream">
      {screen === 'sex' && (
        <SexScreen
          value={draft.sex ?? null}
          onChange={sex => setDraft(prev => ({ ...prev, sex }))}
          onNext={() => afterSex(draft.sex!)}
        />
      )}
      {screen === 'age' && (
        <AgeScreen
          value={draft.ageRange ?? null}
          onChange={ageRange => setDraft(prev => ({ ...prev, ageRange }))}
          onNext={() => afterAge(draft.ageRange!)}
          onBack={() => setScreen('sex')}
        />
      )}
      {screen === 'hormonal' && (
        <HormonalScreen
          value={draft.hormonalStatus ?? null}
          onChange={hormonalStatus => setDraft(prev => ({ ...prev, hormonalStatus }))}
          onNext={() => afterHormonal(draft.hormonalStatus!)}
          onBack={() => setScreen('age')}
        />
      )}
      {screen === 'cycle' && (
        <CyclePhaseScreen
          value={draft.cyclePhase ?? null}
          onChange={cyclePhase => setDraft(prev => ({ ...prev, cyclePhase }))}
          onNext={() => afterCycle(draft.cyclePhase!)}
          onBack={() => setScreen('hormonal')}
        />
      )}
      {screen === 'mental' && (
        <MentalStateScreen
          value={checkIn.mentalState ?? null}
          onChange={mentalState => setCheckIn(prev => ({ ...prev, mentalState }))}
          onNext={() => afterMental(checkIn.mentalState!)}
        />
      )}
      {screen === 'intensity' && (
        <IntensityScreen
          mentalState={checkIn.mentalState!}
          value={checkIn.mentalScore ?? 5}
          onChange={mentalScore => setCheckIn(prev => ({ ...prev, mentalScore }))}
          onNext={afterIntensity}
          onBack={() => setScreen('mental')}
        />
      )}
      {screen === 'shift' && (
        <ShiftScreen
          mentalState={checkIn.mentalState!}
          value={checkIn.desiredState ?? null}
          onChange={desiredState => setCheckIn(prev => ({ ...prev, desiredState }))}
          onNext={() => afterShift(checkIn.desiredState!)}
          onBack={() => setScreen('intensity')}
        />
      )}
      {screen === 'physical' && (
        <PhysicalStateScreen
          value={checkIn.physicalState ?? null}
          onChange={physicalState => setCheckIn(prev => ({ ...prev, physicalState }))}
          onNext={() => afterPhysical(checkIn.physicalState!)}
          onBack={() => setScreen('shift')}
        />
      )}
      {screen === 'social' && (
        <SocialModeScreen
          value={checkIn.socialMode ?? null}
          onChange={socialMode => setCheckIn(prev => ({ ...prev, socialMode }))}
          onNext={() => afterSocial(checkIn.socialMode!)}
          onBack={() => setScreen('physical')}
        />
      )}
      {screen === 'sleep' && (
        <SleepScreen
          value={checkIn.sleepQuality ?? null}
          onChange={sleepQuality => setCheckIn(prev => ({ ...prev, sleepQuality }))}
          onSubmit={afterSleep}
          onSkip={skipSleep}
          onBack={() => setScreen('social')}
        />
      )}
      {screen === 'prescription' && (
        <PrescriptionScreen
          loading={loading}
          streamingCopy={streamingCopy}
          prescription={prescription}
          error={error}
          onStartOver={startOver}
        />
      )}
    </div>
  )
}
