import { CSSProperties } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'
import type { SortingStrategy } from '@dnd-kit/sortable'

export type Columns = Record<UniqueIdentifier, string[]>
export type BoardProps = {
  getItemStyles?(args: {
    value: UniqueIdentifier
    index: number
    overIndex: number
    isDragging: boolean
    containerId: UniqueIdentifier
    isSorting: boolean
    isDragOverlay: boolean
  }): CSSProperties
  initialColumns: Columns
  strategy?: SortingStrategy
}
