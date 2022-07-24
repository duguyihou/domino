import { ReactNode, CSSProperties, Ref, ReactElement } from 'react'

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
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: CSSProperties
  transition?: string | null
  wrapperStyle?: CSSProperties
  value: ReactNode
  onRemove?(): void
  renderItem?(args: {
    dragOverlay: boolean
    dragging: boolean
    sorting: boolean
    index: number | undefined
    fadeIn: boolean
    listeners: DraggableSyntheticListeners
    ref: Ref<HTMLElement>
    style: CSSProperties | undefined
    transform: CardProps['transform']
    transition: CardProps['transition']
    value: CardProps['value']
  }): ReactElement
}
