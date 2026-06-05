interface IntensityBarProps {
  score: number
}

export default function IntensityBar({ score }: IntensityBarProps) {
  const pct = Math.min(Math.max(score, 1), 10) * 10

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted">Protocol intensity</span>
        <span className="text-sm font-bold text-forest">{score}/10</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-forest rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
