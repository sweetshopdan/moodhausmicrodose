interface ProgressDotsProps {
  current: number
  total?: number
}

export default function ProgressDots({ current, total = 4 }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map(step => (
        <div
          key={step}
          className={`rounded-full transition-all duration-300 ${
            step === current
              ? 'w-6 h-2 bg-forest'
              : step < current
              ? 'w-2 h-2 bg-forest opacity-40'
              : 'w-2 h-2 bg-border border border-border'
          }`}
        />
      ))}
    </div>
  )
}
