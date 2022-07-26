import { ReactNode } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

import { CardDTO } from '../card'

export type ColumnsDTO = Record<UniqueIdentifier, CardDTO[]>

export type ColumnDroppableProps = {
  id: string
  cards: CardDTO[]
}

export type ColumnProps = {
  droppableProps: ColumnDroppableProps
  children: ReactNode
  label?: string
}
