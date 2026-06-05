'use client'

interface IntensitySliderProps {
  value: number
  onChange: (val: number) => void
  label: string
  descriptions: Record<number, string>
}

export default function IntensitySlider({ value, onChange, label, descriptions }: IntensitySliderProps) {
  return (
    <div className="w-full">
      <p className="text-xs text-muted mb-3">{label}</p>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-5xl font-bold text-forest w-12 text-center leading-none">{value}</span>
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1"
        />
      </div>
      <p className="text-sm text-muted mt-2 min-h-[20px] pl-16">
        {descriptions[value as keyof typeof descriptions] ?? ''}
      </p>
    </div>
  )
}
