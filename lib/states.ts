export const SEX_OPTIONS = [
  { id: 'male' as const, label: 'Male' },
  { id: 'female' as const, label: 'Female' },
  { id: 'prefer_not_to_say' as const, label: 'Prefer not to say' },
]

export const AGE_OPTIONS = [
  { id: 'under_25' as const, label: 'Under 25' },
  { id: '25_34' as const, label: '25–34' },
  { id: '35_44' as const, label: '35–44' },
  { id: '45_54' as const, label: '45–54' },
  { id: '55_plus' as const, label: '55+' },
]

export const HORMONAL_OPTIONS = [
  { id: 'cycling' as const, label: "I'm cycling" },
  { id: 'pregnant' as const, label: 'Pregnant' },
  { id: 'breastfeeding' as const, label: 'Breastfeeding' },
  { id: 'post_menopausal' as const, label: 'Post-menopausal' },
  { id: 'prefer_not_to_say' as const, label: 'Prefer not to say' },
]

export const CYCLE_PHASE_OPTIONS = [
  { id: 'follicular' as const, label: 'Follicular (days 1–13)' },
  { id: 'ovulatory' as const, label: 'Ovulatory (days 14–16)' },
  { id: 'luteal' as const, label: 'Luteal (days 17–28)' },
  { id: 'not_tracked' as const, label: "I don't track it" },
]

export const MENTAL_STATE_OPTIONS = [
  { id: 'anxious' as const, label: 'Anxious' },
  { id: 'scattered' as const, label: 'Scattered' },
  { id: 'flat' as const, label: 'Flat' },
  { id: 'wired_tired' as const, label: 'Wired-tired' },
  { id: 'steady' as const, label: 'Steady' },
  { id: 'sharp' as const, label: 'Sharp' },
  { id: 'great' as const, label: 'Great' },
]

export const PHYSICAL_STATE_OPTIONS = [
  { id: 'heavy' as const, label: 'Heavy' },
  { id: 'sore' as const, label: 'Sore' },
  { id: 'tired' as const, label: 'Tired' },
  { id: 'stiff' as const, label: 'Stiff' },
  { id: 'ok' as const, label: 'OK' },
  { id: 'energised' as const, label: 'Energised' },
  { id: 'strong' as const, label: 'Strong' },
]

export const SOCIAL_MODE_OPTIONS = [
  { id: 'solo' as const, label: 'Solo mode' },
  { id: 'open_to_connection' as const, label: 'Open to connection' },
  { id: 'with_people' as const, label: 'Here with people' },
  { id: 'need_quiet' as const, label: 'Need quiet' },
]

export const SHIFT_OPTIONS: Record<string, string[]> = {
  anxious:    ['Calm', 'Focused'],
  scattered:  ['Focused', 'Calm', 'Grounded'],
  flat:       ['Energised', 'Lifted', 'Focused'],
  wired_tired:['Calm', 'Sleep-ready', 'Restored'],
  steady:     ['Sharp', 'Great', 'Connected'],
  sharp:      ['Peak focus', 'Excellent', 'Connected'],
  great:      ['Peak', 'Maintain & sustain', 'Connected'],
}

export const MENTAL_INTENSITY_DESCRIPTIONS: Record<string, Record<number, string>> = {
  anxious:    { 1:'barely there', 2:'noticeable', 3:'present', 4:'quite strong', 5:'significant', 6:'intense', 7:'very intense', 8:'overwhelming', 9:'severe', 10:'completely floored' },
  scattered:  { 1:'mildly distracted', 2:'hard to land', 3:'mind jumping', 4:'quite fragmented', 5:'significant noise', 6:'very hard to focus', 7:'unable to settle', 8:'totally fragmented', 9:'complete chaos', 10:'cannot function' },
  flat:       { 1:'slightly low', 2:'noticeably flat', 3:'running slow', 4:'quite low', 5:'significantly drained', 6:'very low', 7:'barely functioning', 8:'empty', 9:'shutdown', 10:'nothing left' },
  wired_tired:{ 1:'mildly frazzled', 2:'tired but wired', 3:"can't switch off", 4:'quite burnt out', 5:'exhausted but racing', 6:'very burnt out', 7:'severely frazzled', 8:'completely burnt out', 9:'beyond exhausted', 10:'total overload' },
  steady:     { 1:'baseline ok', 2:'slight lift', 3:'decent', 4:'solid', 5:'pretty good', 6:'above average', 7:'genuinely good', 8:'really good', 9:'excellent', 10:'exceptional' },
  sharp:      { 1:'above average', 2:'solid', 3:'good', 4:'strong', 5:'sharp', 6:'very sharp', 7:'excellent', 8:'really sharp', 9:'near peak', 10:'exceptional' },
  great:      { 1:'above average', 2:'solid energy', 3:'good day', 4:'strong', 5:'great', 6:'very strong', 7:'excellent', 8:'really great', 9:'near peak', 10:'exceptional' },
}

export const SHIFT_INTENSITY_DESCRIPTIONS: Record<number, string> = {
  1: 'a gentle nudge — subtle shift',
  2: 'small but real improvement',
  3: 'noticeable lift',
  4: 'solid shift',
  5: 'meaningful transformation',
  6: 'significant state change',
  7: "substantial shift — you'll feel different",
  8: 'major elevation',
  9: 'peak-level change',
  10: 'full send — maximum intensity',
}

export const TO_OPTIONS = SHIFT_OPTIONS
export const TO_SCALE_DESCRIPTIONS = SHIFT_INTENSITY_DESCRIPTIONS

export const FROM_STATES = MENTAL_STATE_OPTIONS.map(s => ({
  ...s,
  type: (['steady', 'sharp', 'great'].includes(s.id) ? 'positive' : 'negative') as 'positive' | 'negative',
  scaleLabel: ({ anxious: 'how anxious?', scattered: 'how scattered?', flat: 'how flat?', wired_tired: 'how wired-tired?', steady: 'how steady?', sharp: 'how sharp?', great: 'how great?' } as Record<string, string>)[s.id] ?? '',
  descriptions: MENTAL_INTENSITY_DESCRIPTIONS[s.id] ?? {},
}))

export const SLEEP_OPTIONS = [
  { id: 'terrible' as const, label: 'Terrible' },
  { id: 'broken' as const, label: 'Broken' },
  { id: 'ok' as const, label: 'OK' },
  { id: 'solid' as const, label: 'Solid' },
]
