import { ReactNode, CSSProperties } from 'react'

import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

export type CardProps = {
  dragOverlay?: boolean
  color?: string
  dragging?: boolean
  handle?: boolean
  index?: number
  fadeIn?: boolean
  transform: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: CSSProperties
  transition?: string | null
  wrapperStyle?: CSSProperties
  value: ReactNode
  onRemove?(): void
}
