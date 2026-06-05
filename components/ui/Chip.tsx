'use client'

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
  variant?: 'default' | 'positive'
}

export default function Chip({ label, selected, onClick, variant = 'default' }: ChipProps) {
  const base = 'w-full px-2 py-2.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer select-none border text-center'

  const selectedStyle = 'bg-forest text-lime border-forest'
  const unselectedStyle = variant === 'positive'
    ? 'bg-green-light text-[#271416] border-green-light hover:border-amber'
    : 'bg-white text-[#271416] border-border hover:border-amber'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${selected ? selectedStyle : unselectedStyle}`}
    >
      {label}
    </button>
  )
}
