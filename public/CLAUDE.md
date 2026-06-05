# MicroDose by MOOD HAUS — Project Brief

## What this app does
An AI-powered drink recommendation tool that suggests adaptogenic 
and nootropic drinks based on how the user is feeling right now — 
mentally, physically, and hormonally.

## Brand voice
- Premium but not corporate. Warm but not fluffy.
- No exclamation marks. No wellness clichés.
- Lowercase aesthetic. Dry wit. Rebellious sophistication.
- Never anti-alcohol. Always pro-choice.

## Onboarding flow (one-time profile, saved to user)

### Screen 1 — Biological sex
Question: "before we get started"
Options: male / female / prefer not to say

### Screen 2 — Age range
Options: under 25 / 25–34 / 35–44 / 45–54 / 55+

### Screen 3 — Female users only
Question: "a few things so we can look after you properly"
Options: i'm cycling / pregnant / breastfeeding / 
         post-menopausal / prefer not to say

If cycling, optional follow-up:
"where are you in your cycle?"
Options: follicular (days 1–13) / ovulatory (days 14–16) / 
         luteal (days 17–28) / i don't track it

## Daily check-in flow (every visit, quick)

### Mental state
Question: "how's your head today?"
Options: anxious / scattered / flat / wired-tired / 
         steady / sharp / great

### Physical state  
Question: "how's your body feeling?"
Options: heavy / sore / tired / stiff / ok / energised / strong

### Social mode
Question: "what are you here for today?"
Options: solo mode / open to connection / 
         here with people / need quiet

### Sleep (optional but powerful)
Question: "how did you sleep?"
Options: terrible / broken / ok / solid

### Time of day
Auto-detect from device, used to flag caffeine 
recommendations in the evening

## Recommendation logic principles
- Pregnant/breastfeeding users: flag high-caffeine and 
  certain adaptogen ingredients as unsuitable
- Luteal phase: avoid recommending high-dose ashwagandha
- Evening + anxious: favour calming, no stimulants
- Wired-tired: L-theanine based drinks, not more caffeine
- Heavy/sore: prioritise anti-inflammatory ingredients

## UI principles
- One question per screen max
- Max 6 options per question
- Pill/chip style buttons (as per current design)
- Dark olive/sage background consistent with brand
- The flow should feel like a conversation, not a form