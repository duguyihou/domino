import { ReactNode } from 'react'

import { Cards } from '../../types/board'

export type CardSortableProps = {
  columnId: string
  id: string
  index: number
  items: Cards
  style(args: any): React.CSSProperties
  getIndex(id: string, items: Cards): number | undefined
}
export type CardProps = {
  sortableProps: CardSortableProps
  value: ReactNode
}
