import { ReactNode, CSSProperties } from 'react'

import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

export type CardProps = {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  height?: number
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
