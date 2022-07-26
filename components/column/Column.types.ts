import { ReactNode } from 'react'

import { Card } from '../../types/board'

export type ColumnDroppableProps = {
  id: string
  cards: Card[]
}

export type ColumnProps = {
  droppableProps: ColumnDroppableProps
  children: ReactNode
  label?: string
}
