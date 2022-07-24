import { Cards } from '../../types/board'

export type SortableCardProps = {
  containerId: string
  id: string
  index: number
  handle: boolean
  disabled?: boolean
  items: Cards
  style(args: any): React.CSSProperties
  getIndex(id: string, items: Cards): number | undefined
  renderItem(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >
  wrapperStyle({ index }: { index: number }): React.CSSProperties
}
