import { Cards } from '../../types/board'

export type SortableCardProps = {
  containerId: string
  id: string
  index: number
  disabled?: boolean
  items: Cards
  style(args: any): React.CSSProperties
  getIndex(id: string, items: Cards): number | undefined
}
