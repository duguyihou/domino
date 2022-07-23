import { CSSProperties, JSXElementConstructor, ReactElement } from 'react'

import type { CancelDrop, Modifiers, UniqueIdentifier } from '@dnd-kit/core'
import type { SortingStrategy } from '@dnd-kit/sortable'

export type Cards = Record<UniqueIdentifier, string[]>
export type BoardProps = {
  adjustScale?: boolean
  cancelDrop?: CancelDrop
  columns?: number
  containerStyle?: CSSProperties
  getItemStyles?(args: {
    value: UniqueIdentifier
    index: number
    overIndex: number
    isDragging: boolean
    containerId: UniqueIdentifier
    isSorting: boolean
    isDragOverlay: boolean
  }): CSSProperties
  wrapperStyle?(args: { index: number }): CSSProperties
  itemCount?: number
  cards?: Cards
  handle?: boolean
  renderItem?: () => ReactElement<any, string | JSXElementConstructor<any>>
  strategy?: SortingStrategy
  modifiers?: Modifiers
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  vertical?: boolean
}
