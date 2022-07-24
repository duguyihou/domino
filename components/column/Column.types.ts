import { ReactNode } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

export type ColumnDroppableProps = {
  id: string
  items: UniqueIdentifier[]
}

export type ColumnProps = {
  droppableProps: ColumnDroppableProps
  children: ReactNode
  label?: string
  onRemove?(): void
}
