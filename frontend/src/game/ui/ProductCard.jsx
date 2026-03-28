import React from 'react'
import { Tag, TrendingDown, Layers } from 'lucide-react'

const ProductCard = ({ product, currentAsk }) => {
  if (!product) return null

  const savings = product.listingPrice - currentAsk
  const savingsPct = Math.round((savings / product.listingPrice) * 100)

  return (
    <div className="relative rounded-2xl p-4 space-y-3 overflow-hidden"
      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>

      {/* Accent glows */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: 'var(--color-victor)' }} />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: 'var(--color-void)' }} />

      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="section-label mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> THE ITEM
          </p>
          <h3 className="font-display text-xl leading-tight" style={{ color: 'var(--color-text)' }}>
            {product.name}
          </h3>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,117,32,0.12)', border: '1px solid rgba(255,117,32,0.28)' }}>
          <Tag className="w-4 h-4" style={{ color: 'var(--color-victor)' }} />
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'Syne' }}>
        {product.description}
      </p>

      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="section-label">Victor's Ask</span>
          <span className="font-mono text-sm line-through" style={{ color: 'var(--color-text-muted)' }}>
            ${product.listingPrice?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl"
          style={{ background: 'rgba(0,204,106,0.08)', border: '1px solid rgba(0,204,106,0.2)' }}>
          <span className="section-label" style={{ color: 'var(--color-neon-green)' }}>Current Ask</span>
          <span className="price-tag text-xl">${currentAsk?.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="section-label">Market Value</span>
          <span className="font-mono text-sm" style={{ color: 'var(--color-text-muted)' }}>
            ${product.marketValue?.toLocaleString()}
          </span>
        </div>

        {savings > 0 && (
          <div className="pt-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-neon-green)' }} />
              <span className="text-xs font-mono" style={{ color: 'var(--color-neon-green)' }}>
                Saved {savingsPct}% so far
              </span>
            </div>
            <div className="stat-bar">
              <div className="stat-fill"
                style={{ width: `${Math.min(savingsPct, 100)}%`, background: 'linear-gradient(90deg,#00ff88,#00cc6a)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
