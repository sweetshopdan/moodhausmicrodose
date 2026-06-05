import type { TherapyStep as TherapyStepType } from '@/lib/types'

interface TherapyStepProps extends TherapyStepType {
  index: number
}

export default function TherapyStep({ index, step, why }: TherapyStepProps) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {index}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ink text-sm">{step}</p>
        <p className="text-xs text-muted mt-1 leading-relaxed">{why}</p>
      </div>
    </div>
  )
}
