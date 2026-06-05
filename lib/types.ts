export type BiologicalSex = 'male' | 'female' | 'prefer_not_to_say'
export type AgeRange = 'under_25' | '25_34' | '35_44' | '45_54' | '55_plus'
export type HormonalStatus = 'cycling' | 'pregnant' | 'breastfeeding' | 'post_menopausal' | 'prefer_not_to_say'
export type CyclePhase = 'follicular' | 'ovulatory' | 'luteal' | 'not_tracked'
export type MentalState = 'anxious' | 'scattered' | 'flat' | 'wired_tired' | 'steady' | 'sharp' | 'great'
export type PhysicalState = 'heavy' | 'sore' | 'tired' | 'stiff' | 'ok' | 'energised' | 'strong'
export type SocialMode = 'solo' | 'open_to_connection' | 'with_people' | 'need_quiet'
export type SleepQuality = 'terrible' | 'broken' | 'ok' | 'solid'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export type Screen =
  | 'sex' | 'age' | 'hormonal' | 'cycle'
  | 'mental' | 'intensity' | 'shift' | 'physical' | 'social' | 'sleep'
  | 'prescription'

export interface UserProfile {
  sex: BiologicalSex
  ageRange: AgeRange
  hormonalStatus?: HormonalStatus
  cyclePhase?: CyclePhase
}

export interface CheckIn {
  mentalState: MentalState
  mentalScore: number
  desiredState: string
  physicalState: PhysicalState
  socialMode: SocialMode
  sleepQuality?: SleepQuality
  timeOfDay: TimeOfDay
}

export interface PrescriptionRequest {
  profile: UserProfile
  checkIn: CheckIn
}

export interface TherapyStep {
  step: string
  why: string
}

export interface DrinkRecommendation {
  name: string
  ingredients: string
  when: 'before' | 'after' | 'anytime'
}

export interface Prescription {
  headline: string
  copy: string
  intensityScore: number
  therapy: TherapyStep[]
  drinks: DrinkRecommendation[]
  note: string
}
