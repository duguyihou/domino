import { Cards } from '../../types/board'

export type SortableCardProps = {
  sortableCardProps: {
    containerId: string
    id: string
    index: number
    items: Cards
    style(args: any): React.CSSProperties
    getIndex(id: string, items: Cards): number | undefined
  }
}
