import type { DrinkRecommendation } from '@/lib/types'

const WHEN_STYLES: Record<DrinkRecommendation['when'], string> = {
  before: 'bg-amber-light text-amber border border-amber/30',
  after: 'bg-green-light text-forest border border-forest/20',
  anytime: 'bg-gray-100 text-muted border border-gray-200',
}

export default function DrinkCard({ name, ingredients, when }: DrinkRecommendation) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-border">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink text-sm">{name}</p>
          <p className="text-xs text-muted mt-1 leading-relaxed">{ingredients}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${WHEN_STYLES[when]}`}>
          {when}
        </span>
      </div>
    </div>
  )
}
